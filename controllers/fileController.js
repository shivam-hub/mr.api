const fs = require('fs');
const xlsx = require('xlsx');
const upload = require('../middleware/multer.middleware')


const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: 'Failed to upload' });
        }
        const filePath = req.file.path;
        const fileName = req.file.filename;
        res.status(200).json({ fileName , filePath })
    })
}

const uploadExcel = async (req, res) =>  {
    upload(req, res, (err) => {
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        let jsonData;

        if (fileExtension === 'xlsx') {
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            jsonData = xlsx.utils.sheet_to_json(sheet);
        }

        res.json({ data : jsonData });
        fs.unlinkSync(req.file.path);
    })
}

module.exports = { uploadImage, uploadExcel };