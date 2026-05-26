const MODULO9_LARAVEL_BRIDGE = [
  {
    id: "m9_poo_basico",
    level: 9,
    levelTitle: "Nivel 9: El Puente Hacia Laravel",
    title: "1. Tu Primera Clase",
    localPath: "Herd/phpcamp/m9_01_poo.php",
    instructions: `
### Programación Orientada a Objetos (POO)

Laravel está completamente basado en Clases y Objetos. Una **Clase** es como un molde de galletas, y un **Objeto** es la galleta terminada.

\`\`\`php
class Coche {
    public $color;
}

$miCoche = new Coche();
$miCoche->color = "Rojo";
\`\`\`

---

#### 🚀 Instrucciones:
1. Crea una clase llamada \`Usuario\`.
2. Añádele una propiedad pública llamada \`$nombre\`.
3. Crea un objeto de esa clase llamado \`$miUsuario\` usando la palabra \`new\`.
4. Asígnale a la propiedad \`nombre\` el valor \`"María"\`.
5. Imprime el nombre del objeto usando la flecha \`->\`: \`echo $miUsuario->nombre;\`.
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
  }
];
