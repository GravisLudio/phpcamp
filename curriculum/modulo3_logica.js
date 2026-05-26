const MODULO3_LOGICA = [
  {
    id: "m3_condicional_if",
    level: 3,
    levelTitle: "Nivel 3: Lógica y Toma de Decisiones",
    title: "1. Condicional IF básico",
    localPath: "Herd/phpcamp/m3_01_if.php",
    instructions: `
### Condicional IF: Tomando Decisiones Simples

Los programas necesitan tomar decisiones basadas en ciertas condiciones. La estructura más simple es el **IF** ("si ocurre esto...").

Si la condición que está dentro de los paréntesis es **verdadera**, se ejecutará el código entre las llaves \`{ }\`. Si es falsa, PHP ignorará ese bloque por completo.

\`\`\`php
$llueve = true;

if ($llueve) {
    echo "Lleva paraguas";
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable llamada \`$edad\` con el valor \`20\`.
2. Escribe una condición \`if\` que verifique si \`$edad\` es mayor o igual a (\`>=\`) 18.
3. Si la condición se cumple, imprime el texto \`"Eres mayor de edad"\` usando \`echo\`.
    `,
    initialCode: `<?php
// Escribe tu condicional if aquí

`,
    tests: [
      {
        description: "Debe declarar la variable $edad con 20",
        validate: (code, output) => code.includes("$edad") && code.includes("20")
      },
      {
        description: "Debe contener una estructura if",
        validate: (code, output) => code.includes("if")
      },
      {
        description: "Debe imprimir 'Eres mayor de edad'",
        validate: (code, output) => output.trim() === "Eres mayor de edad"
      }
    ]
  },
  {
    id: "m3_if_else",
    level: 3,
    levelTitle: "Nivel 3: Lógica y Toma de Decisiones",
    title: "2. Estructura IF / ELSE",
    localPath: "Herd/phpcamp/m3_02_ifelse.php",
    instructions: `
### Estructura IF / ELSE: El camino alternativo

A menudo, si una condición no se cumple (es falsa), queremos que el programa tome un camino alternativo. Para esto usamos la palabra clave \`else\` ("de lo contrario").

\`\`\`php
$edad = 15;

if ($edad >= 18) {
    echo "Mayor de edad";
} else {
    echo "Menor de edad";
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Tienes una variable \`$puntos\` pre-declarada con un valor de \`85\`.
2. Escribe una estructura \`if / else\` que verifique si \`$puntos\` es mayor o igual a \`60\`.
3. Si es verdadero, imprime \`"Aprobado"\`.
4. Si es falso (en el bloque \`else\`), imprime \`"Reprobado"\`.
    `,
    initialCode: `<?php
$puntos = 85;

// Escribe tu estructura if / else debajo

`,
    tests: [
      {
        description: "Debe contener una estructura if y un else",
        validate: (code, output) => code.includes("if") && code.includes("else")
      },
      {
        description: "Debe imprimir 'Aprobado'",
        validate: (code, output) => output.trim() === "Aprobado"
      }
    ]
  },
  {
    id: "m3_elseif",
    level: 3,
    levelTitle: "Nivel 3: Lógica y Toma de Decisiones",
    title: "3. Múltiples condiciones (ELSEIF)",
    localPath: "Herd/phpcamp/m3_03_elseif.php",
    instructions: `
### Estructura ELSEIF: Evaluando Múltiples Caminos

¿Qué pasa si tienes más de dos opciones? Para evaluar múltiples condiciones en orden, usamos \`elseif\`.

PHP revisará cada condición de arriba a abajo. Tan pronto como encuentre una verdadera, ejecutará su código e ignorará el resto.

\`\`\`php
$temperatura = 20;

if ($temperatura > 30) {
    echo "Hace calor";
} elseif ($temperatura >= 15) {
    echo "Clima templado";
} else {
    echo "Hace frío";
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable llamada \`$nota\` con el valor \`7.5\`.
2. Crea una estructura condicional que evalúe:
   - Si \`$nota\` es mayor o igual a \`9\`, imprime \`"Sobresaliente"\`.
   - Si \`$nota\` es mayor o igual a \`7\` (pero menor que 9), imprime \`"Notable"\`.
   - De lo contrario (cualquier nota menor a 7), imprime \`"Aprobado raspado o Reprobado"\`.
    `,
    initialCode: `<?php
// Declara la variable $nota y escribe tu if/elseif/else

`,
    tests: [
      {
        description: "Debe declarar la variable $nota con valor 7.5",
        validate: (code, output) => code.includes("$nota") && code.includes("7.5")
      },
      {
        description: "Debe usar elseif en la lógica",
        validate: (code, output) => code.includes("elseif")
      },
      {
        description: "Debe imprimir 'Notable'",
        validate: (code, output) => output.trim() === "Notable"
      }
    ]
  },
  {
    id: "m3_operadores_logicos",
    level: 3,
    levelTitle: "Nivel 3: Lógica y Toma de Decisiones",
    title: "4. Operadores Lógicos",
    localPath: "Herd/phpcamp/m3_04_logicos.php",
    instructions: `
### Operadores Lógicos: Combinando Condiciones

A veces necesitas validar más de una condición al mismo tiempo. Para esto usamos los operadores lógicos:

- **AND (\`&&\`):** Ambas condiciones deben ser verdaderas.
- **OR (\`||\`):** Al menos una de las dos condiciones debe ser verdadera.
- **NOT (\`!\`):** Invierte el valor booleano (verdadero pasa a falso y viceversa).

\`\`\`php
$tieneEdad = true;
$tieneEntrada = true;

if ($tieneEdad && $tieneEntrada) {
    echo "Puede ingresar";
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara la variable \`$edad\` con el valor \`20\`.
2. Declara la variable \`$tieneEntrada\` con el valor booleano \`true\`.
3. Escribe un condicional que verifique si \`$edad\` es mayor o igual a \`18\` **Y** \`$tieneEntrada\` es verdadero.
4. Si ambas condiciones son verdaderas, imprime \`"Acceso permitido"\`.
5. Si no se cumple alguna, imprime \`"Acceso denegado"\`.
    `,
    initialCode: `<?php
// Declara las variables $edad y $tieneEntrada


// Escribe el condicional usando el operador lógico &&

`,
    tests: [
      {
        description: "Debe declarar la variable $edad con 20 y $tieneEntrada con true",
        validate: (code, output) => code.includes("$edad") && code.includes("20") && code.includes("$tieneEntrada") && code.includes("true")
      },
      {
        description: "Debe usar el operador lógico &&",
        validate: (code, output) => code.includes("&&")
      },
      {
        description: "Debe imprimir 'Acceso permitido'",
        validate: (code, output) => output.trim() === "Acceso permitido"
      }
    ]
  }
];
