const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
   fume: {
    type: Number,
    default: 0
   },
   music: {
    type: Number,
    default: 0
   },  
   iduser: { 
     type: Schema.Types.ObjectId, 
     ref: 'User' 
  }
}
);

var preference = mongoose.model('preference', preferenceSchema);

module.exports = preference;
