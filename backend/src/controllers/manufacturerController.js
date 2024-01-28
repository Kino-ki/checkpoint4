const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const manufacturers = await tables.manufacturer.readAll();
    if (manufacturers.length) {
      res.json(manufacturers);
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
  const { manuf_name: name } = req.params;

  try {
    const manufacturer = await tables.manufacturer.readByName(name);
    if (manufacturer == null) {
      res.sendStatus(404);
    } else {
      res.json(manufacturer);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { manuf_name: name, country } = req.body;
  try {
    const result = await tables.manufacturer.update(name, country, id);
    if (result == null) {
      res.status(404).send("pas de bol");
    } else {
      res.status(200).json({
        message: "Manufacturer updated",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res, next) => {
  const { manuf_name: name, country } = req.body;
  try {
    const result = await tables.manufacturer.create(name, country);
    res.status(201).json({
      id: result.insertId,
      message: "Manufacturer created",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.manufacturer.delete(parseInt(id, 10));
    if (result) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "Manufacturer not found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { browse, read, edit, add, remove };
