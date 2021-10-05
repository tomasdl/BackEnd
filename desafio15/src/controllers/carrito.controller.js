import { Carrito } from "../models/Carrito.js";
import carritoRouter from "../routes/carrito.routes.js";

const carrito = new Carrito();

export const getCarrito = (req, res) => {
  return res.status(200).json(carrito);
};
export const getProductsFromCarrito = (req, res) => {
  return res.status(200).json(carrito.productos);
};
export const agregarProductos = (req, res) => {
  const { body } = req;
  carrito.productos.push(body);
  return res.status(201).json(body);
};
export const borrarProducto = (req, res) => {
  const { id } = req.params;
  console.log(id);

  const index = carrito.productos.findIndex((prod) => prod.id == id);

  const deleted = carrito.productos.splice(index, 1);

  return res.status(200).json(deleted);
};
