const express = require('express');

const router = express.Router();

const controllers = require('../controllers/usersController');

router.get('/', controllers.index);
router.get('/users/new', controllers.newUser);  
router.post('/users', controllers.create);
router.get('/users/:slug', controllers.show);

module.exports = router;