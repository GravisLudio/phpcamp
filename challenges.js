const INITIAL_GUIDE = `# ¡Bienvenido a PHPCamp! 🚀

Esta plataforma está diseñada para que tú y tus compañeros dominen **PHP, Bases de Datos y Laravel** en tiempo récord de manera interactiva.

---

## 🛠️ Guía de Instalación del Entorno Real

Para trabajar como un desarrollador profesional, necesitas configurar tu entorno local. Utilizaremos las herramientas más rápidas de la industria:

### 1. Instalar Laravel Herd
**Laravel Herd** es un entorno de desarrollo PHP súper rápido y con cero configuración.
- **Descarga:** Ve a [herd.laravel.com](https://herd.laravel.com) y descarga el instalador.
- **¿Qué hace?** Instala automáticamente **PHP**, **Composer** y **Nginx** en tu computadora en segundos.

### 2. Instalar Dbngin
**Dbngin** es un gestor de bases de datos súper ligero.
- **Descarga:** Ve a [dbngin.com](https://dbngin.com).
- **¿Qué hace?** Te permite crear servidores locales de base de datos (PostgreSQL/MySQL) de manera visual con un solo clic.

---

## 🔄 Elige tu Método de Trabajo

En la barra superior de PHPCamp verás dos modos que puedes alternar en cualquier momento:

### 🖥️ Modo Web Interactivo (Recomendado para empezar)
- **Escribe tu código** directamente en el editor web de la derecha y presiona **"Ejecutar Pruebas"**.

### 💻 Modo Editor Local (Para trabajar en tu propia PC)
- **Crea el archivo indicado** en tu carpeta local de Herd (ej: \`C:\\Users\\TU_USUARIO\\Herd\\phpcamp\\ejercicio1.php\`), edítalo con VS Code y cuando funcione, copia el código aquí para validar.
`;

