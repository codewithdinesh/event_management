const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {


        const token = req.header('Authorization').replace('Bearer ', '');

        // console.log(token);


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);
        const user = await User?.findOne({ _id: decoded.id, isDeleted: false });

        console.log(user);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Please authenticate', error });
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