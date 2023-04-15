// Load envioronment variables
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const mongoose = require("mongoose");

// Connect to your mongo database using the MONGO_URL environmentvariable.
mongoose.connect("mongodb+srv://jbdouz:yyJmlJ1QgVyvDLVR@cluster0.urf0zci.mongodb.net/?retryWrites=true&w=majority" || "mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "codebrew2023"
});
// Exit on error
const db = mongoose.connection.on("error", (err) => {
    console.error(err);
    process.exit(1);
});

// Log to console once the database is open
db.once("open", async () => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`);
});

require("./account");