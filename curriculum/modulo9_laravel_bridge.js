const MODULO9_LARAVEL_BRIDGE = [
  {
    id: "m9_poo_basico",
    level: 9,
    levelTitle: "Nivel 9: El Puente Hacia Laravel",
    title: "1. Tu Primera Clase",
    localPath: "Herd/phpcamp/m9_01_poo.php",
    instructions: `
### Programación Orientada a Objetos (POO)

Laravel está completamente basado en Clases y Objetos. Una **Clase** es como un molde o plano de construcción, y un **Objeto** es el producto terminado fabricado con ese molde.

Utilizamos propiedades (variables dentro de la clase) para guardar información y la palabra clave \`new\` para instanciar (crear) un objeto.

\`\`\`php
class Coche {
    public $color;
}

$miCoche = new Coche();
$miCoche->color = "Rojo"; // Asignación con el operador flecha ->
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una clase llamada \`Usuario\`.
2. Añádele una propiedad pública llamada \`$nombre\`.
3. Crea un objeto de esa clase llamado \`$miUsuario\` usando la palabra \`new\`.
4. Asígnale a la propiedad \`nombre\` del objeto el valor \`"María"\`.
5. Imprime el nombre del objeto usando la flecha \`->\` para acceder a él: \`echo $miUsuario->nombre;\`.
    `,
    initialCode: `<?php
// 1. Crea la clase Usuario con una propiedad pública $nombre


// 2. Crea la instancia $miUsuario y ponle el nombre "María"


// 3. Imprime la propiedad nombre del objeto

`,
    tests: [
      {
        description: "Debe declarar la clase Usuario",
        validate: (code, output) => code.includes("class Usuario")
      },
      {
        description: "Debe imprimir 'María'",
        validate: (code, output) => output.trim() === "María"
      }
    ]
  },
  {
    id: "m9_poo_constructores",
    level: 9,
    levelTitle: "Nivel 9: El Puente Hacia Laravel",
    title: "2. Constructores y Métodos",
    localPath: "Herd/phpcamp/m9_02_constructor.php",
    instructions: `
### Métodos y el método mágico __construct()

Las funciones dentro de una clase se llaman **Métodos** y definen las acciones que puede realizar un objeto.

El **Constructor** (\`__construct\`) es un método especial y "mágico" que PHP ejecuta de forma automática en cuanto creamos un objeto con \`new\`. Se usa típicamente para inicializar las propiedades del objeto.

Para referirnos a las propiedades de la clase desde adentro de sus propios métodos, usamos la variable especial \`$this\` seguida de la flecha \`->\`.

\`\`\`php
class Persona {
    public $nombre;

    // Constructor que recibe un nombre
    public function __construct($n) {
        $this->nombre = $n;
    }

    public function saludar() {
        return "Hola " . $this->nombre;
    }
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Escribe la clase \`Persona\` exactamente como en la explicación:
   - Con la propiedad pública \`$nombre\`.
   - Con el constructor \`__construct($n)\` que asigne el valor a \`$this->nombre\`.
   - Con el método público \`saludar()\` que retorne (\`return\`) la frase \`"Hola "\` seguida de \`$this->nombre\`.
2. Crea un objeto llamado \`$miPersona\` pasándole el argumento \`"Sofía"\` al instanciarlo: \`new Persona("Sofía")\`.
3. Llama al método \`saludar()\` de tu objeto \`$miPersona\` e imprime el resultado usando \`echo\`.
    `,
    initialCode: `<?php
// 1. Declara la clase Persona con su constructor y método saludar


// 2. Crea el objeto $miPersona con el nombre "Sofía"


// 3. Imprime el resultado de llamar a saludar()

`,
    tests: [
      {
        description: "Debe declarar la clase Persona",
        validate: (code, output) => code.includes("class Persona")
      },
      {
        description: "Debe incluir el método mágico __construct",
        validate: (code, output) => code.includes("__construct")
      },
      {
        description: "Debe incluir el método saludar",
        validate: (code, output) => code.includes("function saludar")
      },
      {
        description: "Debe imprimir 'Hola Sofía'",
        validate: (code, output) => output.trim() === "Hola Sofía"
      }
    ]
  },
  {
    id: "m9_poo_herencia",
    level: 9,
    levelTitle: "Nivel 9: El Puente Hacia Laravel",
    title: "3. Herencia en Clases",
    localPath: "Herd/phpcamp/m9_03_herencia.php",
    instructions: `
### Herencia: Reutilizando Estructuras (extends)

La **Herencia** es un pilar de la POO. Permite que una clase (hijo) adquiera todas las propiedades y métodos de otra clase (padre).

En PHP usamos la palabra clave \`extends\` para indicar que heredamos de otra clase.

\`\`\`php
class Vehiculo {
    public $marca;
}

class Moto extends Vehiculo {
    public function obtenerMensaje() {
        return "Moto marca " . $this->marca;
    }
}
\`\`\`

---

#### 🚀 Instrucciones:
1. Declara la clase padre \`Vehiculo\` con una propiedad pública \`$marca\`.
2. Declara la clase hija \`Moto\` que herede (\`extends\`) de \`Vehiculo\`.
3. Dentro de \`Moto\`, define un método público llamado \`obtenerMensaje()\` que retorne (\`return\`) el texto \`"Moto marca "\` concatenado con \`$this->marca\`.
4. Crea una instancia de \`Moto\` llamada \`$miMoto\`.
5. Asígnale a su propiedad \`marca\` el valor \`"Yamaha"\` (observa cómo la clase \`Moto\` tiene esa propiedad gracias a la herencia).
6. Imprime en pantalla el resultado de llamar al método \`obtenerMensaje()\` de tu objeto \`$miMoto\`.
    `,
    initialCode: `<?php
// 1. Crea la clase Vehiculo


// 2. Crea la clase Moto que hereda de Vehiculo con obtenerMensaje()


// 3. Crea la instancia $miMoto, asigna marca "Yamaha" e imprime obtenerMensaje()

`,
    tests: [
      {
        description: "Debe declarar la clase Vehiculo",
        validate: (code, output) => code.includes("class Vehiculo")
      },
      {
        description: "Debe declarar que la clase Moto hereda de Vehiculo",
        validate: (code, output) => /class\s+Moto\s+extends\s+Vehiculo/i.test(code)
      },
      {
        description: "Debe imprimir 'Moto marca Yamaha'",
        validate: (code, output) => output.trim() === "Moto marca Yamaha"
      }
    ]
  }
];
