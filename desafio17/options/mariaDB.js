const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'coderhouse'
    }
}

console.log('Conectando a la base de datos...');

module.exports = {
    options
}
// Definir una carpeta DB para almacenar la base datos SQLite3 llamada mensajes y crear por 
// programa la tabla de mensajes dentro de esta base si no existe.
