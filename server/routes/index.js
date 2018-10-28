const express = require('express');

const router = express.Router();

require('./user')(router);
require('./board')(router);

module.exports = router;
