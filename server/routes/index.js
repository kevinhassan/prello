const express = require('express');

const router = express.Router();

require('./boards')(router);
require('./cards')(router);
require('./lists')(router);
require('./teams')(router);
require('./users')(router);

module.exports = router;
