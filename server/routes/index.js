const express = require('express');

const router = express.Router();

require('./users')(router);
require('./boards')(router);
require('./lists')(router);

module.exports = router;
