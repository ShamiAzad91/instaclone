const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
