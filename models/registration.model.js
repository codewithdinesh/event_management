const registrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['registered', 'cancelled'],
        default: 'registered'
    }
}, {
    timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = {
    Registration
};