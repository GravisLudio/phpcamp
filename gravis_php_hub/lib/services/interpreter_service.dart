import 'dart:convert';
import 'interpreter_service_stub.dart';
import 'interpreter_service_stub.dart'
    if (dart.library.html) 'interpreter_service_web.dart'
    if (dart.library.io) 'interpreter_service_io.dart' as platform;

export 'interpreter_service_stub.dart';

/// Fábrica para instanciar el servicio de interpretación según la plataforma
class InterpreterService {
  final _impl = platform.createInterpreterService();

  Future<PHPExecutionResult> run(String phpCode, List<String> testValidations) {
    return _impl.run(phpCode, testValidations);
  }

  void dispose() {
    _impl.dispose();
  }
}
