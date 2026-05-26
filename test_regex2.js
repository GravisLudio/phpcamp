let jsCode = `<?php
// Imprime Hola Mundo usando echo
echo "Hola Mundo";`;
jsCode = jsCode.replace(/echo\\s+([^;]+);/g, "echo($1);");
console.log(jsCode);
