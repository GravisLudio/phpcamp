import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Clase estática que consolida el Sistema de Diseño Visual Premium de GravisPHPHUB
class AppTheme {
  // Paleta de Colores Abisales Tailored
  static const Color background = Color(0xFF070B14);      // Fondo profundo
  static const Color surface = Color(0xFF0F172A);         // Paneles
  static const Color surfaceLight = Color(0xFF1E293B);    // Contenedores secundarios, inputs
  static const Color border = Color(0xFF1E293B);          // Bordes sutiles
  static const Color borderBright = Color(0xFF334155);    // Bordes enfocados
  
  static const Color primary = Color(0xFF3B82F6);         // Azul Eléctrico
  static const Color secondary = Color(0xFF8B5CF6);       // Morado Eléctrico
  static const Color success = Color(0xFF10B981);         // Verde Esmeralda
  static const Color error = Color(0xFFEF4444);           // Rojo Coral
  
  static const Color textBright = Color(0xFFF8FAFC);      // Texto destacado
  static const Color textNormal = Color(0xFFCBD5E1);      // Texto descriptivo
  static const Color textMuted = Color(0xFF64748B);       // Texto atenuado

  // Gradiente Premium de la Marca
  static const LinearGradient brandGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Configuración del ThemeData para la aplicación
  static ThemeData get darkTheme {
    return ThemeData.dark().copyWith(
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        surface: surface,
        error: error,
      ),
      dividerColor: border,
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        titleLarge: GoogleFonts.outfit(
          color: textBright,
          fontSize: 22,
          fontWeight: FontWeight.bold,
        ),
        titleMedium: GoogleFonts.outfit(
          color: textBright,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: GoogleFonts.inter(
          color: textNormal,
          fontSize: 15,
          height: 1.5,
        ),
        bodyMedium: GoogleFonts.inter(
          color: textNormal,
          fontSize: 14,
          height: 1.4,
        ),
        labelLarge: GoogleFonts.inter(
          color: textBright,
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  // Estilo para fuentes monoespaciadas en Consola y Editor
  static TextStyle get codeStyle {
    return GoogleFonts.firaCode(
      color: const Color(0xFF34D399), // Verde brillante terminal por defecto
      fontSize: 13.5,
      fontWeight: FontWeight.w400,
    );
  }
}
