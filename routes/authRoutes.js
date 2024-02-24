const express = require('express');
const { login, getUser } = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwt.middleware');

const router = express.Router();

router.post('/login', login);

router.use('/user', jwtMiddleware);
router.get('/user', getUser);

module.exports = router;
