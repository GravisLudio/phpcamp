import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_js/flutter_js.dart';

/// Clase que encapsula el resultado de la ejecución de código PHP
class PHPExecutionResult {
  final bool success;
  final String output;
  final String? error;
  final List<bool> testResults;

  PHPExecutionResult({
    required this.success,
    required this.output,
    this.error,
    required this.testResults,
  });

  factory PHPExecutionResult.fromJson(Map<String, dynamic> json) {
    return PHPExecutionResult(
      success: json['success'] ?? false,
      output: json['output'] ?? '',
      error: json['error'],
      testResults: List<bool>.from(json['testResults'] ?? []),
    );
  }

  factory PHPExecutionResult.failure(String error) {
    return PHPExecutionResult(
      success: false,
      output: '',
      error: error,
      testResults: [],
    );
  }
}

/// Servicio encargado de inicializar el motor JS local, precargar el transpilador
/// y ejecutar código PHP con sus respectivas validaciones en un entorno sandbox.
class InterpreterService {
  late JavascriptRuntime _jsRuntime;
  bool _isInitialized = false;

  InterpreterService() {
    _initRuntime();
  }

  /// Inicializa la instancia del motor JS e inyecta el transpilador interpreter.js
  Future<void> _initRuntime() async {
    if (_isInitialized) return;

    try {
      _jsRuntime = getJavascriptRuntime();
      
      // Cargar interpreter.js desde los assets
      final String interpreterCode = await rootBundle.loadString('assets/js/interpreter.js');
      
      // Inyectar el transpilador en el entorno de QuickJS
      _jsRuntime.evaluate(interpreterCode);

      // Inyectar helper de validación colectiva para optimizar el paso de datos entre Dart y JS
      const String helperCode = '''
        function runPHPTests(phpCode, validationsJsonStr) {
            var result = evalPHP(phpCode);
            var testResults = [];
            var validations = JSON.parse(validationsJsonStr);
            
            if (result.success) {
                for (var i = 0; i < validations.length; i++) {
                    try {
                        // Compila la función anónima de validación recibida como texto
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

      _jsRuntime.evaluate(helperCode);
      _isInitialized = true;
    } catch (e) {
      print('[InterpreterService] Error de inicialización: $e');
    }
  }

  /// Ejecuta el código PHP del usuario y corre las validaciones de los tests.
  /// Retorna un PHPExecutionResult con la salida y el estado de cada test.
  Future<PHPExecutionResult> run(String phpCode, List<String> testValidations) async {
    if (!_isInitialized) {
      await _initRuntime();
    }

    try {
      final String validationsJson = jsonEncode(testValidations);
      
      // Escapar caracteres para la inyección segura en la llamada JS
      final String escapedPhpCode = jsonEncode(phpCode);
      final String escapedValidations = jsonEncode(validationsJson);

      // Llamar a la función helper 'runPHPTests'
      final JsEvalResult jsResult = _jsRuntime.evaluate(
        'runPHPTests($escapedPhpCode, $escapedValidations)'
      );

      if (jsResult.isError) {
        return PHPExecutionResult.failure(jsResult.toString());
      }

      final String rawResultJson = jsResult.stringResult;
      final Map<String, dynamic> resultMap = jsonDecode(rawResultJson);

      return PHPExecutionResult.fromJson(resultMap);
    } catch (e) {
      return PHPExecutionResult.failure('Error al ejecutar el script en el Sandbox: $e');
    }
  }

  /// Limpia la memoria del runtime JS al destruir el servicio
  void dispose() {
    try {
      _jsRuntime.dispose();
    } catch (_) {}
  }
}
