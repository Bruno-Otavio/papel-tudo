const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const routes = require("./src/routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
//app.use(bodyparser.urlencoded({ extended: false }))
app.use(routes);

app.listen(port, () => {
    console.log(`Back-end port: ${port}`);
});