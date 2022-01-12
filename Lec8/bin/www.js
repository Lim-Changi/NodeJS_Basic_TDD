const app = require("../index");
const syncDb = require("./sync-db");

syncDb().then(() => {
  console.log("DB Sync");
  app.listen(3000, () => {
    console.log("Server Live At Port 3000");
  });
});
