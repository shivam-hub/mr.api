const express = require('express');
const doctorController = require('../controllers/doctorController');
const jwtMiddleware = require('../middleware/jwt.middleware');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/create', doctorController.createDoctor);
router.post('/bulkAddFromExcel', doctorController.bulkAddFromExcel);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/search/:query', doctorController.searchDoctors);
router.get('/getDoctorById/:drId', doctorController.getDoctorById);

module.exports = router;