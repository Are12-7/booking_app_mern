require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const crypto = require("crypto");

//SALT
const bcryptSalt = bcrypt.genSaltSync(8);
//TOKEN
function generateRandomToken(length = 16) {
  return crypto.randomBytes(Math.ceil(length)).toString("hex").slice(0, length);
}

const randomToken = generateRandomToken(16);

const jwtSecret = randomToken;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// ROUTES
//SIGNUP
app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const newUser = await User.create({
      lastName,
      firstName,
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (e) {
    res.status(422).json(e);
  }
});

//START LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userLog = await User.findOne({ email });
  // if user exist
  if (userLog) {
    const passMatch = bcrypt.compareSync(password, userLog.password);
    if (passMatch) {
      jwt.sign(
        {
          email: userLog.email,
          id: userLog._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userLog);
        }
      );
    } else {
      res.status(422).json("Wrong credentials"); //pass
    }
  } else {
    res.json("User not found");
  }
});
//END LOGIN

PORT = 9000;

app.listen(PORT, () => console.log("Server running on port", PORT));
