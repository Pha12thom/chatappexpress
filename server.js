const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const url = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

mongoose.connect(url).then(() => {
    console.log('Connected to the mongodb database');
}).catch((err) => {
    console.error('Error connecting to the database', err);
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});