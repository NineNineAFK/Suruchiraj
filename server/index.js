require("dotenv").config(); // ✅ Load .env variables

const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");


// CORS Configuration
app.use(cors({
  origin: `${process.env.CLIENT_URL}`, // Frontend URL
  credentials: true, // Allow credentials such as cookies to be sent
}));

// Cookie and session middlewares
app.use(cookieParser());
app.use(session({
  secret: "Aaditya@3737",
  resave: false,
  saveUninitialized: false,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());


// Other middlewares
app.use(express.json()); // Parse JSON bodies for other routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Other routes
app.use("/user", require("./routes/user"));
app.use("/home", restrictToLoggedInUserOnly, require("./routes/staticRouter"));
app.use("/open", require("./routes/openRouter"));
app.use("/auth", require("./routes/auth"));





// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MongoDB connection
const { connectMongoDB } = require('./connect');
connectMongoDB(process.env.MONGO_URI);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


