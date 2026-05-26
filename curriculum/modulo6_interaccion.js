const MODULO6_INTERACCION = [
  {
    id: "m6_formularios_get",
    level: 6,
    levelTitle: "Nivel 6: Interacción con el Usuario",
    title: "1. Recibiendo datos de la URL",
    localPath: "Herd/phpcamp/m6_01_get.php",
    instructions: `
### Recibiendo Datos: \`$_GET\`

Cuando el usuario navega a tu página o envía un formulario por método GET, los datos se añaden a la URL (ej: \`mipagina.php?nombre=Ana\`).
PHP captura automáticamente esos datos y los guarda en una variable especial llamada \`$_GET\`.

\`\`\`php
// Si la URL es: index.php?producto=Laptop
echo $_GET["producto"]; // Imprimirá "Laptop"
\`\`\`

---

#### 🚀 Instrucciones:
1. Imagina que en la URL nos están pasando \`?usuario=Pedro\`.
2. Para que la prueba funcione localmente o aquí, la plataforma inyectará el valor en \`$_GET["usuario"]\`.
3. Simplemente usa \`echo\` para imprimir el valor de \`$_GET["usuario"]\`.
    `,
    initialCode: `<?php
$_GET["usuario"] = "Pedro"; // (Simulamos la URL para la prueba)

// Imprime el valor de la variable usuario en $_GET

`,
    tests: [
      {
        description: "Debe usar $_GET['usuario']",
        validate: (code, output) => code.includes("$_GET") && code.includes("usuario")
      },
      {
        description: "Debe imprimir 'Pedro'",
        validate: (code, output) => output.trim() === "Pedro"
      }
    ]
  }
];
