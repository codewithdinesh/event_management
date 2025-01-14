const Event = require('../../models/event.model');

const getEventById = async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(400).json({ message: 'Event ID is required' });
        }

        // validate the id
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Event ID' });
        }


        const event = await Event.findOne({ _id: req.params.id, isDeleted: false })
            .populate('organizer', 'name email')
            .populate('attendees', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
}

module.exports = getEventById;