const PHP_CHALLENGES = [
  // NIVEL 1
  {
    id: "n1_hola_mundo",
    level: 1,
    levelTitle: "Nivel 1: Sintaxis Básica y Variables",
    title: "1. ¡Hola, PHP!",
    localPath: "Herd/phpcamp/01_hola.php",
    instructions: `
### La etiqueta de PHP y la salida de datos

En PHP, todo el código debe estar dentro de etiquetas especiales:
\`\`\`php
<?php
// Tu código va aquí
\`\`\`

Para imprimir texto en pantalla, la forma más común y rápida es utilizar la palabra clave \`echo\` seguida del texto entre comillas dobles o simples, finalizando **siempre** con un punto y coma (\`;\`).

\`\`\`php
echo "¡Hola, mundo!";
\`\`\`

#### Instrucciones del reto:
Escribe un script en PHP que imprima en pantalla exactamente el texto: \`¡Hola, PHPCamp!\`. No olvides cerrar la instrucción con \`;\`.
    `,
    initialCode: `<?php
// Escribe tu código abajo de esta línea
`,
    tests: [
      {
        description: "Debe incluir la etiqueta de apertura de PHP '<?php'",
        validate: (code, output) => code.includes("<?php")
      },
      {
        description: "Debe usar 'echo' o 'print' para la salida de datos",
        validate: (code, output) => code.includes("echo") || code.includes("print")
      },
      {
        description: "El resultado en pantalla debe ser exactamente '¡Hola, PHPCamp!'",
        validate: (code, output) => output.trim() === "¡Hola, PHPCamp!"
      }
    ]
  },
  {
    id: "n1_variables",
    level: 1,
    levelTitle: "Nivel 1: Sintaxis Básica y Variables",
    title: "2. Declarando Variables",
    localPath: "Herd/phpcamp/02_variables.php",
    instructions: `
### Creación de variables y tipos de datos

En PHP, todas las variables se crean anteponiendo el símbolo de dólar (\`$\`) al nombre de la variable. PHP es un lenguaje de **tipado dinámico**, lo que significa que no tienes que declarar el tipo de dato (como string o int) al crear la variable.

\`\`\`php
$nombre = "Juan"; // String
$edad = 25;       // Entero (Integer)
$precio = 19.99;  // Decimal (Float)
\`\`\`

Para unir o **concatenar** strings en PHP, se utiliza el operador de **punto** (\`.\`):
\`\`\`php
echo "Hola, " . $nombre;
\`\`\`

#### Instrucciones del reto:
1. Crea una variable llamada \`$curso\` y asígnale el valor \`Laravel\`.
2. Imprime en pantalla exactamente: \`Aprendiendo Laravel en PHPCamp\`. Usa la variable \`$curso\` y la concatenación con el punto (\`.\`).
    `,
    initialCode: `<?php
// 1. Declara la variable $curso aquí


// 2. Imprime el mensaje concatenado abajo
`,
    tests: [
      {
        description: "Debe declarar la variable '$curso'",
        validate: (code, output) => /\$curso\s*=/.test(code)
      },
      {
        description: "Debe usar la concatenación mediante el punto '.'",
        validate: (code, output) => code.includes(".")
      },
      {
        description: "La salida final debe ser exactamente 'Aprendiendo Laravel en PHPCamp'",
        validate: (code, output) => output.trim() === "Aprendiendo Laravel en PHPCamp"
      }
    ]
  },

  // NIVEL 2
  {
    id: "n2_condicionales",
    level: 2,
    levelTitle: "Nivel 2: Estructuras de Control",
    title: "3. Tomando Decisiones (If / Else)",
    localPath: "Herd/phpcamp/03_condicionales.php",
    instructions: `
### Estructuras condicionales en PHP

Las estructuras condicionales te permiten ejecutar diferentes bloques de código según si una condición se cumple o no. La sintaxis básica es igual a la de la mayoría de los lenguajes modernos:

\`\`\`php
if ($edad >= 18) {
    echo "Eres mayor de edad";
} else {
    echo "Eres menor de edad";
}
\`\`\`

#### Instrucciones del reto:
1. Declara una variable llamada \`$nota\` con un valor numérico entre 0 y 10.
2. Escribe una estructura \`if / else\` que evalúe si \`$nota\` es mayor o igual a 6.
3. Si se cumple, imprime \`Aprobado\`. Si no, imprime \`Reprobado\`.
    `,
    initialCode: `<?php
$nota = 8; // Puedes cambiar este valor para probar

// Escribe tu condicional aquí
`,
    tests: [
      {
        description: "Debe contener una estructura 'if'",
        validate: (code, output) => code.includes("if")
      },
      {
        description: "Debe imprimir 'Aprobado' si la nota es 8",
        validate: (code, output) => {
          // Evalúa con nota = 8
          let testCode = code.replace(/\$nota\s*=\s*\d+/, "$nota = 8");
          let evaluated = evalPHP(testCode);
          return evaluated.output.trim() === "Aprobado";
        }
      },
      {
        description: "Debe imprimir 'Reprobado' si la nota es 4",
        validate: (code, output) => {
          // Evalúa con nota = 4
          let testCode = code.replace(/\$nota\s*=\s*\d+/, "$nota = 4");
          let evaluated = evalPHP(testCode);
          return evaluated.output.trim() === "Reprobado";
        }
      }
    ]
  },
  {
    id: "n2_match",
    level: 2,
    levelTitle: "Nivel 2: Estructuras de Control",
    title: "4. Expresión Match (PHP 8+)",
    localPath: "Herd/phpcamp/04_match.php",
    instructions: `
### La moderna expresión Match de PHP 8

En versiones modernas de PHP (PHP 8.0 en adelante), disponemos de \`match\`. Es una versión muy potente de \`switch\` que devuelve un valor directamente, tiene comparaciones estrictas (\`===\`) y es mucho más compacta.

\`\`\`php
$rol = 'admin';
$mensaje = match ($rol) {
    'admin' => 'Acceso total',
    'editor' => 'Acceso de edición',
    default => 'Acceso denegado',
};
echo $mensaje;
\`\`\`

> **Nota:** ¡No olvides poner un punto y coma \`;\` después de la llave de cierre del bloque \`match\`!

#### Instrucciones del reto:
1. Declara una variable llamada \`$metodo_pago\` con el valor \`efectivo\`.
2. Usa la expresión \`match\` para evaluar \`$metodo_pago\`.
   - Si es \`tarjeta\`, debe retornar \`Pago con tarjeta procesado\`.
   - Si es \`efectivo\`, debe retornar \`Pago en efectivo listo para caja\`.
   - Si es cualquier otro valor (default), debe retornar \`Método no soportado\`.
3. Guarda el resultado de \`match\` en una variable e imprímela.
    `,
    initialCode: `<?php
$metodo_pago = 'efectivo';

// Escribe la expresión match abajo
`,
    tests: [
      {
        description: "Debe utilizar la palabra clave 'match'",
        validate: (code, output) => code.includes("match")
      },
      {
        description: "Debe retornar el mensaje correcto para 'efectivo'",
        validate: (code, output) => {
          let testCode = code.replace(/\$metodo_pago\s*=\s*['"][^'"]+['"]/, "$metodo_pago = 'efectivo'");
          return evalPHP(testCode).output.trim() === "Pago en efectivo listo para caja";
        }
      },
      {
        description: "Debe retornar el mensaje correcto para 'tarjeta'",
        validate: (code, output) => {
          let testCode = code.replace(/\$metodo_pago\s*=\s*['"][^'"]+['"]/, "$metodo_pago = 'tarjeta'");
          return evalPHP(testCode).output.trim() === "Pago con tarjeta procesado";
        }
      },
      {
        description: "Debe retornar el mensaje de error por defecto (default)",
        validate: (code, output) => {
          let testCode = code.replace(/\$metodo_pago\s*=\s*['"][^'"]+['"]/, "$metodo_pago = 'paypal'");
          return evalPHP(testCode).output.trim() === "Método no soportado";
        }
      }
    ]
  },

  // NIVEL 3
  {
    id: "n3_bucle_for",
    level: 3,
    levelTitle: "Nivel 3: Bucles e Iteración",
    title: "5. Contador Clásico (Bucle For)",
    localPath: "Herd/phpcamp/05_bucle_for.php",
    instructions: `
### Bucles e Iteraciones en PHP

Los bucles te permiten repetir un bloque de código un número determinado de veces. El bucle \`for\` tiene una estructura idéntica a lenguajes como C, Java o JavaScript:

\`\`\`php
for ($i = 0; $i < 5; $i++) {
    echo $i;
}
\`\`\`

#### Instrucciones del reto:
Escribe un bucle \`for\` que imprima los números del **1 al 5** (ambos inclusive). Cada número debe estar seguido de un espacio.
Ejemplo de salida esperada: \`1 2 3 4 5 \`
    `,
    initialCode: `<?php
// Escribe tu bucle for aquí
`,
    tests: [
      {
        description: "Debe incluir la estructura 'for'",
        validate: (code, output) => code.includes("for")
      },
      {
        description: "La salida del bucle debe ser exactamente '1 2 3 4 5 '",
        validate: (code, output) => output === "1 2 3 4 5 "
      }
    ]
  },
  {
    id: "n3_foreach",
    level: 3,
    levelTitle: "Nivel 3: Bucles e Iteración",
    title: "6. Recorriendo Datos (Bucle Foreach)",
    localPath: "Herd/phpcamp/06_foreach.php",
    instructions: `
### El bucle Foreach

En PHP, \`foreach\` es la herramienta principal y más potente para recorrer elementos dentro de un arreglo (array). Su sintaxis es sumamente limpia:

\`\`\`php
$tecnologias = ["PHP", "Laravel", "MySQL"];
foreach ($tecnologias as $tech) {
    echo $tech . " ";
}
\`\`\`

#### Instrucciones del reto:
1. Se te proporciona un array llamado \`$alumnos\`.
2. Usa un bucle \`foreach\` para recorrer cada alumno e imprimir su nombre seguido de un guion medio y un espacio (\`- \`).
Ejemplo de salida esperada: \`Sofía- Mateo- Valeria- \`
    `,
    initialCode: `<?php
$alumnos = ["Sofía", "Mateo", "Valeria"];

// Escribe tu bucle foreach aquí
`,
    tests: [
      {
        description: "Debe utilizar un bucle 'foreach'",
        validate: (code, output) => code.includes("foreach")
      },
      {
        description: "La salida del script debe ser exactamente 'Sofía- Mateo- Valeria- '",
        validate: (code, output) => output === "Sofía- Mateo- Valeria- "
      }
    ]
  },

  // NIVEL 4
  {
    id: "n4_array_asociativo",
    level: 4,
    levelTitle: "Nivel 4: Arrays y Colecciones",
    title: "7. Arrays Asociativos (Clave - Valor)",
    localPath: "Herd/phpcamp/07_arrays.php",
    instructions: `
### Arreglos Asociativos en PHP

A diferencia de los arreglos normales indexados por números (0, 1, 2...), los **arrays asociativos** permiten usar nombres (claves/keys) personalizados para acceder a sus valores. Se definen utilizando el operador flecha de asociación (\`=>\`):

\`\`\`php
$usuario = [
    "nombre" => "Carlos",
    "rol" => "Developer",
    "practicante" => true
];

echo $usuario["nombre"]; // Imprime "Carlos"
\`\`\`

#### Instrucciones del reto:
1. Crea un array asociativo llamado \`$producto\` con las siguientes claves y valores:
   - \`nombre\` con el valor \`Laptop\`
   - \`precio\` con el valor \`850\`
   - \`stock\` con el valor \`15\`
2. Imprime en pantalla exactamente el siguiente mensaje usando las claves del array:
\`Laptop cuesta 850 dólares.\`
    `,
    initialCode: `<?php
// 1. Define el array asociativo $producto abajo


// 2. Imprime la frase armada arriba
`,
    tests: [
      {
        description: "Debe definir la variable '$producto'",
        validate: (code, output) => /\$producto\s*=/.test(code)
      },
      {
        description: "Debe usar la flecha asociativa '=>' en la declaración",
        validate: (code, output) => code.includes("=>")
      },
      {
        description: "Debe imprimir exactamente 'Laptop cuesta 850 dólares.'",
        validate: (code, output) => output.trim() === "Laptop cuesta 850 dólares."
      }
    ]
  },

  // NIVEL 5
  {
    id: "n5_funciones",
    level: 5,
    levelTitle: "Nivel 5: Funciones y Modularidad",
    title: "8. Creando Funciones Reutilizables",
    localPath: "Herd/phpcamp/08_funciones.php",
    instructions: `
### Funciones en PHP

Las funciones agrupan bloques de código lógicos para evitar repetir código. En PHP se crean con la palabra reservada \`function\` y pueden opcionalmente retornar un valor usando \`return\`:

\`\`\`php
function sumar($a, $b) {
    return $a + $b;
}

$resultado = sumar(5, 10);
echo $resultado; // Imprime 15
\`\`\`

#### Instrucciones del reto:
1. Define una función llamada \`calcularDescuento\` que acepte dos parámetros: \`$precio\` y \`$porcentaje\`.
2. La función debe **retornar** (no imprimir) el valor final del precio después de restarle el descuento.
   - Fórmula: \`precio - (precio * (porcentaje / 100))\`
3. Llama a la función pasando un precio de \`100\` y un porcentaje de \`20\`, y usa \`echo\` para imprimir el resultado.
    `,
    initialCode: `<?php
// 1. Crea la función calcularDescuento abajo


// 2. Llama a la función e imprime su resultado
`,
    tests: [
      {
        description: "Debe definir una función llamada 'calcularDescuento'",
        validate: (code, output) => code.includes("function calcularDescuento")
      },
      {
        description: "La función debe usar 'return' para entregar el valor calculado",
        validate: (code, output) => code.includes("return")
      },
      {
        description: "Debe calcular correctamente el descuento de 100 con 20% (Salida: 80)",
        validate: (code, output) => {
          let testCode = code + "\n echo calcularDescuento(100, 20);";
          let evalOut = evalPHP(testCode).output;
          return evalOut.includes("80");
        }
      },
      {
        description: "Debe calcular correctamente el descuento de 250 con 10% (Salida: 225)",
        validate: (code, output) => {
          let testCode = code + "\n echo calcularDescuento(250, 10);";
          let evalOut = evalPHP(testCode).output;
          return evalOut.includes("225");
        }
      }
    ]
  },

  // NIVEL 6
  {
    id: "n6_string_helpers",
    level: 6,
    levelTitle: "Nivel 6: Manipulación de Datos",
    title: "9. Modificando Texto (Srtings)",
    localPath: "Herd/phpcamp/09_strings.php",
    instructions: `
### Funciones integradas para strings

PHP cuenta con cientos de funciones pre-construidas sumamente útiles para manipular datos. Veamos dos muy comunes:
- \`strlen($texto)\`: Devuelve la longitud de un string.
- \`strtoupper($texto)\`: Convierte todo el texto a MAYÚSCULAS.

\`\`\`php
$frase = "hola";
echo strlen($frase); // Imprime 4
echo strtoupper($frase); // Imprime "HOLA"
\`\`\`

#### Instrucciones del reto:
1. Se te da una variable \`$nombre\`.
2. Utiliza las funciones integradas de PHP para imprimir en pantalla la longitud del nombre de la siguiente manera:
\`EL NOMBRE TIENE X CARACTERES\` (donde \`EL NOMBRE\` debe salir en **mayúsculas** y \`X\` debe ser la cantidad real de caracteres del string).
    `,
    initialCode: `<?php
$nombre = "valeria";

// Escribe tu código aquí abajo
`,
    tests: [
      {
        description: "Debe usar la función 'strtoupper' para cambiar el nombre a mayúsculas",
        validate: (code, output) => code.includes("strtoupper")
      },
      {
        description: "Debe usar la función 'strlen' para contar los caracteres del nombre",
        validate: (code, output) => code.includes("strlen")
      },
      {
        description: "La salida esperada para 'valeria' debe ser exactamente 'VALERIA TIENE 7 CARACTERES'",
        validate: (code, output) => {
          let testCode = code.replace(/\$nombre\s*=\s*['"][^'"]+['"]/, "$nombre = 'valeria'");
          return evalPHP(testCode).output.trim() === "VALERIA TIENE 7 CARACTERES";
        }
      },
      {
        description: "La salida esperada para 'pedro' debe ser exactamente 'PEDRO TIENE 5 CARACTERES'",
        validate: (code, output) => {
          let testCode = code.replace(/\$nombre\s*=\s*['"][^'"]+['"]/, "$nombre = 'pedro'");
          return evalPHP(testCode).output.trim() === "PEDRO TIENE 5 CARACTERES";
        }
      }
    ]
  },

  // NIVEL 7
  {
    id: "n7_clases",
    level: 7,
    levelTitle: "Nivel 7: Programación Orientada a Objetos",
    title: "10. Creando una Clase y un Objeto",
    localPath: "Herd/phpcamp/10_oop.php",
    instructions: `
### Programación Orientada a Objetos (POO) en PHP

PHP tiene un sistema completo y robusto para POO. Una **clase** es la plantilla/plano para crear objetos reales.
- Las variables dentro de una clase se llaman **propiedades**.
- Las funciones dentro de una clase se llaman **métodos**.
- Se utiliza \`$this->\` para hacer referencia a las propiedades y métodos del propio objeto.

\`\`\`php
class Coche {
    public $marca;

    public function encender() {
        return "El coche está listo.";
    }
}

$miCoche = new Coche();
$miCoche->marca = "Toyota";
echo $miCoche->encender();
\`\`\`

#### Instrucciones del reto:
1. Crea una clase llamada \`Usuario\`.
2. Agrégale una propiedad pública llamada \`$nombre\`.
3. Agrégale un método público llamado \`saludar()\` que retorne exactamente el mensaje: \`Hola, soy \` concatenado con la propiedad \`$nombre\`. (Usa \`$this->nombre\`).
4. Instancia la clase creando un objeto llamado \`$usuario1\`.
5. Asigna el valor \`Mateo\` a su propiedad \`nombre\`.
6. Imprime la salida del método \`saludar()\` de este objeto.
    `,
    initialCode: `<?php
// 1. Define la clase Usuario aquí


// 2. Crea el objeto, asigna la propiedad e imprime el saludo abajo
`,
    tests: [
      {
        description: "Debe declarar la clase 'Usuario'",
        validate: (code, output) => code.includes("class Usuario")
      },
      {
        description: "Debe definir la propiedad pública '$nombre'",
        validate: (code, output) => /public\s+\$nombre/.test(code)
      },
      {
        description: "Debe definir el método 'saludar()' que use '$this->nombre'",
        validate: (code, output) => code.includes("function saludar") && code.includes("$this->nombre")
      },
      {
        description: "Debe instanciar el objeto usando 'new Usuario()'",
        validate: (code, output) => code.includes("new Usuario")
      },
      {
        description: "La salida del programa debe ser exactamente: 'Hola, soy Mateo'",
        validate: (code, output) => output.trim() === "Hola, soy Mateo"
      }
    ]
  },

  // NIVEL 8
  {
    id: "n8_bases_datos",
    level: 8,
    levelTitle: "Nivel 8: Bases de Datos y Laravel",
    title: "11. Consultando Bases de Datos con PDO",
    localPath: "Herd/phpcamp/11_pdo.php",
    instructions: `
### Conexión a Base de Datos con PDO (PHP Data Objects)

En PHP profesional, conectarse a bases de datos como PostgreSQL o MySQL se realiza mediante **PDO**, que proporciona una capa de abstracción segura frente a inyecciones SQL usando consultas preparadas.

\`\`\`php
// Ejemplo de conexión a PostgreSQL/MySQL
$pdo = new PDO("mysql:host=localhost;dbname=mi_db", "root", "");
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE activo = :activo");
$stmt->execute(['activo' => true]);
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
\`\`\`

#### Introducción a la Arquitectura MVC en Laravel:
Laravel nos evita escribir todo el código de conexión a mano organizando la lógica bajo el patrón **Model-View-Controller (Modelo-Vista-Controlador)**:
1. **Modelos (Models)**: Representan las tablas de tu base de datos y tus reglas de negocio (ej. un modelo \`User\` conectado a la tabla \`users\`).
2. **Vistas (Views)**: La pantalla HTML final que ve el usuario.
3. **Controladores (Controllers)**: El intermediario. Recibe la petición del usuario, consulta los datos al Modelo, y decide qué Vista retornar.

#### Instrucciones del reto (Simulando una Consulta de base de datos):
Simularemos una consulta SQL de Laravel para traer datos a una vista.
1. Se te proporciona una clase base de simulación que contiene el método \`find($id)\`.
2. Llama al método estático \`UsuarioDB::find(1)\` y guarda su resultado en la variable \`$usuario\`. (Este método te devuelve un array asociativo del registro del usuario en la base de datos).
3. Imprime en pantalla exactamente el texto: \`Usuario consultado: \` seguido del correo del usuario consultado (clave \`email\` del array).
    `,
    initialCode: `<?php
// Clase simuladora de Base de Datos - ¡NO MODIFICAR!
class UsuarioDB {
    public static function find($id) {
        return [
            "id" => $id,
            "nombre" => "Sofía",
            "email" => "sofia@gmail.com"
        ];
    }
}

// Escribe tu código aquí abajo
`,
    tests: [
      {
        description: "Debe invocar el método estático 'UsuarioDB::find(1)'",
        validate: (code, output) => code.includes("UsuarioDB::find(1)")
      },
      {
        description: "Debe guardar la respuesta en la variable '$usuario'",
        validate: (code, output) => /\$usuario\s*=/.test(code)
      },
      {
        description: "La salida del programa debe ser exactamente: 'Usuario consultado: sofia@gmail.com'",
        validate: (code, output) => output.trim() === "Usuario consultado: sofia@gmail.com"
      }
    ]
  }
];

