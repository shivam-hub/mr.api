const express = require('express');
const doctorController = require('../controllers/doctorController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/create', doctorController.createDoctor);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/search/:query', doctorController.searchDoctors);

module.exports = router;