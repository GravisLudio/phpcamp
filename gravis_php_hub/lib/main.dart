import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'theme/app_theme.dart';
import 'views/home_screen.dart';

void main() async {
  // Asegura que las vinculaciones de Flutter estén inicializadas antes de cualquier servicio
  WidgetsFlutterBinding.ensureInitialized();
  
  // Inicialización de Supabase con las credenciales de GravisStudyingHUB extraídas de app.js
  try {
    await Supabase.initialize(
      url: 'https://ynxhmhbzwyzvfelnujaa.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueGhtaGJ6d3l6dmZlbG51amFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTQxMjYsImV4cCI6MjA5NTMzMDEyNn0.uEZ8ECKMoOCR0DSTuGLO23nlGdPNxItLKzUeaRXsafY',
    );
  } catch (e) {
    print('[Main] Error al inicializar Supabase: $e');
  }

  runApp(
    // ProviderScope requerido para la inyección de dependencias y estado de Riverpod
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GravisPHPHUB 🐘',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const HomeScreen(),
    );
  }
}
