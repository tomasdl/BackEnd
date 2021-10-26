const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// mongoose
const mongoose = require("mongoose");

// //Messages mongoose
const Mensaje = require("./models/messages");

//Products mongoose
const Producto = require("./models/producto");

const router = express.Router();
const PORT = 8080;

http.listen(PORT, () => console.log("escuchando.."));

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// // handlebars

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
  {
    title: "sacapuntas",
    price: 50,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/thin-office/24/thin-1582_sharpener_pencil-512.png",
  },
  {
    title: "mochila",
    price: 3500,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/backpack-and-bag/512/bagpack-04-512.png",
  },
  {
    title: "cuaderno",
    price: 200,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/school-74/128/school-14-512.png",
  },
  {
    title: "libro",
    price: 1231,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-528/64/education_educate_school_college_book-512.png",
  },
  {
    title: "pincel",
    price: 4000,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-528/64/education_educate_school_college_paint_brush_tool-512.png",
  },
  {
    title: "lupa",
    price: 12546,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/school-74/128/school-34-512.png",
  },
  {
    title: "abrochadora",
    price: 2400,
    thumbnail:
      "https://cdn0.iconfinder.com/data/icons/stationery-jumpicon-glyph/32/-_Stapler-Office-Tools-School-Utensils-Paper-512.png",
  },
];

CRUD();

async function CRUD() {
  try {
    // me conecto a la base de mongo via mongoose
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 1000,
    });
    console.log("Conectado a la base de datos...");

    // borro los documentos de la coleccion cuando arranco el servidor
    await Producto.deleteMany({});
    console.log("productos borrados");

    // inserto items
    await Producto.insertMany(items)
      .then(console.log("productos insertados"))
      .catch((e) => console.log("error al insertar docs: ", e));
  } catch (error) {
    console.log(error);
  }
}

io.on("connection", (socket) => {
  console.log("Someone is connected");

  //funcion para leer todos los mensajes de la db y mostrarlos.
  function selectAllMessages() {
    Mensaje.find()
      .sort({ time: 1 })
      .then((messages) => {
        socket.emit("messages", messages);
      })
      .catch((e) => {
        console.log("Error getting messages: ", e);
      });
  }

  //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
  selectAllMessages();

  //Inserto un nuevo mensaje en la base de datos de mensajes.
  socket.on("newMsg", (newMsg) => {
    Mensaje
      .create(newMsg)
      .then(() => {
        console.log("Mensaje insertado");
        selectAllMessages();
        return false;
      })
      .catch((e) => {
        console.log("Error en Insert message: ", e);
      });
  });
});

// Read productos
router.get("/productos/listar", (req, res) => {
  Producto.find()
    .sort({ _id: 1 })
    .then((products) => {
      if (products.length) {
        res.json(products);
      } else {
        res.render({ msg: "no hay productos cargados" });
      }
    })
    .catch((e) => {
      console.log("Error trayendo productos: ", e);
    });
});

// Read productos por id
router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  Producto.findById(id)
    .exec()
    .then((productos) => {
      if (productos) {
        res.json(productos);
      } else {
        res.json({ msg: "producto no encontrado" });
      }
    })
    .catch((e) => {
      console.log("Error en Select:", e);
    });
});

// Create productos
router.post("/productos/guardar", (req, res) => {
  const newProduct = {
    ...req.body,
  };
  Producto.create(newProduct)
    .then(() => {
      console.log("Producto/s ingresado");
      res.status(201).redirect("/");
    })
    .catch((e) => {
      console.log("Error en Insert:", e);
    });
});

// Update productos
router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  Producto.updateOne(
    { _id: id },
    { $set: { title: title, price: price, thumbnail: thumbnail } }
  )
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
    });
});

// Delete productos
router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;

  Producto.findByIdAndRemove(id)
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
    });
});
