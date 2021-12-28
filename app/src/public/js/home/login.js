"use strict";

// 1. 유저가 아이디/비밀번호를 입력한다.
// 2. 유저는 엔터 혹은 로그인 버튼을 클릭할 때, 로그인이 된다.
// 질의 선택자?
const id = document.querySelector("#id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

// 리퀘스트 변수?
function login() {
  const req = {
    id: id.value,
    password: password.value,
  };
  console.log(req);
}
