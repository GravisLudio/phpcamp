const MODULO8_DB = [
  {
    id: "m8_pdo_basico",
    level: 8,
    levelTitle: "Nivel 8: Bases de Datos",
    title: "1. Conceptos de PDO",
    localPath: "Herd/phpcamp/m8_01_pdo.php",
    instructions: `
### Conectando a la Base de Datos con PDO

En PHP moderno y profesional, usamos **PDO (PHP Data Objects)** para interactuar con bases de datos como MySQL, PostgreSQL o SQLite de manera uniforme.

Para conectarnos, creamos un nuevo objeto de la clase \`PDO\` pasándole un **DSN (Data Source Name)** junto con las credenciales de la base de datos (usuario y contraseña).

\`\`\`php
// Ejemplo real de conexión a MySQL
$conexion = new PDO("mysql:host=localhost;dbname=mi_base_de_datos", "usuario", "password");
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable llamada \`$conexion\` simulada.
2. Como no podemos levantar un servidor de base de datos real en el navegador de la plataforma, simplemente asígnale el texto \`"Conectado a PDO"\` a esa variable.
3. Imprime el valor de \`$conexion\` usando \`echo\`.
    `,
    initialCode: `<?php
// Simulación de PDO
// Asigna "Conectado a PDO" a la variable $conexion e imprímela

`,
    tests: [
      {
        description: "Debe imprimir 'Conectado a PDO'",
        validate: (code, output) => output.trim() === "Conectado a PDO"
      }
    ]
  },
  {
    id: "m8_consultas_preparadas",
    level: 8,
    levelTitle: "Nivel 8: Bases de Datos",
    title: "2. Consultas Preparadas (Prepared Statements)",
    localPath: "Herd/phpcamp/m8_02_preparadas.php",
    instructions: `
### Seguridad DB: Previniendo Inyección SQL

**¡Cuidado!** Concatenar variables directamente dentro de una consulta SQL (ej. \`"SELECT * FROM usuarios WHERE email = '$email'"\`) es extremadamente peligroso. Un hacker podría escribir código SQL en la entrada de texto y tomar control de toda tu base de datos (inyección SQL).

Para evitar esto, usamos **Consultas Preparadas**. Primero enviamos la consulta con "marcadores" o marcadores de posición (\`:email\` o \`?\`), y luego le pasamos los datos reales por separado al ejecutar la consulta.

\`\`\`php
// Código real usando PDO
$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE email = :email");
$stmt->execute(["email" => $correoUsuario]);
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una variable llamada \`$sql\` con la consulta preparada exacta: \`"SELECT * FROM usuarios WHERE email = :email"\`.
2. Crea un array asociativo llamado \`$datos\` que contenga:
   - La clave \`"email"\` con el valor \`"sofia@ejemplo.com"\`.
3. Imprime el mensaje: \`"Consulta preparada de forma segura"\` usando \`echo\`.
    `,
    initialCode: `<?php
// 1. Define la variable $sql con la consulta preparada


// 2. Crea el array asociativo $datos con el email


// 3. Imprime "Consulta preparada de forma segura"

`,
    tests: [
      {
        description: "Debe declarar la consulta preparada con :email",
        validate: (code, output) => code.includes("SELECT * FROM usuarios WHERE email = :email")
      },
      {
        description: "Debe declarar el array $datos con el email correcto",
        validate: (code, output) => code.includes("$datos") && code.includes("sofia@ejemplo.com")
      },
      {
        description: "Debe imprimir 'Consulta preparada de forma segura'",
        validate: (code, output) => output.trim() === "Consulta preparada de forma segura"
      }
    ]
  }
];
