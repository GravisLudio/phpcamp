# Plan de Implementación de Alta Densidad: GravisPHPHUB 🐘📱

Inspirado directamente por la estructura pedagógica de **freeCodeCamp**, este plan de implementación describe la reestructuración completa de la plataforma hacia **GravisPHPHUB** como una aplicación móvil, de escritorio y web nativa en Flutter.

Para lograr la densidad de aprendizaje de freeCodeCamp, estructuraremos la plataforma con:
1.  **15 Módulos Teórico-Prácticos (Lecciones y Talleres Guiados)**.
2.  **5 Grandes Proyectos de Certificación** (Labs independientes basados en especificaciones para que el estudiante programe de forma autónoma).
3.  **Un motor de validación basado en Flutter/Dart**.

---

## 🎨 Arquitectura del Sistema GravisPHPHUB

El proyecto se estructurará con una interfaz de desarrollo en pantalla dividida en Flutter, que mantendrá un editor de texto con simulación de VS Code, una consola de salida interactiva, una lista de requerimientos interactiva ("User Stories") y un panel descriptivo rico en Markdown.

---

## 📚 Estructura Curricular de Alta Densidad (Estilo freeCodeCamp)

El plan de estudios completo de **GravisPHPHUB** consta de **15 módulos de aprendizaje** divididos en tres grandes pilares del desarrollo web:

---

### PILAR 1: Fundamentos de PHP y Estructuras de Datos
Enseña el núcleo del lenguaje y la lógica de programación desde nivel cero.

#### Módulo 1: Sintaxis Básica y Salidas
*   *Lección:* El ciclo de ejecución de PHP en servidores.
*   *Taller:* Construyendo tus primeras sentencias con `echo` y `print`.
*   *Taller:* Dominando el punto y coma (`;`) y la mezcla de PHP y HTML semántico.

#### Módulo 2: Comentarios y Buenas Prácticas
*   *Lección:* Documentando tu software para equipos.
*   *Taller:* Comentarios de una línea (`//`, `#`) y comentarios estructurados de bloque (`/* */`).

#### Módulo 3: Variables y Tipado Dinámico
*   *Lección:* Guardando información en memoria (`$`).
*   *Taller:* Declaración e inicialización de tipos (Strings, Integers, Floats, Booleans).
*   *Taller:* Manipulación de constantes globales mediante `define()` y constantes de clase `const`.

#### Módulo 4: Concatenación y Operadores Aritméticos
*   *Lección:* Procesando números y uniendo textos.
*   *Taller:* Concatenación clásica mediante el operador punto (`.`).
*   *Taller:* Cálculos y operaciones matemáticas con variables (`+`, `-`, `*`, `/`, `%`).

#### Módulo 5: Lógica Condicional y Decisiones
*   *Lección:* Tomando decisiones en tu código.
*   *Taller:* Estructuras lógicas `if`, `else` e `elseif`.
*   *Taller:* El operador de comparación idéntica (`===`) vs comparación flexible (`==`).
*   *Taller:* Operadores lógicos compuestos (`&&`, `||`, `!`).

#### Módulo 6: Estructuras y Colecciones de Datos (Arrays)
*   *Lección:* Agrupando información en listas.
*   *Taller:* Creación y acceso a **Arrays Indexados** (desde posición 0).
*   *Taller:* Creación y diseño de **Arrays Asociativos** utilizando claves personalizadas (`=>`).

#### Módulo 7: Bucles y Repeticiones (Iteración)
*   *Lección:* Evitando repetir código de forma innecesaria.
*   *Taller:* El bucle contador `for` clásico.
*   *Taller:* Bucle `foreach` simple para listas.
*   *Taller:* Bucle `foreach` asociativo extrayendo claves y valores (`$clave => $valor`).

#### Módulo 8: Funciones y Tipado Estricto (PHP 8)
*   *Lección:* Reutilización lógica de código.
*   *Taller:* Funciones con parámetros de entrada y directiva `return`.
*   *Taller:* Declaración estricta de tipos de parámetros y tipos de retorno (`int`, `string`, `: bool`).

---

### PILAR 2: Interacción Web, Seguridad y Persistencia
Enseña cómo interactúa PHP con los navegadores, maneja datos de usuarios de forma segura y persiste información.

#### Módulo 9: Captura de Datos HTTP
*   *Lección:* La comunicación cliente-servidor mediante peticiones HTTP.
*   *Taller:* Parámetros en la barra de direcciones con la superglobal `$_GET`.
*   *Taller:* Envío oculto y procesamiento de formularios mediante la superglobal `$_POST`.

#### Módulo 10: Seguridad Web y Saneamiento (Anti-XSS)
*   *Lección:* ¿Qué es Cross-Site Scripting (XSS) y por qué tu aplicación es vulnerable?
*   *Taller:* Sanitización obligatoria de entradas con `htmlspecialchars()`.
*   *Taller:* Validación estricta de tipos de datos de usuario con `filter_var()` (ej. emails).

