import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_js/flutter_js.dart';
import 'interpreter_service_stub.dart';

/// Crea la instancia de la implementación nativa para IO (Escritorio/Móvil)
PlatformInterpreterService createInterpreterService() => InterpreterServiceIO();

/// Implementación del Sandbox JS que utiliza QuickJS (vía flutter_js) con FFI nativo
class InterpreterServiceIO implements PlatformInterpreterService {
  late JavascriptRuntime _jsRuntime;
  bool _isInitialized = false;

  InterpreterServiceIO() {
    _initRuntime();
  }

  Future<void> _initRuntime() async {
    if (_isInitialized) return;

    try {
      _jsRuntime = getJavascriptRuntime();
      
      // Cargar interpreter.js desde los assets
      final String interpreterCode = await rootBundle.loadString('assets/js/interpreter.js');
      
      // Inyectar el transpilador en el entorno de QuickJS
      _jsRuntime.evaluate(interpreterCode);

      // Inyectar helper de validación colectiva
      const String helperCode = '''
        function runPHPTests(phpCode, validationsJsonStr) {
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

      _jsRuntime.evaluate(helperCode);
      _isInitialized = true;
    } catch (e) {
      print('[InterpreterServiceIO] Error de inicialización: $e');
    }
  }

  @override
  Future<PHPExecutionResult> run(String phpCode, List<String> testValidations) async {
    if (!_isInitialized) {
      await _initRuntime();
    }

    try {
      final String validationsJson = jsonEncode(testValidations);
      final String escapedPhpCode = jsonEncode(phpCode);
      final String escapedValidations = jsonEncode(validationsJson);

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
      return PHPExecutionResult.failure('Error en el Sandbox nativo: $e');
    }
  }

  @override
  void dispose() {
    try {
      _jsRuntime.dispose();
    } catch (_) {}
  }
}
