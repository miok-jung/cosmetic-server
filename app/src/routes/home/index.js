"use strict"; // ECMAScript 문법을 준수하겠다라는 선언문이다.

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;
