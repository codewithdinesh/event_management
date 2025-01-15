const User = require('../../models/user.model');

const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }


        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

module.exports = register;