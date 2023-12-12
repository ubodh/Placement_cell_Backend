const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const { mongoConect } = require("./src/config/mongoose");
const passport = require("passport");
const passportLocal = require("./src/config/passport-local-startegy");

const app = express();

// set ejs as view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

const crypto = require("crypto");

const secret = crypto.randomBytes(64).toString("hex");

const key = process.env.SECRET || crypto;
app.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 100 },
  })
);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.urlencoded({ extended: true }));

// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// express router
app.use("/", require("./src/routes"));

// listen on port
const PORT = process.env.PORT;

//connect to database

mongoConect();

app.listen(PORT, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Server running on port:http://localhost:${PORT}`);
});
