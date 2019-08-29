const express = require('express');
const router = express.Router();

const userNotificationController = require('../controllers/user-notification.controller.js');

router.post('/add', userNotificationController.add);
router.get('/', userNotificationController.getAll);
router.delete('/delete', userNotificationController.delete);


module.exports = router;
