const msgOptions = {
    client: 'sqlite3',
    connection: {
        filename: './db/mensajes.sqlite'
    },
    useNullAsDefault: true
}

console.log('Conectando a la base de datos...');

module.exports = {
    msgOptions
}