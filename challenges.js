const INITIAL_GUIDE = `# ¡Bienvenido a PHPCamp! 🚀

Esta plataforma está diseñada para que tú y tus compañeros dominen **PHP, Bases de Datos y Laravel** en tiempo récord de manera interactiva, llevándolos desde lo básico hasta conceptos avanzados de nivel medio (Mid-Level Developer).

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
  // --- TRACK 1: SINTAXIS Y OPERADORES AVANZADOS ---
  {
    id: "n1_hola_mundo",
    level: 1,
    levelTitle: "Nivel 1: Sintaxis Básica y Operadores",
    title: "1. Salida y Variables",
    localPath: "Herd/phpcamp/01_hola.php",
    instructions: `
### Sintaxis y Variables en PHP
Todo código PHP se ejecuta dentro de etiquetas de apertura \`<?php\`. La concatenación se hace con el punto (\`.\`).
Escribe un script que imprima \`¡Hola, PHPCamp!\`.
    `,
    initialCode: `<?php
// Escribe tu código abajo
`,
    tests: [
      {
        description: "Debe usar 'echo' o 'print'",
        validate: (code, output) => code.includes("echo") || code.includes("print")
      },
      {
        description: "Debe imprimir '¡Hola, PHPCamp!'",
        validate: (code, output) => output.trim() === "¡Hola, PHPCamp!"
      }
    ]
  },
  {
    id: "n1_coalescencia",
    level: 1,
    levelTitle: "Nivel 1: Sintaxis Básica y Operadores",
    title: "2. Operador Coalescente Nulo (??)",
    localPath: "Herd/phpcamp/02_null.php",
    instructions: `
### El operador ?? (Null Coalescing)
Evita errores de variables no definidas o nulas. Retorna el primer valor si existe y no es nulo; de lo contrario, evalúa el segundo.
\`\`\`php
$nombre = $usuario['nombre'] ?? 'Invitado';
\`\`\`
#### Instrucciones:
Asigna a \`$resultado\` el valor de \`$config['tema']\` si existe, o en su defecto \`oscuro\`.
    `,
    initialCode: `<?php
$config = ['idioma' => 'es']; // Sin clave 'tema'

// Escribe la asignación a $resultado usando ??
`,
    tests: [
      {
        description: "Debe usar el operador '??'",
        validate: (code, output) => code.includes("??")
      },
      {
        description: "Debe evaluar correctamente a 'oscuro'",
        validate: (code, output) => {
          let res = evalPHP(code + "\necho $resultado;");
          return res.output.trim() === "oscuro";
        }
      }
    ]
  },

  // --- TRACK 2: CONTROL DE FLUJO E INTERMEDIOS ---
  {
    id: "n2_match",
    level: 2,
    levelTitle: "Nivel 2: Estructuras de Control Avanzadas",
    title: "3. La expresión Match de PHP 8",
    localPath: "Herd/phpcamp/03_match.php",
    instructions: `
### Match vs Switch
\`match\` devuelve valores directamente, realiza comparación estricta (\`===\`) y no requiere sentencias \`break\`.
\`\`\`php
$salida = match($estado) {
    200 => 'OK',
    default => 'Error'
};
\`\`\`
#### Instrucciones:
Crea un \`match\` para evaluar \`$codigo\`. Si es \`200\` o \`201\` retorna \`Exitoso\`, si es \`404\` retorna \`No encontrado\`, y por defecto retorna \`Desconocido\`. Imprime el resultado.
    `,
    initialCode: `<?php
$codigo = 200;

// Escribe tu estructura match aquí
`,
    tests: [
      {
        description: "Debe usar la palabra clave 'match'",
        validate: (code, output) => code.includes("match")
      },
      {
        description: "Retorna 'Exitoso' para 200 o 201",
        validate: (code, output) => {
          let test1 = code.replace(/\$codigo\s*=\s*\d+/, "$codigo = 201");
          return evalPHP(test1).output.trim() === "Exitoso";
        }
      },
      {
        description: "Retorna 'No encontrado' para 404",
        validate: (code, output) => {
          let test2 = code.replace(/\$codigo\s*=\s*\d+/, "$codigo = 404");
          return evalPHP(test2).output.trim() === "No encontrado";
        }
      }
    ]
  },

  // --- TRACK 3: ARRAYS Y FUNCIONES ANÓNIMAS (MID-LEVEL) ---
  {
    id: "n3_array_map",
    level: 3,
    levelTitle: "Nivel 3: Estructuras de Datos y Callbacks",
    title: "4. Mapeando Arreglos (array_map)",
    localPath: "Herd/phpcamp/04_map.php",
    instructions: `
### Callbacks y array_map
\`array_map\` aplica una función callback a cada elemento de un array, retornando un nuevo array.
\`\`\`php
$dobles = array_map(fn($n) => $n * 2, $numeros);
\`\`\`
#### Instrucciones:
Usa \`array_map\` con una función flecha (\`fn()\`) para multiplicar por \`1.15\` (aplicar 15% de impuesto) todos los precios en el array \`$precios\`. Imprime los resultados separados por espacios usando un bucle.
    `,
    initialCode: `<?php
$precios = [100, 200, 300];

// 1. Usa array_map para aplicar el 1.15 de impuesto a $precios


// 2. Recorre e imprime los precios modificados
`,
    tests: [
      {
        description: "Debe usar la función 'array_map'",
        validate: (code, output) => code.includes("array_map")
      },
      {
        description: "Debe usar funciones flecha 'fn()'",
        validate: (code, output) => code.includes("fn")
      },
      {
        description: "La salida esperada debe ser '115 230 345'",
        validate: (code, output) => output.replace(/\s+/g, ' ').trim() === "115 230 345"
      }
    ]
  },
  {
    id: "n3_array_filter",
    level: 3,
    levelTitle: "Nivel 3: Estructuras de Datos y Callbacks",
    title: "5. Filtrado Profesional (array_filter)",
    localPath: "Herd/phpcamp/05_filter.php",
    instructions: `
### Filtrando datos con array_filter
Filtra elementos de un array usando una función callback. Si el callback retorna \`true\`, el elemento se mantiene.
\`\`\`php
$pares = array_filter($numeros, fn($n) => $n % 2 === 0);
\`\`\`
#### Instrucciones:
Filtra el array de usuarios \`$usuarios\` para obtener solo aquellos con edad mayor o igual a 18. Imprime los nombres de los aprobados.
    `,
    initialCode: `<?php
$usuarios = [
    ["nombre" => "Ana", "edad" => 15],
    ["nombre" => "Juan", "edad" => 20],
    ["nombre" => "Valeria", "edad" => 18]
];

// Escribe tu filtrado e imprime los nombres de los mayores de edad
`,
    tests: [
      {
        description: "Debe usar 'array_filter'",
        validate: (code, output) => code.includes("array_filter")
      },
      {
        description: "Debe retornar e imprimir 'Juan Valeria '",
        validate: (code, output) => output.includes("Juan") && output.includes("Valeria") && !output.includes("Ana")
      }
    ]
  },

  // --- TRACK 4: PROGRAMACIÓN ORIENTADA A OBJETOS AVANZADA (OOP) ---
  {
    id: "n4_interface",
    level: 4,
    levelTitle: "Nivel 4: Programación Orientada a Objetos",
    title: "6. Interfaces y Polimorfismo",
    localPath: "Herd/phpcamp/06_interfaces.php",
    instructions: `
### Interfaces en PHP
Una interfaz obliga a las clases a implementar métodos específicos, lo que permite lograr polimorfismo.
\`\`\`php
interface Pagable {
    public function pagar($monto);
}
\`\`\`
#### Instrucciones:
1. Crea una interfaz \`Notificador\` con el método \`enviar($mensaje)\`.
2. Crea la clase \`EmailNotificador\` que implemente \`Notificador\` y cuyo método \`enviar\` retorne \`Email enviado: \` concatenado con el mensaje.
3. Instancia la clase e imprime el resultado de \`enviar('Bienvenido')\`.
    `,
    initialCode: `<?php
// 1. Crea la interfaz Notificador


// 2. Crea la clase EmailNotificador


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "Debe declarar una interfaz 'Notificador'",
        validate: (code, output) => code.includes("interface Notificador")
      },
      {
        description: "Debe usar 'implements Notificador' en la clase",
        validate: (code, output) => /implements\s+Notificador/.test(code)
      },
      {
        description: "Debe retornar 'Email enviado: Bienvenido'",
        validate: (code, output) => output.trim() === "Email enviado: Bienvenido"
      }
    ]
  },
  {
    id: "n4_traits",
    level: 4,
    levelTitle: "Nivel 4: Programación Orientada a Objetos",
    title: "7. Reutilización de Código con Traits",
    localPath: "Herd/phpcamp/07_traits.php",
    instructions: `
### Traits en PHP
Los \`traits\` permiten inyectar métodos en múltiples clases independientes sin herencia múltiple (la cual no existe en PHP).
\`\`\`php
trait Loggeable {
    public function log($msg) { return "Log: $msg"; }
}
class Servicio {
    use Loggeable;
}
\`\`\`
#### Instrucciones:
Crea un trait \`Autorizable\` con el método \`autorizar()\` que retorne \`Acceso Concedido\`. Créale \`use Autorizable\` a la clase \`PanelAdmin\` e imprime la salida de llamar a este método.
    `,
    initialCode: `<?php
// 1. Crea el trait Autorizable


// 2. Crea la clase PanelAdmin usando el trait


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "Debe declarar el 'trait Autorizable'",
        validate: (code, output) => code.includes("trait Autorizable")
      },
      {
        description: "La clase PanelAdmin debe incluir 'use Autorizable;'",
        validate: (code, output) => /use\s+Autorizable;/.test(code)
      },
      {
        description: "El método autorizar debe imprimir 'Acceso Concedido'",
        validate: (code, output) => output.trim() === "Acceso Concedido"
      }
    ]
  },

  // --- TRACK 5: MANEJO DE ERRORES Y SEGURIDAD ---
  {
    id: "n5_exceptions",
    level: 5,
    levelTitle: "Nivel 5: Excepciones y Robustez",
    title: "8. Control de Errores (Try / Catch)",
    localPath: "Herd/phpcamp/08_exceptions.php",
    instructions: `
### Try, Catch y Exceptions
Evita que tu aplicación colapse capturando excepciones de forma controlada.
\`\`\`php
try {
    throw new Exception("Error fatal");
} catch (Exception $e) {
    echo $e->getMessage();
}
\`\`\`
#### Instrucciones:
Escribe una función \`validarEdad($edad)\` que lance una \`Exception\` con el mensaje \`Menor de edad\` si \`$edad < 18\`. Captura el error con \`try/catch\` y muestra el mensaje de la excepción si se activa.
    `,
    initialCode: `<?php
// 1. Crea la función validarEdad


// 2. Ejecuta en bloque try/catch
`,
    tests: [
      {
        description: "Debe lanzar una 'new Exception'",
        validate: (code, output) => code.includes("throw new Exception")
      },
      {
        description: "Debe capturar la excepción con 'try' y 'catch'",
        validate: (code, output) => code.includes("try") && code.includes("catch")
      },
      {
        description: "Debe imprimir el mensaje 'Menor de edad' para una edad de 15",
        validate: (code, output) => {
          let testCode = code + "\n validarEdad(15);";
          return evalPHP(testCode).output.includes("Menor de edad");
        }
      }
    ]
  },

  // --- TRACK 6: BASES DE DATOS AVANZADAS (POSTGRESQL / MYSQL) ---
  {
    id: "n6_pdo_prepared",
    level: 6,
    levelTitle: "Nivel 6: Acceso Seguro a Bases de Datos (SQL/PDO)",
    title: "9. Prepared Statements (Evitando SQL Injection)",
    localPath: "Herd/phpcamp/09_pdo.php",
    instructions: `
### Inyección SQL y Consultas Preparadas
Nunca concatenes variables dentro de cadenas SQL. Usa marcadores de posición (\`?\` o \`:param\`) y enlaza los valores de forma segura.
\`\`\`php
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
\`\`\`
#### Instrucciones (Simulando PDO):
1. Llama al método estático de la simulación segura \`Database::prepare($query)\` pasando una consulta para buscar en la tabla \`productos\` donde \`categoria = :categoria\`.
2. Ejecuta la consulta usando \`->execute(['categoria' => 'Laptops'])\`.
3. Imprime la cantidad de registros encontrados usando la propiedad \`count\`.
    `,
    initialCode: `<?php
// Clase simuladora de PDO - ¡NO MODIFICAR!
class Database {
    public static function prepare($query) {
        return new class($query) {
            private $query;
            public function __construct($q) { $this->query = $q; }
            public function execute($params) {
                if (strpos($this->query, ':categoria') !== false && $params['categoria'] === 'Laptops') {
                    $this->count = 5;
                } else {
                    $this->count = 0;
                }
                return $this;
            }
        };
    }
}

// Escribe tu código aquí abajo
`,
    tests: [
      {
        description: "Debe preparar la consulta de forma segura con ':categoria'",
        validate: (code, output) => code.includes(":categoria")
      },
      {
        description: "Debe ejecutar pasando el array asociativo ['categoria' => 'Laptops']",
        validate: (code, output) => code.includes("'categoria'") && code.includes("'Laptops'")
      },
      {
        description: "La salida esperada debe ser '5'",
        validate: (code, output) => output.trim() === "5"
      }
    ]
  },

  // --- TRACK 7: EL FRAMEWORK LARAVEL (MVC) ---
  {
    id: "n7_laravel_routes",
    level: 7,
    levelTitle: "Nivel 7: Dominando Laravel Backend",
    title: "10. Rutas con Parámetros y Validación",
    localPath: "routes/web.php",
    instructions: `
### Rutas y Controladores en Laravel
En Laravel, las rutas se definen en \`routes/web.php\`. Puedes capturar parámetros directamente en la URL:
\`\`\`php
Route::get('/usuario/{id}', function ($id) {
    return "Usuario ID: " . $id;
});
\`\`\`
#### Instrucciones:
Crea una ruta simulada en Laravel llamando al método estático \`Route::get('/producto/{id}', $callback)\` donde el callback devuelva el texto \`Producto seleccionado: \` concatenado con el parámetro \`$id\`.
    `,
    initialCode: `<?php
// Clase simuladora de Router de Laravel - ¡NO MODIFICAR!
class Route {
    public static $routes = [];
    public static function get($uri, $callback) {
        self::$routes[$uri] = $callback;
    }
}

// Declara la ruta solicitada aquí abajo
`,
    tests: [
      {
        description: "Debe declarar la ruta '/producto/{id}'",
        validate: (code, output) => code.includes("'/producto/{id}'") || code.includes('"/producto/{id}"')
      },
      {
        description: "La ruta debe retornar el mensaje esperado al llamarse con un ID",
        validate: (code, output) => {
          let testCode = code + "\n echo Route::$routes['/producto/{id}'](42);";
          return evalPHP(testCode).output.trim() === "Producto seleccionado: 42";
        }
      }
    ]
  },
  {
    id: "n7_eloquent_relations",
    level: 7,
    levelTitle: "Nivel 7: Dominando Laravel Backend",
    title: "11. Relaciones Eloquent (One to Many)",
    localPath: "app/Models/Post.php",
    instructions: `
### Relaciones en Eloquent ORM
Eloquent te permite enlazar tablas de forma orientada a objetos. Una relación **Uno a Muchos** (un Post tiene muchos Comentarios) se define usando \`hasMany\`:
\`\`\`php
class Post extends Model {
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
\`\`\`
#### Instrucciones:
Crea un modelo simulado \`Post\` con un método público \`comentarios()\` que retorne la relación llamando a \`$this->hasMany('Comentario')\`.
    `,
    initialCode: `<?php
// Clase simuladora de Model en Laravel - ¡NO MODIFICAR!
class Model {
    public function hasMany($relatedClass) {
        return "hasMany(" . $relatedClass . ")";
    }
}

// Declara la clase Post heredando de Model abajo
`,
    tests: [
      {
        description: "Debe declarar 'class Post extends Model'",
        validate: (code, output) => /class\s+Post\s+extends\s+Model/.test(code)
      },
      {
        description: "Debe tener el método público 'comentarios()'",
        validate: (code, output) => code.includes("function comentarios")
      },
      {
        description: "comentarios() debe llamar y retornar '$this->hasMany'",
        validate: (code, output) => {
          let testCode = code + "\n $post = new Post(); echo $post->comentarios();";
          return evalPHP(testCode).output.includes("hasMany(Comentario)");
        }
      }
    ]
  }
];

