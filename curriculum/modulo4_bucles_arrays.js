const MODULO4_BUCLES_ARRAYS = [
  {
    id: "m4_arrays_basicos",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "1. Creando Listas (Arrays Indexados)",
    localPath: "Herd/phpcamp/m4_01_arrays.php",
    instructions: `
### Arrays Indexados: Listas de Elementos

A menudo necesitas guardar una colección de cosas bajo un solo nombre, en lugar de declarar una variable diferente para cada elemento. En PHP usamos **Arrays** para eso.

Los **arrays indexados** asocian cada elemento a un número o posición (índice), el cual **siempre comienza a contar desde 0**.

\`\`\`php
$frutas = ["Manzana", "Pera", "Plátano"];
echo $frutas[0]; // Imprime "Manzana"
echo $frutas[1]; // Imprime "Pera"
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
  },
  {
    id: "m4_arrays_asociativos",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "2. Arrays Asociativos",
    localPath: "Herd/phpcamp/m4_02_asociativos.php",
    instructions: `
### Arrays Asociativos: Claves Personalizadas

En lugar de usar números (0, 1, 2...) como índices, los **arrays asociativos** te permiten usar nombres o claves personalizadas de tipo texto para identificar a cada elemento.

Usamos el operador flecha de asociación \`=>\` para conectar una clave con su valor.

\`\`\`php
$usuario = [
    "nombre" => "Sofía",
    "rol" => "Estudiante"
];

echo $usuario["nombre"]; // Imprime "Sofía"
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea un array asociativo llamado \`$usuario\` con las siguientes claves y valores:
   - \`"nombre"\` con el valor \`"Juan"\`
   - \`"edad"\` con el valor \`25\`
2. Imprime el valor asociado a la clave \`"nombre"\` usando la sintaxis de corchetes con comillas.
    `,
    initialCode: `<?php
// Crea el array asociativo $usuario


// Imprime el valor de la clave 'nombre'

`,
    tests: [
      {
        description: "Debe declarar un array asociativo con =>",
        validate: (code, output) => code.includes("=>") && code.includes("usuario")
      },
      {
        description: "Debe imprimir 'Juan'",
        validate: (code, output) => output.trim() === "Juan"
      }
    ]
  },
  {
    id: "m4_bucle_for",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "3. El Bucle FOR",
    localPath: "Herd/phpcamp/m4_03_for.php",
    instructions: `
### El Bucle FOR: Repeticiones Controladas

Un **bucle** te permite ejecutar un bloque de código repetidas veces.

El bucle \`for\` se compone de tres partes dentro del paréntesis:
1. **Inicialización:** Se declara una variable contador (ej. \`$i = 1\`).
2. **Condición:** El bucle continuará mientras esta condición sea verdadera (ej. \`$i <= 5\`).
3. **Incremento/Paso:** Cómo cambia el contador al final de cada vuelta (ej. \`$i++\` aumenta en 1).

\`\`\`php
for ($i = 1; $i <= 3; $i++) {
    echo $i; // Imprime 123
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Escribe un bucle \`for\` que comience con \`$i = 1\`.
2. La condición debe ser que \`$i\` sea menor o igual a \`5\` (\`$i <= 5\`).
3. En cada iteración, incrementa \`$i\` en 1.
4. Dentro del bucle, usa \`echo\` para imprimir el valor de \`$i\` directamente (sin espacios ni saltos de línea).
    `,
    initialCode: `<?php
// Escribe tu bucle for aquí

`,
    tests: [
      {
        description: "Debe usar la palabra clave for",
        validate: (code, output) => code.includes("for")
      },
      {
        description: "Debe imprimir exactamente '12345'",
        validate: (code, output) => output.trim() === "12345"
      }
    ]
  },
  {
    id: "m4_bucle_foreach",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "4. Recorriendo Arrays con FOREACH",
    localPath: "Herd/phpcamp/m4_04_foreach.php",
    instructions: `
### Bucle FOREACH: Especial para Arrays

Cuando trabajamos con arrays, la forma más cómoda y limpia de recorrerlos es mediante el bucle **FOREACH**.

Este bucle toma automáticamente cada elemento de la lista y lo asigna a una variable temporal en cada vuelta.

\`\`\`php
$nombres = ["Ana", "Pedro"];

foreach ($nombres as $nombre) {
    echo $nombre; // Imprime Ana, luego Pedro
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Tienes un array \`$frutas\` pre-declarado.
2. Escribe un bucle \`foreach\` para recorrer el array \`$frutas\`.
3. Dentro del bucle, usa \`echo\` para imprimir cada fruta seguida de un espacio en blanco \`" "\`.
    `,
    initialCode: `<?php
$frutas = ["Manzana", "Plátano", "Naranja"];

// Recorre $frutas e imprime cada fruta seguida de un espacio

`,
    tests: [
      {
        description: "Debe usar la estructura foreach",
        validate: (code, output) => code.includes("foreach") && code.includes("as")
      },
      {
        description: "Debe imprimir todas las frutas separadas por espacios",
        validate: (code, output) => {
          const out = output.trim();
          return out.includes("Manzana") && out.includes("Plátano") && out.includes("Naranja");
        }
      }
    ]
  },
  {
    id: "m4_foreach_asociativo",
    level: 4,
    levelTitle: "Nivel 4: Bucles y Arrays",
    title: "5. Iterando Claves y Valores",
    localPath: "Herd/phpcamp/m4_05_foreach_asoc.php",
    instructions: `
### Foreach Asociativo: Obteniendo la Clave

Con los arrays asociativos, a menudo quieres tener acceso tanto a la **clave** (el nombre de la propiedad) como a su **valor** correspondiente.

Para eso usamos la sintaxis extendida de \`foreach ($array as $clave => $valor)\`.

\`\`\`php
$precios = ["Café" => 2, "Té" => 1.5];

foreach ($precios as $producto => $costo) {
    echo $producto . " cuesta " . $costo;
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Tienes un array asociativo llamado \`$capitales\`.
2. Usa un bucle \`foreach\` que extraiga el país como clave (\`$pais\`) y la ciudad como valor (\`$ciudad\`).
3. Dentro del bucle, imprime exactamente la frase:
   \`La capital de [pais] es [ciudad]. \` (con un espacio al final de cada frase).
    `,
    initialCode: `<?php
$capitales = [
    "España" => "Madrid",
    "Francia" => "París"
];

// Recorre $capitales imprimiendo la frase indicada

`,
    tests: [
      {
        description: "Debe usar foreach con la sintaxis de asociación =>",
        validate: (code, output) => /foreach\s*\(\s*\$capitales\s+as\s+\$[a-zA-Z0-9_]+\s*=>\s*\$[a-zA-Z0-9_]+\s*\)/.test(code)
      },
      {
        description: "Debe imprimir correctamente la frase completa para España y Francia",
        validate: (code, output) => output.includes("La capital de España es Madrid.") && output.includes("La capital de Francia es París.")
      }
    ]
  }
];
