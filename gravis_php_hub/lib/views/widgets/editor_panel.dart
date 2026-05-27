import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../theme/app_theme.dart';

/// Panel derecho que contiene el Editor de Código, la Consola de Salida
/// y la barra de controles de navegación y ejecución.
class EditorPanel extends StatefulWidget {
  final String initialCode;
  final String consoleOutput;
  final bool isConsoleError;
  final bool isExecuting;
  final VoidCallback onRunTests;
  final VoidCallback onResetCode;
  final ValueChanged<String> onCodeChanged;
  final VoidCallback? onPrevChallenge;
  final VoidCallback? onNextChallenge;
  final bool hasPrev;
  final bool hasNext;

  const EditorPanel({
    super.key,
    required this.initialCode,
    required this.consoleOutput,
    required this.isConsoleError,
    required this.isExecuting,
    required this.onRunTests,
    required this.onResetCode,
    required this.onCodeChanged,
    this.onPrevChallenge,
    this.onNextChallenge,
    required this.hasPrev,
    required this.hasNext,
  });

  @override
  State<EditorPanel> createState() => _EditorPanelState();
}

class _EditorPanelState extends State<EditorPanel> {
  late TextEditingController _codeController;
  final ScrollController _scrollController = ScrollController();
  final ScrollController _linesScrollController = ScrollController();
  int _lineCount = 1;

  @override
  void initState() {
    super.initState();
    _codeController = TextEditingController(text: widget.initialCode);
    _updateLineCount(widget.initialCode);
    
    // Sincronizar el scroll horizontal/vertical de los números de línea
    _scrollController.addListener(() {
      if (_linesScrollController.hasClients) {
        _linesScrollController.jumpTo(_scrollController.offset);
      }
    });
  }

  @override
  void didUpdateWidget(covariant EditorPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initialCode != widget.initialCode) {
      _codeController.text = widget.initialCode;
      _updateLineCount(widget.initialCode);
    }
  }

  @override
  void dispose() {
    _codeController.dispose();
    _scrollController.dispose();
    _linesScrollController.dispose();
    super.dispose();
  }

  void _updateLineCount(String text) {
    final count = '\n'.allMatches(text).length + 1;
    if (count != _lineCount) {
      setState(() {
        _lineCount = count;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Generar el String vertical de números de línea
    final String lineNumbersStr = List.generate(_lineCount, (i) => '${i + 1}').join('\n');

    return Container(
      color: AppTheme.background,
      child: Column(
        children: [
          // CABECERA DEL EDITOR
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              color: AppTheme.surface,
              border: Border(
                bottom: BorderSide(color: AppTheme.border),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.description_outlined, color: AppTheme.primary, size: 18),
                    const SizedBox(width: 8),
                    Text(
                      'index.php',
                      style: GoogleFonts.outfit(
                        color: AppTheme.textBright,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
                  ),
                  child: Text(
                    'PHP 8.2 Engine',
                    style: GoogleFonts.firaCode(
                      color: AppTheme.primary,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // ÁREA DE EDICIÓN DE CÓDIGO
          Expanded(
            flex: 6,
            child: Container(
              color: const Color(0xFF0C101A), // Fondo ultra oscuro para el código
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Números de línea
                  Container(
                    width: 42,
                    padding: const EdgeInsets.only(top: 14, right: 8),
                    decoration: const BoxDecoration(
                      color: Color(0xFF090D17),
                      border: Border(
                        right: BorderSide(color: AppTheme.border),
                      ),
                    ),
                    child: SingleChildScrollView(
                      controller: _linesScrollController,
                      physics: const NeverScrollableScrollPhysics(),
                      child: Text(
                        lineNumbersStr,
                        textAlign: TextAlign.right,
                        style: GoogleFonts.firaCode(
                          color: AppTheme.textMuted.withOpacity(0.5),
                          fontSize: 13,
                          height: 1.5,
                        ),
                      ),
                    ),
                  ),
                  
                  // Campo de texto
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 12, right: 12, top: 12),
                      child: SingleChildScrollView(
                        controller: _scrollController,
                        child: TextField(
                          controller: _codeController,
                          maxLines: null,
                          keyboardType: TextInputType.multiline,
                          textInputAction: TextInputAction.newline,
                          autofocus: true,
                          autocorrect: false,
                          enableSuggestions: false,
                          spellCheckConfiguration: const SpellCheckConfiguration.disabled(),
                          style: GoogleFonts.firaCode(
                            color: AppTheme.textBright,
                            fontSize: 13,
                            height: 1.5,
                          ),
                          decoration: const InputDecoration(
                            border: InputBorder.none,
                            isDense: true,
                            contentPadding: EdgeInsets.zero,
                          ),
                          onChanged: (text) {
                            _updateLineCount(text);
                            widget.onCodeChanged(text);
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // CONSOLA DE SALIDA INTERACTIVA
          Expanded(
            flex: 4,
            child: Container(
              decoration: const BoxDecoration(
                color: AppTheme.surface,
                border: Border(
                  top: BorderSide(color: AppTheme.border),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Cabecera Consola
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    color: const Color(0xFF090D17),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Text('🖥️', style: TextStyle(fontSize: 13)),
                            const SizedBox(width: 8),
                            Text(
                              'Consola de Salida',
                              style: GoogleFonts.outfit(
                                color: AppTheme.textNormal,
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: widget.onResetCode,
                          style: TextButton.styleFrom(
                            foregroundColor: AppTheme.error,
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            textStyle: GoogleFonts.outfit(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                            minimumSize: Size.zero,
                          ),
                          child: const Text('Reiniciar Código'),
                        ),
                      ],
                    ),
                  ),
                  
                  // Cuerpo Consola
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(16.0),
                      color: const Color(0xFF0C101A),
                      child: SingleChildScrollView(
                        child: Text(
                          widget.consoleOutput,
                          style: GoogleFonts.firaCode(
                            color: widget.isConsoleError 
                                ? AppTheme.error 
                                : const Color(0xFF34D399), // Verde terminal
                            fontSize: 12,
                            height: 1.4,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // BARRA DE CONTROLES INFERIOR
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              color: AppTheme.surface,
              border: Border(
                top: BorderSide(color: AppTheme.border),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Navegación
                Row(
                  children: [
                    ElevatedButton(
                      onPressed: widget.hasPrev ? widget.onPrevChallenge : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.surfaceLight,
                        foregroundColor: AppTheme.textBright,
                        disabledBackgroundColor: AppTheme.surfaceLight.withOpacity(0.3),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text('← Anterior'),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: widget.hasNext ? widget.onNextChallenge : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.surfaceLight,
                        foregroundColor: AppTheme.textBright,
                        disabledBackgroundColor: AppTheme.surfaceLight.withOpacity(0.3),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text('Siguiente →'),
                    ),
                  ],
                ),
                
                // Ejecución Pruebas (Botón Principal Gradiente)
                Container(
                  decoration: BoxDecoration(
                    gradient: widget.isExecuting ? null : AppTheme.brandGradient,
                    borderRadius: BorderRadius.circular(8),
                    color: widget.isExecuting ? AppTheme.surfaceLight : null,
                  ),
                  child: ElevatedButton(
                    onPressed: widget.isExecuting ? null : widget.onRunTests,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      foregroundColor: AppTheme.textBright,
                      shadowColor: Colors.transparent,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: widget.isExecuting
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: AppTheme.textBright,
                            ),
                          )
                        : Text(
                            '🚀 Ejecutar Pruebas',
                            style: GoogleFonts.outfit(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
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
