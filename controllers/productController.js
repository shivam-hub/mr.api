const crypto = require('crypto');
const Product = require('../models/Product');

const addProduct = async (req, res) => {
    try{
        const payload = req.body;

        if(!payload || !payload.name || !payload.code){
            res.status(500).json({ message: 'Please provide all required info' });
        }

        payload.createdOn = Date.now();

        const result = await new Product(payload).save();
        res.status(200).json(result);

    }catch(error){
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const getProductByName = async (req, res) => {
    try {
        if(!req.params.name){
            throw Error();
        }
        const product = Product.findOne({name : req.params.name})
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

module.exports = {addProduct, getAllProduct, getProductByName};