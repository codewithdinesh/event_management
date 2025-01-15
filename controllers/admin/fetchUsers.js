
const User = require('../../models/user.model');


const getAllUsers = async (req, res) => {



    try {




        const { page = 1, limit = 10, search = '' } = req.query;

        // If user is Admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'You are not authorized to access this route'
            });
        }

        // search query
        const searchQuery = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ],
                isDeleted: false
            }
            : { isDeleted: false };

        // Get users with pagination
        const users = await User.find(searchQuery)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        // Get total number of users
        const count = await User.countDocuments(searchQuery);

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalUsers: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
}

module.exports = getAllUsers;