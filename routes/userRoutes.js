const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/create', userController.createUser);
router.get('/getAllUser', userController.getAllUsers);
router.get('/getUserById/:userId', userController.getUserById);
router.post('/update/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;