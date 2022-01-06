"use strict";

// 파일을 읽을 수 있는 파일 시스템 가져오기
const fs = require("fs").promises;

class UserStorage {
  // class 안에 변수 선언시 const/let이 필요하지 않다.
  // # : public한 변수에서 private한 변수로 변경
  // private한 변수/메서는 항상 최상단으로 올려준다. -> 암묵적 코딩문화
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // [id, password, name]
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    // console.log(userInfo);
    // <pending>의 의미 : 데이터를 전부 읽어오지 못하였다.
    // 즉, userInfo를
    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }
  static getUserInfo(id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, isAll, id);
      })
      .catch(console.error);
    // 함수를 실행시키는데 파라미터로 넘어온 변수를 실행시키는 함수로 똑같이 실행시킬때 생략이 가능하다.
    // .catch(err => console.error(err))
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    // 모든 데이터 받아오기 : this.getUsers("id", "password", "name") 보단, this.getUsers(true)로 하면 한번에 받아 올 수 있다.
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    // 데이터 추가
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