// PHP Interpreter / Sandbox Simulator inside JS (for fast offline instant interactive checking)
function evalPHP(code) {
  let output = "";
  try {
    let jsEvalCode = code
      .replace(/<\?php/g, "")
      .replace(/\?>/g, "");

    let outputLines = [];
    const echo = (...args) => {
      outputLines.push(args.join(""));
    };
    
    let cleanCode = jsEvalCode;
    
    // Simulate Class Database for level 6
    class Database {
        static prepare(query) {
            return {
                query: query,
                execute(params) {
                    this.count = (params['categoria'] === 'Laptops') ? 5 : 0;
                    return this;
                }
            };
        }
    }

    // Simulate Route for level 7
    class Route {
        static routes = {};
        static get(uri, callback) {
            this.routes[uri] = callback;
        }
    }

    // Simulate Model for level 8
    class Model {
        hasMany(related) {
            return "hasMany(" + related + ")";
        }
    }

    // Convert php string concatenation "." to "+"
    cleanCode = cleanCode.replace(/(['"][^'"]*['"]|\$[a-zA-Z0-9_]+)\s*\.\s*(['"][^'"]*['"]|\$[a-zA-Z0-9_]+)/g, "$1 + $2");
    cleanCode = cleanCode.replace(/\$([a-zA-Z0-9_]+)\[['"]([^'"]+)['"]\]/g, "$1.$2");
    cleanCode = cleanCode.replace(/->([a-zA-Z0-9_]+)/g, ".$1");
    cleanCode = cleanCode.replace(/\$this/g, "this");
    cleanCode = cleanCode.replace(/public\s+\$([a-zA-Z0-9_]+)/g, "public $1");
    cleanCode = cleanCode.replace(/class\s+([a-zA-Z0-9_]+)/g, "class $1");

    // Translate variables $name -> name (excluding properties in classes)
    cleanCode = cleanCode.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, (match, g1) => {
      if (g1 === "this") return "this";
      return g1;
    });

    // Translate echo statements
    cleanCode = cleanCode.replace(/echo\s+([^;]+);/g, "echo($1);");
    
    // PHP Built-ins helpers
    const strlen = (str) => str.length;
    const strtoupper = (str) => str.toUpperCase();
    const array_map = (callback, arr) => arr.map(callback);
    const array_filter = (arr, callback) => arr.filter(callback);
    
    // Run!
    let runFn = new Function('echo', 'strlen', 'strtoupper', 'array_map', 'array_filter', 'Database', 'Route', 'Model', `
      try {
        ${cleanCode}
      } catch(e) {
        throw new Error(e.message);
      }
    `);
    
    runFn(echo, strlen, strtoupper, array_map, array_filter, Database, Route, Model);
    output = outputLines.join("");
    return { success: true, output: output, error: null };
  } catch (err) {
    return { success: false, output: output, error: err.message };
  }
}
