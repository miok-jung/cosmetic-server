// ANCHOR home의 컨트롤러
"use strict";

// 임시 데이터 설정
const users = {
  id: ["Jnarin", "jnarin3", "제이나린"],
  password: ["Jnarin", "jnarin3", "123456"],
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    // console.log("R", req.body);
    const id = req.body.id,
      password = req.body.password;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        return res.json({
          // object 로 전달
          success: true,
        });
      }
    }
    return res.json({
      success: false,
      msg: "로그인에 실패하셨습니다.",
    });
  },
};

module.exports = {
  output,
  process,
};
