const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var multer = require('multer')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')
let RD = require('./models/DataRanking.model');
require('dotenv').config();
const router = require('express').Router();

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const rd = require('./routes/rd');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname,'public')))
app.use('/rd',rd)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});