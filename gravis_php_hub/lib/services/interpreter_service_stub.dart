/// Modelo que representa el resultado de la ejecución de código PHP
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

/// Interfaz abstracta para las implementaciones de plataforma del Sandbox
abstract class PlatformInterpreterService {
  Future<PHPExecutionResult> run(String phpCode, List<String> testValidations);
  void dispose();
}
