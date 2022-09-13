const express = require('express');
const app = express();

const dbConfig = require('./config/dbConfig');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running at ${PORT}.`));

app.get('/test', (req, res)=>{
  res.json("Hello Anand! This is the test endpoint.");
})