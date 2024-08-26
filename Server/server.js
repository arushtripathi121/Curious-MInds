const express = require('express');
const app = express();
const { connectToDb } = require('./Config/database');
require('dotenv').config();
const router = require('./Router/router');

const port = process.env.PORT || 3000;

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));


app.use(express.json());

connectToDb();

app.use("/Curious_Minds/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});