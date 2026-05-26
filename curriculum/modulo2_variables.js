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
1. Crea una variable llamada \`$ciudad\` y asígnale el valor de texto \`"Madrid"\`.
2. Crea una variable llamada \`$poblacion\` y asígnale el número entero \`3000000\`.
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
  },
  {
    id: "m2_tipos_datos",
    level: 2,
    levelTitle: "Nivel 2: Variables y Datos",
    title: "2. Tipos de Datos",
    localPath: "Herd/phpcamp/m2_02_tipos.php",
    instructions: `
### Tipos de Datos en PHP

PHP es un lenguaje de **tipado dinámico**, lo que significa que no necesitas decirle explícitamente qué tipo de dato guarda una variable; el lenguaje lo deduce automáticamente.

Los cuatro tipos de datos más comunes son:
1. **String (Cadena de texto):** Texto entre comillas dobles o simples. Ej: \`"Ana"\` o \`'Hola'\`.
2. **Integer (Entero):** Números sin decimales. Ej: \`28\` o \`-5\`.
3. **Float / Double (Decimal):** Números con punto decimal. Ej: \`19.99\`.
4. **Boolean (Booleano):** Solo puede ser \`true\` (verdadero) o \`false\` (falso).

---

#### 🚀 Instrucciones:
1. Declara una variable llamada \`$nombre\` y asígnale un texto (String) con el valor \`"Ana"\`.
2. Declara una variable llamada \`$edad\` y asígnale un entero (Integer) con el valor \`28\`.
3. Declara una variable llamada \`$precio\` y asígnale un decimal (Float) con el valor \`19.99\`.
4. Declara una variable llamada \`$activo\` y asígnale un booleano (Boolean) con el valor \`true\`.
5. Finalmente, usa \`echo\` para imprimir el valor de la variable \`$edad\`.
    `,
    initialCode: `<?php
// Declara las variables $nombre, $edad, $precio y $activo con los valores indicados


// Imprime la variable $edad

`,
    tests: [
      {
        description: "Debe declarar la variable $nombre como 'Ana'",
        validate: (code, output) => code.includes("$nombre") && code.includes("Ana")
      },
      {
        description: "Debe declarar la variable $edad con valor 28",
        validate: (code, output) => code.includes("$edad") && /\$edad\s*=\s*28/.test(code)
      },
      {
        description: "Debe declarar la variable $precio con valor 19.99",
        validate: (code, output) => code.includes("$precio") && code.includes("19.99")
      },
      {
        description: "Debe declarar la variable $activo con valor true",
        validate: (code, output) => code.includes("$activo") && code.includes("true")
      },
      {
        description: "Debe imprimir el número 28",
        validate: (code, output) => output.trim() === "28"
      }
    ]
  },
  {
    id: "m2_concatenacion",
    level: 2,
    levelTitle: "Nivel 2: Variables y Datos",
    title: "3. Concatenación de Textos",
    localPath: "Herd/phpcamp/m2_03_concatenar.php",
    instructions: `
### Concatenación: Uniendo Textos

"Concatenar" es la palabra técnica para unir dos o más cadenas de texto.

En PHP, usamos el **operador punto (\`.\`)** para unir textos o variables.

\`\`\`php
$nombre = "Juan";
echo "Hola " . $nombre; // Imprime "Hola Juan"
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una variable \`$nombre\` con el valor \`"Sofía"\`.
2. Declara una variable \`$curso\` con el valor \`"PHP"\`.
3. Concatenando ambas variables y un texto en medio, usa \`echo\` para imprimir exactamente:
   \`Sofía estudia PHP\`
    `,
    initialCode: `<?php
$nombre = "Sofía";
$curso = "PHP";

// Usa el operador punto (.) para imprimir "Sofía estudia PHP"

`,
    tests: [
      {
        description: "Debe utilizar el operador punto (.) para concatenar",
        validate: (code, output) => code.includes(".")
      },
      {
        description: "Debe imprimir exactamente 'Sofía estudia PHP'",
        validate: (code, output) => output.trim() === "Sofía estudia PHP"
      }
    ]
  },
  {
    id: "m2_operaciones",
    level: 2,
    levelTitle: "Nivel 2: Variables y Datos",
    title: "4. Operaciones Aritméticas",
    localPath: "Herd/phpcamp/m2_04_aritmetica.php",
    instructions: `
### Operaciones Matemáticas

PHP permite realizar cálculos matemáticos directamente usando los operadores estándar:
- Suma: \`+\`
- Resta: \`-\`
- Multiplicación: \`*\`
- División: \`/\`

Puedes hacer operaciones entre números directos o entre variables que guarden números.

\`\`\`php
$a = 10;
$b = 5;
$resultado = $a + $b; // Guarda 15
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una variable llamada \`$productoA\` con el valor \`50\`.
2. Crea una variable llamada \`$productoB\` con el valor \`30\`.
3. Crea una variable llamada \`$total\` que sume el valor de \`$productoA\` y \`$productoB\`.
4. Imprime el valor de la variable \`$total\` usando \`echo\`.
    `,
    initialCode: `<?php
// Declara las variables y calcula la suma de $productoA y $productoB


// Imprime la variable $total

`,
    tests: [
      {
        description: "Debe tener las variables $productoA y $productoB",
        validate: (code, output) => code.includes("$productoA") && code.includes("$productoB")
      },
      {
        description: "Debe calcular la suma en $total",
        validate: (code, output) => code.includes("$total") && code.includes("+")
      },
      {
        description: "Debe imprimir el total (80)",
        validate: (code, output) => output.trim() === "80"
      }
    ]
  },
  {
    id: "m2_constantes",
    level: 2,
    levelTitle: "Nivel 2: Variables y Datos",
    title: "5. Definición de Constantes",
    localPath: "Herd/phpcamp/m2_05_constantes.php",
    instructions: `
### Constantes: Valores Inmutables

A diferencia de las variables, una **constante** es un contenedor de información cuyo valor **nunca** puede cambiar durante la ejecución del programa.

En PHP, las constantes se definen usando la función \`define()\`. Por convención, sus nombres se escriben siempre en **MAYÚSCULAS** y, muy importante: **¡las constantes NO llevan el símbolo de dólar (\`$\`)!**

\`\`\`php
define("PI", 3.1416);
echo PI; // Imprime 3.1416
\`\`\`

---

#### 🚀 Instrucciones:
1. Define una constante llamada \`CURSO\` con el valor de texto \`"PHP"\` usando la función \`define()\`.
2. Imprime el valor de la constante \`CURSO\` usando \`echo\`. Recuerda que las constantes se llaman por su nombre directo, sin poner el signo \`$\`.
    `,
    initialCode: `<?php
// Define la constante CURSO


// Imprime la constante CURSO

`,
    tests: [
      {
        description: "Debe definir la constante CURSO con define()",
        validate: (code, output) => /define\s*\(\s*['"]CURSO['"]\s*,\s*['"]PHP['"]\s*\)/.test(code)
      },
      {
        description: "Debe imprimir 'PHP'",
        validate: (code, output) => output.trim() === "PHP"
      }
    ]
  }
];