// PHP Interpreter / Sandbox Simulator inside JS (for fast offline instant interactive checking)
function evalPHP(code) {
  let output = "";
  // Simple sandbox interpreter for standard PHP challenges
  try {
    // Strip php tags for safety/parsing
    let jsEvalCode = code
      .replace(/<\?php/g, "")
      .replace(/\?>/g, "");

    // Regex translators for PHP structures to JavaScript so we evaluate instantly and securely on client
    // 1. echo / print
    let outputLines = [];
    
    // Simulate echo
    const echo = (...args) => {
      outputLines.push(args.join(""));
    };
    
    // Convert basic PHP variables to JS variables
    // Replace $var with let var
    let cleanCode = jsEvalCode;
    
    // Simulate UsuarioDB class for level 8
    class UsuarioDB {
        static find(id) {
            return {
                id: id,
                nombre: "Sofía",
                email: "sofia@gmail.com"
            };
        }
    }

    // Convert php string concatenation "." to "+"
    // Avoid converting dots inside numbers/floats or decimals, or strings.
    // This is a simple parser helper for student-level PHP syntax
    cleanCode = cleanCode.replace(/(['"][^'"]*['"]|\$[a-zA-Z0-9_]+)\s*\.\s*(['"][^'"]*['"]|\$[a-zA-Z0-9_]+)/g, "$1 + $2");
    cleanCode = cleanCode.replace(/\$([a-zA-Z0-9_]+)\[['"]([^'"]+)['"]\]/g, "$1.$2"); // array associative keys $arr['key'] to arr.key
    cleanCode = cleanCode.replace(/->([a-zA-Z0-9_]+)/g, ".$1"); // $this->prop to this.prop
    cleanCode = cleanCode.replace(/\$this/g, "this");
    cleanCode = cleanCode.replace(/public\s+\$([a-zA-Z0-9_]+)/g, "public $1");
    cleanCode = cleanCode.replace(/class\s+([a-zA-Z0-9_]+)/g, "class $1");
    cleanCode = cleanCode.replace(/new\s+Usuario\(\)/g, "new Usuario()");

    // Translate variables $name -> name (excluding properties in classes)
    cleanCode = cleanCode.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, g1) => {
      // Don't replace inside words
      if (g1 === "this") return "this";
      return g1;
    });

    // Translate echo statements
    cleanCode = cleanCode.replace(/echo\s+([^;]+);/g, "echo($1);");
    
    // strlen & strtoupper helpers
    const strlen = (str) => str.length;
    const strtoupper = (str) => str.toUpperCase();
    
    // Run!
    let runFn = new Function('echo', 'strlen', 'strtoupper', 'UsuarioDB', `
      try {
        ${cleanCode}
      } catch(e) {
        throw new Error(e.message);
      }
    `);
    
    runFn(echo, strlen, strtoupper, UsuarioDB);
    output = outputLines.join("");
    return { success: true, output: output, error: null };
  } catch (err) {
    return { success: false, output: output, error: err.message };
  }
}
