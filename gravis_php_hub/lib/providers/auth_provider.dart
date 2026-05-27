import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as sb;

/// Estado inmutable para el flujo de autenticación en la nube con Supabase
class AppAuthState {
  final sb.User? user;
  final String? errorMessage;
  final bool isLoading;

  AppAuthState({
    this.user,
    this.errorMessage,
    this.isLoading = false,
  });

  bool get isAuthenticated => user != null;
  String get email => user?.email ?? '';
}

/// Notificador de Estado encargado de gestionar el registro, inicio de sesión y cierre
/// utilizando el cliente oficial de Supabase.
class AuthNotifier extends StateNotifier<AppAuthState> {
  final _client = sb.Supabase.instance.client;

  AuthNotifier() : super(AppAuthState(user: sb.Supabase.instance.client.auth.currentUser)) {
    _client.auth.onAuthStateChange.listen((data) {
      state = AppAuthState(user: data.session?.user);
    });
  }

  /// Inicia sesión con correo y contraseña
  Future<bool> signIn(String email, String password) async {
    state = AppAuthState(user: state.user, isLoading: true);
    try {
      await _client.auth.signInWithPassword(
        email: email.trim(),
        password: password,
      );
      return true;
    } on sb.AuthException catch (e) {
      state = AppAuthState(user: state.user, errorMessage: e.message);
      return false;
    } catch (e) {
      state = AppAuthState(user: state.user, errorMessage: e.toString());
      return false;
    }
  }

  /// Registra una nueva cuenta de usuario
  Future<bool> signUp(String email, String password) async {
    state = AppAuthState(user: state.user, isLoading: true);
    try {
      await _client.auth.signUp(
        email: email.trim(),
        password: password,
      );
      return true;
    } on sb.AuthException catch (e) {
      state = AppAuthState(user: state.user, errorMessage: e.message);
      return false;
    } catch (e) {
      state = AppAuthState(user: state.user, errorMessage: e.toString());
      return false;
    }
  }

  /// Cierra la sesión activa del usuario
  Future<void> signOut() async {
    state = AppAuthState(user: state.user, isLoading: true);
    try {
      await _client.auth.signOut();
    } catch (e) {
      state = AppAuthState(user: state.user, errorMessage: e.toString());
    }
  }

  /// Limpia los mensajes de error activos
  void clearError() {
    state = AppAuthState(user: state.user, isLoading: state.isLoading);
  }
}

/// Proveedor global para AuthNotifier
final authProvider = StateNotifierProvider<AuthNotifier, AppAuthState>((ref) {
  return AuthNotifier();
});
