const express = require("express");
const app = express();

const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bak" },
  { id: 3, name: "chris" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Hello World - Express");
});

app.listen(3000, () => {
  console.log("Server Live At Port 3000");
});
