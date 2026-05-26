const MODULO1_PRIMEROS_PASOS = [
  {
    id: "m1_hola_mundo",
    level: 1,
    levelTitle: "Nivel 1: Primeros Pasos y Sintaxis",
    title: "1. Hola Mundo en PHP",
    localPath: "Herd/phpcamp/m1_01_hola.php",
    instructions: `
### Tu Primer "Hola Mundo" en PHP

¡Bienvenido a PHPCamp! Vamos a empezar por lo más fundamental: mostrar texto en la pantalla.

#### ¿Cómo funciona PHP?
PHP es un lenguaje de servidor. Cuando abres un archivo \`.php\`, el servidor busca código dentro de las etiquetas \`<?php\` y \`?>\`. Si omites el cierre \`?>\` al final del archivo (lo cual es recomendado en archivos puros de PHP), el servidor asume que todo el archivo es código PHP.

#### La instrucción "echo"
Para que PHP envíe texto al navegador (a la pantalla), usamos la instrucción \`echo\` seguida de un espacio y el texto entre comillas.

#### ¡No olvides el punto y coma!
La regla de oro de PHP es que **todas** las instrucciones deben terminar con un punto y coma (\`;\`). Es la forma que tiene PHP de saber que la instrucción ha terminado.

\`\`\`php
echo "¡Hola Mundo!";
\`\`\`

---

#### 🚀 Instrucciones:
1. Usa la instrucción \`echo\` para imprimir el texto exacto: \`Hola Mundo\`
2. Asegúrate de poner el punto y coma al final de la línea.
    `,
    initialCode: `<?php
// Imprime Hola Mundo usando echo
`,
    tests: [
      {
        description: "Debe usar la instrucción 'echo'",
        validate: (code, output) => /echo\s+/.test(code)
      },
      {
        description: "Debe imprimir 'Hola Mundo'",
        validate: (code, output) => output.trim() === "Hola Mundo"
      }
    ]
  }
];
