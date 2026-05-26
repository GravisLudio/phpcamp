const MODULO6_INTERACCION = [
  {
    id: "m6_formularios_get",
    level: 6,
    levelTitle: "Nivel 6: Interacción con el Usuario",
    title: "1. Recibiendo datos de la URL ($_GET)",
    localPath: "Herd/phpcamp/m6_01_get.php",
    instructions: `
### Recibiendo Datos: La superglobal \`$_GET\`

Cuando el usuario navega a tu página o envía un formulario usando el método **GET**, los datos viajan directamente visibles en la URL (ej: \`index.php?usuario=Pedro\`).

PHP captura automáticamente esos datos y los guarda en un array asociativo especial predefinido llamado \`$_GET\`.

\`\`\`php
// Si la URL es: index.php?usuario=Pedro
echo $_GET["usuario"]; // Imprimirá "Pedro"
\`\`\`

---

#### 🚀 Instrucciones:
1. Imagina que en la URL de tu página web nos están pasando el parámetro \`?usuario=Pedro\`.
2. Para que la prueba funcione, hemos pre-asignado ese valor en la variable superglobal \`$_GET["usuario"]\`.
3. Usa la instrucción \`echo\` para imprimir el valor contenido en \`$_GET["usuario"]\`.
    `,
    initialCode: `<?php
$_GET["usuario"] = "Pedro"; // (Simulamos la URL para la prueba)

// Imprime el valor de la variable usuario en $_GET

`,
    tests: [
      {
        description: "Debe usar la superglobal $_GET['usuario']",
        validate: (code, output) => code.includes("$_GET") && code.includes("usuario")
      },
      {
        description: "Debe imprimir 'Pedro'",
        validate: (code, output) => output.trim() === "Pedro"
      }
    ]
  },
  {
    id: "m6_formularios_post",
    level: 6,
    levelTitle: "Nivel 6: Interacción con el Usuario",
    title: "2. Recibiendo datos de Formularios ($_POST)",
    localPath: "Herd/phpcamp/m6_02_post.php",
    instructions: `
### Enviando información oculta: \`$_POST\`

A diferencia de GET, cuando enviamos información sensible (como contraseñas, correos o formularios de registro), no queremos que los datos se muestren en la barra de direcciones de la URL.

Para esto usamos el método **POST**. PHP almacena de forma automática estos valores dentro del array asociativo superglobal \`$_POST\`.

\`\`\`php
// Captura el valor del input con name="email" enviado por POST
echo $_POST["email"];
\`\`\`

---

#### 🚀 Instrucciones:
1. Para simular el envío de un formulario de registro, hemos pre-poblado \`$_POST["email"]\` con \`"correo@ejemplo.com"\`.
2. Usa \`echo\` para imprimir el valor que se ha recibido en \`$_POST["email"]\`.
    `,
    initialCode: `<?php
$_POST["email"] = "correo@ejemplo.com"; // (Simulamos el envío del formulario)

// Imprime el valor recibido en $_POST

`,
    tests: [
      {
        description: "Debe usar la superglobal $_POST['email']",
        validate: (code, output) => code.includes("$_POST") && code.includes("email")
      },
      {
        description: "Debe imprimir 'correo@ejemplo.com'",
        validate: (code, output) => output.trim() === "correo@ejemplo.com"
      }
    ]
  },
  {
    id: "m6_seguridad_xss",
    level: 6,
    levelTitle: "Nivel 6: Interacción con el Usuario",
    title: "3. Prevención de Ataques XSS",
    localPath: "Herd/phpcamp/m6_03_xss.php",
    instructions: `
### Seguridad Web: Saneando Entradas con htmlspecialchars()

**Regla de oro de la seguridad web:** ¡Nunca confíes en los datos que introduce el usuario!

Si imprimes directamente en pantalla lo que el usuario envía por un formulario, un atacante podría introducir código HTML o JavaScript malicioso (ataque conocido como **XSS - Cross-Site Scripting**).

Para protegernos, PHP provee la función \`htmlspecialchars()\`, la cual desactiva las etiquetas HTML convirtiendo caracteres especiales como \`<\` y \`>\` en texto seguro que el navegador no ejecutará.

\`\`\`php
$entradaSegura = htmlspecialchars($entrada, ENT_QUOTES, 'UTF-8');
\`\`\`

---

#### 🚀 Instrucciones:
1. Un usuario malintencionado ha enviado el texto \`"<script>alert('hack');</script>"\` como comentario en una URL. Lo hemos simulado guardándolo en \`$_GET["comentario"]\`.
2. Pasa \`$_GET["comentario"]\` por la función \`htmlspecialchars()\` para sanear la cadena.
3. Imprime el resultado saneado usando \`echo\`.
    `,
    initialCode: `<?php
$_GET["comentario"] = "<script>alert('hack');</script>"; // Entrada maliciosa

// Sanea e imprime la entrada de forma segura

`,
    tests: [
      {
        description: "Debe utilizar la función htmlspecialchars()",
        validate: (code, output) => code.includes("htmlspecialchars")
      },
      {
        description: "Debe imprimir el texto saneado de forma segura",
        validate: (code, output) => output.trim() === "&lt;script&gt;alert(&#039;hack&#039;);&lt;/script&gt;"
      }
    ]
  }
];
