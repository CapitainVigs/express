const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
   trajet: { type: Schema.Types.ObjectId, ref: 'trajet' },
   montant: {
    type: Number
   },
   etat: {
      type: Number,
      default: 0
   },
   nbplace:{
    type: Number
   },
   iduser: { type: Schema.Types.ObjectId, ref: 'User' }
}
);

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;





