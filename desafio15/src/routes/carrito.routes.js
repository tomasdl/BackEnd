import { Router } from "express";
import {
  agregarProductos,
  borrarProducto,
  getCarrito,
  getProductsFromCarrito,
} from "../controllers/carrito.controller.js";

const carritoRouter = Router();
carritoRouter
  .get("/listar", getCarrito)
  .get("/productos", getProductsFromCarrito)
  .post("/agregar", agregarProductos)
  .delete("/borrar/:id", borrarProducto);

export default carritoRouter;