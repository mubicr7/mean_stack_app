require ('./config')
require ('./utils/db')
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
require('./controllers/user.controller')
var config = require('./config');
const userRouters = require('./routes/user.routes')
const userNotificationRouters = require('./routes/user-notification.routes.js')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

app.use('/users', userRouters);
app.use('/notification', userNotificationRouters);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});



app.listen(3000, function () {
    console.log('Server listening on port ' + 3000);
});