#### Módulo 11: Manejo de Estado (Cookies y Sesiones)
*   *Lección:* Dándole "memoria" al protocolo HTTP.
*   *Taller:* Configuración de almacenamiento local del navegador usando `setcookie()`.
*   *Taller:* Sesiones de servidor con `session_start()` y la superglobal `$_SESSION`.
*   *Taller:* Gestión de cierre de sesión seguro mediante `unset()` y `session_destroy()`.

#### Módulo 12: Interacción con Sistemas de Archivos
*   *Lección:* Lectura, escritura y subida de archivos al servidor.
*   *Taller:* Subida segura de imágenes y documentos mediante `$_FILES` y `move_uploaded_file()`.

---

### PILAR 3: Arquitectura, Bases de Datos y POO Avanzada
Conceptos avanzados de arquitectura de software para preparar al estudiante para Laravel.

#### Módulo 13: Bases de Datos Relacionales (PDO)
*   *Lección:* Conexión de PHP a bases de datos relacionales mediante PDO.
*   *Taller:* Creación del objeto de conexión `new PDO()` con credenciales DSN.
*   *Taller:* El gran peligro de la Inyección SQL y la arquitectura de **Consultas Preparadas (Prepared Statements)**.
*   *Taller:* Implementación completa de operaciones CRUD (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).

#### Módulo 14: Programación Orientada a Objetos (POO)
*   *Lección:* Estructurando el código mediante objetos reales de la vida real.
*   *Taller:* Creación de Clases, propiedades públicas e instanciación con `new`.
*   *Taller:* El constructor mágico de inicialización `__construct()` y la referencia a variables internas con `$this->`.
*   *Taller:* Encapsulamiento de código: atributos privados, protegidos e interfaces Getters y Setters.
*   *Taller:* Reutilización estructurada mediante **Herencia** de clases con `extends`.

#### Módulo 15: Herramientas del Desarrollador Profesional
*   *Lección:* El ecosistema moderno de desarrollo PHP.
*   *Taller:* Gestión e instalación de librerías externas utilizando **Composer** y `vendor/autoload.php`.
*   *Taller:* Captura y manejo de excepciones mediante bloques de código seguros `try / catch`.
*   *Taller:* Serialización e intercambio de datos asíncronos con el navegador en formato JSON (`json_encode()` y `json_decode()`).

---

## 🏆 Los 5 Proyectos de Certificación (Labs Independientes)

Para obtener el certificado de **GravisPHPHUB**, el estudiante debe construir 5 proyectos autónomos basados en historias de usuario ("User Stories") validadas por el motor de Flutter:

### Proyecto de Certificación 1: Generador de Perfil Personal (Módulos 1-4)
*   *Descripción:* El estudiante debe procesar variables dinámicas e imprimir una tarjeta de presentación personal mezclada en código HTML semántico, calculando edades en base al año actual y formateando textos.

### Proyecto de Certificación 2: Calculadora de Impuestos y Descuentos Dinámicos (Módulos 5-8)
*   *Descripción:* Una función robusta que evalúa un carrito de compras dinámico de un array asociativo, aplica descuentos porcentuales según la cantidad, calcula el IVA de cada producto y retorna un string desglosado.

### Proyecto de Certificación 3: Sistema de Login e Inicio de Sesión Seguro (Módulos 9-12)
*   *Descripción:* Capturar datos de formulario enviados por POST, sanear la entrada contra ataques XSS, validar la dirección de correo electrónico, iniciar sesión mediante cookies/sesiones y denegar el acceso a usuarios no autorizados.

### Proyecto de Certificación 4: Interfaz de Base de Datos Segura de un Blog (Módulos 13)
*   *Descripción:* Implementar las funciones de conexión PDO y consultas preparadas necesarias para interactuar con una tabla de posts (añadir post, editar post, eliminar post, y listar posts filtrando por autor).

### Proyecto de Certificación 5: Mini-Framework MVC Estilo Laravel desde Cero (Módulos 14-15)
*   *Descripción:* Diseñar una arquitectura orientada a objetos simplificada con un enrutador básico (`Router`), una clase de controlador (`Controller`) y un despachador de vistas, manejando errores mediante excepciones `try/catch`.

---

## 💻 Plan de Trabajo en Casa (Flujo de Portabilidad)

1.  **Paso 1:** Inicializar el proyecto Flutter multiplataforma: `flutter create gravis_php_hub`.
2.  **Paso 2:** Configurar el archivo `pubspec.yaml` para incluir tipografías Premium monoespaciadas y paquetes de estado (p. ej., `flutter_riverpod`).
3.  **Paso 3:** Codificar la interfaz responsiva de pantalla dividida con `Row` y `Column` detallada en el plan anterior.
4.  **Paso 4:** Cargar este temario estructurado de 15 módulos en el archivo de base de datos interno (`lib/models/challenges_database.dart`) en Dart.
5.  **Paso 5:** Compilar para el entorno deseado (Android/iOS, macOS/Windows o Web).
