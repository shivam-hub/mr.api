const express = require('express');
const productController = require('../controllers/productController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/add', productController.addProduct);
router.get('/allProducts', productController.getAllProduct);
router.get('/:name', productController.getProductByName);

module.exports = router;