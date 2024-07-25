const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router  = require('./Router/router');

const port = process.env.port;

app.use(cors());

app.use(express.json());

connectToDb();

app.use("/Curious_Minds/api/v1/", router);

app.listen(port, () =>{
    console.log(`the app is running on port ${port}`);
})