import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/challenge.dart';

/// Clase inmutable que modela el estado completo de la experiencia de aprendizaje
class CourseState {
  final List<Challenge> challenges;
  final int currentChallengeIndex;
  final Map<String, String> drafts;
  final Set<String> completed;
  final bool isLoaded;
  final bool isGuideVisible;

  CourseState({
    this.challenges = const [],
    this.currentChallengeIndex = 0,
    this.drafts = const {},
    this.completed = const {},
    this.isLoaded = false,
    this.isGuideVisible = true,
  });

  Challenge? get currentChallenge {
    if (challenges.isEmpty || currentChallengeIndex < 0 || currentChallengeIndex >= challenges.length) {
      return null;
    }
    return challenges[currentChallengeIndex];
  }

  String get currentCode {
    final challenge = currentChallenge;
    if (challenge == null) return '';
    return drafts[challenge.id] ?? challenge.initialCode;
  }

  double get progressPercentage {
    if (challenges.isEmpty) return 0.0;
    return completed.length / challenges.length;
  }

  CourseState copyWith({
    List<Challenge>? challenges,
    int? currentChallengeIndex,
    Map<String, String>? drafts,
    Set<String>? completed,
    bool? isLoaded,
    bool? isGuideVisible,
  }) {
    return CourseState(
      challenges: challenges ?? this.challenges,
      currentChallengeIndex: currentChallengeIndex ?? this.currentChallengeIndex,
      drafts: drafts ?? this.drafts,
      completed: completed ?? this.completed,
      isLoaded: isLoaded ?? this.isLoaded,
      isGuideVisible: isGuideVisible ?? this.isGuideVisible,
    );
  }
}

/// Notificador de Estado para el progreso del curso e interacción del editor
class CourseNotifier extends StateNotifier<CourseState> {
  CourseNotifier() : super(CourseState()) {
    _loadCurriculum();
  }

  /// Carga inicial del currículo y restauración del progreso guardado en SharedPreferences
  Future<void> _loadCurriculum() async {
    try {
      // 1. Cargar y parsear JSON de retos
      final String jsonStr = await rootBundle.loadString('assets/curriculum/challenges.json');
      final List<dynamic> parsedList = jsonDecode(jsonStr);
      final List<Challenge> loadedChallenges = parsedList
          .map((c) => Challenge.fromJson(c as Map<String, dynamic>))
          .toList();

      // 2. Cargar SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      
      // Recuperar retos completados
      final List<String> completedList = prefs.getStringList('gravis_php_completed') ?? [];
      final Set<String> completedSet = completedList.toSet();

      // Recuperar borradores de código de los retos
      final Map<String, String> loadedDrafts = {};
      for (var challenge in loadedChallenges) {
        final String? savedDraft = prefs.getString('gravis_php_draft_${challenge.id}');
        if (savedDraft != null) {
          loadedDrafts[challenge.id] = savedDraft;
        } else {
          loadedDrafts[challenge.id] = challenge.initialCode;
        }
      }

      state = CourseState(
        challenges: loadedChallenges,
        currentChallengeIndex: 0,
        drafts: loadedDrafts,
        completed: completedSet,
        isLoaded: true,
        isGuideVisible: true, // Mostrar la guía al inicio
      );

      // Si ya hay un usuario logueado en Supabase al arrancar, descargar progreso
      final currentUser = Supabase.instance.client.auth.currentUser;
      if (currentUser != null) {
        syncProgressFromSupabase(currentUser.id);
      }
    } catch (e) {
      // Evitar print en producción sustituyendo por logs silenciosos si linter molesta
    }
  }

  /// Cambia el reto actual y desactiva la guía de inicio si estaba visible
  void selectChallenge(int index) {
    if (index >= 0 && index < state.challenges.length) {
      state = state.copyWith(
        currentChallengeIndex: index,
        isGuideVisible: false,
      );
    }
  }

  /// Activa o desactiva la vista de la Guía de Inicio General
  void setGuideVisibility(bool visible) {
    state = state.copyWith(isGuideVisible: visible);
  }

  /// Actualiza en memoria y disco el borrador de código del reto actual
  Future<void> updateCurrentCode(String newCode) async {
    final challenge = state.currentChallenge;
    if (challenge == null) return;

    final updatedDrafts = Map<String, String>.from(state.drafts);
    updatedDrafts[challenge.id] = newCode;

    state = state.copyWith(drafts: updatedDrafts);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('gravis_php_draft_${challenge.id}', newCode);
  }

  /// Restablece el código inicial del reto activo borrando su borrador local
  Future<void> resetCurrentCode() async {
    final challenge = state.currentChallenge;
    if (challenge == null) return;

    final updatedDrafts = Map<String, String>.from(state.drafts);
    updatedDrafts[challenge.id] = challenge.initialCode;

    state = state.copyWith(drafts: updatedDrafts);

    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('gravis_php_draft_${challenge.id}');
  }

  /// Marca el reto actual como superado de forma persistente (Sincroniza a Supabase si aplica)
  Future<void> completeCurrentChallenge() async {
    final challenge = state.currentChallenge;
    if (challenge == null) return;

    final updatedCompleted = Set<String>.from(state.completed);
    updatedCompleted.add(challenge.id);

    state = state.copyWith(completed: updatedCompleted);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('gravis_php_completed', updatedCompleted.toList());

    // Sincronizar en la nube con Supabase si está logueado
    final currentUser = Supabase.instance.client.auth.currentUser;
    if (currentUser != null) {
      try {
        final Map<String, bool> syncMap = {};
        for (var id in updatedCompleted) {
          syncMap[id] = true;
        }

        await Supabase.instance.client
            .from('user_progress')
            .upsert({
              'user_id': currentUser.id,
              'completed_challenges': syncMap,
              'updated_at': DateTime.now().toIso8601String(),
            });
      } catch (_) {}
    }
  }

  /// Descarga el progreso de la nube de Supabase y lo fusiona con el local
  Future<void> syncProgressFromSupabase(String userId) async {
    try {
      final response = await Supabase.instance.client
          .from('user_progress')
          .select('completed_challenges')
          .eq('user_id', userId)
          .maybeSingle();

      if (response != null && response['completed_challenges'] != null) {
        final Map<String, dynamic> rawCompleted = response['completed_challenges'] as Map<String, dynamic>;
        final Set<String> completedSet = {};
        rawCompleted.forEach((key, value) {
          if (value == true) {
            completedSet.add(key);
          }
        });

        // Fusionar progreso local y remoto
        final mergedCompleted = Set<String>.from(state.completed)..addAll(completedSet);

        state = state.copyWith(completed: mergedCompleted);

        // Guardar en persistencia local
        final prefs = await SharedPreferences.getInstance();
        await prefs.setStringList('gravis_php_completed', mergedCompleted.toList());
      }
    } catch (_) {}
  }

  /// Limpia el progreso local al cerrar sesión del servidor
  Future<void> clearProgressOnLogout() async {
    state = state.copyWith(completed: {});
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('gravis_php_completed');
  }
}

/// Proveedor global para CourseNotifier
final courseProvider = StateNotifierProvider<CourseNotifier, CourseState>((ref) {
  return CourseNotifier();
});
