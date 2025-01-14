const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, isDeleted: false });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

const isOrganizer = async (req, res, next) => {
    if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = {
    auth,
    isAdmin,
    isOrganizer
};