import Express from 'express';
import carritoRouter from './routes/carrito.routes.js';
import productosRouter from './routes/productos.routes.js';

const app = Express();

app.use(Express.json());

app.get("/", (_,res)=>{
    return res.json({message: "Bienvenido al ROOT"});
});

app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

export default app;
