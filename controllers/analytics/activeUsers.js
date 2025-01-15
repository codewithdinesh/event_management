const Registration = require('../../models/registration.model');


const getActiveUsers = async (req, res) => {
    try {

        // Get the 5 most active users
        const activeUsers = await Registration.aggregate([
            { $match: { status: 'registered' } },
            {
                $group: {
                    _id: '$user',
                    registrationCount: { $sum: 1 }
                }
            },
            { $sort: { registrationCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    'userDetails.name': 1,
                    'userDetails.email': 1,
                    registrationCount: 1
                }
            }
        ]);

        res.json(activeUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active users', error: error.message });
    }
}

module.exports = getActiveUsers;