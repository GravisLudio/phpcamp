import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/challenge.dart';
import '../../theme/app_theme.dart';

/// Panel lateral dinámico que organiza el currículo en niveles y módulos,
/// reflejando el progreso del alumno con insignias de completado.
class SidebarPanel extends StatelessWidget {
  final List<Challenge> challenges;
  final int currentChallengeIndex;
  final Set<String> completedChallenges;
  final bool isGuideVisible;
  final ValueChanged<int> onSelectChallenge;
  final VoidCallback onShowGuide;

  const SidebarPanel({
    super.key,
    required this.challenges,
    required this.currentChallengeIndex,
    required this.completedChallenges,
    required this.isGuideVisible,
    required this.onSelectChallenge,
    required this.onShowGuide,
  });

  /// Agrupa dinámicamente los retos por nivel
  Map<String, List<MapEntry<int, Challenge>>> _groupChallengesByLevel() {
    final Map<String, List<MapEntry<int, Challenge>>> groups = {};
    for (int i = 0; i < challenges.length; i++) {
      final challenge = challenges[i];
      final levelTitle = challenge.levelTitle;
      if (!groups.containsKey(levelTitle)) {
        groups[levelTitle] = [];
      }
      groups[levelTitle]!.add(MapEntry(i, challenge));
    }
    return groups;
  }

  @override
  Widget build(BuildContext context) {
    final groupedChallenges = _groupChallengesByLevel();

    return Container(
      width: 280,
      decoration: const BoxDecoration(
        color: AppTheme.surface,
        border: Border(
          right: BorderSide(color: AppTheme.border),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // CABECERA DEL TEMARIO
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: AppTheme.border),
              ),
            ),
            child: Row(
              children: [
                const Text('🐘', style: TextStyle(fontSize: 22)),
                const SizedBox(width: 10),
                Text(
                  'Gravis',
                  style: GoogleFonts.outfit(
                    color: AppTheme.textBright,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'PHPHUB',
                  style: GoogleFonts.outfit(
                    color: AppTheme.primary,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // LISTADO DE MÓDULOS
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(vertical: 8),
              children: [
                // 1. Botón "Guía de Inicio" a nivel superior
                ListTile(
                  leading: const Text('🚀', style: TextStyle(fontSize: 16)),
                  title: Text(
                    'Guía de Inicio',
                    style: GoogleFonts.outfit(
                      color: isGuideVisible ? AppTheme.primary : AppTheme.textNormal,
                      fontWeight: isGuideVisible ? FontWeight.bold : FontWeight.w500,
                      fontSize: 14,
                    ),
                  ),
                  selected: isGuideVisible,
                  selectedTileColor: AppTheme.primary.withOpacity(0.08),
                  onTap: onShowGuide,
                ),
                
                const Divider(color: AppTheme.border, height: 16),
                
                // 2. Niveles del Curso y sus Retos agrupados
                ...groupedChallenges.entries.map((entry) {
                  final levelTitle = entry.key;
                  final entries = entry.value;

                  // Contar retos completados en este nivel
                  final int completedInLevel = entries.where((e) => completedChallenges.contains(e.value.id)).length;
                  final int totalInLevel = entries.length;
                  final bool isLevelCompleted = completedInLevel == totalInLevel;

                  return Theme(
                    data: Theme.of(context).copyWith(
                      dividerColor: Colors.transparent,
                    ),
                    child: ExpansionTile(
                      key: PageStorageKey<String>(levelTitle),
                      initiallyExpanded: true,
                      title: Text(
                        levelTitle,
                        style: GoogleFonts.outfit(
                          color: AppTheme.textBright,
                          fontWeight: FontWeight.w600,
                          fontSize: 13.5,
                        ),
                      ),
                      subtitle: Row(
                        children: [
                          Icon(
                            isLevelCompleted ? Icons.check_circle : Icons.circle_outlined,
                            size: 11,
                            color: isLevelCompleted ? AppTheme.success : AppTheme.textMuted,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            '$completedInLevel / $totalInLevel retos',
                            style: GoogleFonts.inter(
                              color: AppTheme.textMuted,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                      children: entries.map((mapEntry) {
                        final index = mapEntry.key;
                        final challenge = mapEntry.value;
                        final isSelected = index == currentChallengeIndex && !isGuideVisible;
                        final isCompleted = completedChallenges.contains(challenge.id);

                        return Container(
                          margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 1),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(6),
                            color: isSelected 
                                ? AppTheme.primary.withOpacity(0.08) 
                                : Colors.transparent,
                          ),
                          child: ListTile(
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 0),
                            dense: true,
                            horizontalTitleGap: 8,
                            leading: Icon(
                              isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
                              color: isCompleted 
                                  ? AppTheme.success 
                                  : (isSelected ? AppTheme.primary : AppTheme.textMuted),
                              size: 14,
                            ),
                            title: Text(
                              challenge.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.inter(
                                color: isSelected 
                                    ? AppTheme.textBright 
                                    : (isCompleted ? AppTheme.textNormal.withOpacity(0.7) : AppTheme.textNormal),
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                fontSize: 12.5,
                              ),
                            ),
                            onTap: () => onSelectChallenge(index),
                          ),
                        );
                      }).toList(),
                    ),
                  );
                }).toList(),
              ],
            ),
          ),
          
          // BARRA DE PROGRESO TOTAL AL PIE
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: const BoxDecoration(
              border: Border(
                top: BorderSide(color: AppTheme.border),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Progreso General',
                      style: GoogleFonts.outfit(
                        color: AppTheme.textNormal,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      '${completedChallenges.length} / ${challenges.length}',
                      style: GoogleFonts.firaCode(
                        color: AppTheme.primary,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: challenges.isEmpty 
                        ? 0 
                        : completedChallenges.length / challenges.length,
                    backgroundColor: AppTheme.surfaceLight,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.success),
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
