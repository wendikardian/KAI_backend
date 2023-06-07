
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const connection = require("./app/models/db.js");
var bodyParser = require("body-parser");
const {
  signup,
  login,
  getStation,
  addStation,
  getSpesificStation,
  editStation,
  deleteStation,
  addRoute,
  getRoute,
  getSpecificRoute,
  getTrain,
  addSchedule,
  getSchedule,
  getSpesificUser,
  getSeat,
  getScheduleById,
  addBooking,
  getTicket,
  editTicket,
  getWagon,
  getPassanger
} = require("./app/controllers/controller.js");

var corsOptions = {
  origin: "*",
};
// console.log(connection)
// connection();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// require("./app/routes/routes.js")(app);

app.post("/user", signup);
app.post("/login", login);
app.get("/user/:username", getSpesificUser);
app.get("/station", getStation);
app.post("/add_station", addStation);
app.get("/station/:id", getSpesificStation);
app.put("/station/:id", editStation);
app.delete("/station/:id", deleteStation);
app.post("/add_route", addRoute);
app.get("/route", getRoute);
app.get("/route/:id", getSpecificRoute);
app.get("/train", getTrain);
app.post("/add_schedule", addSchedule);
app.get("/schedule", getSchedule);
app.get("/schedule/:id", getScheduleById);
app.get("/seat", getSeat);
app.post("/booking", addBooking);
app.get("/ticket/:id", getTicket);
app.put("/ticket/", editTicket);
app.get("/wagon", getWagon);
app.get("/passanger/:id", getPassanger);


const port = 3000; // choose any available port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
