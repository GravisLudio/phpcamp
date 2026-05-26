// PHPCamp Curriculum Loader
// Este archivo consolida todos los módulos independientes cargados en el HTML

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
