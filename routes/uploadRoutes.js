const express = require('express');
const fileController = require('../controllers/fileController');
const jwtMiddleware = require('../middleware/jwt.middleware');


const router = express.Router();
router.use(jwtMiddleware);

router.post('/image', fileController.uploadImage);
router.post('/excel', fileController.uploadExcel);

module.exports = router;