const MODULO2_VARIABLES = [
  {
    id: "m2_variables_basicas",
    level: 2,
    levelTitle: "Nivel 2: Variables y Datos",
    title: "1. Declaración de Variables",
    localPath: "Herd/phpcamp/m2_01_variables.php",
    instructions: `
### Variables: Guardando Información

Una variable es como una "caja" en la memoria de la computadora donde puedes guardar datos para usarlos más tarde.

En PHP, todas las variables **deben comenzar con el símbolo del dólar (\`$\`)**, seguido de una letra o guion bajo. ¡Nunca pueden empezar por un número!

\`\`\`php
$nombre = "Juan";
$edad = 25;
echo $nombre; // Imprime Juan
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable llamada \`$ciudad\` y asígnale el valor de texto \`"Madrid"\` (recuerda las comillas para textos).
2. Crea una variable llamada \`$poblacion\` y asígnale el número entero \`3000000\` (sin comillas).
3. Usa \`echo\` para imprimir el valor de la variable \`$ciudad\`.
    `,
    initialCode: `<?php
// Declara las variables $ciudad y $poblacion


// Imprime $ciudad

`,
    tests: [
      {
        description: "Debe declarar la variable $ciudad con 'Madrid'",
        validate: (code, output) => code.includes("$ciudad") && code.includes("Madrid")
      },
      {
        description: "Debe declarar la variable $poblacion con 3000000",
        validate: (code, output) => code.includes("$poblacion") && code.includes("3000000")
      },
      {
        description: "Debe imprimir 'Madrid'",
        validate: (code, output) => output.trim() === "Madrid"
      }
    ]
  }
];
