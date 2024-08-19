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



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spice-lounge-db",
});

// JWT Related API
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "100000hr",
  });
  res.send({ token });
});



































// Create a simple route
app.get("/", (req, res) => {
  res.send("Spice Lounge is Running ");
});

app.listen(port, () => {
  console.log("Connected Successfully...");
});