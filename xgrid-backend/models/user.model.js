const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userId: { type: String, unique: true, required: true },
        hash: { type: String, required: true }
    }
);

userSchema.set('toJSON');

module.exports = mongoose.model('User',userSchema);


