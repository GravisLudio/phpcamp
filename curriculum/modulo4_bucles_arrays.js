const MODULO4_BUCLES_ARRAYS = [
  {
    id: "m4_arrays_basicos",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "1. Creando Listas (Arrays)",
    localPath: "Herd/phpcamp/m4_01_arrays.php",
    instructions: `
### Arrays: Listas de elementos

A menudo necesitas guardar una lista de cosas, no solo un dato a la vez. En PHP usamos Arrays para eso.
Los arrays indexados empiezan a contar desde la posición 0.

\`\`\`php
$frutas = ["Manzana", "Pera", "Plátano"];
echo $frutas[0]; // Imprime "Manzana"
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea un array llamado \`$colores\` que contenga tres textos: \`"Rojo"\`, \`"Verde"\` y \`"Azul"\`.
2. Imprime el **segundo** elemento de la lista (recuerda que el índice del segundo elemento es \`1\`).
    `,
    initialCode: `<?php
// Crea el array $colores


// Imprime el segundo color

`,
    tests: [
      {
        description: "Debe declarar la variable $colores como array",
        validate: (code, output) => code.includes("$colores") && (code.includes("[") || code.includes("array("))
      },
      {
        description: "Debe imprimir 'Verde'",
        validate: (code, output) => output.trim() === "Verde"
      }
    ]
  }
];
