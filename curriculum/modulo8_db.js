const MODULO8_DB = [
  {
    id: "m8_pdo_basico",
    level: 8,
    levelTitle: "Nivel 8: Bases de Datos",
    title: "1. Conceptos de PDO",
    localPath: "Herd/phpcamp/m8_01_pdo.php",
    instructions: `
### Conectando a la Base de Datos

En PHP profesional moderno, usamos PDO (PHP Data Objects) para conectarnos a bases de datos (sea MySQL, PostgreSQL, o SQLite).

Para conectarnos, necesitamos un DSN (Data Source Name) y las credenciales.
\`\`\`php
// Ejemplo genérico
$conexion = new PDO("mysql:host=localhost;dbname=ventas", "root", "");
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable \`$conexion\` simulada.
2. Como no podemos levantar una DB real en el navegador aquí, simplemente asigna el string \`"Conectado a PDO"\` a esa variable.
3. Imprímela con \`echo\`.
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
  }
];
