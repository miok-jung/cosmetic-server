"use strict";

class UserStorage {
  // class 안에 변수 선언시 const/let이 필요하지 않다.
  // # : public한 변수에서 private한 변수로 변경
  static #users = {
    id: ["Jnarin", "jnarin3", "제이나린"],
    password: ["Jnarin", "jnarin3", "123456"],
    name: ["제이나린", "가나다라", "카카"],
  };
  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;
