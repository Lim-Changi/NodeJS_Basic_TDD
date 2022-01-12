const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bak" },
  { id: 3, name: "chris" },
];

app.get("/users", (req, res) => {
  const limit = !!req.query.limit ? parseInt(req.query.limit) : 10;
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = !!req.params.id ? parseInt(req.params.id) : null;
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter((user) => {
    return user.id === id;
  })[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUserData = req.body;
  if (!newUserData.name || !newUserData.id) {
    return res.status(400).end();
  }

  if (users.filter((user) => user.name === newUserData.name).length > 0) {
    return res.status(409).end();
  }

  users.push(newUserData);
  res.status(201).json(newUserData);
});

app.put("/users", (req, res) => {
  const updateUserData = req.body;
  if (Number.isNaN(parseInt(updateUserData.id))) {
    return res.status(400).end();
  }

  if (!updateUserData.name || !updateUserData.id) {
    return res.status(400).end();
  }

  if (users.filter((user) => user.name === updateUserData.name).length > 0) {
    return res.status(409).end();
  }

  const updateUser = users.filter((user) => user.id === updateUserData.id)[0];

  if (!updateUser) {
    return res.status(404).end();
  }

  updateUser.name = updateUserData.name;

  res.status(200).json(updateUser);
});

app.delete("/users", (req, res) => {
  const deleteId = !!req.body.id ? parseInt(req.body.id) : null;
  if (Number.isNaN(deleteId)) {
    return res.status(400).end();
  }
  if (users.filter((user) => user.id === deleteId).length === 0) {
    return res.status(404).end();
  }

  users = users.filter((user) => {
    return user.id !== deleteId;
  });

  res.status(204).end();
});

app.get("/", (req, res) => {
  res.send("Hello World - Express");
});

app.listen(3000, () => {
  console.log("Server Live At Port 3000");
});

module.exports = {
  app,
};
