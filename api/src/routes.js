const express = require("express");
const router = express.Router();

const items = require("./controllers/item");

const verifier = (req, res) => {
    res.json("Back-end sucinto");
}

router.get("/", verifier);

router.get("/items", items.getAll);
router.get("/items/:id", items.get);
router.post("/items/create/", items.create);
router.put("/items/:id", items.update);
router.delete("/items/:id", items.deleteItem);

module.exports = router;