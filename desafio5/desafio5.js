const http = require("http");
let server = http.createServer(function(pet, res) {
    let num = Math.floor((Math.random()*10-1)+1);
    let objeto =         
            {
        id:num,
        title: "Producto " + num,
        price: Math.floor((Math.random()*9999.99-1)) + Math.random().toFixed(2),
        thumbnail: "Foto " + Math.floor((Math.random()*10-1)+1),
       }

    res.end(
        JSON.stringify(objeto)
        )
})
const PORT = process.env.port || 3000;
server.listen(PORT, ()=> {
    console.log("puerto escuchando en el mejor puerto")
})


