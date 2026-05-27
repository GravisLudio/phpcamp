/// Modelo de datos para una prueba de validación individual de un reto interactivo
class ChallengeTest {
  final String description;
  final String validateCode;

  ChallengeTest({
    required this.description,
    required this.validateCode,
  });

  factory ChallengeTest.fromJson(Map<String, dynamic> json) {
    return ChallengeTest(
      description: json['description'] ?? '',
      validateCode: json['validateCode'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'description': description,
      'validateCode': validateCode,
    };
  }
}

/// Modelo de datos principal que representa un reto didáctico interactivo
class Challenge {
  final String id;
  final int level;
  final String levelTitle;
  final String title;
  final String localPath;
  final String instructions;
  final String initialCode;
  final List<ChallengeTest> tests;

  Challenge({
    required this.id,
    required this.level,
    required this.levelTitle,
    required this.title,
    required this.localPath,
    required this.instructions,
    required this.initialCode,
    required this.tests,
  });

  factory Challenge.fromJson(Map<String, dynamic> json) {
    var testsList = json['tests'] as List? ?? [];
    List<ChallengeTest> parsedTests = testsList
        .map((t) => ChallengeTest.fromJson(t as Map<String, dynamic>))
        .toList();

    return Challenge(
      id: json['id'] ?? '',
      level: json['level'] ?? 1,
      levelTitle: json['levelTitle'] ?? '',
      title: json['title'] ?? '',
      localPath: json['localPath'] ?? '',
      instructions: json['instructions'] ?? '',
      initialCode: json['initialCode'] ?? '',
      tests: parsedTests,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'level': level,
      'levelTitle': levelTitle,
      'title': title,
      'localPath': localPath,
      'instructions': instructions,
      'initialCode': initialCode,
      'tests': tests.map((t) => t.toJson()).toList(),
    };
  }
}
