const http = require("http");

// 내 IP 주소
const hostname = "localhost"; // 127.0.0.1

// 서버가 열릴 포트
const port = 3000;

// 서버 세팅
// req -> 요청
// res -> 반환
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  } else if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("User list");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

// 서버 시작
server.listen(port, hostname, () => {
  console.log(`Server Running At http://${hostname}:${port}`);
});

// 서버 요청
// curl -X GET 'localhost:3000'
