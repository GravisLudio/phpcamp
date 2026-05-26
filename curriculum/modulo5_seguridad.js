const MODULO5_SEGURIDAD = [
  {
    id: "m5_xss_protection",
    level: 5,
    levelTitle: "Módulo 5: Seguridad y Sanitización",
    title: "1. Prevención XSS (htmlspecialchars)",
    localPath: "Herd/phpcamp/m5_01_xss.php",
    instructions: `
### Inyección XSS (Cross-Site Scripting)
La inyección XSS ocurre cuando un usuario malintencionado envía código HTML o JavaScript a través de un formulario y tu servidor lo imprime en pantalla sin validar, permitiendo que se ejecute en los navegadores de otras personas. 
Para neutralizarlo, convertimos caracteres especiales a entidades HTML usando \`htmlspecialchars($input, ENT_QUOTES, 'UTF-8')\`:
\`\`\`php
$seguro = htmlspecialchars($entrada, ENT_QUOTES, 'UTF-8');
\`\`\`

#### Instrucciones:
Se te proporciona una variable \`$comentarioSucio\` con código JavaScript malicioso.
1. Sanitiza el string usando \`htmlspecialchars\` de forma segura.
2. Imprime el resultado sanitizado en pantalla.
    `,
    initialCode: `<?php
$comentarioSucio = "<script>alert('hack');</script>";

// Sanitiza e imprime la variable de forma segura
`,
    tests: [
      {
        description: "Debe usar la función 'htmlspecialchars'",
        validate: (code, output) => code.includes("htmlspecialchars")
      },
      {
        description: "La salida no debe contener etiquetas HTML ejecutables, debe mostrar las entidades sanitizadas",
        validate: (code, output) => output.includes("&lt;script&gt;")
      }
    ]
  },
  {
    id: "m5_password_hashing",
    level: 5,
    levelTitle: "Módulo 5: Seguridad y Sanitización",
    title: "2. Criptografía de Contraseñas (password_hash)",
    localPath: "Herd/phpcamp/m5_02_hash.php",
    instructions: `
### Hashing Seguro de Contraseñas
Nunca guardes contraseñas en texto plano en tu base de datos (PostgreSQL/MySQL). En su lugar, genera un hash irreversible de alta seguridad usando la función oficial de PHP \`password_hash($pass, PASSWORD_BCRYPT)\`:
\`\`\`php
$hash = password_hash($password, PASSWORD_BCRYPT);
\`\`\`

#### Instrucciones:
1. Toma la variable \`$passwordReal\` y genera su hash seguro usando \`PASSWORD_BCRYPT\`.
2. Guarda el hash en la variable \`$passwordEncriptado\`.
3. Imprime en pantalla la longitud del hash resultante usando \`strlen($passwordEncriptado)\`. (Debe dar 60 caracteres).
    `,
    initialCode: `<?php
$passwordReal = "mi_secreto_super_seguro_123";

// Genera el hash de la contraseña usando password_hash y BCRYPT, luego imprime su longitud
`,
    tests: [
      {
        description: "Debe usar la función 'password_hash'",
        validate: (code, output) => code.includes("password_hash")
      },
      {
        description: "Debe usar el algoritmo 'PASSWORD_BCRYPT'",
        validate: (code, output) => code.includes("PASSWORD_BCRYPT")
      },
      {
        description: "La salida esperada debe ser '60'",
        validate: (code, output) => output.trim() === "60"
      }
    ]
  },
  {
    id: "m5_password_verify",
    level: 5,
    levelTitle: "Módulo 5: Seguridad y Sanitización",
    title: "3. Verificación de Contraseñas",
    localPath: "Herd/phpcamp/m5_03_verify.php",
    instructions: `
### Verificando Contraseñas (password_verify)
Dado que los hashes criptográficos son irreversibles (no se pueden descifrar), para validar si la contraseña ingresada en el login coincide con el hash de la base de datos, usamos la función segura de PHP \`password_verify($password_ingresado, $hash_db)\`:
\`\`\`php
if (password_verify($password, $hash)) { ... }
\`\`\`

#### Instrucciones:
Se te proporciona el hash seguro de la base de datos en \`$hashDeBaseDatos\`.
1. Verifica si la variable \`$contraseñaIngresada\` coincide con el hash usando \`password_verify\`.
2. Si coincide, imprime \`Acceso Permitido\`. Si no, imprime \`Contraseña Incorrecta\`.
    `,
    initialCode: `<?php
$hashDeBaseDatos = "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // Hash seguro de 'password'
$contraseñaIngresada = "password";

// Valida la contraseña usando password_verify e imprime el estado de acceso
`,
    tests: [
      {
        description: "Debe usar la función 'password_verify'",
        validate: (code, output) => code.includes("password_verify")
      },
      {
        description: "Debe conceder acceso correcto para la clave 'password'",
        validate: (code, output) => {
          let test1 = code.replace(/\$contraseñaIngresada\s*=\s*['"][^'"]+['"]/, "$contraseñaIngresada = 'password'");
          return evalPHP(test1).output.trim() === "Acceso Permitido";
        }
      },
      {
        description: "Debe rechazar acceso para una clave incorrecta '1234'",
        validate: (code, output) => {
          let test2 = code.replace(/\$contraseñaIngresada\s*=\s*['"][^'"]+['"]/, "$contraseñaIngresada = '1234'");
          return evalPHP(test2).output.trim() === "Contraseña Incorrecta";
        }
      }
    ]
  },
  {
    id: "m5_filter_var",
    level: 5,
    levelTitle: "Módulo 5: Seguridad y Sanitización",
    title: "4. Validación de Correo (filter_var)",
    localPath: "Herd/phpcamp/m5_04_validate.php",
    instructions: `
### Validación de Datos usando filter_var
PHP cuenta con una potente función integrada para validar y sanitizar tipos de datos complejos llamada \`filter_var($valor, $filtro)\`:
- Para validar emails: \`FILTER_VALIDATE_EMAIL\`
- Para validar URLs: \`FILTER_VALIDATE_URL\`
\`\`\`php
if (filter_var($email, FILTER_VALIDATE_EMAIL)) { ... }
\`\`\`

#### Instrucciones:
Se te proporciona la variable \`$correoUsuario\`.
1. Valida si es un correo válido usando \`filter_var\` y \`FILTER_VALIDATE_EMAIL\`.
2. Si es válido, imprime \`Correo válido\`. Si no, imprime \`Correo no válido\`.
    `,
    initialCode: `<?php
$correoUsuario = "practicante@empresa.com";

// Valida el correo e imprime el estado
`,
    tests: [
      {
        description: "Debe usar 'filter_var'",
        validate: (code, output) => code.includes("filter_var")
      },
      {
        description: "Debe usar la constante de filtro 'FILTER_VALIDATE_EMAIL'",
        validate: (code, output) => code.includes("FILTER_VALIDATE_EMAIL")
      },
      {
        description: "Imprime 'Correo válido' para practicante@empresa.com",
        validate: (code, output) => {
          let test1 = code.replace(/\$correoUsuario\s*=\s*['"][^'"]+['"]/, "$correoUsuario = 'practicante@empresa.com'");
          return evalPHP(test1).output.trim() === "Correo válido";
        }
      },
      {
        description: "Imprime 'Correo no válido' para correo-incompleto.com",
        validate: (code, output) => {
          let test2 = code.replace(/\$correoUsuario\s*=\s*['"][^'"]+['"]/, "$correoUsuario = 'correo-incompleto.com'");
          return evalPHP(test2).output.trim() === "Correo no válido";
        }
      }
    ]
  }
];
