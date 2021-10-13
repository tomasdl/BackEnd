const prodsOptions = require('./options/mariaDB');
const prodsKnex = require('knex')(prodsOptions);

const products = [
    {
        "title": "calculadora",
        "price": 2000,
        "foto": "https://cdn3.iconfinder.com/data/icons/start-up-4/44/calculator-512.png",
    },
    {
        "title": "regla",
        "price": 35,
        "foto": "https://cdn1.iconfinder.com/data/icons/office-and-business-2-2/85/ruler_measure_tool-512.png",
    },
    ]

prodsKnex('products').insert(products)
    .then(() => console.log("Productos agregados"))
    .catch(e => {
        console.log(e)
        prodsKnex.destroy();
    });