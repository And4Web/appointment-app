const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', ()=>console.log('MongoDB connected.'));

connection.on('error', ()=>console.log('error while connecting MongoDB', error));

module.exports = mongoose;
