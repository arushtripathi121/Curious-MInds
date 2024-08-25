const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router  = require('./Router/router');

const port = process.env.port;

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

const corsOptions = {
    origin: process.env.frontendurl, // Replace with your frontend URL
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

connectToDb();

app.use("/Curious_Minds/api/v1/", router);

app.get("/", (req, res) => {
    console.log("Server Started");
    res.send("Server is running!");
});

app.listen(port, () =>{
    console.log(`the app is running on port ${port}`);
})