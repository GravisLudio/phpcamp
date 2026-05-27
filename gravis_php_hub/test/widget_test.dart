import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gravis_php_hub/models/challenge.dart';
import 'package:gravis_php_hub/theme/app_theme.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  
  group('Pruebas de Modelos del Currículo', () {
    test('Debería deserializar y serializar correctamente un ChallengeTest', () {
      final json = {
        'description': 'Imprime "Hola Mundo" usando echo',
        'validateCode': 'hasEcho("Hola Mundo")',
      };

      final challengeTest = ChallengeTest.fromJson(json);

      expect(challengeTest.description, 'Imprime "Hola Mundo" usando echo');
      expect(challengeTest.validateCode, 'hasEcho("Hola Mundo")');

      final serialized = challengeTest.toJson();
      expect(serialized['description'], 'Imprime "Hola Mundo" usando echo');
      expect(serialized['validateCode'], 'hasEcho("Hola Mundo")');
    });

    test('Debería deserializar y serializar correctamente un Challenge con pruebas anidadas', () {
      final json = {
        'id': 'level1_challenge1',
        'level': 1,
        'levelTitle': 'Introducción',
        'title': 'Hola Mundo',
        'localPath': 'modulo1_primeros_pasos.js',
        'instructions': 'Escribe echo "Hola Mundo";',
        'initialCode': '<?php\n',
        'tests': [
          {
            'description': 'Imprime "Hola Mundo"',
            'validateCode': 'hasEcho("Hola Mundo")',
          }
        ]
      };

      final challenge = Challenge.fromJson(json);

      expect(challenge.id, 'level1_challenge1');
      expect(challenge.level, 1);
      expect(challenge.levelTitle, 'Introducción');
      expect(challenge.title, 'Hola Mundo');
      expect(challenge.localPath, 'modulo1_primeros_pasos.js');
      expect(challenge.instructions, 'Escribe echo "Hola Mundo";');
      expect(challenge.initialCode, '<?php\n');
      expect(challenge.tests.length, 1);
      expect(challenge.tests.first.description, 'Imprime "Hola Mundo"');

      final serialized = challenge.toJson();
      expect(serialized['id'], 'level1_challenge1');
      expect(serialized['level'], 1);
      expect((serialized['tests'] as List).length, 1);
    });
  });

  group('Pruebas de Configuración del Tema Visual', () {
    test('Debería configurar correctamente el tema oscuro premium', () {
      final theme = AppTheme.darkTheme;

      expect(theme.brightness, Brightness.dark);
      expect(theme.scaffoldBackgroundColor, const Color(0xFF070B14)); // Deep background
      expect(theme.colorScheme.primary, const Color(0xFF3B82F6)); // Blue
      expect(theme.colorScheme.secondary, const Color(0xFF8B5CF6)); // Purple
      expect(theme.colorScheme.surface, const Color(0xFF0F172A)); // Surface
    });
  });
}
