// 각 Router의 비즈니스 로직을 컨트롤러에 담아 분리하도록 한다

const { User } = require("../../models");

const getAllUser = async (req, res) => {
  const limit = !!req.query.limit ? parseInt(req.query.limit) : 10;
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  const allUser = await User.findAll();
  res.json(allUser.slice(0, limit));
};

const getOneUser = async (req, res) => {
  const id = !!req.params.id ? parseInt(req.params.id) : null;
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
};

const deleteOneUser = async (req, res) => {
  const deleteId = !!req.body.id ? parseInt(req.body.id) : null;
  if (Number.isNaN(deleteId)) {
    return res.status(400).end();
  }
  const checkUserExists = await User.findOne({
    where: { id: deleteId },
  });

  if (!checkUserExists) {
    return res.status(404).end();
  }

  await User.destroy({
    where: { id: deleteId },
  });

  res.status(204).end();
};

const createOneUser = async (req, res) => {
  const newUserData = req.body;
  if (!newUserData.name || !newUserData.id) {
    return res.status(400).end();
  }

  const checkNameExists = await User.findOne({
    where: { name: newUserData.name },
  });
  if (!!checkNameExists) {
    return res.status(409).end();
  }

  await User.create({
    id: newUserData.id,
    name: newUserData.name,
  });

  res.status(201).json(await User.findOne({ where: { id: newUserData.id } }));
};

const updateOneUser = async (req, res) => {
  const updateUserData = req.body;
  if (Number.isNaN(parseInt(updateUserData.id))) {
    return res.status(400).end();
  }

  if (!updateUserData.name || !updateUserData.id) {
    return res.status(400).end();
  }

  const checkNameExists = await User.findOne({
    where: { name: updateUserData.name },
  });
  if (!!checkNameExists) {
    return res.status(409).end();
  }

  const checkUserExists = await User.findOne({
    where: { id: updateUserData.id },
  });

  if (!checkUserExists) {
    return res.status(404).end();
  }

  await User.update(
    { name: "updateUser" },
    {
      where: { id: updateUserData.id },
    }
  );

  const updateUser = await User.findOne({
    where: { name: updateUserData.name },
  });

  res.status(200).json(updateUser);
};

module.exports = {
  getOneUser,
  getAllUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
};
