const mongoose = require('mongoose');
const UserNotification = mongoose.model('UserNotification');

module.exports.add = async (req, res, next) => {
    var userNotification = new UserNotification();
    userNotification.userId = req.body.userId;
    userNotification.notifications = req.body.notifications;

    if (await UserNotification.findOne({ userId: userNotification.userId })) {
        UserNotification.updateOne({userId:userNotification.userId}, {$push: {"notifications" :userNotification.notifications
                         } },
            {new:true},function(err, value) {
                if (err)
                    res.send(err);
                else
                    res.send(userNotification.notifications[0])
            });
    }else{
        await userNotification.save( (err,data) => {
                if ( err && err.code === 11000 ) {
                    res.status(401).send('Error adding notification');
                }

                if (!err){
                    res.send(userNotification.notifications[0]);
                }
            }
        );
    }


}

module.exports.getAll = async (req, res, next) => {
    const id = req.query.id
    if (await UserNotification.findOne({ userId: id })) {
        var query = UserNotification.find({userId: id}, {'notifications': 1, '_id': 0}, function (err, data) {
            if (err) {
                res.status(401).send('Error fetching Notifications');
            }

            if (!err) {
                res.send(data[0].notifications);
            }
        });
    } else {
        res.status(400).send('No notificaitons exist for this user');

    }


}

module.exports.delete = async (req, res, next) => {
    const id = req.query._id;
    const userId = req.query.userId;
    if (await UserNotification.findOne({ userId: userId })) {
        UserNotification.updateOne({ "userId": userId},
            { $pull: { "notifications" : { _id: id } } }, (err) => {
                if (err) {
                    return res.status(404).json({ message: 'Error' });
                }
                return res.status(200).json({
                    _id: id,
                });
            }
        );
    } else {
        res.status(400).send('No notificaitons exist for this user');

    }
}

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

