import Suma from "./Suma";
import Resta from "./Resta";

const operacion = async(numero1:number, numero2:number, cuenta:string)=>{
    return new Promise(async (resolve)=>{
        if (cuenta === "suma") {
            const sum = await import("./Suma")
            resolve(new Suma(numero1,numero2).resultado());
        }
        if (cuenta === "resta") {
            const rest = await import("./Resta");
            resolve(new Resta(numero1,numero2).resultado());
        }
    })
};

function operaciones(){
    operacion(10,5,"suma").then(res => console.log(res))
    operacion(10,5,"resta").then(res => console.log(res))
}
operaciones();