"use strict";
// 모듈
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
//why use : OS마다 환경변수를 개발할 때 변수 등록이 달라질 수 있다.
// config를 통해서 자동적으로 root에 .env파일을 실행한다.

const accessLogStream = require("./src/config/log");

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

// 미들웨어 등록
// 정적 경로 추가
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제를 해결
app.use(express.urlencoded({ extended: true }));
app.use("/", home);
// use: 미들웨어 등록하는 메서드

module.exports = app;
