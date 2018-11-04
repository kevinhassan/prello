const express = require('express');

const router = express.Router();

require('./boards')(router);
require('./lists')(router);
require('./users')(router);
require('./cards')(router);

module.exports = router;
