const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationFolder = './uploads';
        if (file.mimetype.startsWith('application/octet-stream')) {
            destinationFolder = './uploads/images';
        }
        return cb(null, destinationFolder)
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (file.mimetype.startsWith('application/octet-stream')) {
            fileName = "IMG-" + Date.now().toString() + '.' + fileExtension;
        }
        return cb(null, fileName);
    }
})

const upload = multer({
    storage: storage
}).single('file');


module.exports = upload;