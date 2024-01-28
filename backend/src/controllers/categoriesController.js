const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const categories = await tables.category.readAll();
    if (categories.length) {
      res.json(categories);
    } else {
      res.status(404).json({
        message: "no data in dis table",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const read = async (req, res, next) => {
  const { category_name: name } = req.params;
  try {
    const category = await tables.category.readByName(name);
    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const { category_name: name } = req.body;
  const { id } = req.params;
  try {
    const result = await tables.category.update(name, id);
    if (result == null) {
      res.status(404).send("pas de bol");
    } else {
      res.status(200).json({
        message: "Votre catégorie a été modifiée",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res, next) => {
  const { category_name: name } = req.body;
  try {
    const result = await tables.category.create(name);
    res.status(201).json({
      id: result.insertId,
      message: "Votre catégorie a été créé",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.category.delete(parseInt(id, 10));
    if (result) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { browse, read, edit, add, remove };
