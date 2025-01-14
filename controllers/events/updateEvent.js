
const Event = require('../../models/event.model');



const updateEvent = async (req, res) => {

    
    try {
        const event = await Event.findOne({ _id: req.params.id, isDeleted: false });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is organizer
        if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update event' });
        }

        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};





const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, isDeleted: false });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is organizer
        if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete event' });
        }

        event.isDeleted = true;
        await event.save();
        res.json({ message: 'Event deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

module.exports = {
    updateEvent,
    deleteEvent
};