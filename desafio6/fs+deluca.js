const fs = require("fs");

class Archivo {
    constructor(rutaArchivo) {
      this.rutaArchivo = rutaArchivo;
    }
    async leerArchivo() {
        try{ 
            if(fs.readdirSync('../desafio6').length === 1){
                console.log([])
            } else {
                const archivoLeido = await fs.promises.readFile(this.rutaArchivo, "utf-8")
                let parseado = JSON.parse(archivoLeido);
                console.log ("contenido del archivo: ", parseado);
            }
        }
        catch (err){
            console.log("error al leer archivo: ", err);
        }
    }
    async guardarArchivo(objeto) {
        try {
            if (fs.readdirSync('../desafio6').length === 1){
                fs.writeFileSync(this.rutaArchivo,"[]");
                const archivoLeido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
                let parseado = JSON.parse(archivoLeido);
                objeto["id"] = parseado.push(objeto)
                const archivoGuardado = await fs.promises.writeFile(this.rutaArchivo, 
                JSON.stringify(parseado));
            } else {
                const archivoLeido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
                let parseado = JSON.parse(archivoLeido);
                objeto["id"] = parseado.push(objeto)
                const archivoGuardado = await fs.promises.writeFile(this.rutaArchivo, 
                JSON.stringify(parseado));
            }
        }
        catch(err){
            console.log("error al guardar", err)
        };
    }
    async borrarArchivo() {
        try {
            const archivoBorrado = await fs.promises.unlink("./productos.txt");
            console.log("archivo Borrado");
        }
        catch (err){
            console.log("No existe el archivo que quieres borrar");
        }
      }
  }
const nuevo = new Archivo ("./productos.txt");

// metodos! Usar de a uno a la vez


// nuevo.guardarArchivo({ 
//     title: 'Escuadra', 
//     price: 123.45, 
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
//     });


// nuevo.guardarArchivo({ 
//     title: 'Calculadora', 
//     price: 234.56, 
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
//     });


// nuevo.guardarArchivo({ 
//     title: 'Globo Terráqueo', 
//     price: 345.67, 
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
//     });


// nuevo.leerArchivo();


// nuevo.borrarArchivo()
   