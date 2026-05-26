const MODULO1_CHALLENGES = [
  {
    id: "m1_strict_types",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "1. Tipado Estricto (strict_types)",
    localPath: "Herd/phpcamp/m1_01_strict.php",
    instructions: `
### 🐘 Tipado Estricto (strict_types) y Tu Primera Función

¡Bienvenido a tu primer reto de PHPCamp! Aquí aprenderás los fundamentos para escribir código seguro y profesional desde el primer momento.

#### 1. ¿Qué es el Tipado Estricto?
Por defecto, PHP es muy flexible y trata de "adivinar" los tipos de datos. Si una función espera un número entero (ej. \`5\`) pero le pasas el texto \`"5"\`, PHP lo convertirá automáticamente de forma silenciosa. Esto puede provocar errores graves.
Para evitarlo, los desarrolladores profesionales activamos el **tipado estricto** en la primera línea de cada archivo escribiendo esto exactamente:
\`\`\`php
declare(strict_types=1);
\`\`\`
*(Esto obliga a PHP a exigir que los tipos de datos coincidan exactamente, arrojando un error si se pasa un dato incorrecto).*

#### 2. ¿Cómo se define una Función en PHP?
Una función es un bloque de código reutilizable al que le podemos enviar datos (parámetros) para que realice una tarea y nos devuelva un resultado. Se declara usando la palabra clave \`function\` y abriendo llaves:
\`\`\`php
function saludar($nombre) {
    return "Hola " . $nombre;
}
\`\`\`

#### 3. Tipado de Parámetros y Retorno (PHP 8+)
Para indicarle a PHP de qué tipo deben ser los parámetros que recibe la función y qué tipo de dato va a devolver (retornar), usamos la siguiente sintaxis:
- **Tipar parámetros:** Escribimos el tipo (como \`int\` para enteros, \`float\` para decimales, \`string\` para texto) antes del nombre de la variable.
- **Tipar el retorno:** Escribimos dos puntos (\`:\`) y el tipo de dato devuelto justo después del paréntesis de los parámetros, antes de abrir las llaves.

**Ejemplo de una función que suma dos enteros y devuelve un entero:**
\`\`\`php
function sumar(int $numero1, int $numero2): int {
    return $numero1 + $numero2;
}
\`\`\`

---

#### 🚀 Instrucciones para Resolver este Reto:
1. Declara la directiva de tipado estricto en la primera línea de tu script (justo debajo de \`<?php\`).
2. Define una función llamada \`multiplicar\`.
3. Haz que la función acepte dos parámetros de tipo flotante o decimal: \`float $a\` y \`float $b\`.
4. Declara que la función debe retornar un valor flotante escribiendo \`: float\` antes de abrir la llave \`{\`.
5. Dentro de la función, multiplica los dos parámetros usando el operador asterisco (\`*\`) y devuélvelo usando la palabra clave \`return\`.

> [!TIP]
> **💡 ¿Por qué mi página local \`m1_01_strict.php\` se ve en blanco en el navegador?**
> ¡Excelente observación! En PHP, definir una función (\`function multiplicar(...)\`) simplemente le enseña al servidor cómo hacer el cálculo, pero **no produce ningún resultado visible en pantalla por sí sola**.
> Si quieres ver el resultado impreso en tu navegador local (\`http://phpcamp.test/m1_01_strict.php\`), debes **llamar a la función usando \`echo\`** al final de tu archivo. Por ejemplo:
> \`\`\`php
> echo multiplicar(5.5, 4.0); // Esto imprimirá 22 en la pantalla
> \`\`\`
> *(Este primer reto es el único que solo te pide definir la función para validar la estructura; en los siguientes retos del curso se te pedirá explícitamente usar \`echo\` o imprimir el resultado para que veas el resultado directamente en pantalla).*
    `,
    initialCode: `<?php
// 1. Activa strict_types aquí


// 2. Define la función multiplicar con tipos flotantes y retorno flotante
`,
    tests: [
      {
        description: "Debe declarar strict_types=1 en la primera línea",
        validate: (code, output) => /declare\s*\(\s*strict_types\s*=\s*1\s*\);/.test(code)
      },
      {
        description: "La función debe tener tipado float en los parámetros y retorno",
        validate: (code, output) => /function\s+multiplicar\s*\(\s*float\s+\$[a-zA-Z0-9_]+\s*,\s*float\s+\$[a-zA-Z0-9_]+\)/.test(code)
      },
      {
        description: "Debe multiplicar correctamente flotantes (ej. 2.5 * 4.0 = 10.0)",
        validate: (code, output) => {
          let testCode = code + "\n echo multiplicar(2.5, 4.0);";
          return evalPHP(testCode).output.includes("10");
        }
      }
    ]
  },
  {
    id: "m1_coalescencia",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "2. Operador Coalescente Nulo Avanzado (??)",
    localPath: "Herd/phpcamp/m1_02_null.php",
    instructions: `
### Coalescencia Nula e Hilos de Valores (??)
El operador \`??\` se puede encadenar para buscar el primer valor que exista y no sea nulo de izquierda a derecha. Es extremadamente útil para cargar configuraciones con múltiples niveles de respaldo:
\`\`\`php
$tema = $usuario['tema'] ?? $config['tema_default'] ?? 'tema-oscuro';
\`\`\`

#### Instrucciones:
Se te proporcionan dos arrays asociativos: \`$request\` y \`$session\`.
1. Asigna a la variable \`$colorFinal\` el valor de \`$request['color']\` si existe y no es nulo.
2. Si no existe, intenta usar el valor de \`$session['color_preferido']\`.
3. Si tampoco existe, usa el color por defecto \`#000000\`.
4. Imprime el valor de \`$colorFinal\`.
    `,
    initialCode: `<?php
$request = ['usuario' => 'sofia']; // No contiene 'color'
$session = ['color_preferido' => '#ff00ff'];

// Asigna a $colorFinal usando coalescencia nula encadenada y luego imprímelo
`,
    tests: [
      {
        description: "Debe usar el operador coalescente '??' encadenado",
        validate: (code, output) => code.split("??").length >= 3
      },
      {
        description: "Debe evaluar correctamente a '#ff00ff' en el caso proporcionado",
        validate: (code, output) => output.trim() === "#ff00ff"
      },
      {
        description: "Debe caer al valor por defecto '#000000' si tampoco hay sesión",
        validate: (code, output) => {
          let testCode = code.replace(/\$session\s*=.*?;/, "$session = [];");
          return evalPHP(testCode).output.trim() === "#000000";
        }
      }
    ]
  },
  {
    id: "m1_spread_operator",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "3. Operador de Desempaquetado (Spread ...)",
    localPath: "Herd/phpcamp/m1_03_spread.php",
    instructions: `
### Desempaquetado y Variádicas (...)
El operador de tres puntos (\`...\`) tiene dos usos cruciales:
- **Funciones Variádicas**: Permite que una función acepte un número ilimitado de argumentos como un array.
- **Desempaquetado**: Descompone un array en argumentos individuales o une arrays eficientemente.
\`\`\`php
function sumarTodos(...$numeros) {
    return array_sum($numeros);
}
\`\`\`

#### Instrucciones:
1. Crea una función variádica llamada \`unirPalabras\` que acepte un número dinámico de strings como argumentos usando el operador \`...\`.
2. Dentro de la función, une todas las palabras usando la función integrada de PHP \`implode(" ", $palabras)\` y **retorna** el string resultante.
3. Llama a la función con las palabras \`"Aprendiendo" \` , \` "PHP" \` , \` "Avanzado" \` e imprime el resultado.
    `,
    initialCode: `<?php
// 1. Define la función variádica unirPalabras abajo


// 2. Llama a la función e imprime su resultado
`,
    tests: [
      {
        description: "Debe definir la función con el parámetro variádico '...$palabras' o similar",
        validate: (code, output) => /function\s+unirPalabras\s*\(\s*\.\.\.\$[a-zA-Z0-9_]+\s*\)/.test(code)
      },
      {
        description: "Debe retornar 'Aprendiendo PHP Avanzado'",
        validate: (code, output) => output.trim() === "Aprendiendo PHP Avanzado"
      }
    ]
  },
  {
    id: "m1_named_arguments",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "4. Argumentos Nombrados (PHP 8)",
    localPath: "Herd/phpcamp/m1_04_named.php",
    instructions: `
### Argumentos Nombrados
En PHP 8, puedes pasar argumentos a una función especificando el nombre del parámetro. Esto hace que el orden de los argumentos no importe y permite omitir parámetros opcionales con valores por defecto de manera limpia:
\`\`\`php
configurarConexion(host: 'localhost', db: 'ventas');
\`\`\`

#### Instrucciones:
1. Se te proporciona la función \`crearBoton\`.
2. Llama a la función usando **argumentos nombrados** para pasar el parámetro \`$texto\` con el valor \`Enviar\` y el parámetro \`$redondeado\` con el valor \`true\`. Deja el parámetro \`$color\` con su valor por defecto (no lo pases).
3. Imprime la salida de la función.
    `,
    initialCode: `<?php
function crearBoton($texto, $color = 'azul', $redondeado = false) {
    return "Botón $texto de color $color" . ($redondeado ? " redondeado" : "");
}

// Llama a crearBoton usando argumentos nombrados abajo
`,
    tests: [
      {
        description: "Debe llamar a la función usando la sintaxis de dos puntos 'texto:'",
        validate: (code, output) => code.includes("texto:")
      },
      {
        description: "Debe usar 'redondeado:' y omitir el parámetro color",
        validate: (code, output) => code.includes("redondeado:") && !code.includes("color:")
      },
      {
        description: "La salida esperada debe ser 'Botón Enviar de color azul redondeado'",
        validate: (code, output) => output.trim() === "Botón Enviar de color azul redondeado"
      }
    ]
  },
  {
    id: "m1_match_avanzado",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "5. Lógica de Rangos en Match",
    localPath: "Herd/phpcamp/m1_05_match.php",
    instructions: `
### Evaluaciones Complejas en Match
La expresión \`match\` de PHP 8 no solo evalúa valores directos. Si le pasamos \`true\` como valor principal, podemos evaluar expresiones de comparación condicionales en cada línea:
\`\`\`php
$resultado = match (true) {
    $edad >= 18 => 'Adulto',
    default => 'Menor'
};
\`\`\`

#### Instrucciones:
1. Usa la estructura \`match(true)\` para evaluar una variable \`$puntaje\`.
   - Si \`$puntaje >= 90\`, retorna \`Excelente\`.
   - Si \`$puntaje >= 70\` y es menor a 90, retorna \`Aprobado\`.
   - Si es menor a 70, retorna \`Reprobado\`.
2. Guarda el resultado e imprímelo en pantalla.
    `,
    initialCode: `<?php
$puntaje = 85;

// Escribe tu match(true) aquí abajo
`,
    tests: [
      {
        description: "Debe usar 'match (true)' o 'match(true)'",
        validate: (code, output) => /match\s*\(\s*true\s*\)/.test(code)
      },
      {
        description: "Debe retornar 'Aprobado' para un puntaje de 85",
        validate: (code, output) => {
          let test1 = code.replace(/\$puntaje\s*=\s*\d+/, "$puntaje = 85");
          return evalPHP(test1).output.trim() === "Aprobado";
        }
      },
      {
        description: "Debe retornar 'Excelente' para un puntaje de 95",
        validate: (code, output) => {
          let test2 = code.replace(/\$puntaje\s*=\s*\d+/, "$puntaje = 95");
          return evalPHP(test2).output.trim() === "Excelente";
        }
      },
      {
        description: "Debe retornar 'Reprobado' para un puntaje de 50",
        validate: (code, output) => {
          let test3 = code.replace(/\$puntaje\s*=\s*\d+/, "$puntaje = 50");
          return evalPHP(test3).output.trim() === "Reprobado";
        }
      }
    ]
  },
  {
    id: "m1_variables_referencia",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "6. Referencias en Variables (&)",
    localPath: "Herd/phpcamp/m1_06_references.php",
    instructions: `
### Referencias en PHP (&)
Por defecto, las asignaciones en PHP copian los valores. Usando el símbolo ampersand (\`&\`) creamos un **alias o referencia**, lo que significa que ambas variables apuntan al mismo espacio de memoria:
\`\`\`php
$a = 10;
$b = &$a;
$b = 20; // ¡$a ahora también vale 20!
\`\`\`

#### Instrucciones:
1. Se te proporciona la variable \`$original\`.
2. Declara una variable llamada \`$copia\` y haz que sea una referencia a \`$original\` usando \`&\`.
3. Suma \`50\` al valor de \`$copia\` (ej: \`$copia += 50;\`).
4. Imprime en pantalla el valor de \`$original\`. (Debe mostrar el valor modificado debido a la referencia).
    `,
    initialCode: `<?php
$original = 100;

// Crea la variable $copia como referencia a $original y modifícala
`,
    tests: [
      {
        description: "Debe usar el operador de referencia '&'",
        validate: (code, output) => code.includes("=&") || code.includes("= &")
      },
      {
        description: "La salida esperada debe ser '150'",
        validate: (code, output) => output.trim() === "150"
      }
    ]
  },
  {
    id: "m1_constantes",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "7. Constantes Avanzadas (define vs const)",
    localPath: "Herd/phpcamp/m1_07_constants.php",
    instructions: `
### Constantes en PHP: define() vs const
- \`define()\` funciona en tiempo de ejecución (se puede usar dentro de condicionales o bucles).
- \`const\` funciona en tiempo de compilación (más rápida, obligatoria dentro de clases, no se puede usar dentro de estructuras de control).
\`\`\`php
const ESTADO = 'activo';
define('APP_NAME', 'PHPCamp');
\`\`\`

#### Instrucciones:
1. Define una constante llamada \`API_KEY\` con el valor \`secure_token_123\` usando la función \`define()\`.
2. Define una constante llamada \`VERSION\` con el valor \`2.5\` usando la palabra reservada \`const\`.
3. Imprime en pantalla la concatenación de ambas constantes separadas por un guion medio (\`-\`).
    `,
    initialCode: `<?php
// Define las dos constantes e imprime su unión concatenada
`,
    tests: [
      {
        description: "Debe definir API_KEY usando la función 'define'",
        validate: (code, output) => code.includes("define") && code.includes("API_KEY")
      },
      {
        description: "Debe definir VERSION usando la palabra clave 'const'",
        validate: (code, output) => code.includes("const") && code.includes("VERSION")
      },
      {
        description: "La salida debe ser exactamente 'secure_token_123-2.5'",
        validate: (code, output) => output.trim() === "secure_token_123-2.5"
      }
    ]
  },
  {
    id: "m1_variables_variables",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "8. Variables Dinámicas (Variables Variables)",
    localPath: "Herd/phpcamp/m1_08_dynamic.php",
    instructions: `
### Variables Variables ($$)
PHP permite crear nombres de variables dinámicamente usando el valor de otra variable:
\`\`\`php
$nombre = 'mensaje';
$$nombre = 'Hola'; // ¡Esto crea la variable $mensaje!
echo $mensaje; // Imprime 'Hola'
\`\`\`

#### Instrucciones:
1. Declara una variable llamada \`$clave\` con el valor \`base_de_datos\`.
2. Usa la sintaxis de variable dinámica para crear la variable resultante con el valor \`PostgreSQL\`.
3. Imprime la variable dinámica resultante utilizando su nombre directo (\`$base_de_datos\`).
    `,
    initialCode: `<?php
// Declara la variable $clave y crea dinámicamente la variable resultante
`,
    tests: [
      {
        description: "Debe usar el operador de variable dinámica '$$'",
        validate: (code, output) => code.includes("$$")
      },
      {
        description: "Debe imprimir 'PostgreSQL' llamando a $base_de_datos",
        validate: (code, output) => output.trim() === "PostgreSQL" && code.includes("$base_de_datos")
      }
    ]
  },
  {
    id: "m1_nullsafe",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "9. Operador Nullsafe (?->) de PHP 8",
    localPath: "Herd/phpcamp/m1_09_nullsafe.php",
    instructions: `
### El Operador Nullsafe (?->)
En desarrollo orientado a objetos y Laravel, es común encadenar llamadas a métodos o propiedades. Si algún objeto intermedio es nulo, la aplicación arrojará un error fatal. El operador \`?->\` soluciona esto cancelando la cadena y devolviendo \`null\` de inmediato si detecta un valor nulo:
\`\`\`php
$ciudad = $usuario?->getDireccion()?->ciudad;
\`\`\`

#### Instrucciones:
Se te proporciona una variable \`$perfil\` que puede ser un objeto o \`null\`.
1. Usa el operador nullsafe \`?->\` para intentar acceder al método \`getCodigo()\` de la variable \`$perfil\`.
2. Guarda el resultado en la variable \`$codigo\`.
3. Utiliza coalescencia nula (\`??\`) para que si \`$codigo\` es nulo, se le asigne por defecto el valor \`invitado\`.
4. Imprime el resultado.
    `,
    initialCode: `<?php
$perfil = null; // Puede cambiar a objeto en producción

// Obtén el código de forma segura usando ?-> y ??, luego imprímelo
`,
    tests: [
      {
        description: "Debe usar el operador nullsafe '?->'",
        validate: (code, output) => code.includes("?->")
      },
      {
        description: "Debe usar la coalescencia nula '??' como respaldo",
        validate: (code, output) => code.includes("??")
      },
      {
        description: "La salida esperada con perfil nulo debe ser 'invitado'",
        validate: (code, output) => output.trim() === "invitado"
      }
    ]
  },
  {
    id: "m1_tipado_union",
    level: 1,
    levelTitle: "Módulo 1: Sintaxis y Tipado Avanzado",
    title: "10. Tipos de Unión (Union Types)",
    localPath: "Herd/phpcamp/m1_10_union.php",
    instructions: `
### Tipos de Unión (Union Types) en PHP 8
A partir de PHP 8, puedes declarar que un parámetro o retorno puede aceptar múltiples tipos de datos usando el carácter barra vertical (\`|\`):
\`\`\`php
function procesarPago(int|float $monto): string|bool {
    return "Monto procesado: $monto";
}
\`\`\`

#### Instrucciones:
1. Define una función llamada \`duplicarEntrada\` que acepte un parámetro llamado \`$entrada\` que sea de tipo entero o flotante (\`int|float\`).
2. Haz que la función retorne un entero, un flotante o un string (\`int|float|string\`).
3. La función debe retornar la entrada multiplicada por 2.
4. Llama a la función e imprime el resultado.
    `,
    initialCode: `<?php
// Define la función duplicarEntrada con tipos de unión en parámetros y retorno
`,
    tests: [
      {
        description: "Debe declarar el tipo de unión 'int|float' en el parámetro",
        validate: (code, output) => /int\|float/.test(code)
      },
      {
        description: "Debe declarar el tipo de retorno 'int|float|string'",
        validate: (code, output) => /:\s*(int\|float\|string|float\|int\|string|string\|int\|float)/.test(code)
      },
      {
        description: "Debe retornar 30 al llamarla con 15",
        validate: (code, output) => {
          let testCode = code + "\n echo duplicarEntrada(15);";
          return evalPHP(testCode).output.includes("30");
        }
      }
    ]
  }
];
