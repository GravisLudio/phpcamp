let jsCode = '<?php\\n// Imprime Hola Mundo usando echo\\necho "Hola Mundo";';
jsCode = jsCode.replace(/echo\\s+([^;]+);/g, "echo($1);");
console.log(jsCode);
