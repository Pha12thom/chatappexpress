const express = require('express');
const router = express.Router();
const { register, login, findUser } = require('../controllers/usercontroller');

router.post('/register', register);
router.post('/login', login);
router.get('/:Id', findUser);

module.exports = router;