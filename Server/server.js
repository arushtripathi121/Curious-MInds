const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router  = require('./Router/router');

const port = process.env.port;

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}));

app.use(cors());

app.use(express.json());

connectToDb();

app.use("/Curious_Minds/api/v1/", router);

app.listen(port, () =>{
    console.log(`the app is running on port ${port}`);
})