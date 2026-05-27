import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../providers/auth_provider.dart';
import '../../providers/course_provider.dart';
import '../../theme/app_theme.dart';

/// Diálogo de Autenticación Premium que emula el Portal de Sesión Seguro en la nube de Supabase.
class AuthDialog extends ConsumerStatefulWidget {
  const AuthDialog({super.key});

  @override
  ConsumerState<AuthDialog> createState() => _AuthDialogState();
}

class _AuthDialogState extends ConsumerState<AuthDialog> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isRegisterMode = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit(AppAuthState authState, AuthNotifier authNotifier) async {
    if (!_formKey.currentState!.validate()) return;

    authNotifier.clearError();
    final email = _emailController.text;
    final password = _passwordController.text;

    bool success = false;
    if (_isRegisterMode) {
      success = await authNotifier.signUp(email, password);
      if (success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('¡Registro exitoso! Ya puedes iniciar sesión de forma segura.'),
            backgroundColor: AppTheme.success,
          ),
        );
        setState(() {
          _isRegisterMode = false;
        });
      }
    } else {
      success = await authNotifier.signIn(email, password);
      if (success && mounted) {
        // Al iniciar sesión de forma exitosa, descargar progreso del usuario de Supabase
        final user = ref.read(authProvider).user;
        if (user != null) {
          await ref.read(courseProvider.notifier).syncProgressFromSupabase(user.id);
        }
        Navigator.of(context).pop(); // Cerrar diálogo
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final authNotifier = ref.read(authProvider.notifier);

    return Dialog(
      backgroundColor: Colors.transparent,
      elevation: 0,
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 400),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppTheme.border),
            boxShadow: const [
              BoxShadow(
                color: Colors.black38,
                blurRadius: 16,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Cabecera Diálogo
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      _isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión',
                      style: GoogleFonts.outfit(
                        color: AppTheme.textBright,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: AppTheme.textMuted, size: 20),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Correo Electrónico
                Text(
                  'Correo Electrónico',
                  style: GoogleFonts.inter(color: AppTheme.textMuted, fontSize: 12),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: GoogleFonts.inter(color: AppTheme.textBright, fontSize: 14),
                  validator: (val) {
                    if (val == null || val.trim().isEmpty) return 'Por favor ingresa un correo';
                    if (!val.contains('@')) return 'Ingresa un formato de correo válido';
                    return null;
                  },
                  decoration: InputDecoration(
                    hintText: 'correo@ejemplo.com',
                    hintStyle: GoogleFonts.inter(color: AppTheme.textMuted.withOpacity(0.5)),
                    filled: true,
                    fillColor: AppTheme.surfaceLight,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Contraseña
                Text(
                  'Contraseña',
                  style: GoogleFonts.inter(color: AppTheme.textMuted, fontSize: 12),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  style: GoogleFonts.inter(color: AppTheme.textBright, fontSize: 14),
                  validator: (val) {
                    if (val == null || val.isEmpty) return 'Por favor ingresa tu contraseña';
                    if (val.length < 6) return 'Debe tener al menos 6 caracteres';
                    return null;
                  },
                  decoration: InputDecoration(
                    hintText: '••••••••',
                    hintStyle: GoogleFonts.inter(color: AppTheme.textMuted.withOpacity(0.5)),
                    filled: true,
                    fillColor: AppTheme.surfaceLight,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Mensaje de Error
                if (authState.errorMessage != null) ...[
                  Text(
                    authState.errorMessage!,
                    style: GoogleFonts.inter(color: AppTheme.error, fontSize: 12),
                  ),
                  const SizedBox(height: 16),
                ],

                // Botón Enviar (Glow Gradiente)
                Container(
                  decoration: BoxDecoration(
                    gradient: authState.isLoading ? null : AppTheme.brandGradient,
                    borderRadius: BorderRadius.circular(8),
                    color: authState.isLoading ? AppTheme.surfaceLight : null,
                  ),
                  child: ElevatedButton(
                    onPressed: authState.isLoading ? null : () => _submit(authState, authNotifier),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      foregroundColor: AppTheme.textBright,
                      shadowColor: Colors.transparent,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: authState.isLoading
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: AppTheme.textBright,
                            ),
                          )
                        : Text(
                            _isRegisterMode ? 'Registrarse' : 'Entrar',
                            style: GoogleFonts.outfit(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                  ),
                ),
                const SizedBox(height: 16),

                // Toggle Link
                GestureDetector(
                  onTap: () {
                    authNotifier.clearError();
                    setState(() {
                      _isRegisterMode = !_isRegisterMode;
                    });
                  },
                  child: Center(
                    child: Text.rich(
                      TextSpan(
                        text: _isRegisterMode ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? ',
                        style: GoogleFonts.inter(color: AppTheme.textNormal, fontSize: 13),
                        children: [
                          TextSpan(
                            text: _isRegisterMode ? 'Iniciar Sesión' : 'Registrarse',
                            style: GoogleFonts.inter(
                              color: AppTheme.primary,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
