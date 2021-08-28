let http = require("http");
let hora = new Date().getHours();
let server = http.createServer(function (peticion, respuesta) {
    if(hora>6 && hora <= 12){
    respuesta.end("Buenos dia")
    } else if(hora>13 && hora<=19){
        respuesta.end("Buenas tardes")
    } else {
        respuesta.end("Buenas noches")
    }
});

server.listen(8500,function(){
    console.log("tu servidor esta listo en " + this.address().port);
});