const MODULO3_CHALLENGES = [
  {
    id: "m3_arrays_indexed",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "1. Arrays Indexados y Modificación",
    localPath: "Herd/phpcamp/m3_01_arrays.php",
    instructions: `
### Arrays Indexados en PHP
Los arrays indexados utilizan índices numéricos que comienzan en 0. Podemos agregar elementos al final usando la sintaxis de corchetes vacíos \`[]\`:
\`\`\`php
$frutas = ['Manzana', 'Pera'];
$frutas[] = 'Plátano'; // Agrega al final
\`\`\`

#### Instrucciones:
1. Crea un array indexado llamado \`$lenguajes\` con los valores \`"PHP"\` y \`"SQL"\`.
2. Añádele el valor \`"Laravel"\` al final del array usando la sintaxis \`[]\`.
3. Imprime la cantidad total de elementos usando \`count($lenguajes)\` y luego el último elemento concatenado por un guion medio: \`X-Laravel\` (donde X es el total).
    `,
    initialCode: `<?php
// Crea el array $lenguajes, añade "Laravel" e imprime la salida solicitada
`,
    tests: [
      {
        description: "Debe declarar el array '$lenguajes'",
        validate: (code, output) => /\$lenguajes\s*=/.test(code)
      },
      {
        description: "Debe añadir 'Laravel' usando corchetes vacíos []",
        validate: (code, output) => code.includes("$lenguajes[]")
      },
      {
        description: "La salida esperada debe ser exactamente '3-Laravel'",
        validate: (code, output) => output.trim() === "3-Laravel"
      }
    ]
  },
  {
    id: "m3_arrays_associative",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "2. Destructuración de Arrays Asociativos",
    localPath: "Herd/phpcamp/m3_02_assoc.php",
    instructions: `
### Destructuración de Arreglos (Sintaxis list/[])
PHP moderno permite extraer valores de un array directamente a variables usando una sintaxis compacta y elegante de destructuración:
\`\`\`php
$config = ['host' => 'localhost', 'puerto' => 5432];
['host' => $host, 'puerto' => $puerto] = $config;
\`\`\`

#### Instrucciones:
Se te proporciona el array asociativo \`$empleado\`.
1. Usa la destructuración de arrays para extraer el valor de la clave \`nombre\` en una variable llamada \`$nombre\` y el valor de la clave \`rol\` en una variable llamada \`$rol\`.
2. Imprime exactamente: \`Valeria trabaja como Practicante\`.
    `,
    initialCode: `<?php
$empleado = [
    "nombre" => "Valeria",
    "rol" => "Practicante",
    "sueldo" => 1200
];

// Escribe la destructuración de $empleado e imprime la salida solicitada
`,
    tests: [
      {
        description: "Debe usar la destructuración de arrays asociativos con la sintaxis de corchetes",
        validate: (code, output) => code.includes("['nombre'") || code.includes('["nombre"')
      },
      {
        description: "La salida debe ser exactamente 'Valeria trabaja como Practicante'",
        validate: (code, output) => output.trim() === "Valeria trabaja como Practicante"
      }
    ]
  },
  {
    id: "m3_array_map",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "3. Transformando Datos con array_map",
    localPath: "Herd/phpcamp/m3_03_map.php",
    instructions: `
### array_map y Funciones Flecha (fn)
\`array_map\` aplica un callback a todos los elementos. En PHP 7.4+, las funciones flecha (\`fn() => expression\`) simplifican la sintaxis capturando variables del scope externo automáticamente:
\`\`\`php
$iva = 1.16;
$preciosConIva = array_map(fn($p) => $p * $iva, $precios);
\`\`\`

#### Instrucciones:
1. Se te proporciona un array de precios de productos en dólares.
2. Usa \`array_map\` con una función flecha para multiplicar cada precio por \`1.15\` (aplicando 15% de impuesto).
3. Guarda el nuevo array en \`$preciosFinales\`.
4. Recorre \`$preciosFinales\` e imprime cada precio seguido de un espacio.
    `,
    initialCode: `<?php
$precios = [100, 200, 300];

// Usa array_map para aplicar el 1.15 de impuesto, luego imprímelos
`,
    tests: [
      {
        description: "Debe usar 'array_map'",
        validate: (code, output) => code.includes("array_map")
      },
      {
        description: "Debe usar una función flecha 'fn'",
        validate: (code, output) => code.includes("fn")
      },
      {
        description: "La salida esperada debe ser '115 230 345 '",
        validate: (code, output) => output === "115 230 345 "
      }
    ]
  },
  {
    id: "m3_array_filter",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "4. Filtrado Avanzado (array_filter)",
    localPath: "Herd/phpcamp/m3_04_filter.php",
    instructions: `
### Filtrando con array_filter
Filtra un array manteniendo solo los elementos para los cuales el callback retorne \`true\`.
\`\`\`php
$activos = array_filter($usuarios, fn($u) => $u['activo'] === true);
\`\`\`

#### Instrucciones:
Se te proporciona una lista de productos en el array \`$inventario\`.
1. Usa \`array_filter\` para obtener únicamente los productos con un \`stock\` mayor a 0.
2. Guarda el resultado en \`$disponibles\`.
3. Recorre \`$disponibles\` con \`foreach\` e imprime el \`nombre\` de cada producto seguido de un guion medio y un espacio (\`- \`).
    `,
    initialCode: `<?php
$inventario = [
    ["nombre" => "Laptop", "stock" => 5],
    ["nombre" => "Teclado", "stock" => 0],
    ["nombre" => "Mouse", "stock" => 12]
];

// Filtra los productos con stock > 0 e imprime sus nombres
`,
    tests: [
      {
        description: "Debe usar 'array_filter'",
        validate: (code, output) => code.includes("array_filter")
      },
      {
        description: "Debe imprimir 'Laptop- Mouse- '",
        validate: (code, output) => output === "Laptop- Mouse- "
      }
    ]
  },
  {
    id: "m3_array_reduce",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "5. Reducción y Acumulación (array_reduce)",
    localPath: "Herd/phpcamp/m3_05_reduce.php",
    instructions: `
### Reducción de Colecciones (array_reduce)
\`array_reduce\` reduce un array a un único valor (un total, un promedio, un string acumulado) utilizando una función callback que arrastra un acumulador:
\`\`\`php
$total = array_reduce($numeros, fn($carry, $item) => $carry + $item, 0);
\`\`\`
El tercer parámetro (\`0\`) es el valor inicial del acumulador (\`$carry\`).

#### Instrucciones:
Se te proporciona un carrito de compras con productos y precios en el array \`$carrito\`.
1. Usa \`array_reduce\` para calcular el costo total de la compra sumando la propiedad \`precio\` de cada producto.
2. Imprime en pantalla el total exacto (ej. \`1050\`).
    `,
    initialCode: `<?php
$carrito = [
    ["nombre" => "Zapatos", "precio" => 150],
    ["nombre" => "Camisa", "precio" => 50],
    ["nombre" => "Reloj", "precio" => 850]
];

// Calcula la suma total usando array_reduce e imprímela
`,
    tests: [
      {
        description: "Debe utilizar la función 'array_reduce'",
        validate: (code, output) => code.includes("array_reduce")
      },
      {
        description: "Debe sumar correctamente dando 1050",
        validate: (code, output) => output.trim() === "1050"
      }
    ]
  },
  {
    id: "m3_in_array",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "6. Búsqueda y Validación (in_array)",
    localPath: "Herd/phpcamp/m3_06_search.php",
    instructions: `
### Búsquedas de Existencia (in_array)
Para comprobar si un valor existe dentro de un array indexado sin recorrerlo manualmente con un bucle, PHP proporciona la función de alto rendimiento \`in_array($buscar, $array, $estricto)\`. Habilitar el modo estricto (\`true\`) comprueba también que los tipos coincidan.
\`\`\`php
if (in_array('admin', $roles, true)) { ... }
\`\`\`

#### Instrucciones:
Se te proporciona el array \`$rolesPermitidos\`.
1. Evalúa si el valor de la variable \`$miRol\` existe dentro del array usando \`in_array\`.
2. Si existe, imprime \`Autorizado\`. Si no, imprime \`Acceso Denegado\`.
    `,
    initialCode: `<?php
$rolesPermitidos = ['admin', 'editor', 'moderador'];
$miRol = 'editor';

// Evalúa si $miRol está permitido usando in_array e imprime el estado
`,
    tests: [
      {
        description: "Debe usar la función 'in_array'",
        validate: (code, output) => code.includes("in_array")
      },
      {
        description: "Debe imprimir 'Autorizado' si miRol es 'editor'",
        validate: (code, output) => {
          let test1 = code.replace(/\$miRol\s*=\s*['"][^'"]+['"]/, "$miRol = 'editor'");
          return evalPHP(test1).output.trim() === "Autorizado";
        }
      },
      {
        description: "Debe imprimir 'Acceso Denegado' si miRol es 'invitado'",
        validate: (code, output) => {
          let test2 = code.replace(/\$miRol\s*=\s*['"][^'"]+['"]/, "$miRol = 'invitado'");
          return evalPHP(test2).output.trim() === "Acceso Denegado";
        }
      }
    ]
  },
  {
    id: "m3_array_keys",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "7. Extrayendo Claves y Valores",
    localPath: "Herd/phpcamp/m3_07_keys.php",
    instructions: `
### array_keys y array_values
Útiles para separar estructuras de base de datos asociativas:
- \`array_keys($array)\`: Retorna un array indexado con todos los nombres de las claves.
- \`array_values($array)\`: Retorna un array indexado con todos los valores.
\`\`\`php
$claves = array_keys($usuario);
\`\`\`

#### Instrucciones:
Se te proporciona un array asociativo con datos de configuración \`$database\`.
1. Usa \`array_keys\` para obtener las claves de la configuración.
2. Une todas las claves en un solo string separadas por un guion medio y un espacio (\`- \`) usando \`implode("- ", $claves)\`.
3. Imprime el resultado.
    `,
    initialCode: `<?php
$database = [
    "host" => "localhost",
    "port" => 5432,
    "user" => "postgres"
];

// Obtén las claves, únelas con implode e imprime el string resultante
`,
    tests: [
      {
        description: "Debe usar 'array_keys'",
        validate: (code, output) => code.includes("array_keys")
      },
      {
        description: "Debe imprimir 'host- port- user'",
        validate: (code, output) => output.trim() === "host- port- user"
      }
    ]
  },
  {
    id: "m3_array_merge",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "8. Fusionar Arreglos (array_merge)",
    localPath: "Herd/phpcamp/m3_08_merge.php",
    instructions: `
### Uniendo Datos (array_merge)
\`array_merge\` combina dos o más arrays en uno solo. Si las claves son strings (asociativos) y coinciden, el último valor sobrescribirá al anterior.
\`\`\`php
$completo = array_merge($defecto, $usuarioCustom);
\`\`\`

#### Instrucciones:
Se te proporcionan dos arrays de configuración: \`$defaultConfig\` y \`$customConfig\`.
1. Combina ambos arrays en uno solo llamado \`$finalConfig\` usando \`array_merge\`.
2. Imprime el valor de la clave \`tema\` del array resultante. (Debe mostrar \`azul\` debido a la sobrescritura).
    `,
    initialCode: `<?php
$defaultConfig = ["tema" => "oscuro", "idioma" => "es"];
$customConfig = ["tema" => "azul"];

// Combina con array_merge e imprime el valor del tema resultante
`,
    tests: [
      {
        description: "Debe usar la función 'array_merge'",
        validate: (code, output) => code.includes("array_merge")
      },
      {
        description: "La salida esperada debe ser exactamente 'azul'",
        validate: (code, output) => output.trim() === "azul"
      }
    ]
  },
  {
    id: "m3_json_encode",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "9. Serialización JSON (json_encode)",
    localPath: "Herd/phpcamp/m3_09_json.php",
    instructions: `
### Serializando Datos para APIs (JSON)
En el backend (especialmente en controladores de Laravel), nos comunicamos con el frontend (React, Vue) enviando datos en formato **JSON**. PHP convierte cualquier array u objeto a JSON de forma instantánea usando \`json_encode($datos)\`:
\`\`\`php
$json = json_encode(['mensaje' => 'Éxito']);
\`\`\`

#### Instrucciones:
Se te proporciona el array asociativo \`$apiResponse\`.
1. Convierte el array a formato JSON usando la función \`json_encode\`.
2. Imprime la cadena JSON resultante.
    `,
    initialCode: `<?php
$apiResponse = [
    "status" => "success",
    "code" => 200,
    "data" => ["mensaje" => "Reto completado"]
];

// Convierte a JSON e imprime
`,
    tests: [
      {
        description: "Debe usar la función integrada 'json_encode'",
        validate: (code, output) => code.includes("json_encode")
      },
      {
        description: "La salida debe contener el texto del formato serializado en JSON",
        validate: (code, output) => output.includes("success") && output.includes("200")
      }
    ]
  },
  {
    id: "m3_json_decode",
    level: 3,
    levelTitle: "Módulo 3: Colecciones y Manipulación de Datos",
    title: "10. Deserialización JSON (json_decode)",
    localPath: "Herd/phpcamp/m3_10_decode.php",
    instructions: `
### Leyendo payloads JSON (json_decode)
Cuando recibimos datos desde una API externa o un payload del frontend, estos vienen en formato JSON. Convertimos el JSON de vuelta a un array asociativo de PHP pasando \`true\` como segundo parámetro en la función \`json_decode($json, true)\`:
\`\`\`php
$array = json_decode($jsonString, true);
\`\`\`

#### Instrucciones:
Se te proporciona el string JSON \`$payload\`.
1. Decodifícalo a un array asociativo usando \`json_decode($payload, true)\`.
2. Guarda el resultado en la variable \`$datos\`.
3. Imprime el valor de la clave \`usuario\` del array resultante.
    `,
    initialCode: `<?php
$payload = '{"usuario": "mateo", "rol": "editor"}';

// Convierte el JSON a array asociativo de PHP e imprime el nombre del usuario
`,
    tests: [
      {
        description: "Debe usar la función 'json_decode' con el segundo parámetro como 'true'",
        validate: (code, output) => /json_decode\s*\(\s*\$payload\s*,\s*true\s*\)/.test(code)
      },
      {
        description: "La salida final debe ser 'mateo'",
        validate: (code, output) => output.trim() === "mateo"
      }
    ]
  }
];
