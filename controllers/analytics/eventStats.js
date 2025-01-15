const Event = require('../../models/event.model');
const Registration = require('../../models/registration.model');


const getEventStats = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ _id: eventId, isDeleted: false });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const stats = await Registration.aggregate([
            { $match: { event: event._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const registeredCount = stats.find(s => s._id === 'registered')?.count || 0;
        const cancelledCount = stats.find(s => s._id === 'cancelled')?.count || 0;

        res.json({
            eventName: event.name,
            capacity: event.capacity,
            registeredAttendees: registeredCount,
            cancelledRegistrations: cancelledCount,
            availableSpots: event.capacity - registeredCount,
            occupancyRate: ((registeredCount / event.capacity) * 100).toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event stats', error: error.message });
    }
}


module.exports = getEventStats;