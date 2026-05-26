const MODULO5_FUNCIONES = [
  {
    id: "m5_funciones_basicas",
    level: 5,
    levelTitle: "Nivel 5: Modularidad y Funciones",
    title: "1. Creando tu primera Función",
    localPath: "Herd/phpcamp/m5_01_funciones.php",
    instructions: `
### Funciones: Código Reutilizable

Para no repetir el mismo código muchas veces, podemos agruparlo en un bloque lógico llamado **función** y llamarlo cuando lo necesitemos.

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
  },
  {
    id: "m5_funciones_parametros",
    level: 5,
    levelTitle: "Nivel 5: Modularidad y Funciones",
    title: "2. Funciones con Parámetros",
    localPath: "Herd/phpcamp/m5_02_parametros.php",
    instructions: `
### Parámetros: Personalizando la función

Las funciones se vuelven realmente útiles cuando les pasamos información para que actúen sobre ella. Esta información se recibe a través de **parámetros** (variables locales que solo existen dentro de la función).

\`\`\`php
function saludarUsuario($nombre) {
    echo "Hola " . $nombre;
}

saludarUsuario("Sofía"); // Imprime "Hola Sofía"
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una función llamada \`saludarUsuario\` que reciba un parámetro llamado \`$nombre\`.
2. Dentro de la función, usa \`echo\` para imprimir el texto \`"Hola "\` concatenado con la variable \`$nombre\`. (Ej: \`Hola Pedro\`).
3. Llama a la función al final, pasándole el texto \`"Pedro"\` como argumento.
    `,
    initialCode: `<?php
// Crea la función saludarUsuario


// Llama a la función con el valor "Pedro"

`,
    tests: [
      {
        description: "Debe definir la función saludarUsuario con un parámetro",
        validate: (code, output) => /function\s+saludarUsuario\s*\(\s*\$[a-zA-Z0-9_]+\s*\)/.test(code)
      },
      {
        description: "Debe imprimir 'Hola Pedro'",
        validate: (code, output) => output.trim() === "Hola Pedro"
      }
    ]
  },
  {
    id: "m5_funciones_retorno",
    level: 5,
    levelTitle: "Nivel 5: Modularidad y Funciones",
    title: "3. Retorno de Valores (RETURN)",
    localPath: "Herd/phpcamp/m5_03_retorno.php",
    instructions: `
### La sentencia RETURN: Devolviendo resultados

Muchas funciones no muestran texto directamente en pantalla, sino que realizan un cálculo y **devuelven** el resultado para que el resto del programa pueda usarlo. Para esto se usa la instrucción \`return\`.

*Nota: Una vez que se ejecuta un \`return\`, la función termina inmediatamente.*

\`\`\`php
function sumar($a, $b) {
    return $a + $b;
}

$resultado = sumar(5, 3); // $resultado ahora vale 8
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una función llamada \`duplicar\` que tome un parámetro llamado \`$numero\`.
2. Dentro de la función, usa \`return\` para devolver el doble de \`$numero\` (\`$numero * 2\`). ¡No uses \`echo\` dentro de la función!
3. Fuera de la función, declara una variable llamada \`$resultado\` y asígnale el valor devuelto al llamar a \`duplicar(5)\`.
4. Imprime la variable \`$resultado\` usando \`echo\`.
    `,
    initialCode: `<?php
// Crea la función duplicar


// Llama a la función con el valor 5, guárdalo e imprímelo

`,
    tests: [
      {
        description: "Debe usar return dentro de la función duplicar",
        validate: (code, output) => code.includes("return") && code.includes("duplicar")
      },
      {
        description: "Debe imprimir el resultado (10)",
        validate: (code, output) => output.trim() === "10"
      }
    ]
  },
  {
    id: "m5_funciones_tipado",
    level: 5,
    levelTitle: "Nivel 5: Modularidad y Funciones",
    title: "4. Tipado estricto (Type Hinting)",
    localPath: "Herd/phpcamp/m5_04_tipado.php",
    instructions: `
### Tipado de Parámetros y Retorno en PHP 8

En PHP moderno, es una excelente práctica declarar explícitamente qué tipo de datos espera recibir una función y qué tipo de datos va a devolver. Esto hace que el código sea mucho más seguro y robusto.

\`\`\`php
function multiplicar(int $a, int $b): int {
    return $a * $b;
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara una función llamada \`sumarEnteros\` que reciba dos parámetros con tipado de entero: \`int $a\` e \`int $b\`.
2. Declara que la función debe retornar un valor entero agregando \`: int\` justo antes de la llave de apertura.
3. Dentro, devuelve la suma de ambos números.
4. Llama a la función pasando los números \`4\` y \`6\`, e imprime el resultado usando \`echo\`.
    `,
    initialCode: `<?php
// Declara la función sumarEnteros con tipado de parámetros y retorno


// Llama e imprime el resultado de sumarEnteros(4, 6)

`,
    tests: [
      {
        description: "Debe definir sumarEnteros con parámetros de tipo int",
        validate: (code, output) => /int\s+\$a/.test(code) && /int\s+\$b/.test(code)
      },
      {
        description: "Debe declarar el tipo de retorno ': int'",
        validate: (code, output) => /:\s*int/.test(code)
      },
      {
        description: "Debe imprimir el resultado correcto (10)",
        validate: (code, output) => output.trim() === "10"
      }
    ]
  }
];
