// PHPCamp Curriculum Loader
// Este archivo consolida todos los módulos independientes cargados en el HTML

const INITIAL_GUIDE = `# ¡Bienvenido a PHPCamp! 🚀

Esta plataforma interactiva está diseñada para que tú y tus compañeros dominen **PHP, Bases de Datos y Laravel** en tiempo récord, llevándolos de la mano **desde nivel 0 absoluto** hasta conceptos intermedios del desarrollo web profesional.

---

## 🐘 ¿Qué es PHP y Cómo Funcionan sus Archivos?

Si nunca has programado en PHP, ¡no te preocupes! Aquí tienes los conceptos básicos:
- **¿Qué es PHP?** Es el lenguaje que ejecuta la lógica detrás del 78% de las páginas web del mundo (incluyendo Facebook y WordPress).
- **Archivos PHP:** Todos los archivos de código PHP terminan en la extensión \`.php\` (por ejemplo: \`index.php\` o \`m1_01_strict.php\`).
- **La etiqueta de apertura:** Para que el servidor sepa que debe ejecutar código PHP, tu archivo **debe empezar obligatoriamente** en la primera línea con:
  \`\`\`php
  <?php
  \`\`\`
- **Instrucciones:** Cada orden o comando en PHP debe terminar obligatoriamente con un punto y coma (\`;\`), por ejemplo: \`echo "Hola Mundo";\`.

---

## 🛠️ Configuración de tu Entorno de Desarrollo Local

Para programar en tu propia computadora como un profesional, necesitamos instalar tres herramientas que se configuran solas con un solo clic:

1. **Instalar Laravel Herd (Tu motor PHP y Servidor):** Ve a [herd.laravel.com](https://herd.laravel.com) y descarga el instalador. Instala automáticamente **PHP**, **Composer** (gestor de dependencias) y **Nginx** (servidor web) en segundos.
2. **Instalar VS Code (Tu Editor de Código):** Descarga **Visual Studio Code** en [code.visualstudio.com](https://code.visualstudio.com). Para tener una experiencia de desarrollo profesional y fluida, te recomendamos abrir VS Code e instalar las siguientes extensiones desde el panel izquierdo (Ctrl+Shift+X):
   - **Para PHP y Laravel:**
     - **PHP Intelephense:** *(Imprescindible)* Proporciona autocompletado inteligente, detección de errores en vivo y navegación de código.
     - **Laravel Extension Pack:** Un paquete que incluye herramientas integradas para Artisan, Blade y autocompletado extra de Laravel.
     - **Laravel Blade Snippets:** Para coloreado de sintaxis y atajos rápidos en plantillas Blade de Laravel.
   - **Para HTML y Diseño Web:**
     - **Auto Rename Tag:** Renombra de forma automática la etiqueta de cierre HTML cuando modificas la de apertura.
     - **Live Server:** Para lanzar un servidor web local con recarga en vivo de tus archivos HTML/CSS/JS con un clic.
     - **Prettier - Code Formatter:** Mantiene tu código HTML, CSS y Javascript perfectamente ordenado y formateado al guardar.
3. **Instalar Dbngin (Tu Base de Datos):** Descarga en [dbngin.com](https://dbngin.com) para crear y encender bases de datos locales (MySQL/PostgreSQL) con un clic.

---

## 🔑 La Regla de Oro de Laravel Herd: "Carpeta = URL"

Una vez instalado **Laravel Herd**, se crea una carpeta especial en tu sistema llamada **Herd**:
- **En Windows:** La ruta es \`C:\\Users\\TU_USUARIO\\Herd\\\` (donde TU_USUARIO es tu usuario de Windows).
- **En macOS:** La ruta es \`/Users/TU_USUARIO/Herd/\` o \`~/Herd/\`.

**¿Cómo funciona la magia de Herd?**
Cualquier subcarpeta que crees dentro de la carpeta \`Herd\` se convertirá automáticamente en un sitio web local con el sufijo \`.test\`:
- Si creas una carpeta llamada \`phpcamp\`, su URL será \`http://phpcamp.test\`.
- Si creas una carpeta llamada \`mi-proyecto\`, su URL será \`http://mi-proyecto.test\`.

---

## 📂 Organización del Curso: Dos Espacios de Trabajo

Para que el aprendizaje tenga sentido, dividiremos tu entorno local en **dos fases** según los módulos que estés cursando:

### 📍 FASE 1: PHP Puro y Fundamentos (Módulos 1 al 6)
Aquí aprenderás las bases escribiendo archivos PHP sencillos, sin frameworks.

1. **Crea la carpeta del curso:** Ve a tu directorio \`Herd\` y crea una carpeta llamada \`phpcamp\`. Tu ruta física será: \`C:\\Users\\TU_USUARIO\\Herd\\phpcamp\\\`.
2. **Ábrela en tu editor:** Abre VS Code, ve a **Archivo > Abrir Carpeta...** y selecciona la carpeta \`phpcamp\`.
3. **Crea tus ejercicios:** Haz clic derecho en VS Code y crea un nuevo archivo llamado, por ejemplo, \`m1_01_strict.php\`. Escribe tu código PHP y guárdalo.
4. **Míralo en vivo:** Abre tu navegador e ingresa a: \`http://phpcamp.test/m1_01_strict.php\`. ¡Se ejecutará al instante!

> [!NOTE]
> **¿Te sale el error "No se puede acceder a esta página" (NXDOMAIN)?**
> 1. **Asegúrate de tener Laravel Herd abierto:** Abre el menú de inicio de Windows, busca "Laravel Herd" y ejecútalo. Debes ver el ícono del elefante 🐘 al lado del reloj en tu barra de tareas con sus servicios en verde (Nginx, PHP y DNS encendidos). ¡Si Herd está cerrado, tu servidor local no responderá!
> 2. **Solución definitiva para Windows (DNS bloqueado):** Si sigue sin cargar debido a un antivirus o VPN que bloquea el DNS local, puedes forzar la conexión de forma segura en tu archivo hosts:
>    - Busca **"PowerShell"** en tu menú Inicio de Windows.
>    - Haz **clic derecho** sobre él y selecciona **"Ejecutar como administrador"** (esto es obligatorio para evitar errores de acceso denegado).
>    - Ejecuta el siguiente comando en la ventana azul:
>      \`\`\`powershell
>      Add-Content C:\\Windows\\System32\\drivers\\etc\\hosts "\\n127.0.0.1 phpcamp.test"
>      \`\`\`
>    - *(Nota: Si decidiste llamar a tu carpeta local de otra forma en el paso anterior, por ejemplo \`mi-proyecto\`, simplemente cambia \`phpcamp.test\` en el comando por \`mi-proyecto.test\`)*

---

### 📍 FASE 2: Introducción a Laravel (Módulos 7 y 8)
A partir del **Módulo 7**, ya no utilizaremos archivos PHP sueltos. Laravel es un framework profesional que requiere de su propia estructura y cientos de carpetas preconfiguradas.

1. **Crea tu Proyecto Laravel real:**
   - **Abre la terminal de tu PC:** En Windows, presiona la tecla Windows, escribe **PowerShell** y presiona Enter. En Mac, abre la aplicación **Terminal**.
   - **Entra a tu carpeta Herd:** Escribe el comando correspondiente en tu terminal y presiona Enter:
     - **Si estás en Windows PowerShell (Recomendado):**
       \`\`\`powershell
       cd ~\\Herd
       \`\`\`
     - **Si estás en Windows CMD (Símbolo del sistema):**
       \`\`\`cmd
       cd %USERPROFILE%\\Herd
       \`\`\`
     - **Si estás en macOS:**
       \`\`\`bash
       cd ~/Herd
       \`\`\`
   - **Ejecuta el comando para descargar Laravel:**
     Escribe el siguiente comando y presiona Enter para que cree tu proyecto automáticamente:
     \`\`\`bash
     composer create-project laravel/laravel curso-laravel
     \`\`\`
     *(Esto creará de forma automática una carpeta llamada \`curso-laravel\` dentro de Herd).*
2. **Abre el proyecto en tu editor:** En VS Code, ve a **Archivo > Abrir Carpeta...** y selecciona la carpeta recién creada:
   - **En Windows:** \`C:\\Users\\TU_USUARIO\\Herd\\curso-laravel\\\` (cambiando \`TU_USUARIO\` por tu nombre de usuario real de Windows).
   - **En macOS:** \`/Users/TU_USUARIO/Herd/curso-laravel/\` o \`~/Herd/curso-laravel/\`.
3. **Trabaja con los archivos de Laravel:** Ahora, los retos locales del curso te pedirán editar archivos internos del framework (por ejemplo, el enrutador en \`routes/web.php\` o el modelo en \`app/Models/Blog.php\`).
4. **Míralo en vivo:** Gracias a la regla de oro de Herd, ingresa en tu navegador a: \`http://curso-laravel.test\`. ¡Verás la página de bienvenida de tu aplicación Laravel real ejecutándose!

---

## 🔄 Elige tu Método de Trabajo en PHPCamp

En la barra superior de nuestra plataforma verás dos modos que puedes alternar cuando quieras:

### 🖥️ Modo Web Interactivo (Recomendado para aprender rápido)
- Escribe tu código directamente en el editor web de la derecha y presiona **"Ejecutar Pruebas"**.
- El sistema compilará y ejecutará tu PHP en tiempo real y te mostrará la consola de salida y los requisitos cumplidos.

### 💻 Modo Editor Local (Para programar en tu PC real)
- Selecciona este modo y te mostraremos la ruta física recomendada donde colocar el archivo local (ej. \`routes/web.php\` o \`app/Models/Blog.php\`).
- Escríbelo en tu VS Code real, compruébalo localmente en tu navegador y, cuando funcione, copia y pega el código aquí en el editor de la plataforma para validarlo y guardar tu progreso.
`;// Agregar todos los retos de los módulos creados
const PHP_CHALLENGES = [
    ...MODULO1_PRIMEROS_PASOS,
    ...MODULO2_VARIABLES,
    ...MODULO3_LOGICA,
    ...MODULO4_BUCLES_ARRAYS,
    ...MODULO5_FUNCIONES,
    ...MODULO6_INTERACCION,
    ...MODULO7_ESTADO,
    ...MODULO8_DB,
    ...MODULO9_LARAVEL_BRIDGE
];

