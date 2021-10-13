const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
//MessagesDB
const msgOptions = require("./options/sqlite3");
const msgKnex = require("knex")(msgOptions);

//ProductsDB
const prodsOptions = require("./options/mariaDB");
const prodsKnex = require("knex")(prodsOptions);

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

// let listExists = true;
// const allProds = [];

// function listExist() {
//   if (allProds.length > 0) {
//     return (listExists = true);
//   } else {
//     return (listExists = false);
//   }
// }

// app.get("/productos/vista", (req, res) => {
//   res.render("main", { elementos: allProds, listExists: listExist() });
// });

router.get("/productos/listar", (req, res) => {
  prodsKnex
    .select("*")
    .from("products")
    .then((productos) => {
      if (productos.length) {
        res.json(productos);
      } else {
        res.json({ error: "no hay productos cargados" });
      }
    })
    .catch((e) => {
      console.log("Error obteniendo productos", e);
      prodsKnex.destroy();
    });
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  prodsKnex
    .from("products")
    .select("*")
    .where({ id: id })
    .then((prodId) => {
      res.json(prodId);
    })
    .catch((e) => {
      console.log("Error obteniendo el producto: ", e);
      prodsKnex.destroy();
    });
});

router.post("/productos/guardar", (req, res) => {
  prodsKnex("products")
    .insert(req.body)
    .then(() => {
      console.log("producto insertado");
      res.status(201).redirect("/");
    })
    .catch((e) => {
      console.log("error al insertar", e);
      prodsKnex.destroy();
    });
});
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // funcion para leer todos los mensajes de la db y mostrarlos.
  function selectAllMessages() {
    msgKnex
      .select("*")
      .from("messages")
      .orderBy("date", "desc")
      .then((messages) => {
        socket.emit("messages", { messages: messages });
      })
      .catch((e) => {
        console.log("Error obteniendo mensajes: ", e);
        msgKnex.destroy();
      });
  }

  //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
  selectAllMessages();

  prodsKnex
    .select("*")
    .from("products")
    .orderBy("id", "asc")
    .then((products) => {
      socket.emit("productCatalog", {
        products: products,
        updateForm: false,
        viewTitle: "Listado de productos",
        errorMessage: "No hay productos.",
      });
    })
    .catch((e) => {
      console.log("Error getting products: ", e);
      prodsKnex.destroy();
    });

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
        msgKnex.destroy();
      });
  });
});

// router.put("/productos/actualizar/:id", (req, res) => {
//   const { id } = req.params;
//   prodsKnex('products').update(req.body).where({ id: id })
//   .then(prod => {
//       console.log('producto actualizado', prod )
//       res.status(200).json(prod);
//   })
// .catch(e => {
//     console.log('Error en Update producto: ', e);
//     prodsKnex.destroy;
// });
// });

// ----------------
//   if (!producto) {
//     return res.status(404).json({ msg: "Producto no encontrado" });
//   } else {
//     (producto.title = title),
//       (producto.price = price),
//       (producto.thumbnail = thumbnail);

//     res.status(200).json(producto);

router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  prodsKnex("products")
    .del()
    .where({ id: id })
    .then((prod) => {
      console.log("producto eliminado: ", prod);
      res.redirect("/");
    })
    .catch((e) => {
      console.log("Error en Delete producto: ", e);
      prodsKnex.destroy();
    });
});
