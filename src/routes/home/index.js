"use strict"; // ECMAScript 문법을 준수하겠다라는 선언문이다.

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/", ctrl.home);
router.get("/login", ctrl.login);

module.exports = router;
