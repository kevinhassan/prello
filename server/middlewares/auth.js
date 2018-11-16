const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MyError = require('../util/error');

const authRequest = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        return next();
    }
    const token = bearerHeader.replace('Bearer ', '');
    jwt.verify(token, process.env.SESSION_SECRET, async (err, payload) => {
        if (err) {
            req.user = null;
            next();
        } else {
            try {
                const user = await User.findOne({ _id: payload.id }).select('_id');
                req.user = user;
                next();
            } catch (e) {
                res.status(500).send({ error: 'Internal server error.' });
            }
        }
    });
};

/**
 * Same middleware as above but with socket
 */
const authRequestViaSocket = (Authorization) => {
    const bearerHeader = Authorization;
    if (!bearerHeader) {
        return null;
    }
    const token = bearerHeader.replace('Bearer ', '');
    const res = jwt.verify(token, process.env.SESSION_SECRET, async (err, payload) => {
        if (err) {
            return null;
        }
        try {
            const user = await User.findOne({ _id: payload.id }).select('_id');
            return user;
        } catch (e) {
            throw new Error({ error: 'Internal server error' });
        }
    });
    return res;
};

const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new MyError(401, 'Unauthorized, you need to be authenticated');
        }
        next();
    } catch (e) {
        res.status(e.status).send({ error: e.message });
    }
};
module.exports = { authRequest, authRequestViaSocket, isAuthenticated };
