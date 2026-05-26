const MODULO6_DB = [
  {
    id: "m6_pdo_prepared",
    level: 6,
    levelTitle: "Módulo 6: Bases de Datos (PostgreSQL / MySQL)",
    title: "1. Prepared Statements con PDO",
    localPath: "Herd/phpcamp/m6_01_prepared.php",
    instructions: `
### Consultas Preparadas con PDO
Para conectarnos y realizar consultas seguras a PostgreSQL o MySQL en PHP puro, usamos **PDO (PHP Data Objects)**. Las consultas preparadas separan la consulta de los datos para evitar inyecciones SQL:
\`\`\`php
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email");
$stmt->execute(['email' => $emailInput]);
$resultado = $stmt->fetch(PDO::FETCH_ASSOC);
\`\`\`

#### Instrucciones:
1. Llama al método estático seguro \`Database::prepare($query)\` pasando una consulta para seleccionar todos los campos de la tabla \`productos\` donde \`categoria = :categoria\`.
2. Ejecuta la consulta pasando el array asociativo \`['categoria' => 'Celulares']\`.
3. Imprime la cantidad de registros encontrados en la base de datos simulada usando la propiedad \`count\`.
    `,
    initialCode: `<?php
// Clase simuladora de PDO - ¡NO MODIFICAR!
class Database {
    public static function prepare($query) {
        return new class($query) {
            private $query;
            public function __construct($q) { $this->query = $q; }
            public function execute($params) {
                if (strpos($this->query, ':categoria') !== false && $params['categoria'] === 'Celulares') {
                    $this->count = 8;
                } else {
                    $this->count = 0;
                }
                return $this;
            }
        };
    }
}

// Escribe tu código preparado aquí abajo
`,
    tests: [
      {
        description: "Debe usar ':categoria' en el SQL prepared query",
        validate: (code, output) => code.includes(":categoria")
      },
      {
        description: "Debe pasar 'Celulares' al método execute",
        validate: (code, output) => code.includes("'Celulares'")
      },
      {
        description: "La salida esperada debe ser '8'",
        validate: (code, output) => output.trim() === "8"
      }
    ]
  },
  {
    id: "m6_transactions",
    level: 6,
    levelTitle: "Módulo 6: Bases de Datos (PostgreSQL / MySQL)",
    title: "2. Transacciones con PDO (Commit y Rollback)",
    localPath: "Herd/phpcamp/m6_02_transactions.php",
    instructions: `
### Transacciones en Bases de Datos
Una transacción agrupa múltiples operaciones en la base de datos (por ejemplo, descontar dinero de una cuenta y sumarlo en otra). Si alguna de las operaciones falla, debemos cancelar todo (**Rollback**) para evitar inconsistencia de datos. Si todo es exitoso, confirmamos la transacción (**Commit**):
\`\`\`php
$pdo->beginTransaction();
try {
    $pdo->exec("UPDATE...");
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
}
\`\`\`

#### Instrucciones (Simulando Transacciones):
Se te proporciona una clase \`PDOConnection\` con los métodos de transacción simulados.
1. Inicia la transacción llamando a \`$pdo->beginTransaction()\`.
2. Dentro de un bloque \`try\`, ejecuta la transferencia llamando a \`$pdo->transferir(100)\`.
3. Confirma la transacción con \`$pdo->commit()\`.
4. En caso de fallar, captura la excepción en el bloque \`catch\` y cancela los cambios llamando a \`$pdo->rollBack()\`.
    `,
    initialCode: `<?php
// Clase simuladora de PDO Connection - ¡NO MODIFICAR!
class PDOConnection {
    public function beginTransaction() { echo "Inicio-"; }
    public function transferir($monto) { 
        if ($monto > 500) throw new Exception("Saldo insuficiente");
        echo "Transferido-";
    }
    public function commit() { echo "Confirmado"; }
    public function rollBack() { echo "Cancelado"; }
}
$pdo = new PDOConnection();

// Escribe el bloque de transacción try/catch/finally abajo
`,
    tests: [
      {
        description: "Debe iniciar la transacción con beginTransaction()",
        validate: (code, output) => code.includes("beginTransaction()")
      },
      {
        description: "Debe confirmar con commit() en el bloque try",
        validate: (code, output) => code.includes("commit()")
      },
      {
        description: "Debe cancelar con rollBack() en el bloque catch",
        validate: (code, output) => code.includes("rollBack()")
      },
      {
        description: "La salida esperada de la transferencia de 100 debe ser 'Inicio-Transferido-Confirmado'",
        validate: (code, output) => output.trim() === "Inicio-Transferido-Confirmado"
      }
    ]
  }
];
