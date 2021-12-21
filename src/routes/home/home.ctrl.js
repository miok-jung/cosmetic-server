// ANCHOR home의 컨트롤러
"use strict";

const home = (req, res) => {
  res.render("home/index");
};
const login = (req, res) => {
  res.render("home/login");
};

module.exports = {
  home,
  login,
};
