const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var router = require("./routes/routes");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", router);

app.listen(45678, () => {
    console.log("API RODANDO!");
});