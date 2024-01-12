const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Connect MongoDB
const dbConfig = require("./config/dbConfig");

// import Models
const User = require('./models/userModel');

// import Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");

// Middleware
app.use(cors());
app.use(express.json());

// endpoints
app.get("/", (req, res) => {
  res.send("<h1>And Health Server</h1><p>Hello! This Server returns some sensitive information. Please, pay utmost attention while using it...</p>");
});
app.get("/api/users", async (req, res)=>{
  res.json({allUsers: await User.find({}, {_id: 0, password: 0, updatedAt: 0, __v: 0 })})
})

// route endpoints
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);


// Heroku build configuration
if(process.env.NODE_ENV === "PRODUCTION"){
  app.use('/' . express.static("client/build"));
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

// start server
app.listen(PORT, () => console.log(`Node Server running at port: ${PORT}.`));

