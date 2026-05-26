const MODULO4_CHALLENGES = [
  {
    id: "m4_exceptions_basic",
    level: 4,
    levelTitle: "Módulo 4: Excepciones y Robustez",
    title: "1. Lanzamiento de Excepciones",
    localPath: "Herd/phpcamp/m4_01_throw.php",
    instructions: `
### Lanzamiento de Excepciones en PHP (throw)
Las excepciones detienen el flujo normal del programa cuando ocurre un error lógico insalvable. Se lanzan usando la palabra reservada \`throw\` seguida de una instancia de la clase \`Exception\`:
\`\`\`php
throw new Exception("El valor no es válido");
\`\`\`

#### Instrucciones:
1. Crea una función llamada \`verificarStock\` que acepte un parámetro entero \`$cantidad\`.
2. Si \`$cantidad < 1\`, lanza una \`Exception\` con el mensaje exactamente: \`Stock insuficiente\`.
3. Si es 1 o mayor, la función no debe lanzar nada (puedes retornar true o dejarla vacía).
    `,
    initialCode: `<?php
// Escribe tu función verificarStock abajo
`,
    tests: [
      {
        description: "Debe usar 'throw new Exception'",
        validate: (code, output) => code.includes("throw new Exception")
      },
      {
        description: "Debe lanzar 'Stock insuficiente' si la cantidad es 0 o menor",
        validate: (code, output) => {
          let test1 = code + "\n try { verificarStock(0); } catch(Exception $e) { echo $e->getMessage(); }";
          return evalPHP(test1).output.trim() === "Stock insuficiente";
        }
      }
    ]
  },
  {
    id: "m4_try_catch",
    level: 4,
    levelTitle: "Módulo 4: Excepciones y Robustez",
    title: "2. Captura de Errores (Try / Catch)",
    localPath: "Herd/phpcamp/m4_02_try_catch.php",
    instructions: `
### Capturando Excepciones (Try / Catch)
Para evitar que un error detenga tu servidor por completo, envolvemos el código propenso a fallar en un bloque \`try\`. Si se lanza una excepción, el flujo se desvía de inmediato al bloque \`catch\`:
\`\`\`php
try {
    verificarAlgo();
} catch (Exception $e) {
    echo "Error atrapado: " . $e->getMessage();
}
\`\`\`

#### Instrucciones:
Se te proporciona la función \`procesarServicio\` la cual puede lanzar un error.
1. Ejecuta \`procesarServicio()\` dentro de un bloque \`try\`.
2. Captura cualquier excepción en el bloque \`catch (Exception $e)\`.
3. Imprime en pantalla exactamente: \`Excepción capturada: \` concatenado con el mensaje de la excepción obtenida con \`$e->getMessage()\`.
    `,
    initialCode: `<?php
function procesarServicio() {
    throw new Exception("Conexión perdida con la API");
}

// Ejecuta dentro de try/catch e imprime el error capturado
`,
    tests: [
      {
        description: "Debe incluir las palabras clave 'try' y 'catch'",
        validate: (code, output) => code.includes("try") && code.includes("catch")
      },
      {
        description: "La salida esperada debe ser 'Excepción capturada: Conexión perdida con la API'",
        validate: (code, output) => output.trim() === "Excepción capturada: Conexión perdida con la API"
      }
    ]
  },
  {
    id: "m4_custom_exception",
    level: 4,
    levelTitle: "Módulo 4: Excepciones y Robustez",
    title: "3. Clases de Excepciones Personalizadas",
    localPath: "Herd/phpcamp/m4_03_custom.php",
    instructions: `
### Excepciones Personalizadas
En desarrollo profesional, creamos nuestras propias clases de excepciones heredando de la clase base \`Exception\`. Esto nos permite estructurar y filtrar las excepciones según su tipo:
\`\`\`php
class DatabaseException extends Exception {}
\`\`\`

#### Instrucciones:
1. Crea una clase llamada \`ValidacionException\` que extienda (herede) de la clase base \`Exception\`.
2. Crea una función llamada \`validarEmail\` que reciba \`$email\`. Si no contiene un arroba (\`@\`), lanza una \`ValidacionException\` con el mensaje \`Email inválido\`.
3. Captura específicamente la \`ValidacionException\` con \`try/catch\` e imprime su mensaje.
    `,
    initialCode: `<?php
// 1. Crea la clase ValidacionException heredando de Exception


// 2. Crea la función validarEmail


// 3. Captura ValidacionException e imprime
`,
    tests: [
      {
        description: "Debe heredar de Exception usando 'extends Exception'",
        validate: (code, output) => /class\s+ValidacionException\s+extends\s+Exception/.test(code)
      },
      {
        description: "Debe usar 'catch (ValidacionException $e)'",
        validate: (code, output) => code.includes("ValidacionException") && code.includes("catch")
      },
      {
        description: "Debe lanzar e imprimir 'Email inválido' si no hay @",
        validate: (code, output) => {
          let testCode = code + "\n try { validarEmail('correo.com'); } catch(ValidacionException $e) { echo $e->getMessage(); }";
          return evalPHP(testCode).output.includes("Email inválido");
        }
      }
    ]
  },
  {
    id: "m4_finally",
    level: 4,
    levelTitle: "Módulo 4: Excepciones y Robustez",
    title: "4. Liberación de Recursos (Finally)",
    localPath: "Herd/phpcamp/m4_04_finally.php",
    instructions: `
### El bloque finally
El bloque \`finally\` se ejecuta **siempre**, sin importar si se lanzó una excepción o no. Se usa principalmente para limpiar el estado, cerrar conexiones a bases de datos o cerrar archivos abiertos:
\`\`\`php
try {
    abrirConexion();
} catch (Exception $e) {
    tratarError();
} finally {
    cerrarConexion(); // Se ejecuta sí o sí
}
\`\`\`

#### Instrucciones:
1. En el bloque \`try\`, lanza una excepción con el mensaje \`Fallo\`.
2. En el bloque \`catch\`, imprime \`Error atrapado \`.
3. En el bloque \`finally\`, imprime \`Conexión cerrada\`.
    `,
    initialCode: `<?php
// Escribe tu bloque try / catch / finally abajo
`,
    tests: [
      {
        description: "Debe incluir el bloque 'finally'",
        validate: (code, output) => code.includes("finally")
      },
      {
        description: "La salida esperada debe ser 'Error atrapado Conexión cerrada'",
        validate: (code, output) => output.trim() === "Error atrapado Conexión cerrada"
      }
    ]
  }
];
