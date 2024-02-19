const mysql = require("mysql");

const connection = mysql.createConnection({
    user: "root",
    //password: "ROOT",
    host: "localhost",
    database: "inventario"
});

module.exports = { connection };
