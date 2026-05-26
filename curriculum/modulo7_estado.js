const MODULO7_ESTADO = [
  {
    id: "m7_sesiones_basicas",
    level: 7,
    levelTitle: "Nivel 7: Estado y Persistencia",
    title: "1. Iniciando Sesiones",
    localPath: "Herd/phpcamp/m7_01_sesiones.php",
    instructions: `
### Sesiones: Recordando al Usuario

HTTP es un protocolo "sin estado", lo que significa que el servidor olvida quién eres en cuanto cambias de página. Para solucionar esto y mantener al usuario logueado, PHP utiliza **Sesiones**.

Antes de usar sesiones, **siempre** debes encender el motor de sesiones en la primera línea usando la función \`session_start();\`.

Una vez iniciada, puedes almacenar información en el array global \`$_SESSION\` que estará disponible en cualquier otra página del sitio.

\`\`\`php
session_start();
$_SESSION["rol"] = "Administrador";
\`\`\`

---

#### 🚀 Instrucciones:
1. Llama a la función \`session_start();\` en la primera línea.
2. Asigna a la variable superglobal \`$_SESSION["logeado"]\` el valor booleano \`true\`.
3. Haz un \`echo\` de \`"Sesión iniciada"\` al final.
    `,
    initialCode: `<?php
// 1. Inicia la sesión


// 2. Guarda true en $_SESSION['logeado']


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
  },
  {
    id: "m7_sesiones_destruir",
    level: 7,
    levelTitle: "Nivel 7: Estado y Persistencia",
    title: "2. Cierre de Sesión y Destrucción",
    localPath: "Herd/phpcamp/m7_02_logout.php",
    instructions: `
### Cerrando Sesión: unset() y session_destroy()

Cuando un usuario hace clic en "Cerrar Sesión", debemos limpiar los datos guardados en la memoria del servidor para evitar accesos no autorizados.

Para esto hacemos dos pasos:
1. **Borrar variables específicas:** Usamos la instrucción \`unset($_SESSION["clave"]);\` para eliminar un dato en particular.
2. **Destruir la sesión por completo:** Llamamos a la función \`session_destroy();\` para cerrar la sesión activa del usuario.

\`\`\`php
session_start();
unset($_SESSION["usuario"]); // Elimina solo el usuario
session_destroy();          // Destruye toda la sesión
\`\`\`

---

#### 🚀 Instrucciones:
1. Hemos simulado el inicio de sesión y guardado datos en \`$_SESSION["usuario"] = "Ana";\` y \`$_SESSION["logeado"] = true;\`.
2. Llama a la función \`session_start();\`.
3. Borra la variable específica de sesión \`"logeado"\` usando la instrucción \`unset()\`.
4. Destruye la sesión completa llamando a \`session_destroy();\`.
5. Imprime el mensaje \`"Sesión destruida"\` usando \`echo\`.
    `,
    initialCode: `<?php
$_SESSION["usuario"] = "Ana";
$_SESSION["logeado"] = true;

// 1. Inicia sesión


// 2. Borra la clave 'logeado' con unset


// 3. Destruye la sesión completa


// 4. Imprime "Sesión destruida"

`,
    tests: [
      {
        description: "Debe iniciar la sesión con session_start()",
        validate: (code, output) => code.includes("session_start()") || code.includes("session_start();")
      },
      {
        description: "Debe usar unset() para borrar 'logeado'",
        validate: (code, output) => /unset\s*\(\s*\$_SESSION\s*\[\s*['"]logeado['"]\s*\]\s*\)/.test(code)
      },
      {
        description: "Debe destruir la sesión completa con session_destroy()",
        validate: (code, output) => code.includes("session_destroy()") || code.includes("session_destroy();")
      },
      {
        description: "Debe imprimir 'Sesión destruida'",
        validate: (code, output) => output.trim() === "Sesión destruida"
      }
    ]
  }
];
