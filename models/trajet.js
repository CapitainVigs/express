const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trajetSchema = new Schema({

 depart: { type: Schema.Types.ObjectId, ref: 'Localisation' },
 arrivee:{ type: Schema.Types.ObjectId, ref: 'Localisation' },
   date: {
    type: String
   },
   prix: {
    type: String
   },
   etat: {
    type: Number,
    default: 0
   },
   nbplace:{
    type: Number
   },
   nbplace_reserver:{
    type: Number,
    default: 0
   },
   iduser: { type: Schema.Types.ObjectId, ref: 'User' },
   idvehicule:{ type: Schema.Types.ObjectId, ref: 'vehicule' },
   lieu:{
    type: String
   }
}
);

var trajet = mongoose.model('trajet', trajetSchema);

module.exports = trajet;
