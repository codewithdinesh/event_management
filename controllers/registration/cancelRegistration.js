
const Event = require('../../models/event.model');
const Registration = require('../../models/registration.model');

const cancelRegistration = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        const registration = await Registration.findOne({
            event: eventId,
            user: userId,
            status: 'registered'
        });

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        registration.status = 'cancelled';
        await registration.save();

        // Remove user from event attendees
        const event = await Event.findById(eventId);
        event.attendees = event.attendees.filter(
            attendee => attendee.toString() !== userId.toString()
        );
        await event.save();

        res.json({ message: 'Registration cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling registration', error: error.message });
    }
};

module.exports = cancelRegistration;