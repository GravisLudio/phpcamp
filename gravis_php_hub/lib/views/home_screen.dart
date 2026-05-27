import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../providers/auth_provider.dart';
import '../../providers/course_provider.dart';
import '../../services/interpreter_service.dart';
import '../../theme/app_theme.dart';
import 'widgets/auth_dialog.dart';
import 'widgets/celebration_modal.dart';
import 'widgets/editor_panel.dart';
import 'widgets/instructions_panel.dart';
import 'widgets/sidebar_panel.dart';

/// Pantalla de área de trabajo principal (Workspace) de GravisPHPHUB
class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> with SingleTickerProviderStateMixin {
  late InterpreterService _interpreterService;
  
  // Estado local para los resultados del reto actual
  String _consoleOutput = 'Presiona "Ejecutar Pruebas" para compilar tu PHP.';
  bool _isConsoleError = false;
  bool _isExecuting = false;
  List<bool> _testResults = [];
  
  // Controlador de pestañas para la vista responsiva en móvil
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _interpreterService = InterpreterService();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _interpreterService.dispose();
    _tabController.dispose();
    super.dispose();
  }

  /// Ejecuta el código PHP y corre la batería de pruebas en QuickJS
  Future<void> _runPHPValidation(String code, List<String> validations) async {
    setState(() {
      _isExecuting = true;
      _consoleOutput = 'Compilando y ejecutando PHP... \n';
    });

    try {
      final result = await _interpreterService.run(code, validations);

      setState(() {
        _isExecuting = false;
        _isConsoleError = !result.success;
        _testResults = result.testResults;
        
        if (result.success) {
          _consoleOutput = result.output.isNotEmpty
              ? result.output
              : '(El script se ejecutó correctamente sin imprimir nada en pantalla)';
        } else {
          _consoleOutput = '❌ Error de Sintaxis / Ejecución PHP:\n\n${result.error}';
        }
      });

      // Si pasa todas las validaciones exitosamente
      final bool allPassed = result.success && 
          result.testResults.isNotEmpty && 
          result.testResults.every((passed) => passed);

      if (allPassed) {
        // Registrar avance en persistencia
        await ref.read(courseProvider.notifier).completeCurrentChallenge();
        
        // Lanzar Modal de Celebración Premium
        if (mounted) {
          showDialog(
            context: context,
            barrierDismissible: false,
            builder: (context) => CelebrationModal(
              onNext: () {
                // Navegar al siguiente reto al cerrar
                final state = ref.read(courseProvider);
                if (state.currentChallengeIndex < state.challenges.length - 1) {
                  ref.read(courseProvider.notifier).selectChallenge(state.currentChallengeIndex + 1);
                  _clearLocalResults();
                }
              },
            ),
          );
        }
      }
    } catch (e) {
      setState(() {
        _isExecuting = false;
        _isConsoleError = true;
        _consoleOutput = '❌ Error del Sandbox: $e';
      });
    }
  }

  void _clearLocalResults() {
    setState(() {
      _consoleOutput = 'Presiona "Ejecutar Pruebas" para compilar tu PHP.';
      _isConsoleError = false;
      _testResults = [];
    });
  }

  /// Helper que renderiza el widget dinámico de autenticación en la cabecera
  Widget _buildAuthHeaderWidget(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final authNotifier = ref.read(authProvider.notifier);

    if (authState.isAuthenticated) {
      return Padding(
        padding: const EdgeInsets.only(right: 12),
        child: Row(
          children: [
            Text(
              authState.email,
              style: GoogleFonts.inter(
                color: AppTheme.textMuted,
                fontSize: 12,
              ),
            ),
            const SizedBox(width: 8),
            TextButton(
              onPressed: () async {
                await authNotifier.signOut();
                await ref.read(courseProvider.notifier).clearProgressOnLogout();
              },
              style: TextButton.styleFrom(
                foregroundColor: AppTheme.error,
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(999),
                  side: BorderSide(color: AppTheme.error.withOpacity(0.2)),
                ),
                minimumSize: Size.zero,
              ),
              child: const Text('Salir', style: TextStyle(fontSize: 10)),
            ),
          ],
        ),
      );
    } else {
      return Padding(
        padding: const EdgeInsets.only(right: 12),
        child: TextButton.icon(
          onPressed: () {
            showDialog(
              context: context,
              builder: (context) => const AuthDialog(),
            );
          },
          icon: const Icon(Icons.vpn_key_outlined, size: 12),
          label: const Text('Entrar', style: TextStyle(fontSize: 11)),
          style: TextButton.styleFrom(
            foregroundColor: AppTheme.textNormal,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(999),
              side: const BorderSide(color: AppTheme.border),
            ),
            minimumSize: Size.zero,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(courseProvider);
    final notifier = ref.read(courseProvider.notifier);

    if (!state.isLoaded) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(color: AppTheme.primary),
        ),
      );
    }

    final double width = MediaQuery.of(context).size.width;
    final bool isDesktop = width > 900;

    // Widget del contenido central (Guía de Inicio o Workspace interactivo)
    Widget mainContent;

    if (state.isGuideVisible) {
      mainContent = _buildStartGuide(context);
    } else {
      final challenge = state.currentChallenge!;
      final testValidations = challenge.tests.map((t) => t.validateCode).toList();

      if (isDesktop) {
        // PANTALLA DIVIDIDA PARA ESCRITORIO (freeCodeCamp style)
        mainContent = Row(
          children: [
            // Panel Izquierdo: Instrucciones
            Expanded(
              flex: 5,
              child: InstructionsPanel(
                challenge: challenge,
                testResults: _testResults,
              ),
            ),
            const VerticalDivider(width: 1, color: AppTheme.border),
            
            // Panel Derecho: Editor y Consola
            Expanded(
              flex: 6,
              child: EditorPanel(
                initialCode: state.currentCode,
                consoleOutput: _consoleOutput,
                isConsoleError: _isConsoleError,
                isExecuting: _isExecuting,
                onCodeChanged: (code) => notifier.updateCurrentCode(code),
                onResetCode: () async {
                  await notifier.resetCurrentCode();
                  _clearLocalResults();
                },
                onRunTests: () => _runPHPValidation(state.currentCode, testValidations),
                hasPrev: state.currentChallengeIndex > 0,
                hasNext: state.currentChallengeIndex < state.challenges.length - 1,
                onPrevChallenge: () {
                  notifier.selectChallenge(state.currentChallengeIndex - 1);
                  _clearLocalResults();
                },
                onNextChallenge: () {
                  notifier.selectChallenge(state.currentChallengeIndex + 1);
                  _clearLocalResults();
                },
              ),
            ),
          ],
        );
      } else {
        // PESTAÑAS PARA MÓVIL
        mainContent = Column(
          children: [
            TabBar(
              controller: _tabController,
              indicatorColor: AppTheme.primary,
              labelColor: AppTheme.primary,
              unselectedLabelColor: AppTheme.textMuted,
              tabs: const [
                Tab(text: 'Instrucciones y Tests'),
                Tab(text: 'Editor y Consola'),
              ],
            ),
            const Divider(height: 1, color: AppTheme.border),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  InstructionsPanel(
                    challenge: challenge,
                    testResults: _testResults,
                  ),
                  EditorPanel(
                    initialCode: state.currentCode,
                    consoleOutput: _consoleOutput,
                    isConsoleError: _isConsoleError,
                    isExecuting: _isExecuting,
                    onCodeChanged: (code) => notifier.updateCurrentCode(code),
                    onResetCode: () async {
                      await notifier.resetCurrentCode();
                      _clearLocalResults();
                    },
                    onRunTests: () {
                      _runPHPValidation(state.currentCode, testValidations);
                      _tabController.animateTo(0); // Regresar a ver los tests pasar
                    },
                    hasPrev: state.currentChallengeIndex > 0,
                    hasNext: state.currentChallengeIndex < state.challenges.length - 1,
                    onPrevChallenge: () {
                      notifier.selectChallenge(state.currentChallengeIndex - 1);
                      _clearLocalResults();
                    },
                    onNextChallenge: () {
                      notifier.selectChallenge(state.currentChallengeIndex + 1);
                      _clearLocalResults();
                    },
                  ),
                ],
              ),
            ),
          ],
        );
      }
    }

    return Scaffold(
      drawer: isDesktop ? null : Drawer(
        child: SidebarPanel(
          challenges: state.challenges,
          currentChallengeIndex: state.currentChallengeIndex,
          completedChallenges: state.completed,
          isGuideVisible: state.isGuideVisible,
          onSelectChallenge: (index) {
            notifier.selectChallenge(index);
            _clearLocalResults();
            Navigator.of(context).pop(); // Cerrar drawer
          },
          onShowGuide: () {
            notifier.setGuideVisibility(true);
            Navigator.of(context).pop();
          },
        ),
      ),
      appBar: AppBar(
        backgroundColor: AppTheme.surface,
        elevation: 0,
        titleSpacing: isDesktop ? 20 : 0,
        leading: isDesktop 
            ? null 
            : Builder(
                builder: (context) => IconButton(
                  icon: const Icon(Icons.menu, color: AppTheme.textBright),
                  onPressed: () => Scaffold.of(context).openDrawer(),
                ),
              ),
        title: Row(
          children: [
            const Text('🐘', style: TextStyle(fontSize: 22)),
            const SizedBox(width: 8),
            Text(
              'GravisPHPHUB',
              style: GoogleFonts.outfit(
                color: AppTheme.textBright,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          // Widget del usuario Supabase
          _buildAuthHeaderWidget(context, ref),
          
          // Medidor de progreso en el header
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceLight,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Row(
                  children: [
                    const Text('🏆 Progress: ', style: TextStyle(color: AppTheme.textMuted, fontSize: 12)),
                    Text(
                      '${state.completed.length} / ${state.challenges.length}',
                      style: GoogleFonts.firaCode(
                        color: AppTheme.success,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      body: Row(
        children: [
          if (isDesktop)
            SidebarPanel(
              challenges: state.challenges,
              currentChallengeIndex: state.currentChallengeIndex,
              completedChallenges: state.completed,
              isGuideVisible: state.isGuideVisible,
              onSelectChallenge: (index) {
                notifier.selectChallenge(index);
                _clearLocalResults();
              },
              onShowGuide: () => notifier.setGuideVisibility(true),
            ),
          Expanded(child: mainContent),
        ],
      ),
    );
  }

  /// Construye la vista hermosa de la Guía de Inicio interactiva
  Widget _buildStartGuide(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
      color: const Color(0xFF0C101A),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      MarkdownBody(
                        data: _startGuideMarkdown,
                        selectable: true,
                        styleSheet: MarkdownStyleSheet.fromTheme(theme).copyWith(
                          p: theme.textTheme.bodyLarge?.copyWith(fontSize: 16),
                          h2: GoogleFonts.outfit(
                            color: AppTheme.textBright,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                          h3: GoogleFonts.outfit(
                            color: AppTheme.textBright,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                          code: GoogleFonts.firaCode(
                            backgroundColor: AppTheme.surfaceLight,
                            color: const Color(0xFFF472B6),
                            fontSize: 14,
                          ),
                          codeblockDecoration: BoxDecoration(
                            color: AppTheme.surfaceLight,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppTheme.border),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              // Botón Comenzar Gigante Gradiente
              Container(
                decoration: BoxDecoration(
                  gradient: AppTheme.brandGradient,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: ElevatedButton(
                  onPressed: () {
                    ref.read(courseProvider.notifier).selectChallenge(0);
                    _clearLocalResults();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    foregroundColor: AppTheme.textBright,
                    shadowColor: Colors.transparent,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    '🚀 ¡Comenzar el Curso Ahora!',
                    style: GoogleFonts.outfit(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static const String _startGuideMarkdown = '''
# ¡Bienvenido a GravisPHPHUB! 🚀

Esta plataforma interactiva está diseñada para que tú y tus compañeros dominen **PHP, Bases de Datos y Laravel** en tiempo récord, llevándolos de la mano **desde nivel 0 absoluto** hasta conceptos intermedios y avanzados del desarrollo web profesional.

---

## 🐘 ¿Qué es PHP y Cómo Funcionan sus Archivos?

Si nunca has programado en PHP, ¡no te preocupes! Aquí tienes los conceptos básicos:
- **¿Qué es PHP?** Es el lenguaje que ejecuta la lógica detrás del 78% de las páginas web del mundo (incluyendo Facebook y WordPress).
- **Archivos PHP:** Todos los archivos de código PHP terminan en la extensión `.php` (por ejemplo: `index.php`).
- **La etiqueta de apertura:** Para que el servidor sepa que debe ejecutar código PHP, tu archivo **debe empezar obligatoriamente** en la primera línea con:
  ```php
  <?php
  ```
- **Instrucciones:** Cada orden o comando en PHP debe terminar obligatoriamente con un punto y coma (`;`), por ejemplo: `echo "Hola Mundo";`.

---

## 🛠️ Configuración de tu Entorno de Desarrollo Local

Para programar en tu propia computadora como un profesional, te recomendamos instalar:

1. **Instalar Laravel Herd (Tu motor PHP y Servidor):** Ve a [herd.laravel.com](https://herd.laravel.com) y descarga el instalador para encender PHP localmente en un clic.
2. **Instalar VS Code:** Descarga Visual Studio Code y añade las extensiones **PHP Intelephense** (autocompletado inteligente) y **Laravel Extension Pack**.
3. **Instalar Dbngin:** Desde [dbngin.com](https://dbngin.com) para crear bases de datos MySQL locales con un solo clic.

---

## 🔄 Elige tu Método de Trabajo en GravisPHPHUB

En nuestra plataforma integrada tienes dos formas de avanzar en tu aprendizaje:

### 🖥️ Modo Interactivo (Editor Integrado)
Escribe tu código directamente en el editor de la derecha de cada reto y presiona **"Ejecutar Pruebas"**. El motor QuickJS compilará tu PHP y te mostrará el resultado y los tests pasados.

### 💻 Modo Local
Copia y pega la ruta sugerida en VS Code local, prográmalo en tu computadora, pruébalo en tu navegador y, cuando funcione, pega el código final aquí en la plataforma para certificar tu avance.
''';
}
