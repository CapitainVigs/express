const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
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
imageName: {
    type: String
},
imageUrl: {
    type: String
},
trajet_actif_id: { type: Schema.Types.ObjectId, ref: 'trajet',default: null }
},{
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
