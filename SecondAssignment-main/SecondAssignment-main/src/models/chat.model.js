const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const chatSchema = Schema({
  content: {
    type: String,
  },
  user: {
    type: String,
  },
  roomId: {
    type: String,
  },
});

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
