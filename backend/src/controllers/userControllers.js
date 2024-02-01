const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAllusers();
    if (users.length) {
      res.json(users);
    } else {
      res.status(404).json({
        message: "oops! j'ai rien à afficher",
      });
    }
  } catch (e) {
    next(e);
  }
};

const readByUser = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const user = await tables.user.readOneuser(sub);
    if (user != null) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "oops! Grey area, nothing to display.",
      });
    }
  } catch (e) {
    next(e);
  }
};

const add = async (req, res, next) => {
  const { username: userName, email, hashedpwd } = req.body;
  try {
    const result = await tables.user.create(userName, email, hashedpwd);
    if (result.affectedRows !== 0) {
      res.status(201).json({
        message: `hey you!`,
      });
    } else {
      res.status(404).json({
        message: "oops! no creation, check your inputs",
      });
    }
  } catch (e) {
    next(e);
  }
};

const edit = async (req, res, next) => {
  const {
    username: userName,
    email,
    hashed_password: hashedPassword,
    firstname: firstName,
    lastname: lastName,
    adress,
  } = req.body;
  const { id } = req.params;
  try {
    const result = await tables.user.update(
      userName,
      email,
      hashedPassword,
      firstName,
      lastName,
      adress,
      id
    );
    if (result.changedRows !== 0) {
      res.status(200).json({
        message: "user Changes done",
      });
    } else {
      res.status(404).json({
        message: "No modification, check your data",
      });
    }
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tables.user.delete(id);
    if (result.affectedRows !== 0) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { browse, readByUser, add, edit, destroy };
