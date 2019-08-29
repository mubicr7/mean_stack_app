const mongoose = require('mongoose');

const userNotificationSchema = new mongoose.Schema(
    {
        userId: { type: String, unique: true, required: true },
        notifications: [
            {
                type: { type: Number, required: true },
                title: { type: String, required: true },
                message: { type: String, required: true },
                timeOut: { type: Number},
            }
        ]
    }
);

userNotificationSchema.set('toJSON');

module.exports = mongoose.model('UserNotification',userNotificationSchema);
