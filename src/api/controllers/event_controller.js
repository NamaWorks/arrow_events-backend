const Event = require("../models/event_model")

const getEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find()
    return res.status(200).json(allEvents)
  } catch (err) {
    return res.status(400).json(`error at getEvents: ${err}`)
  }
}

const postEvent = async (req, res, next) => {
  try {
    const newEvent = new Event({
      ...req.body,
    })
    const eventSaved = await newEvent.save()
    return res.status(201).json(eventSaved)
  } catch (err) {
    console.log(err)
    return res.status(400).json(`error at postEvent: ${err} // ${req.body}`)
  }
}

const updateEvent = async (req, res, next) => {
  try {
    console.log(req.body)
    const { id } = req.params
    const originalEvent = await Event.findById(id)
    const newEvent = new Event(req.body)
    newEvent._id = id
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true })
    return res.status(200).json(updatedEvent)
  } catch (err) {
    return res.status(400).json(`error at updateEvent: ${err}`)
  }
}

const removeEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventToRemove = await Event.findByIdAndDelete(id)
    return res.status(200).json(eventToRemove)
  } catch (err) {
    return res.status(400).json(`error at removeEvent: ${err}`)
  }
}

module.exports = { getEvents, postEvent, updateEvent, removeEvent }