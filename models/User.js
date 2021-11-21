const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백제거
    unique: 1, //유니크
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String, // 간단하게도 작성 가능
  token: {
    type: String, // 유효성 검사
  },
  tokenExp: {
    type: Number, //토큰 유효기간
  },
})

const User = mongoose.model('User', userSchema)
module.exports = { User }
