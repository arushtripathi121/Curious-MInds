const express = require('express');
const app = express();
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router = require('./Router/router');

const port = process.env.PORT || 3000;

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

// Move CORS middleware to the top
app.use((req, res, next) => {
  const allowedOrigins = ['https://client-sigma-drab.vercel.app']; // Corrected URL without trailing slash
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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