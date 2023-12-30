const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    code: { type: String, },
    division: { type: String },
    group: { type: String },
    createdOn: {type : Date},
    modifiedOn: {type : Date},
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;