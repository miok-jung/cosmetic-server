// 로그인 & 회원가입하는 모델
"use strict";

const UserStorage = require("./UserStorage");

class User {
  // 1. 생성자 만들기
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    const { id, password } = await UserStorage.getUserInfo(client.id);
    if (id) {
      // 아이디가 있는지 먼저 확인
      if (id === client.id && password === client.password) {
        // UserStorage에 저장된 값과 입력한 아이디/비번이 같은지 확인
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    }
    // 존재하지 않는 아이디가 있을 때
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }
  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;
