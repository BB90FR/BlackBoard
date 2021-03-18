const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title : String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String
   });

const articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;