const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const { User } = require('./models/User')

// application/x-www/form-urlecoded를 가져와 분석하게 해줄 수 있게 해준다.
app.use(express.urlencoded({ extended: true }))
// application/json으로 된 것을 가져와 분석가능하게 해준다.
app.use(express.json())

const mongoose = require('mongoose')
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB COnnected...'))
  .catch((e) => console.log('MongoDB Error: ', e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    // user 모델에 저장
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
