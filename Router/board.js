const express = require('express')
const router = express.Router()
const multer = require('multer')

// ANCHOR Models를 불러오기
const { User } = require('../Models/User')
const { Board } = require('../Models/Board')
const { Counter } = require('../Models/Counter')
const uploadFile = require('../s3')

// const { uploadFile, getFileStream } = require('../s3')

// ANCHOR CREATE
router.post('/submit', (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    date: Date.now(),
  }

  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
      temp.boardNum = counter.boardNum
      User.findOne({ uid: req.body.uid.userData._id })
        .exec()
        .then((userInfo) => {
          temp.author = req.body.uid.userData._id
          const CommunityPost = new Board(temp)
          CommunityPost.save().then(() => {
            Counter.updateOne(
              { name: 'counter' },
              { $inc: { boardNum: 1 } },
            ).then(() => {
              res.status(200).json({ success: true, boardInfo: temp })
            })
          })
        })
    })
    .catch((err) => {
      res.status(400).json({ success: false })
    })
})

// FIXME multerS3로 변경해서 관리하기 쉽게 할 것.
const upload = multer({ dest: 'uploads/' })

router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

// router.post('/image/upload', upload.single('image'), async (req, res) => {
//   const file = req.file
//   console.log(file)
//   const result = await uploadFile(file)
//   console.log(result)
//   res.send({ location: `/images/${result.Key}` })
// })
router.post('/image/upload', uploadFile, (req, res) => {
  res.status(200).json({ success: true, imageURL: req.file.key })
})
// ANCHOR READ
// FIXME 인기순 가져오기 필요
router.get('/list', (req, res) => {
  Board.find()
    .populate('author')
    .sort({ date: -1 })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, boardList: doc })
    })
    .catch((err) => {
      res.status(400).json({ success: false, err })
    })
})

// FIXME 증가하면서 받을 데이터를 나누어 받는방법 알아보기
router.get(`/list/recent`, (req, res) => {
  Board.find()
    .populate('author')
    .sort({ date: -1 })
    .limit(4)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, boardList: doc })
    })
    .catch((err) => {
      res.status(400).json({ success: false, err })
    })
})

router.post('/detail', (req, res) => {
  Board.findOne({ boardNum: Number(req.body.boardNum) })
    .populate('author')
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, board: doc })
    })
    .catch((err) => {
      res.status(400).json({ success: false, err })
    })
})

// ANCHOR UPDATE

// ANCHOR DELETE

module.exports = router
