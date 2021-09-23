const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3030;

http.listen(PORT, () => console.log("escuchando..."));

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

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("items", allProds);
  socket.on("item", (dato) => {
    productos.push(dato);
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
