// PHPCamp Curriculum Loader
// Este archivo consolida todos los módulos independientes cargados en el HTML

// Agregar todos los retos de los módulos creados
const PHP_CHALLENGES = [
    ...MODULO1_CHALLENGES,
    ...MODULO2_CHALLENGES
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
    }
];

console.log(`[PHPCamp Loader] Plan de estudios cargado con éxito. ${PHP_CHALLENGES.length} retos interactivos listos.`);
