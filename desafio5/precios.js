let productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
   ];

//    A) Los nombres de los productos en un string separados por comas.
//    B) El precio total
//    C) El precio promedio
//    D) El producto con menor precio
//    E) El producto con mayor precio
//    F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola

// A
let nombres = productos.map(e=>e.nombre).join(',');

let suma = productos.reduce((acu,act)=>acu + act.precio,0).toFixed(2);

let promedio = (productos.reduce((acu,act)=>acu + act.precio,0) / productos.length).toFixed(2);

let minimo = productos.find(e=>e.precio == Math.min(...productos.map(e=>e.precio)));

let maximo = productos.find(e=>e.precio == Math.max(...productos.map(e=>e.precio)));


let miObjeto = { nombres, suma, promedio, minimo, maximo };
console.log(miObjeto);