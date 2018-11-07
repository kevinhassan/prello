const express = require('express');

const router = express.Router();

require('./boards')(router);
require('./cards')(router);
require('./lists')(router);
require('./slack')(router);
require('./users')(router);
require('./teams')(router);
require('./users')(router);

module.exports = router;
