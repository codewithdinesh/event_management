const User = require('../../models/user.model');

const updateUser = async (req, res) => {
    try {

        // get params
        const { id } = req.params;

        if (!req.user) {
            return res.status(400).json({ message: 'Usernot Authenticated' });
        }

        // check either user should be able to update his own data or admin should be able to update any user data
        if (req.user.id !== id && req.user.role !== 'admin') {
            return res.status(400).json({ message: 'Access Denied' });
        }

        const { name, email } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;

        await user.save();

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            message: 'User updated successfully'
        });

    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

module.exports = updateUser;
