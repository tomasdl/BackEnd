import { Router } from "express";
import {
	getProductos,
	agregarProducto,
	actualizarProducto,
	borrarProducto,
} from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter
	.get("/listar/:id?", getProductos)
	.post("/agregar", agregarProducto)
	.put("/actualizar/:id", actualizarProducto)
	.delete("/borrar/:id", borrarProducto);

export default productosRouter;