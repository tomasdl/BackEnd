function *creaNum(){
    let indice = 0;
    while (true) {
        indice++;
        yield Math.random()*10;;
    }
}

let creadorNum = creaNum();


const miPromesa1 = new Promise ((resolve, reject)=>{
    let azar = Math.random();
    setTimeout(()=>azar >= 0.2 ? resolve({nombre: "Tomas"}) : reject("error1"),
    3000)
});
const miPromesa2 = new Promise ((resolve, reject)=>{
    let azar = Math.random();
    setTimeout(()=>azar >= 0.2 ? resolve({nombre: "Lucas"}) : reject("error2"),
    2000)
});
const miPromesa3 = new Promise ((resolve, reject)=>{
    let azar = Math.random();
    setTimeout(()=>azar >= 0.2 ? resolve({nombre: "Pedro"}) : reject("error3"),
    5000)
});
const miPromesa4 = new Promise ((resolve, reject)=>{
    let azar = Math.random();
    setTimeout(()=>azar >= 0.2 ? resolve({nombre: "Juan"}) : reject("error4"),
    1000)
});
const miPromesa5 = new Promise ((resolve, reject)=>{
    let azar = Math.random();
    setTimeout(()=>azar >= 0.2 ? resolve({nombre: "Jose"}) : reject("error5"),
    4000)
});

//Emitir un mensaje previo a comenzar los accesos a internet
console.log("Arrancando los accesos")

//Lanzar los 5 accesos en forma automática (es decir, el 2do debe lanzarse sin esperar que finalice el 1ero y así sucesivamente)
miPromesa1
//Al regresar cada uno de los accesos, emitir el resultado (ok u error) y en caso de retornar ok,imprimir por consola el objeto recibido.
    .then(resultado => console.log("ok", resultado))
    .catch(err => console.log(erorr, err))
//A su vez, en cada acceso, haya vuelto ok o con error, imprimir por consola un nuevo número al azar utilizando el mismo iterador anterior
    .finally(()=>console.log(creadorNum.next().value));
miPromesa2
    .then(resultado => console.log("ok", resultado))
    .catch(err => console.log(erorr, err))
    .finally(()=>console.log(creadorNum.next().value));
miPromesa3
    .then(resultado => console.log("ok", resultado))
    .catch(err => console.log(error, err))
    .finally(()=>console.log(creadorNum.next().value));
miPromesa4
    .then(resultado => console.log("ok", resultado))
    .catch(err => console.log(erorr, err))
    .finally(()=>console.log(creadorNum.next().value));
miPromesa5
    .then(resultado => console.log("ok", resultado))
    .catch(err => console.log(erorr, err))
    .finally(()=>console.log(creadorNum.next().value));

//Luego de lanzar los accesos, pero sin esperar el retorno los mismos, ejecutar un sub-proceso que emita por consola 25 números al azar utilizando funciones generadoras e iteradores
function creador() {
    for (let i=0; i<25; i++){
    console.log(creadorNum.next().value);
}}

creador();

