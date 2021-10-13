const express = require("express");
const handlebars = require("express-handlebars");
const path = require('path');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require('fs');

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

http.listen(PORT, () => console.log("escuchando.."));

// const server = app.listen(PORT, ()=>{
//     console.log('Servidor HTTP escuchando en el puerto', server.address().port);
// });
// server.on('error', error=>console.log('Error en servidor', error));

const router = express.Router();

const allProds = [];

app.use("/api", router);

// handlebars

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "hbs"); // registra el motor de plantillas

let listExists = true;

function hola() {
  if (allProds.length > 0) {
    return (listExists = true);
  } else {
    return (listExists = false);
  }
}


let fileDir = './mensajes.json';

//Funciones para persistencia de datos en mensajes.json
function leerMensajes() {
    let messages = fs.readFileSync(path.join(__dirname,"mensajes.json"), "utf-8")
    let parsedMessages = JSON.parse(messages);
    console.log("File read correctly.");
    return parsedMessages;
}

function guardarMensajes(msj) {
    let messages = leerMensajes();
    messages.push(msj);
    fs.writeFileSync(fileDir, JSON.stringify(messages));
    console.log("Message saved.");
}

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  let messages = leerMensajes();

  
  socket.on('new-message', (data) => {
    guardarMensajes(data);
    io.sockets.emit('messages', leerMensajes());
  });
  
  socket.emit('messages', messages);
  socket.emit("items", allProds);
  
  socket.on("item", (dato) => {
    allProds.push(dato);
    io.socket.emit("items", allProds);
  });

});

app.get("/productos/vista", (req, res) => {
  res.render("main", { elementos: allProds, listExists: hola() });
});

router.get("/productos/listar", (req, res) => {
  if (allProds.length === 0) {
    res.json({ error: "no hay produtos cargados" });
  } else {
    res.json(allProds);
  }
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  const prodId = allProds.find((prod) => prod.id == id);
  if (prodId) {
    res.json(prodId);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

router.post("/productos/guardar", (req, res) => {
  const newProduct = {
    id: new Date().getTime(),
    ...req.body,
  };
  allProds.push(newProduct);
  res.status(201).redirect("/");
});

router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const producto = allProds.find((producto) => producto.id == id);
  if (!producto) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  } else {
    (producto.title = title),
      (producto.price = price),
      (producto.thumbnail = thumbnail);

    res.status(200).json(producto);
  }
});

router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  const producto = allProds.find((producto) => producto.id == id);

  if (!producto) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  } else {
    const index = allProds.findIndex((producto) => producto.id == id);
    allProds.splice(index, 1);

    res.status(200).json(producto);
  }
});