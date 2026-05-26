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
2. Asegúrate de poner el punto y coma (\`;\`) al final de la línea.
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
  },
  {
    id: "m1_comentarios",
    level: 1,
    levelTitle: "Nivel 1: Primeros Pasos y Sintaxis",
    title: "2. Comentarios en el Código",
    localPath: "Herd/phpcamp/m1_02_comentarios.php",
    instructions: `
### Comentarios: Documentando tu código

Los comentarios son anotaciones que el programador escribe en el archivo para explicar qué hace el código. PHP ignora completamente estas líneas al ejecutar el programa.

Existen dos tipos de comentarios en PHP:

1. **Comentarios de una sola línea:** Se crean usando una doble barra inclinada \`//\` o el símbolo de almohadilla \`#\`.
2. **Comentarios multilínea:** Empiezan con \`/*\` y terminan con \`*/\`. Son ideales para explicaciones más extensas.

\`\`\`php
// Este es un comentario de una sola línea
# Este también lo es

/*
  Este es un comentario
  de múltiples líneas
*/
\`\`\`

---

#### 🚀 Instrucciones:
1. Agrega un comentario de una línea usando \`//\` con cualquier texto que quieras.
2. Agrega un comentario de bloque o multilínea usando \`/* ... */\`.
3. Al final, escribe un \`echo\` para imprimir el texto \`Comentarios listos\`.
    `,
    initialCode: `<?php
// Escribe tus comentarios debajo y luego tu instrucción echo

`,
    tests: [
      {
        description: "Debe incluir un comentario de una sola línea (// o #)",
        validate: (code, output) => /(\/\/|#).+/.test(code)
      },
      {
        description: "Debe incluir un comentario de bloque (/* */)",
        validate: (code, output) => /\/\*[\s\S]*?\*\//.test(code)
      },
      {
        description: "Debe imprimir 'Comentarios listos'",
        validate: (code, output) => output.trim() === "Comentarios listos"
      }
    ]
  },
  {
    id: "m1_php_html",
    level: 1,
    levelTitle: "Nivel 1: Primeros Pasos y Sintaxis",
    title: "3. Mezclando PHP y HTML",
    localPath: "Herd/phpcamp/m1_03_php_html.php",
    instructions: `
### PHP y HTML: La pareja perfecta

Una de las grandes fortalezas de PHP es su capacidad para incrustar etiquetas HTML dentro de los archivos y generarlas de forma dinámica.

Cuando usas \`echo\` con etiquetas HTML, el navegador las interpreta y renderiza correctamente en lugar de mostrarlas como texto plano.

\`\`\`php
echo "<h1>Bienvenido a mi web</h1>";
\`\`\`

---

#### 🚀 Instrucciones:
1. Usa \`echo\` para imprimir un título utilizando la etiqueta HTML \`<h1>\` que contenga el texto \`PHPCamp\`. (Ej: \`<h1>PHPCamp</h1>\`).
2. En una nueva línea, usa \`echo\` para imprimir un párrafo con la etiqueta HTML \`<p>\` que contenga el texto \`Aprendiendo PHP interactivo.\`. (Ej: \`<p>Aprendiendo PHP interactivo.</p>\`).
    `,
    initialCode: `<?php
// Imprime el encabezado h1 y el párrafo p

`,
    tests: [
      {
        description: "Debe imprimir el título h1 con 'PHPCamp'",
        validate: (code, output) => /<h1>\s*PHPCamp\s*<\/h1>/i.test(output)
      },
      {
        description: "Debe imprimir el párrafo p con 'Aprendiendo PHP interactivo.'",
        validate: (code, output) => /<p>\s*Aprendiendo PHP interactivo\.\s*<\/p>/i.test(output)
      }
    ]
  }
];
