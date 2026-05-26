// PHPCamp Curriculum Loader
// Este archivo consolida todos los módulos independientes cargados en el HTML

const INITIAL_GUIDE = `# ¡Bienvenido a PHPCamp! 🚀

Esta plataforma interactiva está diseñada para que tú y tus compañeros dominen **PHP, Bases de Datos y Laravel** en tiempo récord, llevándolos de la mano **desde nivel 0 absoluto** hasta conceptos intermedios y avanzados del desarrollo web profesional.

---

## 🐘 ¿Qué es PHP y Cómo Funcionan sus Archivos?

Si nunca has programado en PHP, ¡no te preocupes! Aquí tienes lo básico que debes saber:
- **¿Qué es?** PHP es el lenguaje que ejecuta la lógica detrás del 78% de las páginas web del mundo (incluyendo Facebook y WordPress).
- **Archivos PHP:** Todos los archivos de código PHP terminan en la extensión \`.php\` (por ejemplo: \`index.php\`).
- **La etiqueta de apertura:** Para que la computadora sepa que va a leer código PHP, el archivo **debe empezar obligatoriamente** en su primera línea con:
  \`\`\`php
  <?php
  \`\`\`
- **Instrucciones:** Cada orden o comando en PHP debe terminar obligatoriamente con un punto y coma (\`;\`), por ejemplo: \`echo "Hola Mundo";\`.

---

## 🛠️ Configuración de tu Entorno de Desarrollo Local

Para trabajar como un programador profesional en tu propia computadora, instalaremos tres herramientas líderes de la industria que se configuran con un solo clic:

### 1. Instalar Laravel Herd (Tu motor PHP)
**Laravel Herd** es un entorno de desarrollo PHP ultrarrápido y sin configuraciones complejas.
- **Descarga:** Ve a [herd.laravel.com](https://herd.laravel.com) y descarga el instalador.
- **¿Qué hace?** Instala automáticamente **PHP**, **Composer** (el gestor de paquetes de PHP) y **Nginx** (el servidor web local) en tu computadora en segundos. No necesitas configurar nada de forma manual.

### 2. Instalar VS Code (Tu Editor de Código)
Necesitas un editor de texto inteligente para escribir tu código.
- **Descarga:** Ve a [code.visualstudio.com](https://code.visualstudio.com) y descarga **Visual Studio Code**.
- **Recomendación:** Instala la extensión **PHP Intelephense** dentro de VS Code para que te autocomplete el código de manera inteligente.

### 3. Instalar Dbngin (Tu Gestor de Bases de Datos)
- **Descarga:** Ve a [dbngin.com](https://dbngin.com).
- **¿Qué hace?** Te permite crear y encender bases de datos locales (como PostgreSQL o MySQL) con un solo clic de forma visual.

---

## 📂 ¿Dónde se guardan los archivos PHP en tu PC?

Una vez instalado **Laravel Herd**, este crea automáticamente una carpeta especial en tu sistema llamada **Herd**.
- **En Windows:** La ruta exacta de esta carpeta es \`C:\\Users\\TU_USUARIO\\Herd\\\` (donde TU_USUARIO es tu nombre de usuario de Windows).
- **En macOS:** La ruta es \`/Users/TU_USUARIO/Herd/\` o simplemente \`~/Herd/\`.

### Tu primer espacio de trabajo:
1. Ve a esa carpeta **Herd** en tu explorador de archivos y crea una nueva subcarpeta llamada \`phpcamp\`. Tu ruta local para el curso será: \`C:\\Users\\TU_USUARIO\\Herd\\phpcamp\\\`.
2. Abre **VS Code**, ve a **Archivo > Abrir Carpeta...** (File > Open Folder) y selecciona esa carpeta \`phpcamp\`.
3. ¡Listo! Ya puedes crear archivos dentro de ella (haciendo clic derecho > Nuevo Archivo > ej. \`m1_01_strict.php\`).
4. Para ver tu archivo funcionando en vivo en tu navegador, solo debes abrir tu navegador web preferido e ingresar a la URL local: \`http://phpcamp.test/m1_01_strict.php\`. ¡Herd hace la magia de conectar tu archivo con la web local de forma automática!

---

## 🚀 ¿Cómo Crear un Proyecto con Laravel desde Cero?

Laravel es el framework de PHP más popular y demandado del mundo. Crear un proyecto real es sumamente sencillo una vez que tienes Laravel Herd instalado:

1. **Abre tu Terminal:** En Windows, presiona la tecla Windows, escribe \`PowerShell\` o \`Símbolo del sistema\` (Command Prompt) y ábrelo. En Mac, abre la aplicación \`Terminal\`.
2. **Navega a tu carpeta de Herd:** Escribe el siguiente comando en la terminal y presiona Enter:
   - **En Windows:** \`cd %USERPROFILE%\\Herd\`
   - **En macOS:** \`cd ~/Herd\`
3. **Crea el Proyecto Laravel:** Ejecuta el siguiente comando para que Composer descargue y cree la estructura de Laravel de forma automática:
   \`\`\`bash
   composer create-project laravel/laravel mi-primer-proyecto
   \`\`\`
   *(Esto creará una nueva carpeta llamada \`mi-primer-proyecto\` con todo lo necesario).*
4. **Ábrelo en tu Editor:** En VS Code, ve a **Archivo > Abrir Carpeta...** y selecciona la carpeta recién creada: \`C:\\Users\\TU_USUARIO\\Herd\\mi-primer-proyecto\\\`.
5. **¡Míralo en el Navegador!** Abre tu navegador e ingresa a \`http://mi-primer-proyecto.test\`. ¡Verás la página de bienvenida de tu aplicación Laravel real ejecutándose localmente!

---

## 🔄 Elige tu Método de Trabajo en PHPCamp

En la barra superior de nuestra plataforma verás dos modos que puedes alternar cuando quieras:

### 🖥️ Modo Web Interactivo (Recomendado para aprender rápido)
- Escribe tu código directamente en el editor web interactivo de la derecha y presiona **"Ejecutar Pruebas"**.
- El sistema compilará y ejecutará tu PHP en tiempo real y te mostrará la consola de salida y los requisitos cumplidos.

### 💻 Modo Editor Local (Para trabajar en tu PC real)
- Selecciona este modo y te mostraremos la ruta física recomendada donde colocar el archivo local (ej. \`routes/web.php\` o \`app/Models/Blog.php\`).
- Escríbelo en tu VS Code real, compruébalo localmente en tu navegador y, cuando funcione, copia y pega el código aquí en el editor de la plataforma para validarlo y guardar tu progreso.
`;

