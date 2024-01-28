const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const carts = await tables.cart.readAllCarts();
    if (carts.length) {
      res.json(carts);
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
  const { user_id: userId } = req.params;
  try {
    const cart = await tables.cart.readOneCart(userId);
    if (cart != null) {
      res.json(cart);
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
  const { user_id: userId, product_id: productId, quantity } = req.body;
  try {
    const result = await tables.cart.create(userId, productId, quantity);
    if (result.affectedRows !== 0) {
      res.status(201).json({
        message: `nouveau panier créé`,
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
  const { quantity } = req.body;
  const { id } = req.params;
  try {
    const result = await tables.cart.update(quantity, id);
    if (result.changedRows !== 0) {
      res.status(200).json({
        message: "quantité modifiée",
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
    const result = await tables.cart.delete(id);
    if (result.affectedRows !== 0) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "Cart not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { browse, readByUser, add, edit, destroy };
