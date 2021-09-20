import express from 'express';
import Producto from './productos.js';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const allProds = [];

app.get('/api/productos/listar', (req, res) =>{
    if (allProds.length===0){
        res.json({error: 'no hay produtos cargados'})
    } else {
        res.json(allProds)
    }
})

app.get('/api/productos/listar/:id', (req, res)=>{
    const {id} = req.params;
    const prodId = allProds.find (prod => prod.id == id)
    if(prodId){
        res.json(prodId)
    }else {
        res.json({error: 'producto no encontrado'})
    }
})

app.post('/api/productos/guardar/', (req, res)=>{
    const newProduct = {
        id: new Date().getTime(),
        ...req.body,
    }
    allProds.push(newProduct);
    res.send(newProduct);
})
