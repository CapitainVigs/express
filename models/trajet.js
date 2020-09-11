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
   nbplace:{
    type: Number
   },
   iduser: { type: Schema.Types.ObjectId, ref: 'users' },
}
);

var trajet = mongoose.model('trajet', trajetSchema);

module.exports = trajet;
