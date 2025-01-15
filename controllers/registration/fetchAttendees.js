const Event = require('../../models/event.model');

const getEventAttendees = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, isDeleted: false })
            .populate('attendees', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event.attendees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendees', error: error.message });
    }
}


module.exports = getEventAttendees;