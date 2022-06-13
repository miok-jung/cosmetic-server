const express = require('express');
const router = express.Router();

// ANCHOR Models를 불러오기
const { User } = require('../Models/User');
const { Board } = require('../Models/Board');
const { Counter } = require('../Models/Counter');

router.post('/submit', (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  // fint({중괄호 안에는 조건문을 넣을 수 있다.})
  // name이 counter인 것을 Counter에서 찾는다.
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
            // updateOne에서 첫번째 중괄호(쿼리)는 어떤 document를 찾을 것인지
            // 두번째 중괄호(쿼리)는 어떻게 업데이트를 시킬 것인지를 정리한다.
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

module.exports = router;
