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
console.log('conectando a la base de datos');
module.exports = {
    options
}