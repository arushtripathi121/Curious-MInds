const multer = require('multer');

const storage = multer.diskStorage({
    filename: function(req, res, cb){
        cb(null, file.orignalname);
    }
})

const upload = multer({storage: storage});

module.exports = multer;