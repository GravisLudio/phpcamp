const MODULO7_LARAVEL = [
  {
    id: "m7_laravel_routing",
    level: 7,
    levelTitle: "Módulo 7: Framework Laravel (Backend)",
    title: "1. Enrutamiento Dinámico en Laravel",
    localPath: "routes/web.php",
    instructions: `
### Enrutamiento Dinámico en Laravel
Laravel permite capturar parámetros directamente de la URL encerrándolos entre llaves \`{param}\` en la definición de la ruta. Estos se inyectan automáticamente en el controlador o callback de la ruta:
\`\`\`php
Route::get('/usuario/{id}', function ($id) {
    return "Usuario ID: " . $id;
});
\`\`\`

#### Instrucciones:
Crea una ruta en Laravel llamando al método estático \`Route::get('/cliente/{id}', $callback)\` donde el callback devuelva exactamente el texto \`Cliente seleccionado: \` concatenado con el parámetro \`$id\`.
    `,
    initialCode: `<?php
// Clase simuladora de Router de Laravel - ¡NO MODIFICAR!
class Route {
    public static $routes = [];
    public static function get($uri, $callback) {
        self::$routes[$uri] = $callback;
    }
}

// Declara la ruta /cliente/{id} aquí abajo
`,
    tests: [
      {
        description: "Debe registrar la ruta '/cliente/{id}'",
        validate: (code, output) => code.includes("'/cliente/{id}'") || code.includes('"/cliente/{id}"')
      },
      {
        description: "El callback debe recibir $id y retornar 'Cliente seleccionado: 42'",
        validate: (code, output) => {
          let testCode = code + "\n echo Route::$routes['/cliente/{id}'](42);";
          return evalPHP(testCode).output.trim() === "Cliente seleccionado: 42";
        }
      }
    ]
  },
  {
    id: "m7_laravel_request_validation",
    level: 7,
    levelTitle: "Módulo 7: Framework Laravel (Backend)",
    title: "2. Validación de Formularios (Requests)",
    localPath: "app/Http/Controllers/ProductController.php",
    instructions: `
### Validación de Peticiones (Request Validation)
En Laravel, para asegurar que los datos enviados por un formulario o API sean válidos antes de insertarlos en la base de datos, usamos la validación integrada en la petición:
\`\`\`php
$datosValidados = $request->validate([
    'titulo' => 'required|min:5',
    'precio' => 'required|numeric'
]);
\`\`\`

#### Instrucciones:
Se te proporciona el método \`store($request)\` de un controlador simulado.
1. Ejecuta la validación de la petición llamando a \`$request->validate(...)\`.
2. Define las siguientes reglas de validación en el array asociativo:
   - \`nombre\` debe ser \`required\`
   - \`email\` debe ser \`required|email\`
3. Retorna los datos validados devueltos por el método \`validate()\`.
    `,
    initialCode: `<?php
class RegistroController {
    public function store($request) {
        // Ejecuta la validación del request y retórnala
        
    }
}
`,
    tests: [
      {
        description: "Debe invocar el método '$request->validate'",
        validate: (code, output) => code.includes("$request->validate")
      },
      {
        description: "Debe definir las reglas para 'nombre' y 'email'",
        validate: (code, output) => code.includes("'nombre'") && code.includes("'email'") && code.includes("required|email")
      }
    ]
  }
];
