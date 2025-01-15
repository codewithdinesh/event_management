const Event = require('../../models/event.model');
const Registration = require('../../models/registration.model');

const getAllEvents = async (req, res) => {
    try {

        const { page = 1, limit = 10, search = '' } = req.query;


        // Admin access only
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'You are not authorized to access this route'
            });
        };

        // search query
        const searchQuery = search
            ? {
                name: { $regex: search, $options: 'i' },
                isDeleted: false
            }
            : { isDeleted: false };

        // Get events with pagination
        const events = await Event.find(searchQuery)
            .populate('organizer', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ date: 1 });

        // Get registration stats for each event
        const eventsWithStats = await Promise.all(
            events.map(async (event) => {
                const registrations = await Registration.aggregate([
                    { $match: { event: event._id } },
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 }
                        }
                    }
                ]);

                const registeredCount = registrations.find(r => r._id === 'registered')?.count || 0;
                const cancelledCount = registrations.find(r => r._id === 'cancelled')?.count || 0;

                return {
                    ...event.toObject(),
                    statistics: {
                        registeredCount,
                        cancelledCount,
                        availableSpots: event.capacity - registeredCount,
                        occupancyRate: ((registeredCount / event.capacity) * 100).toFixed(2)
                    }
                };
            })
        );

        // Get total number of events
        const count = await Event.countDocuments(searchQuery);

        res.json({
            events: eventsWithStats,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalEvents: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching events',
            error: error.message
        });
    }
}

module.exports = getAllEvents;