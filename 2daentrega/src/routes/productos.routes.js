import {Router} from 'express';
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/productos.controller.js';

const productosRouter = Router();

productosRouter
	.get('/', getProducts)
	.get('/:id', getProducts)
	.post('/', createProduct)
	.put('/:id', updateProduct)
	.delete('/:id', deleteProduct);

export default productosRouter;
