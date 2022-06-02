var fs = require("fs");

let readMe1 = fs.readFileSync("examplefile.txt", "utf8");
console.log("Contenido antes de modificar:", readMe1)

fs.appendFileSync("examplefile.txt", "World");

let readMe2 = fs.readFileSync("examplefile.txt", "utf8");
console.log("Contenido despues de modificar:", readMe2)