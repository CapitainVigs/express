const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localisationSchema = new Schema({

    liblocalisation: {
        type: String,
        required: true
    },
    coor_x:{
    type: String,
    required: false
    },
   coor_y: {
    type: String
   }
}
);

var Localisation = mongoose.model('Localisation', localisationSchema);

module.exports = Localisation;
