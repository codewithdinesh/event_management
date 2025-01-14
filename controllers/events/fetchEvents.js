
const Event = require('../../models/event.model');


const getEvents = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // find event with pagination
        const events = await Event.find({ isDeleted: false })
            .populate('organizer', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ date: 1 });

        const count = await Event.countDocuments({ isDeleted: false });

        res.json({
            events,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
}

module.exports = getEvents;