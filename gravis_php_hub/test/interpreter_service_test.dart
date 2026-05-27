import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_js/flutter_js.dart';
import 'package:gravis_php_hub/services/interpreter_service.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  // Verificar si la biblioteca nativa QuickJS está disponible en el PATH del host
  bool isQuickJSPresent = false;
  try {
    final runtime = getJavascriptRuntime();
    runtime.dispose();
    isQuickJSPresent = true;
  } catch (e) {
    print('[Info] Omitiendo pruebas nativas de FFI: QuickJS no está cargado en el PATH de pruebas unitarias del host (comportamiento esperado en entornos FFI locales).');
  }

  group('Pruebas del Motor de Transpilación y Ejecución PHP', () {
    late InterpreterService interpreter;

    setUp(() {
      interpreter = InterpreterService();
    });

    test('Ejecución básica de echo e impresión de cadenas', () async {
      if (!isQuickJSPresent) return; // Omitir si no hay QuickJS local

      const phpCode = '<?php\necho "Hola Mundo";';
      final validations = [
        '(code, output) => code.includes("echo")',
        '(code, output) => output.trim() === "Hola Mundo"'
      ];

      final result = await interpreter.run(phpCode, validations);

      expect(result.success, isTrue);
      expect(result.output.trim(), equals('Hola Mundo'));
      expect(result.error, isNull);
      expect(result.testResults.length, equals(2));
      expect(result.testResults[0], isTrue);
      expect(result.testResults[1], isTrue);
    });

    test('Soporte de comentarios sin romper transpilación de echo', () async {
      if (!isQuickJSPresent) return;

      const phpCode = '''
<?php
// Imprime Hola Mundo usando echo
echo "Hola Mundo";
''';
      final validations = [
        '(code, output) => output.trim() === "Hola Mundo"'
      ];

      final result = await interpreter.run(phpCode, validations);

      expect(result.success, isTrue);
      expect(result.output.trim(), equals('Hola Mundo'));
      expect(result.testResults[0], isTrue);
    });

    test('Detección y propagación de errores de sintaxis', () async {
      if (!isQuickJSPresent) return;

      const phpCode = '<?php\nif (true) { echo "sin cerrar"'; // Falta cerrar llave y punto y coma
      final validations = <String>[];

      final result = await interpreter.run(phpCode, validations);

      expect(result.success, isFalse);
      expect(result.error, isNotNull);
    });

    test('Simulación de carga y parseo del currículo JSON', () async {
      final file = File('c:/DEV/GravisStudyingHUB/gravis_php_hub/assets/curriculum/challenges.json');
      expect(await file.exists(), isTrue);
      
      final String jsonStr = await file.readAsString();
      expect(jsonStr, isNotEmpty);
      expect(jsonStr.contains('m1_hola_mundo'), isTrue);
    });
  });
}
