const MODULO5_FUNCIONES = [
  {
    id: "m5_funciones_basicas",
    level: 5,
    levelTitle: "Nivel 5: Modularidad y Funciones",
    title: "1. Creando tu primera Función",
    localPath: "Herd/phpcamp/m5_01_funciones.php",
    instructions: `
### Funciones: Código Reutilizable

Para no repetir el mismo código muchas veces, podemos agruparlo en un bloque llamado "función" y llamarlo cuando queramos.

\`\`\`php
function saludar() {
    echo "¡Hola!";
}

saludar(); // Llama a la función y ejecuta su interior
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una función llamada \`despedirse\`.
2. Dentro de la función, usa \`echo\` para imprimir el texto \`"Adiós"\`.
3. Llama a la función al final del archivo para que se ejecute.
    `,
    initialCode: `<?php
// Crea la función despedirse


// Llama a la función

`,
    tests: [
      {
        description: "Debe definir la función 'despedirse'",
        validate: (code, output) => code.includes("function despedirse") || code.includes("function despedirse()")
      },
      {
        description: "Debe llamar a la función e imprimir 'Adiós'",
        validate: (code, output) => output.trim() === "Adiós"
      }
    ]
  }
];
