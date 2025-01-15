const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email, isDeleted: false });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

module.exports = login;