import { config } from "../constants/index.js";
import { Producto } from "../models/Producto.js";

const productos = [];

export const getProductos = (req, res) => {
  const { id } = req.params;
  const prodId = productos.find((prod) => prod.id == id);

  if (productos.length === 0) {
    res.json({ error: "no hay produtos cargados" });
  } else {
    if (id) {
      if (prodId) {
        res.status(200).json(prodId);
      } else {
        res.json({ error: "producto no encontrado" });
      }
    } else {
      res.status(200).json(productos);
    }
  }
};
export const agregarProducto = (req, res, next) => {
  if (config.isAdmin) {
    const { name, description, code, image, price, stock } = req.body;
    const newProduct = new Producto(
      name,
      description,
      code,
      image,
      price,
      stock
    );
    productos.push(newProduct);
    return res.status(201).json(newProduct);
  } else {
    res
      .status(403)
      .json({
        error: -1,
        descripcion: "ruta 'productos/agregar' método 'post' no autorizada",
      });
  }
};
export const actualizarProducto = (req, res) => {
  if (config.isAdmin) {
    const { id } = req.params;
    const { name, description, code, image, price, stock } = req.body;
    const producto = productos.find((prod) => prod.id == id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    } else {
      (producto.name = name),
        (producto.description = description),
        (producto.code = code),
        (producto.image = image),
        (producto.price = price),
        (producto.stock = stock);

      res.status(200).json(producto);
    }
  } else {
    res
      .status(403)
      .json({
        error: -1,
        descripcion: "ruta 'productos/actualizar' método 'put' no autorizada",
      });
  }
};
export const borrarProducto = (req, res) => {
  if (config.isAdmin) {
    const { id } = req.params;
    const producto = productos.find((prod) => prod.id == id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    } else {
      const index = productos.findIndex((prod) => prod.id == id);
      productos.splice(index, 1);

      res.status(200).json(producto);
    }
  } else {
    res
      .status(403)
      .json({
        error: -1,
        descripcion: "ruta '/productos/borrar' método 'delete' no autorizada",
      });
  }
};
