import 'dart:convert';
import 'dart:js' as js;
import 'package:flutter/services.dart';
import 'interpreter_service_stub.dart';

/// Crea la instancia de la implementación web utilizando el motor JS del navegador
PlatformInterpreterService createInterpreterService() => InterpreterServiceWeb();

/// Implementación del Sandbox JS que utiliza la API de interoperabilidad nativa de Dart (dart:js)
/// para ejecutar el transpilador PHP directamente en el motor JavaScript del navegador (V8/SpiderMonkey).
class InterpreterServiceWeb implements PlatformInterpreterService {
  bool _isInitialized = false;

  InterpreterServiceWeb() {
    _initRuntime();
  }

  Future<void> _initRuntime() async {
    if (_isInitialized) return;

    try {
      // 1. Cargar interpreter.js desde los assets
      final String interpreterCode = await rootBundle.loadString('assets/js/interpreter.js');
      
      // 2. Inyectar el código JS en el contexto global de la página
      js.context.callMethod('eval', [interpreterCode]);

      // 3. Inyectar el helper 'runPHPTests'
      const String helperCode = '''
        window.runPHPTests = function(phpCode, validationsJsonStr) {
            var result = evalPHP(phpCode);
            var testResults = [];
            var validations = JSON.parse(validationsJsonStr);
            
            if (result.success) {
                for (var i = 0; i < validations.length; i++) {
                    try {
                        var validateFn = eval("(" + validations[i] + ")");
                        var passed = validateFn(phpCode, result.output);
                        testResults.push(!!passed);
                    } catch (e) {
                        testResults.push(false);
                    }
                }
            } else {
                for (var i = 0; i < validations.length; i++) {
                    testResults.push(false);
                }
            }
            
            return JSON.stringify({
                success: result.success,
                output: result.output,
                error: result.error,
                testResults: testResults
            });
        }
      ''';

      js.context.callMethod('eval', [helperCode]);
      _isInitialized = true;
    } catch (e) {
      print('[InterpreterServiceWeb] Error de inicialización: $e');
    }
  }

  @override
  Future<PHPExecutionResult> run(String phpCode, List<String> testValidations) async {
    if (!_isInitialized) {
      await _initRuntime();
    }

    try {
      final String validationsJson = jsonEncode(testValidations);
      
      // Llamar directamente a la función de JavaScript en el navegador
      final dynamic rawResult = js.context.callMethod('runPHPTests', [phpCode, validationsJson]);
      
      if (rawResult == null) {
        return PHPExecutionResult.failure('Error: La ejecución retornó un valor nulo.');
      }

      final String rawResultJson = rawResult.toString();
      final Map<String, dynamic> resultMap = jsonDecode(rawResultJson);

      return PHPExecutionResult.fromJson(resultMap);
    } catch (e) {
      return PHPExecutionResult.failure('Error en el Sandbox web: $e');
    }
  }

  @override
  void dispose() {
    // En Web, no se requiere liberar memoria manualmente ya que depende del GC del navegador
  }
}
