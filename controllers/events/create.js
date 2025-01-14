// Controller to Create a new Event

const createEvent = async (req, res) => {
    try {
        const { name, description, date, location, capacity } = req.body;



        // Check if all fields are provided
        if (!name || !description || !date || !location || !capacity) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const event = new Event({
            name,
            description,
            date,
            location,
            capacity,
            organizer: req.user._id
        });

        await event.save();

        res.status(201).json(event);

    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }

}

module.exports = createEvent;