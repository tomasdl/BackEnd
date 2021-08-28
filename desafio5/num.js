// creo un objeto vacio
let numeros = {};

// armo las claves del 1 al 20
for (let i = 1;i<=20;i++){
// asi se expresa la clave obj.clave o obj[clave]
 numeros[i] = 0;  
}

// genero 10mil numeros random.
for (let i = 0;i<=10000;i++){
    let azar = Math.floor((Math.random() * 20) + 1);
// a la posicion de ese numero random le sumo 1
    numeros[azar]++;
}
console.log(numeros);