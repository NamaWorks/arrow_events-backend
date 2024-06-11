const { isAuth } = require("../../middleware/auth");
const { isAdmin } = require("../../middleware/is-admin");
const { getEvents, updateEvent, removeEvent, postEvent } = require("../controllers/event_controller");
const Event = require("../models/event_model");
const User = require("../models/user_model");

const eventsRouter = require("express").Router()

// eventsRouter.get("/all", getEvents)
eventsRouter.post("/new",[isAuth], postEvent)
eventsRouter.put("/update/:id", updateEvent)
eventsRouter.delete("/remove/:id",[isAdmin], removeEvent)
eventsRouter.get("/all", async (req, res, next) => {
  try {
    const events = await Event.find().populate('attendants')
    // console.log(events);
    return res.status(200).json(events)
  } catch (err) {
    return next(err)
  }
})


module.exports = eventsRouter