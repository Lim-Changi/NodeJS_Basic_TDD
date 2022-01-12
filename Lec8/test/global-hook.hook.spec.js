const kill = require("kill-port");
const models = require("../models");

before(async () => {
  await new Promise((resolve, _reject) => {
    kill(3000, "tcp")
      .then(() => {
        resolve(true);
      })
      .catch(console.log);
  });

  await models.sequelize.sync({ force: true });
  await models.User.create({ id: 1, name: "a" });
  await models.User.create({ id: 2, name: "b" });
  await models.User.create({ id: 3, name: "c" });
});
