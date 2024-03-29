const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const products = await tables.product.readAll();
    if (products.length) {
      res.json(products);
    } else {
      res.status(404).json({
        message: "no data in dis table",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const readById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await tables.product.readWithId(id);
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
};
const readByManuf = async (req, res, next) => {
  const { manufacturer_id: manufacturerId } = req.params;
  try {
    const product = await tables.product.readWithManuf(manufacturerId);
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
};

const editStock = async (req, res) => {
  const { id } = req.params;
  const { updatedQuantity } = req.body;
  try {
    const result = await tables.product.update(updatedQuantity, id);
    if (result == null) {
      res.status(404).send("pas de bol");
    } else {
      res.status(200).json({
        message: "Votre produit a été modifié",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res, next) => {
  const { product_name: name, quantity, price } = req.body;
  const manufacturerId = req.manufacturer_id;
  const CategoryId = req.category_id;

  try {
    const result = await tables.product.create(
      name,
      quantity,
      price,
      CategoryId,
      manufacturerId
    );
    res.status(201).json({
      id: result.insertId,
      message: "Votre produit a été crée",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tables.product.delete(parseInt(id, 10));
    if (result) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { browse, readByManuf, readById, editStock, add, remove };
