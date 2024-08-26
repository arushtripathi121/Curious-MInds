const express = require('express');
const cors = require('cors');
const app = express();
const { connectToDb } = require('./Config/database');
require('dotenv').config();
const router = require('./Router/router');
const port = process.env.PORT || 3000;
const cloudinary = require('./Config/cloudinary');

// Connect to Cloudinary
cloudinary.connectToCloudinary();

// Enable CORS and configure it for your frontend URL
app.use(
  cors({
    origin: '*', // Allows requests from any origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Include credentials if needed
  })
);


// Body parser middleware to handle JSON requests
app.use(express.json());

// Connect to the database
connectToDb();

// Define routes
app.use("/Curious_Minds/api/v1/", router);

// Root route to check server status
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
