const models = require("../models");

// Sync 를 통해 Sqlite DB 생성
module.exports = () => {
  return models.sequelize.sync({ force: true });
};
