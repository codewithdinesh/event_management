const Event = require('../../models/event.model');

const getPopularEvents = async (req, res) => {
    try {

        // Get the 5 most popular events
        const popularEvents = await Event.aggregate([
            { $match: { isDeleted: false } },
            {
                $project: {
                    name: 1,
                    attendeeCount: { $size: "$attendees" },
                    capacity: 1
                }
            },
            { $sort: { attendeeCount: -1 } },
            { $limit: 5 }
        ]);

        res.json(popularEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular events', error: error.message });
    }
}

module.exports = getPopularEvents;