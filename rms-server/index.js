const express = require("express");
const mysql = require("mysql");
const util = require("util");
const app = express();
require("dotenv").config();
var jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a simple route
app.get("/", (req, res) => {
  res.send("Spice Lounge is Running ");
});

app.listen(port, () => {
  console.log("Connected Successfully...");
});