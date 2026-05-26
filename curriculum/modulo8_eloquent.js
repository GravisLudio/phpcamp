const MODULO8_ELOQUENT = [
  {
    id: "m8_eloquent_crud",
    level: 8,
    levelTitle: "Módulo 8: Eloquent ORM y Relaciones",
    title: "1. Consultas Básicas con Eloquent ORM",
    localPath: "app/Http/Controllers/UserController.php",
    instructions: `
### Eloquent ORM (Active Record)
Eloquent es el ORM integrado de Laravel. Cada modelo mapea una tabla. Consultar datos es sumamente limpio:
\`\`\`php
$usuarios = User::all(); // Obtiene todos
$admin = User::where('rol', 'admin')->first(); // Busca condicionado
\`\`\`

#### Instrucciones:
Completa el método simulado de controlador para retornar la lista de todos los usuarios que tengan el estado de cuenta \`activo\`.
1. Llama al modelo simulado \`User\` y ejecuta la consulta encadenada \`User::where('estado', 'activo')->get()\`.
2. Retorna el resultado.
    `,
    initialCode: `<?php
// Modelo simulado de Laravel - ¡NO MODIFICAR!
class User {
    public static function where($col, $val) {
        return new class($col, $val) {
            private $col; private $val;
            public function __construct($c, $v) { $this->col = $c; $this->val = $v; }
            public function get() {
                return "Usuarios donde " . $this->col . " = " . $this->val;
            }
        };
    }
}

class PanelController {
    public function obtenerUsuariosActivos() {
        // Ejecuta la consulta de Eloquent y retórnala
        
    }
}
`,
    tests: [
      {
        description: "Debe usar el modelo 'User::where'",
        validate: (code, output) => code.includes("User::where")
      },
      {
        description: "Debe buscar por 'estado' con valor 'activo'",
        validate: (code, output) => code.includes("'estado'") && code.includes("'activo'")
      },
      {
        description: "Debe llamar al método final 'get()'",
        validate: (code, output) => code.includes("->get()")
      },
      {
        description: "Debe retornar 'Usuarios donde estado = activo'",
        validate: (code, output) => {
          let testCode = code + "\n $ctrl = new PanelController(); echo $ctrl->obtenerUsuariosActivos();";
          return evalPHP(testCode).output.includes("Usuarios donde estado = activo");
        }
      }
    ]
  },
  {
    id: "m8_eloquent_relations",
    level: 8,
    levelTitle: "Módulo 8: Eloquent ORM y Relaciones",
    title: "2. Relaciones Eloquent (One to Many)",
    localPath: "app/Models/Blog.php",
    instructions: `
### Relaciones Uno a Muchos (One to Many)
En Laravel, vinculamos tablas mediante relaciones en los modelos. Para indicar que un registro posee múltiples registros dependientes (por ejemplo, un Blog tiene muchos Comentarios), usamos el método \`hasMany\`:
\`\`\`php
class Blog extends Model {
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
\`\`\`

#### Instrucciones:
1. Crea una clase llamada \`Blog\` que extienda (herede) de la clase base \`Model\`.
2. Define un método público llamado \`comentarios()\`.
3. Dentro del método, retorna la relación llamando a \`$this->hasMany('Comentario')\`.
    `,
    initialCode: `<?php
// Clase simuladora de Model en Laravel - ¡NO MODIFICAR!
class Model {
    public function hasMany($relatedClass) {
        return "hasMany(" . $relatedClass . ")";
    }
}

// Crea la clase Blog heredando de Model y define su relación de comentarios abajo
`,
    tests: [
      {
        description: "La clase Blog debe heredar de Model usando 'extends'",
        validate: (code, output) => /class\s+Blog\s+extends\s+Model/.test(code)
      },
      {
        description: "Debe definir el método 'comentarios()'",
        validate: (code, output) => code.includes("function comentarios")
      },
      {
        description: "El método comentarios debe retornar la llamada a hasMany('Comentario')",
        validate: (code, output) => {
          let testCode = code + "\n $blog = new Blog(); echo $blog->comentarios();";
          return evalPHP(testCode).output.includes("hasMany(Comentario)");
        }
      }
    ]
  }
];
