
const Event = require('../../models/event.model');
const Registration = require('../../models/registration.model');


const registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        const event = await Event.findOne({ _id: eventId, isDeleted: false });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Checking capacity
        const registrationCount = await Registration.countDocuments({
            event: eventId,
            status: 'registered'
        });

        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event is at full capacity' });
        }

        // if user is already registered
        const existingRegistration = await Registration.findOne({
            event: eventId,
            user: userId,
            status: 'registered'
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = new Registration({
            event: eventId,
            user: userId
        });

        await registration.save();

        // Add user to event attendees
        event.attendees.push(userId);
        await event.save();

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: 'Error registering for event', error: error.message });
    }
};

module.exports = registerForEvent;
