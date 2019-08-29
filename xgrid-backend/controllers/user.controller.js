const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');
var jwt = require('jsonwebtoken');
const User = mongoose.model('User');



module.exports.register = async (req, res, next) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userId = req.body.userId;
    user.hash = bcrypt.hashSync(req.body.password, 10);

    await user.save( (err,data) => {
            if ( err && err.code === 11000 ) {
                res.status(401).send('Duplicate User ID');
            }

            if (!err){
                res.send(data);
            }
        }
    );
}

module.exports.authenticate = async (req, res, next) => {
    authenticateUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

async function authenticateUser({ userId, password }) {
    const user = await User.findOne({ userId });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}


