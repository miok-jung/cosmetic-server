"use strict";

// 1. 유저가 아이디/비밀번호를 입력한다.
// 2. 유저는 엔터 혹은 로그인 버튼을 클릭할 때, 로그인이 된다.
// 질의 선택자?
const id = document.querySelector("#id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

// 리퀘스트 변수?
function login() {
  if (!id.value) return alert("아이디를 입력해주십시오.");
  if (!password.value) return alert("비밀번호가 입력해주십시오.");

  const req = {
    id: id.value,
    password: password.value,
  };
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    // 여기까지 적은 경우 Promise로 들어옴
    // 따라서 한번더 then으로 접근을 해야한다.
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}
