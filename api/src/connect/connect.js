const mysql = require("mysql");

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "inventario"
});

module.exports = { connection };
