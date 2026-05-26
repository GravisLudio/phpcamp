const MODULO7_ESTADO = [
  {
    id: "m7_sesiones_basicas",
    level: 7,
    levelTitle: "Nivel 7: Estado y Persistencia",
    title: "1. Iniciando Sesiones",
    localPath: "Herd/phpcamp/m7_01_sesiones.php",
    instructions: `
### Sesiones: Recordando al Usuario

Para que el servidor sepa quién eres al navegar por distintas páginas (como al estar logueado), usamos "Sesiones". Antes de usar sesiones en PHP, **siempre** debes encender el motor de sesiones en la primera línea usando \`session_start();\`.

Luego, puedes guardar datos en la variable global \`$_SESSION\`.

\`\`\`php
session_start();
$_SESSION["rol"] = "Administrador";
\`\`\`

---

#### 🚀 Instrucciones:
1. Llama a la función \`session_start();\`.
2. Asigna a \`$_SESSION["logeado"]\` el valor booleano \`true\`.
3. Haz un \`echo\` de \`"Sesión iniciada"\` si el paso anterior fue exitoso.
    `,
    initialCode: `<?php
// 1. Inicia la sesión


// 2. Guarda el valor en $_SESSION


// 3. Imprime "Sesión iniciada"

`,
    tests: [
      {
        description: "Debe iniciar la sesión con session_start()",
        validate: (code, output) => code.includes("session_start()") || code.includes("session_start();")
      },
      {
        description: "Debe guardar true en $_SESSION['logeado']",
        validate: (code, output) => code.includes("$_SESSION") && code.includes("logeado") && code.includes("true")
      },
      {
        description: "Debe imprimir 'Sesión iniciada'",
        validate: (code, output) => output.trim() === "Sesión iniciada"
      }
    ]
  }
];
