// Express
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "client", "build"))); // define where static assets live

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "25mb" }));

var cors_origin = "http://localhost:8080";

app.use(cors({ origin: cors_origin, credentials: true }));

// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || "keyboard cat",
        name: "demo",
        saveUninitialized: true,
        resave: true,
        cookie: {
            sameSite: "strict",
            httpOnly: true,
            secure: app.get("env") === "production"
        }
    })
);

// Initialise Passport.js
// const passport = require("./util/passport.js");

// app.use(passport.authenticate("session"));

// connect to database
require("./models/index.js");

//middleware to see all request in terminal
app.use((req, res, next) => {
    console.log("message arrived: " + req.method + " " + req.path);
    next();
});

app.use("/", require("./routes/mainRouter"));

app.listen(process.env.PORT || 8080, () => {
    console.log("codebrew2023 backend is listening...");
});
