import { Router } from "express";
import {
  agregarProducto,
  borrarProducto,
  getCarrito,
  getProductsFromCarrito,
} from "../controllers/carrito.controller.js";

const carritoRouter = Router();

carritoRouter
  .get("/listar", getCarrito)
  .get("/productos", getProductsFromCarrito)
  .post("/agregar", agregarProducto)
  .delete("/borrar/:id", borrarProducto);

export default carritoRouter;
