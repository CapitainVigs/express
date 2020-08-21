const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const Schema = mongoose.Schema;


const coursesSchema = new Schema({
    depart: {
        type: String
       
    },
    arrivee: {
        type: String
    },
    date: {
        type: Date
    },
    price: {
        type: Currency,
        min: 0
    },
   
},{
    timestamps: true
});

var Courses= mongoose.model('course', coursesSchema);

module.exports = Courses;