// Agregar todos los retos de los módulos creados
const PHP_CHALLENGES = [
    ...MODULO1_CHALLENGES,
    ...MODULO2_CHALLENGES,
    ...MODULO3_CHALLENGES,
    ...MODULO4_CHALLENGES,
    ...MODULO5_SEGURIDAD,
    ...MODULO6_DB,
    ...MODULO7_LARAVEL,
    ...MODULO8_ELOQUENT
];

// Opcional: Si queremos mantener una estructura expandida de guías de inicio por módulo
const PHP_MODULES_METADATA = [
    {
        id: 1,
        title: "Módulo 1: Sintaxis y Tipado Avanzado",
        challengesCount: MODULO1_CHALLENGES.length
    },
    {
        id: 2,
        title: "Módulo 2: Programación Orientada a Objetos",
        challengesCount: MODULO2_CHALLENGES.length
    },
    {
        id: 3,
        title: "Módulo 3: Colecciones y Manipulación de Datos",
        challengesCount: MODULO3_CHALLENGES.length
    },
    {
        id: 4,
        title: "Módulo 4: Excepciones y Robustez",
        challengesCount: MODULO4_CHALLENGES.length
    },
    {
        id: 5,
        title: "Módulo 5: Seguridad y Sanitización",
        challengesCount: MODULO5_SEGURIDAD.length
    },
    {
        id: 6,
        title: "Módulo 6: Bases de Datos (SQL/PDO)",
        challengesCount: MODULO6_DB.length
    },
    {
        id: 7,
        title: "Módulo 7: Framework Laravel (Backend)",
        challengesCount: MODULO7_LARAVEL.length
    },
    {
        id: 8,
        title: "Módulo 8: Eloquent ORM y Relaciones",
        challengesCount: MODULO8_ELOQUENT.length
    }
];

console.log(`[PHPCamp Loader] Plan de estudios cargado con éxito. ${PHP_CHALLENGES.length} retos interactivos listos.`);
