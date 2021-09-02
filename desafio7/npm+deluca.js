import { Console } from "console";
import express from "express";
import fs from "fs";

const app = express();
const PUERTO = 8080;
let visitasItems = 0;
let visitasrandom = 0;

// leo el archivo productos.txt

const productos = fs.readFileSync("../desafio6/productos.txt", "utf-8");

// inicio servidor
const server = app.listen(PUERTO, () => {
  console.log(`Escuchandote el servidor ${server.address().port}`);
});
// manejo de errores
server.on("error", (error) =>
  console.log(`error al escuchar servidor ${error}`)
);

// mando los productos al /items
app.get("/items", (req, res) => {
  console.log(`request 1 recibido`);
  ++visitasItems;
  let prod = {
    items: JSON.parse(productos),
    cantidad: JSON.parse(productos).length,
  };
  res.json(prod);
});

app.get("/item-random", (req, res) => {
  console.log(`request 2 recibido`);
  ++visitasrandom;
  let azar = {
    "title": "Globo Terráqueo" ,
    "price": 345.67,
    "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" ,
    "id": 3
    };
  res.json( { item: azar });
});

app.get('/visitas', (req,res)=>{
    console.log(`request 3 recibido`)
    res.json({ visitas : { items: 
        visitasItems, item: visitasrandom } }
        )
});
