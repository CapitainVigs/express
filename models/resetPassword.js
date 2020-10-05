const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    resetPasswordToken: {
        type: String
    },
    expire: {
        type: String
    },
    status: {
        type: Number
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

var resetPassword = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = resetPassword;