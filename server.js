const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const cors = require('cors')

const dbConfig = require("./config/dbConfig");

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello! You are at the root...");
});


app.listen(PORT, () => console.log(`Node Server running at port: ${PORT}.`));

