const multer = require('multer');
const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, `/uploads/images/${req.body.userId}`)
//     },

//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + req.body.userId ?? '';
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage })

const uploadImage = (req) => {
    try {
        const payload = req;
        const base64Image = payload.base64Image;
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const file = {
            buffer: imageBuffer,
            originalName: 'test.jpeg'
        };
6
        const destination = './uploads/';

        fs.writeFileSync(destination + file.originalName, file.buffer);

        return `${destination}${file.originalName}`;
    } catch (error) {
        console.log(error.toString());
        return null;
    }
}

module.exports = { uploadImage };