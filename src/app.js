// .env configuration
require("dotenv").config({ path: "./.env" });

// import express
let express = require("express");
let app = express();

// use database
require('./models/database.js').connectDatabase();

// logger
app.use(require("morgan")("tiny"));

// ✅ Use ONLY this CORS middleware (no manual headers)
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",
  "https://gdgoenkahealthcaresiliguri.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index routes
app.use("/", require("./routes/index.routes.js"));

// error handler
const { generatedErrors } = require("./middlewares/error.js");
app.use(generatedErrors);

// start server
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
