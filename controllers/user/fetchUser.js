const User = require('../../models/user.model');

const fetchUser = async (req, res) => {
    try {

        // get params
        const { id } = req.params;

        if (!req.user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // check either user should be able to fetch his own data or admin should be able to fetch any user data
        if (req.user.id !== id && req.user.role !== 'admin') {
            return res.status(400).json({ message: 'Access Denied' });
        }


        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

module.exports = fetchUser;