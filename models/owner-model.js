const mongoose = require('mongoose');

const ownerSchema =  mongoose.Schema({
    fullname: {
        type      : String,
        minlength : 3,
    },
    email   : String,
    password: String,
    cart    : {
        type: Array,
        default : [],
    },
    products: {
       type : Array,
       default : [],
    },
    picture : String,
    gstin   : Number
});

module.exports = mongoose.model('owner',ownerSchema);