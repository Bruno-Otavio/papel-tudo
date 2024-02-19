const connection = require("../connect/connect").connection;
const frontUrl = "http://127.0.0.1:5500/frontend/index.html";

const getAll = (req, res) => {
    let query = "SELECT * FROM item";
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else res.status(202).json(result).end();
    });
}

const get = (req, res) => {
    const id = req.params.id;
    console.log(id);
    let query = `SELECT * FROM item WHERE id = "${id}"`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else res.status(202).json(result[0]).end();
    });
}

const create = (req, res) => {
    const item = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };
    
    let query = `INSERT INTO item(nome, descricao, valor) VALUE ("${item.name}", "${item.description}", "${item.price}")`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            const newItem = req.body;
            newItem.id = result.insertId;
            res.status(201).json(newItem).end();
        }
    });
}

const update = (req, res) => {
    const item = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };

    let query = `UPDATE item SET nome = '${item.name}', descricao = '${item.description}', valor = ${item.price} WHERE id = ${item.id}`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            if (result.affectedRows > 0) {
                res.status(202).json(req.body).end();
            } else {
                res.status(404).json(err).end();
            }
        }
    });
}

const deleteItem = (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM item WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else {
            if (result.affectedRows > 0) {
                res.status(204).json(result).end();
            }
            else {
                result.message = "ID not found";
                res.status(404).json(result).end();
            }
        }
    });
}

module.exports = { getAll, get, create, update, deleteItem };
