const MODULO3_LOGICA = [
  {
    id: "m3_condicional_if",
    level: 3,
    levelTitle: "Nivel 3: Lógica y Toma de Decisiones",
    title: "1. Condicional IF básico",
    localPath: "Herd/phpcamp/m3_01_if.php",
    instructions: `
### Tomando decisiones: IF / ELSE

Los programas necesitan tomar decisiones basadas en condiciones. Para eso usamos la estructura \`if\` (si ocurre esto) y \`else\` (de lo contrario).

\`\`\`php
$edad = 20;

if ($edad >= 18) {
    echo "Eres mayor de edad";
} else {
    echo "Eres menor de edad";
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Tienes una variable \`$puntos\` con un valor de 85.
2. Escribe una condición \`if\` que verifique si \`$puntos\` es mayor o igual a (\`>=\`) 60.
3. Si es verdadero, imprime el texto \`"Aprobado"\`.
4. Si es falso (usando \`else\`), imprime \`"Reprobado"\`.
    `,
    initialCode: `<?php
$puntos = 85;

// Escribe tu condicional if/else aquí

`,
    tests: [
      {
        description: "Debe contener una estructura if / else",
        validate: (code, output) => code.includes("if") && code.includes("else")
      },
      {
        description: "Debe imprimir 'Aprobado'",
        validate: (code, output) => output.trim() === "Aprobado"
      }
    ]
  }
];
