const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema(
  {
    boardNum: Number,
    title: String,
    content: String,
    image: String,
    date: Date,
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
)

const Board = mongoose.model('Board', boardSchema)

module.exports = { Board }
