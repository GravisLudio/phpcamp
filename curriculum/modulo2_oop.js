const MODULO2_CHALLENGES = [
  {
    id: "m2_properties",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "1. Propiedades y Tipado de Clases",
    localPath: "Herd/phpcamp/m2_01_props.php",
    instructions: `
### Propiedades Tipadas en PHP
En PHP profesional, declaramos las propiedades de las clases con tipos estrictos para garantizar la integridad de los objetos:
\`\`\`php
class Cliente {
    public string $nombre;
    public int $puntos = 0; // Valor inicial
}
\`\`\`

#### Instrucciones:
1. Crea una clase llamada \`Producto\`.
2. Añádele una propiedad pública de tipo string llamada \`$codigo\`.
3. Añádele una propiedad pública de tipo flotante llamada \`$precio\`.
4. Instancia la clase creando el objeto \`$prod\`, asígnale el código \`PROD-100\` y el precio \`49.99\`.
5. Imprime en pantalla la concatenación de la siguiente manera: \`PROD-100 cuesta 49.99\` utilizando el objeto.
    `,
    initialCode: `<?php
// 1. Crea la clase Producto con propiedades tipadas


// 2. Instancia, asigna valores e imprime
`,
    tests: [
      {
        description: "Debe declarar class Producto",
        validate: (code, output) => code.includes("class Producto")
      },
      {
        description: "Debe tipar las propiedades: string $codigo y float $precio",
        validate: (code, output) => /public\s+string\s+\$codigo/.test(code) && /public\s+float\s+\$precio/.test(code)
      },
      {
        description: "Debe imprimir la salida esperada 'PROD-100 cuesta 49.99'",
        validate: (code, output) => output.trim() === "PROD-100 cuesta 49.99"
      }
    ]
  },
  {
    id: "m2_constructor_promotion",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "2. Constructor Promotion (PHP 8)",
    localPath: "Herd/phpcamp/m2_02_promo.php",
    instructions: `
### Constructor Property Promotion (PHP 8)
En versiones anteriores de PHP, declarar un constructor requería repetir el nombre de la variable tres veces (propiedad, parámetro y asignación). PHP 8 introduce la promoción de propiedades en el constructor:
\`\`\`php
class Usuario {
    public function __construct(
        public string $nombre,
        public string $email
    ) {}
}
\`\`\`
¡Con solo añadir el modificador de acceso (\`public\`, \`private\`, \`protected\`) en los parámetros del constructor, PHP declara y asigna la propiedad automáticamente!

#### Instrucciones:
1. Crea una clase llamada \`Empleado\`.
2. Define su constructor usando la **promoción de propiedades** para declarar una propiedad pública de tipo string llamada \`$nombre\` y una propiedad pública de tipo entero llamada \`$sueldo\`.
3. Instancia un objeto llamado \`$emp\` pasando el nombre \`Sofía\` y el sueldo \`2500\`.
4. Imprime el nombre del empleado.
    `,
    initialCode: `<?php
// Crea la clase Empleado usando Constructor Promotion abajo
`,
    tests: [
      {
        description: "Debe usar constructor promotion (ej. public string $nombre en los parámetros del __construct)",
        validate: (code, output) => /__construct\s*\(\s*public\s+string\s+\$nombre/.test(code)
      },
      {
        description: "Debe imprimir 'Sofía'",
        validate: (code, output) => output.trim() === "Sofía"
      }
    ]
  },
  {
    id: "m2_encapsulation",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "3. Encapsulamiento (Getters y Setters)",
    localPath: "Herd/phpcamp/m2_03_encapsulation.php",
    instructions: `
### Encapsulamiento: getters y setters
El encapsulamiento protege el estado interno de un objeto. Hacemos las propiedades privadas (\`private\`) para que no puedan modificarse desde fuera de la clase y creamos métodos públicos (\`get\` y \`set\`) para controlarlas y validarlas.
\`\`\`php
class Cuenta {
    private float $saldo = 0;
    public function getSaldo(): float { return $this->saldo; }
}
\`\`\`

#### Instrucciones:
1. Crea una clase llamada \`CuentaBancaria\`.
2. Declara una propiedad **privada** de tipo flotante llamada \`$saldo\`.
3. Crea un constructor que reciba y asigne el saldo inicial.
4. Crea el método público \`getSaldo(): float\` para retornar el saldo.
5. Crea el método público \`depositar(float $monto): void\`. Este método debe sumarle el monto al saldo **solo** si \`$monto > 0\`.
6. Instancia la clase con saldo \`500\`, deposita \`150\`, e imprime el saldo final.
    `,
    initialCode: `<?php
// Crea la clase CuentaBancaria con encapsulamiento abajo
`,
    tests: [
      {
        description: "Debe tener una propiedad privada: 'private float $saldo'",
        validate: (code, output) => /private\s+float\s+\$saldo/.test(code)
      },
      {
        description: "Debe tener el getter 'getSaldo'",
        validate: (code, output) => code.includes("function getSaldo")
      },
      {
        description: "Debe validar que el depósito sea mayor a 0",
        validate: (code, output) => {
          let testCode = code + "\n $cta = new CuentaBancaria(100); $cta->depositar(-50); echo $cta->getSaldo();";
          return evalPHP(testCode).output.includes("100"); // No debió descontar ni sumar
        }
      },
      {
        description: "Debe retornar saldo de '650' al depositar 150 a una cuenta de 500",
        validate: (code, output) => output.includes("650")
      }
    ]
  },
  {
    id: "m2_inheritance",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "4. Herencia y Reutilización",
    localPath: "Herd/phpcamp/m2_04_inheritance.php",
    instructions: `
### Herencia en PHP (extends)
La herencia permite crear una clase hija que hereda todas las propiedades y métodos públicos o protegidos de una clase padre.
\`\`\`php
class Vehiculo {
    public function encender() { return "Vehículo encendido"; }
}
class Moto extends Vehiculo {}
\`\`\`

#### Instrucciones:
1. Crea la clase padre \`Usuario\`. Debe tener una propiedad protegida (\`protected\`) string llamada \`$nombre\` y un constructor que la asigne.
2. Crea la clase hija \`Administrador\` que herede de \`Usuario\`.
3. Añádele a la clase \`Administrador\` el método público \`getRol()\` que retorne el texto \`Administrador: \` concatenado con la propiedad \`$nombre\`. (Como es protegida, la clase hija tiene acceso usando \`$this->nombre\`).
4. Instancia un administrador con nombre \`Mateo\` e imprime la salida de \`getRol()\`.
    `,
    initialCode: `<?php
// 1. Crea la clase Usuario con propiedad protected $nombre


// 2. Crea la clase Administrador y hereda de Usuario


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "La propiedad nombre debe ser protected",
        validate: (code, output) => /protected\s+string\s+\$nombre/.test(code)
      },
      {
        description: "Administrador debe heredar de Usuario usando 'extends'",
        validate: (code, output) => /class\s+Administrador\s+extends\s+Usuario/.test(code)
      },
      {
        description: "Debe retornar 'Administrador: Mateo'",
        validate: (code, output) => output.trim() === "Administrador: Mateo"
      }
    ]
  },
  {
    id: "m2_overriding",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "5. Sobrescritura de Métodos (Overriding)",
    localPath: "Herd/phpcamp/m2_05_override.php",
    instructions: `
### Sobrescritura de Métodos y parent::
Una clase hija puede redefinir o "sobrescribir" un método heredado de su clase padre. Si quieres ejecutar el comportamiento original del padre y sumarle más lógica, puedes llamarlo usando la palabra clave \`parent::\`:
\`\`\`php
public function saludar() {
    return parent::saludar() . " ¡Qué tal!";
}
\`\`\`

#### Instrucciones:
1. Se te proporciona la clase base \`Email\`.
2. Crea la clase \`EmailUrgente\` que extienda de \`Email\`.
3. Sobrescribe el método \`enviar()\` en la clase \`EmailUrgente\` para que llame al método original del padre usando \`parent::enviar()\` y le concatene al final el texto \` [URGENTE]\`.
4. Instancia la clase \`EmailUrgente\` e imprime la salida de su método \`enviar()\`.
    `,
    initialCode: `<?php
class Email {
    public function enviar() {
        return "Email enviado";
    }
}

// Crea la clase EmailUrgente heredando y sobrescribiendo enviar()
`,
    tests: [
      {
        description: "Debe usar parent::enviar() dentro del método de la clase hija",
        validate: (code, output) => code.includes("parent::enviar()")
      },
      {
        description: "El resultado final debe ser exactamente 'Email enviado [URGENTE]'",
        validate: (code, output) => output.trim() === "Email enviado [URGENTE]"
      }
    ]
  },
  {
    id: "m2_abstract_classes",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "6. Clases Abstractas",
    localPath: "Herd/phpcamp/m2_06_abstract.php",
    instructions: `
### Clases Abstractas en PHP
Una **clase abstracta** actúa como un plano para otras clases. No se puede instanciar directamente. Puede contener métodos normales y **métodos abstractos** (métodos sin cuerpo que todas las clases hijas están obligadas a implementar).
\`\`\`php
abstract class BaseController {
    abstract public function index();
}
\`\`\`

#### Instrucciones:
1. Crea la clase abstracta \`MetodoPago\`. Debe contener el método abstracto \`public function pagar($monto): string;\`.
2. Crea la clase \`PaypalPago\` que extienda de \`MetodoPago\` e implemente el método \`pagar\` retornando el texto \`Pagado $monto con Paypal\`.
3. Instancia \`PaypalPago\` e imprime la salida de \`pagar(50)\`.
    `,
    initialCode: `<?php
// 1. Crea la clase abstracta MetodoPago con el método abstracto pagar


// 2. Crea la clase PaypalPago implementando la lógica


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "Debe declarar la clase abstracta 'abstract class MetodoPago'",
        validate: (code, output) => /abstract\s+class\s+MetodoPago/.test(code)
      },
      {
        description: "Debe declarar el método abstracto 'abstract public function pagar'",
        validate: (code, output) => /abstract\s+public\s+function\s+pagar/.test(code)
      },
      {
        description: "Debe retornar 'Pagado 50 con Paypal'",
        validate: (code, output) => output.trim() === "Pagado 50 con Paypal"
      }
    ]
  },
  {
    id: "m2_interfaces",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "7. Interfaces y Contratos de Código",
    localPath: "Herd/phpcamp/m2_07_interface.php",
    instructions: `
### Interfaces en PHP
A diferencia de las clases abstractas, las **interfaces** no pueden contener propiedades ni lógica. Son puros contratos que definen qué métodos públicos debe tener una clase para cumplir con una firma común.
\`\`\`php
interface LoggerInterface {
    public function log(string $mensaje): void;
}
\`\`\`

#### Instrucciones:
1. Crea una interfaz llamada \`BaseDatosInterface\`. Debe obligar a implementar el método \`public function conectar(): string;\`.
2. Crea la clase \`PostgreSqlDB\` que implemente la interfaz y cuyo método \`conectar()\` retorne \`PostgreSQL Conectado\`.
3. Instancia la clase e imprime el resultado.
    `,
    initialCode: `<?php
// 1. Define la interfaz BaseDatosInterface


// 2. Crea la clase PostgreSqlDB que implemente la interfaz


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "Debe declarar 'interface BaseDatosInterface'",
        validate: (code, output) => code.includes("interface BaseDatosInterface")
      },
      {
        description: "La clase debe usar 'implements BaseDatosInterface'",
        validate: (code, output) => /implements\s+BaseDatosInterface/.test(code)
      },
      {
        description: "La salida esperada debe ser 'PostgreSQL Conectado'",
        validate: (code, output) => output.trim() === "PostgreSQL Conectado"
      }
    ]
  },
  {
    id: "m2_traits",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "8. Composición con Traits",
    localPath: "Herd/phpcamp/m2_08_traits.php",
    instructions: `
### Reutilización de Código con Traits
Los \`traits\` son bloques de código reutilizables inyectables en múltiples clases independientes. Te permiten saltarte la limitación de la herencia simple de PHP.
\`\`\`php
trait Helper {
    public function saludar() { return "Hola"; }
}
class Cliente {
    use Helper;
}
\`\`\`

#### Instrucciones:
1. Crea un trait llamado \`ExportadorJSON\`. Debe contener un método público llamado \`toJson($datos)\` que retorne \`json_encode($datos)\` (puedes simularlo retornando el string formateado).
2. Crea la clase \`ReporteVentas\`.
3. Agrégale \`use ExportadorJSON;\` a la clase \`ReporteVentas\`.
4. Instancia \`ReporteVentas\`, llama al método \`toJson(['ventas' => 1500])\` heredado del trait e imprime su resultado.
    `,
    initialCode: `<?php
// 1. Crea el trait ExportadorJSON


// 2. Crea la clase ReporteVentas usando el trait


// 3. Instancia e imprime
`,
    tests: [
      {
        description: "Debe declarar 'trait ExportadorJSON'",
        validate: (code, output) => code.includes("trait ExportadorJSON")
      },
      {
        description: "La clase debe incluir 'use ExportadorJSON;'",
        validate: (code, output) => /use\s+ExportadorJSON;/.test(code)
      },
      {
        description: "Debe poder exportar y retornar la estructura en JSON o string",
        validate: (code, output) => {
          let testCode = code + "\n $rep = new ReporteVentas(); echo $rep->toJson('ok');";
          return evalPHP(testCode).output.includes("ok");
        }
      }
    ]
  },
  {
    id: "m2_static",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "9. Métodos y Propiedades Estáticos",
    localPath: "Herd/phpcamp/m2_09_static.php",
    instructions: `
### Miembros Estáticos (static)
Las propiedades y métodos declarados como estáticos (\`static\`) pertenecen a la clase misma, no a una instancia individual. Se invocan usando el operador de resolución de ámbito (\`::\`) y dentro de la propia clase hacemos referencia a ellos usando \`self::\`.
\`\`\`php
class Config {
    public static string $url = 'localhost';
    public static function getUrl() { return self::$url; }
}
echo Config::getUrl();
\`\`\`

#### Instrucciones:
1. Crea una clase llamada \`Conversor\`.
2. Declara un método estático público llamado \`aMayusculas($texto)\` que devuelva el texto en mayúsculas usando la función de PHP \`strtoupper($texto)\`.
3. Llama al método directamente a través de la clase (sin instanciar con new) pasando la cadena \`phpcamp\` e imprime el resultado.
    `,
    initialCode: `<?php
// Crea la clase Conversor con el método estático aMayusculas e imprímelo abajo
`,
    tests: [
      {
        description: "Debe declarar el método como 'public static function aMayusculas'",
        validate: (code, output) => /public\s+static\s+function\s+aMayusculas/.test(code)
      },
      {
        description: "Debe invocar el método usando 'Conversor::aMayusculas'",
        validate: (code, output) => code.includes("Conversor::aMayusculas")
      },
      {
        description: "La salida esperada debe ser 'PHPCAMP'",
        validate: (code, output) => output.trim() === "PHPCAMP"
      }
    ]
  },
  {
    id: "m2_namespaces",
    level: 2,
    levelTitle: "Módulo 2: Programación Orientada a Objetos",
    title: "10. Namespaces y Modularización",
    localPath: "app/Services/Paypal.php",
    instructions: `
### Namespaces en PHP
En proyectos profesionales y Laravel, los **namespaces** (espacios de nombres) evitan conflictos entre clases con el mismo nombre y estructuran el código de forma lógica según su carpeta. Se declaran al inicio del archivo:
\`\`\`php
namespace App\\Services;
class Pago {}
\`\`\`
Para instanciarla desde otra carpeta, importamos la clase con \`use\`:
\`\`\`php
use App\\Services\\Pago;
$p = new Pago();
\`\`\`

#### Instrucciones (Simulando Namespaces):
1. Declara que la clase \`Usuario\` pertenece al espacio de nombres \`App\\Models\`.
2. Para simular el namespace en el intérprete, declara:
\`\`\`php
namespace App\\Models;
class Usuario {
    public function getRol() { return "Admin"; }
}
\`\`\`
3. Sal del namespace declarando un espacio global o de backend, e instancia la clase usando su ruta absoluta:
\`\`\`php
namespace App;
$u = new \\App\\Models\\Usuario();
echo $u->getRol();
\`\`\`
    `,
    initialCode: `<?php
// Define el namespace App\\Models y la clase Usuario


// Define el namespace App, instancia Usuario usando su namespace completo e imprime su rol
`,
    tests: [
      {
        description: "Debe declarar el namespace 'namespace App\\Models;'",
        validate: (code, output) => /namespace\s+App\\Models\s*;/.test(code)
      },
      {
        description: "Debe instanciar usando el namespace absoluto o importándolo con 'use'",
        validate: (code, output) => code.includes("App\\Models\\Usuario") || code.includes("Models\\Usuario")
      },
      {
        description: "La salida final debe ser 'Admin'",
        validate: (code, output) => output.trim() === "Admin"
      }
    ]
  }
];
