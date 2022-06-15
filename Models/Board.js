const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    boardNum: Number,
    image: String,
    date: { type: Date, default: Date.now() },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'boards' },
);

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
