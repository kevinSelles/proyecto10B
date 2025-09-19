const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    date: {type: String, required: true},
    adress: {type: String, required: true},
    description: {type: String, required: true},
    users: [{type: mongoose.Types.ObjectId, ref: "users"}],
}, {
  timestamps: true,
  collection: "activities"
});

const Activity = mongoose.model("activities", activitySchema, "activities");

module.exports = Activity;