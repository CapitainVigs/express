const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const Schema = mongoose.Schema;


const vehiculeSchema = new Schema({
    marque: {
        type: String
    },
    model: {
        type: String
    },
    confort: {
        type: String
    },
    couleur: {
        type: String
    },
    categorie: {
        type: String
    },
    nbPlaces: {
        type: Number,
        min: 0
    },
    idVehicule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicules'
    },
    iduser: { type: Schema.Types.ObjectId, ref: 'users' },

}, {
    timestamps: true
});

var Vehicules = mongoose.model('vehicule', vehiculeSchema);

module.exports = Vehicules;