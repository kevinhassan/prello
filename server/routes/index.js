const express = require('express');

const router = express.Router();

require('./boards')(router);
require('./users')(router);
require('./cards')(router);
require('./lists')(router);
require('./teams')(router);

module.exports = router;
