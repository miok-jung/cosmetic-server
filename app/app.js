// const http = require("http");
// const app = http.createServer((req, res) => {
//   //   console.log(req.url); //루트 경로 이후에 있는 url을 확인할 수 있다.
//   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//   // 이것이 없으면 한글 해석이 전혀 되지 않는 문제가 발생하여 꼭 추가해야 한다.
//   if (req.url === "/") {
//     res.end("여기는 루트입니다.");
//   } else if (req.url === "/login") {
//     res.end("여기는 로그인 화면입니다.");
//   }
// });
// // express를 써야하는 이유
// // 경로마다 if문으로 정리해줘야 한다.
// // 한글 해석이 되지 않아 writeHead에 추가코드가 필요하다.

// app.listen(5001, () => {
//   console.log("http로 가동된 서버입니다.");
// });
"use Strict";
// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home);
// use: 미들웨어 등록하는 메서드

module.exports = app;
