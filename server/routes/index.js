const express = require('express');

const router = express.Router();

require('./users')(router);
require('./boards')(router);

module.exports = router;
