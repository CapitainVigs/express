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
    etat: {
        type: Number,
        default:0
    },
    typeVehicule: {
        type: Number
    },
    iduser: { type: Schema.Types.ObjectId, ref: 'User' }

}, {
    timestamps: true
});

var Vehicules = mongoose.model('vehicule', vehiculeSchema);

module.exports = Vehicules;