const express = require('express');
const cors = require('cors');
const app = express();
const { connectToDb } = require('./Config/databse');
require('dotenv').config();
const router = require('./Router/router');

const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

const cloudinary = require('./Config/cloudinary');
cloudinary.connectToCloudinary();

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Use uppercase for environment variable names
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.use(express.json());

// Connect to the database
connectToDb();

// Routes
app.use("/Curious_Minds/api/v1/", router);

// Root route
app.get("/", (req, res) => {
    console.log("Server Started");
    res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
