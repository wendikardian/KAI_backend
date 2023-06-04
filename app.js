const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const connection = require("./app/models/db.js");
var bodyParser = require('body-parser')
const { signup, login, getStation, addStation, getSpesificStation } = require("./app/controllers/controller.js");

var corsOptions = {
  origin: "*"
};
// console.log(connection)
// connection();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// require("./app/routes/routes.js")(app);


app.post("/user", signup);
app.post("/login", login);
app.get("/station", getStation);
app.post("/add_station", addStation);
app.get("/station/:id", getSpesificStation);

const port = 3000; // choose any available port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
