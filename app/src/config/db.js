const mysql = require("mysql");

const db = mysql.createConnection({
  // 데이터베이스 설정 기록
  host: process.env.DB_HOST, // 엔드포인트
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.connect();
module.exports = db; //외부에서도 사용가능하게 내보내기
