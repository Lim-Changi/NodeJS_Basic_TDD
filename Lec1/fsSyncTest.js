const fs = require("fs");

fs.readFile("./dataLong.txt", "utf8", (err, data) => {
  console.log("비동기처리 긴 데이터"); // 3
});

fs.readFile("./data.txt", "utf8", (err, data) => {
  console.log("비동기처리 짧은 데이터"); // 2
});

const syncData = fs.readFileSync("./data.txt", "utf-8");

console.log("동기처리"); // 1

// CallStack (Event Loop) Data -> 비동기 CallBack 함수 Data
