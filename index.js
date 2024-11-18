const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});