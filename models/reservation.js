const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
   trajet: { type: Schema.Types.ObjectId, ref: 'Trajet' },
   montant: {
    type: Number
   },
   etat: {
    type: String
   },
   nbplace:{
    type: Number
   }
}
);

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;
