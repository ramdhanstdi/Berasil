// ENV
require("dotenv").config();
const port = process.env.PORT || 3000;

// Prisma
const prisma = require("./src/core/helpers/prisma");

// Body Parser
const bodyParser = require("body-parser");

// Express
const express = require("express");

// JWT
const jwt = require("jsonwebtoken");

// CORS
const cors = require("cors");

// App
const app = express();

app.use("/uploads", express.static("uploads"));

// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// app.options("*", cors()); enable pre-flight request for all routes

// Route Index
app.use("/api/v1", require("./src/router/main.router"));

// Route default
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Backend running",
  });
});

// Route not found
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Path Not Found",
  });
});

/*app.post("/", verifyUser, (req, res) => {
  return res.json({
    message: "Post created",
    data: req.body
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "Sonia",
    email: "soniaamalia@gmail.com"
  }
  jwt.sign(user, 'secret',{expiresIn: '30s'}, (err, token) => {
    if (err){
      console.log(err);
      res.sendStatus(304);
      return
    }
    const Token = token;
    res.json({
      user: user,
      token: Token
    });
  });
});

function verifyUser(req, res, next){
  const bearer = req.headers.bearer;
  jwt.verify(bearer, 'secret', (err, data) =>{
    if (err){
      console.log(err.message);
      res.json(err);
      return
    }
    req.body = data
    next()
  })
}*/

// Listen
app.listen(port, () => {
  console.log(`App Run In Port ${port}`);
});
