const express = require('express');
const app = express();
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router = require('./Router/router');

const port = process.env.PORT || 3000;

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

// Middleware to set custom headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());

connectToDb();

app.use("/Curious_Minds/api/v1/", router);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
