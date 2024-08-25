const multer = require('multer');
const path = require('path');

// Configure Multer Storage for memory
const storage = multer.memoryStorage();

// Initialize Multer
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp', '.mp4'];
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type! ${ext}`), false);
    }
  }
});

module.exports = upload;
