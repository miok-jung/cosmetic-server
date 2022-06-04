const express = require('express');
const router = express.Router();

// ANCHOR Models를 불러오기
const { User } = require('../Models/User');
const { Counter } = require('../Models/Counter');

router.post('/register', (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .then((doc) => {
      // doc => MongoDB counter이름의 정보를 가져온다..
      temp.userNum = doc.userNum;
      // 인스턴스 생성 : 할당된 실체
      const user = new User(req.body); // body-parser을 통해 json 형태를 가져올 수 있다.
      user.save().then(() => {
        Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          },
        );
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

module.exports = router;
