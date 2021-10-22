const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// mongoose
const mongoose = require('mongoose');

// //Messages mongoose
import {Message}  from './models/messages.js';

//Products mongoose
import {Producto}  from './models/producto.js';

const router = express.Router();
const PORT = 8080;

http.listen(PORT, () => console.log("escuchando.."));

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const allProds = [];

const items = [
  {
    title: "calculadora",
    price: 2000,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/start-up-4/44/calculator-512.png",
  },
  {
    title: "regla",
    price: 35,
    thumbnail:
      "https://cdn1.iconfinder.com/data/icons/office-and-business-2-2/85/ruler_measure_tool-512.png",
  },
  {
    title: "lapiz",
    price: 25,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/scenarium-vol-19/128/019_036_pencil_edit_write_compose-512.png",
  },
];

// dropeo tabla productos si existe
prodsKnex.schema
  .dropTableIfExists("productos")

  // creo la tabla productos
  .then(() => {
    console.log("Tabla productos borrada...");
    return prodsKnex.schema.createTable("productos", (table) => {
      table.increments("id"),
        table.string("title"),
        table.integer("price"),
        table.string("thumbnail");
    });
  })

  // inserto los items en la tabla
  .then(() => {
    console.log("Tabla de productos creada...");
    if (items.length) {
      return prodsKnex("productos").insert(items);
    } else {
      return console.log("api no generada");
    }
  })
  .then(() => {
    console.log("Productos insertadas!");
  })
  .catch((e) => {
    console.log("error al crear tabla productos:", e);
    prodsKnex.destroy();
  });



msgKnex.schema.dropTableIfExists("messages").then(() => {
  console.log("Tabla productos borrada...");
});
msgKnex.schema
  .createTable("messages", (table) => {
    table.string("email");
    table.string("time");
    table.string("text");
  })
  .then(() => {
    console.log("Tabla messages creada.");
  })
  .catch((e) => {
    console.log("Error al crear tabla messages.", e);
    msgKnex.destroy();
  });

io.on("connection", (socket) => {
  console.log("Someone is connected");

  //funcion para leer todos los mensajes de la db y mostrarlos.
  function selectAllMessages() {
    msgKnex
      .select("*")
      .from("messages")
      .orderBy("time", "asc")
      .then((messages) => {
        socket.emit("messages", messages);
      })
      .catch((e) => {
        console.log("Error getting messages: ", e);
        msgKnex.destroy();
      });
  }

  //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
  selectAllMessages();

  //Inserto un nuevo mensaje en la base de datos de mensajes.
  socket.on("newMsg", (newMsg) => {
    msgKnex("messages")
      .insert(newMsg)
      .then(() => {
        console.log("Mensaje insertado");
        selectAllMessages();
        return false;
      })
      .catch((e) => {
        console.log("Error en Insert message: ", e);
        msgKnex.destroy;
      });
  });
});

// Read productos
router.get("/productos/listar", (req, res) => {
  prodsKnex
    .from("productos")
    .select("*")
    .then((productos) => {
      if (productos.length) {
        res.json(productos);
      } else {
        res.json({ msg: "No hay productos almacenados" });
      }
    })
    .catch((e) => {
      console.log("Error en Select:", e);
      prodsKnex.destroy();
    });
});

// Read productos por id
router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  prodsKnex
    .from("productos")
    .select("id", "title", "price", "thumbnail")
    .where("id", "=", id)
    .then((productos) => {
      if (productos.length) {
        res.json(productos);
      } else {
        res.json({ msg: "producto no encontrado" });
      }
    })
    .catch((e) => {
      console.log("Error en Select:", e);
      prodsKnex.destroy();
    });
});

// Create productos
router.post("/productos/guardar", (req, res) => {
  const newProduct = {
    ...req.body,
  };
  prodsKnex("productos")
    .insert(newProduct)
    .then(() => {
      console.log("Producto/s ingresado");
      res.status(201).redirect("/");
    })
    .catch((e) => {
      console.log("Error en Insert:", e);
      prodsKnex.destroy();
    });
});

// Update productos
router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  prodsKnex
    .from("productos")
    .where("id", "=", id)
    .update({ title: title, price: price, thumbnail: thumbnail })
    .then((producto) => {
      if (producto) {
        res.status(200).redirect("/");
        console.log("Filas actualizadas!");
      } else {
        res.json({ msg: "Producto no existente" });
      }
    })
    .catch((e) => {
      console.log("Error en Update:", e);
      prodsKnex.destroy();
    });
});

// Delete productos
router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;

  prodsKnex
    .from("productos")
    .where("id", "=", id)
    .del()
    .then((producto) => {
      if (producto) {
        console.log("Filas borradas!");
        res.status(200).redirect("/");
      } else {
        res.status(404).json({ msg: "Producto no existente" });
      }
    })
    .catch((e) => {
      console.log("Error en Delete:", e);
      prodsKnex.destroy();
    });
});
