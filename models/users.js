const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
password:{
    type: String,
    required: false
   },
   nom: {
    type: String
},
prenoms: {
    type: String
},
profession: {
    type: String
},
ville: {
    type: String
},
numero: {
    type: String,
},
pays: {
    type: String
},
},{
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
