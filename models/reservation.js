const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
   trajet: { type: Schema.Types.ObjectId, ref: 'trajet' },
   montant: {
    type: Number
   },
   etat: {
    type: String
   },
   nbplace:{
    type: Number
   },
   iduser: { type: Schema.Types.ObjectId, ref: 'users' },
}
);

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;
