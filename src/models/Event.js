import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    title: { type: String, required: true },
})

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

export default Event
    