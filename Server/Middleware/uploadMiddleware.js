// Middleware/uploadMiddleware.js
const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Create an instance of multer with the configured storage and limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

module.exports = upload;
