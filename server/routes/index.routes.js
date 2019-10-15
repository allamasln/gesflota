const express = require('express');
const router  = express.Router();

router.use('/users', require('./users.routes'));
router.use('/sessions', require('./sessions.routes'));


module.exports = router;
