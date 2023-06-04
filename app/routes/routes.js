const { signup } = require("../controllers/controller.js");

const router = require("express").Router();

module.exports = app => {

    app.post("/user", signup);
}

