const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  nameEn: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },  
});

const Event = mongoose.model("Event", eventSchema);

exports.Event = Event;
