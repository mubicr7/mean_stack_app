const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })


module.exports = {
    User: require('../models/user.model.js'),
    UserNotification: require('../models/user-notification.model.js')
};

