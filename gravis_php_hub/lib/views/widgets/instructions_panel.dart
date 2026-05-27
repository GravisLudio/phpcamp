import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/challenge.dart';
import '../../theme/app_theme.dart';

/// Panel izquierdo que renderiza de forma interactiva las instrucciones del reto
/// en Markdown y despliega la lista de verificación de requisitos (tests).
class InstructionsPanel extends StatelessWidget {
  final Challenge challenge;
  final List<bool> testResults;

  const InstructionsPanel({
    super.key,
    required this.challenge,
    required this.testResults,
  });

  /// Preprocesa el markdown para formatear de forma premium las alertas de GitHub (!NOTE, !IMPORTANT, etc.)
  String _preprocessMarkdown(String md) {
    // Convierte el marcado > [!NOTE] en un formato compatible o en bloques destacados HTML/MD
    String processed = md;
    
    // Buscar alertas simples de bloque
    processed = processed.replaceAllMapped(RegExp(r'>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n>\s*(.*)', caseSensitive: false), (match) {
      final type = match.group(1)!.toUpperCase();
      final content = match.group(2)!;
      
      String icon = 'ℹ️';
      String title = 'NOTA';
      if (type == 'TIP') { icon = '💡'; title = 'SUGERENCIA'; }
      if (type == 'IMPORTANT') { icon = '📢'; title = 'IMPORTANTE'; }
      if (type == 'WARNING') { icon = '⚠️'; title = 'ADVERTENCIA'; }
      if (type == 'CAUTION') { icon = '🛑'; title = 'CUIDADO'; }

      return '\n**$icon $title:** $content\n';
    });

    return processed;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final String cleanMarkdown = _preprocessMarkdown(challenge.instructions);

    return Container(
      color: AppTheme.surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Cabecera del panel
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: AppTheme.border),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    challenge.levelTitle.toUpperCase(),
                    style: GoogleFonts.outfit(
                      color: AppTheme.primary,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.1,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  challenge.title,
                  style: theme.textTheme.titleMedium,
                ),
              ],
            ),
          ),
          
          // Contenido principal de las instrucciones (Markdown)
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  MarkdownBody(
                    data: cleanMarkdown,
                    selectable: true,
                    styleSheet: MarkdownStyleSheet.fromTheme(theme).copyWith(
                      p: theme.textTheme.bodyLarge,
                      code: GoogleFonts.firaCode(
                        backgroundColor: AppTheme.surfaceLight,
                        color: const Color(0xFFF472B6), // Rosado brillante
                        fontSize: 13,
                      ),
                      codeblockDecoration: BoxDecoration(
                        color: AppTheme.surfaceLight,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppTheme.border),
                      ),
                      blockquoteDecoration: BoxDecoration(
                        color: AppTheme.surfaceLight.withOpacity(0.5),
                        borderRadius: BorderRadius.circular(4),
                        border: const Border(
                          left: BorderSide(color: AppTheme.primary, width: 4),
                        ),
                      ),
                    ),
                  ),
                  
                  const SizedBox(height: 32),
                  const Divider(color: AppTheme.border),
                  const SizedBox(height: 16),
                  
                  // Panel de Requisitos (User Stories de freeCodeCamp)
                  Text(
                    'Requisitos del Reto',
                    style: GoogleFonts.outfit(
                      color: AppTheme.textBright,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),
                  
                  // Lista de Requisitos Evaluados
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: challenge.tests.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final test = challenge.tests[index];
                      
                      // Determinar estado de la validación
                      bool hasPassed = false;
                      bool hasEvaluated = false;
                      if (index < testResults.length) {
                        hasPassed = testResults[index];
                        hasEvaluated = true;
                      }

                      Color statusColor = AppTheme.textMuted;
                      IconData statusIcon = Icons.circle_outlined;
                      double iconSize = 16.0;

                      if (hasEvaluated) {
                        if (hasPassed) {
                          statusColor = AppTheme.success;
                          statusIcon = Icons.check_circle;
                          iconSize = 20.0;
                        } else {
                          statusColor = AppTheme.error;
                          statusIcon = Icons.cancel;
                          iconSize = 20.0;
                        }
                      }

                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: hasPassed 
                              ? AppTheme.success.withOpacity(0.04) 
                              : AppTheme.surfaceLight.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: hasPassed 
                                ? AppTheme.success.withOpacity(0.2) 
                                : AppTheme.border,
                          ),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(top: 2.0),
                              child: Icon(
                                statusIcon,
                                color: statusColor,
                                size: iconSize,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                test.description,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: hasPassed ? AppTheme.textBright : AppTheme.textNormal,
                                  decoration: hasPassed ? TextDecoration.lineThrough : null,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
