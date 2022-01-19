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
    try {
      const user = await UserStorage.getUserInfo(client.id);
      if (user) {
        // 아이디가 있는지 먼저 확인
        if (user.id === client.id && user.password === client.password) {
          // UserStorage에 저장된 값과 입력한 아이디/비번이 같은지 확인
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }
      // 존재하지 않는 아이디가 있을 때
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, err };
      // key: value => err: err; 일 경우 생략
    }
  }
  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;