// Opcional: Si queremos mantener una estructura expandida de guías de inicio por módulo
const PHP_MODULES_METADATA = [
    {
        id: 1,
        title: "Nivel 1: Primeros Pasos y Sintaxis",
        challengesCount: MODULO1_PRIMEROS_PASOS.length
    },
    {
        id: 2,
        title: "Nivel 2: Variables y Datos",
        challengesCount: MODULO2_VARIABLES.length
    },
    {
        id: 3,
        title: "Nivel 3: Lógica y Toma de Decisiones",
        challengesCount: MODULO3_LOGICA.length
    },
    {
        id: 4,
        title: "Nivel 4: Bucles y Arrays",
        challengesCount: MODULO4_BUCLES_ARRAYS.length
    },
    {
        id: 5,
        title: "Nivel 5: Modularidad y Funciones",
        challengesCount: MODULO5_FUNCIONES.length
    },
    {
        id: 6,
        title: "Nivel 6: Interacción con el Usuario",
        challengesCount: MODULO6_INTERACCION.length
    },
    {
        id: 7,
        title: "Nivel 7: Estado y Persistencia",
        challengesCount: MODULO7_ESTADO.length
    },
    {
        id: 8,
        title: "Nivel 8: Bases de Datos",
        challengesCount: MODULO8_DB.length
    },
    {
        id: 9,
        title: "Nivel 9: El Puente Hacia Laravel",
        challengesCount: MODULO9_LARAVEL_BRIDGE.length
    }
];

console.log(`[PHPCamp Loader] Plan de estudios cargado con éxito. ${PHP_CHALLENGES.length} retos interactivos listos.`);
