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

// ----------------------

// Middlewares
// Verify Token
const verifyToken = (req, res, next) => {
  console.log("inside verify", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};

// Verify Admin
const verifyAdmin = (req, res, next) => {
  const email = req.decoded.email;

  const sql = "SELECT userRole FROM users WHERE userEmail = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Internal Server Error");
    }

    const isAdmin =
      results && results.length > 0 && results[0].userRole === "admin";

    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden Access" });
    }

    next();
  });
};

const queryAsync = util.promisify(db.query);


































// Create a simple route
app.get("/", (req, res) => {
  res.send("Spice Lounge is Running ");
});

app.listen(port, () => {
  console.log("Connected Successfully...");
});