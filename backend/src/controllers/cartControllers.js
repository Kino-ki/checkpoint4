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
  try {
    const { sub } = req.auth;
    const cart = await tables.cart.readOneCart(sub);
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
  try {
    const { sub } = req.auth;
    const { product_id: prodId, quantity, exists, newQuantity } = req.body;
    if (!exists) {
      const result = await tables.cart.create(
        parseInt(sub, 10),
        parseInt(prodId, 10),
        parseInt(quantity, 10)
      );
      if (result.affectedRows !== 0) {
        res.status(201).json({
          message: `nouveau panier créé`,
        });
      } else {
        res.status(404).json({
          message: "oops! no creation, check your inputs",
        });
      }
    } else {
      const result = await tables.cart.update(
        parseInt(newQuantity, 10),
        parseInt(prodId, 10),
        parseInt(sub, 10)
      );
      if (result.changedRows !== 0) {
        res.status(200).json({
          message: "quantité modifiée",
        });
      } else {
        res.status(404).json({
          message: "No modification, check your data",
        });
      }
    }
  } catch (e) {
    next(e);
  }
};
const editToOrder = async (req, res, next) => {
  try {
    const { is_ordered: isOrdered } = req.body;
    const { product_id: prodId } = req.params;
    const { sub } = req.auth;
    const result = await tables.cart.setOrder(
      parseInt(isOrdered, 10),
      parseInt(prodId, 10),
      parseInt(sub, 10)
    );
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

const edit = async (req, res, next) => {
  const { quantity } = req.body;
  const { product_id: prodId } = req.params;
  const { sub } = req.auth;
  try {
    const result = await tables.cart.update(
      parseInt(quantity, 10),
      parseInt(prodId, 10),
      parseInt(sub, 10)
    );
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
  const { product_id: prodId } = req.params;
  const { sub } = req.auth;
  try {
    const result = await tables.cart.delete(prodId, sub);
    if (result.affectedRows !== 0) {
      res.json({
        message: `product ${prodId} removed from cart`,
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

module.exports = { browse, readByUser, add, editToOrder, edit, destroy };
