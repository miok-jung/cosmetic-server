const express = require('express');
const router = express.Router();

// ANCHOR Models를 불러오기
const { User } = require('../Models/User');
const { Board } = require('../Models/Board');
const { Counter } = require('../Models/Counter');

// ANCHOR CREATE
router.post('/submit', (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
      temp.boardNum = counter.boardNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const CommunityPost = new Board(temp);
          CommunityPost.save().then(() => {
            Counter.updateOne(
              { name: 'counter' },
              { $inc: { boardNum: 1 } },
            ).then(() => {
              res.status(200).json({ success: true, boardInfo: temp });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// ANCHOR READ
// FIXME 인기순 가져오기 필요
router.get('/list', (req, res) => {
  Board.find()
    .sort({ date: -1 })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, boardList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

// FIXME 증가하면서 받을 데이터를 나누어 받는방법 알아보기
router.get(`/list/recent`, (req, res) => {
  Board.find()
    .sort({ date: -1 })
    .limit(4)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, boardList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

router.post('/detail', (req, res) => {
  Board.findOne({ boardNum: Number(req.body.boardNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, board: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

module.exports = router;