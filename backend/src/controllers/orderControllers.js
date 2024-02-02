const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const orders = await tables.orders.readAllOrders();
    if (orders.length) {
      res.json(orders);
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
    const order = await tables.orders.readOneOrder(sub);
    if (order != null) {
      res.json(order);
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
  const { user_id: userId, cart_id: cartId, product_id: prodId } = req.body;
  try {
    const result = await tables.orders.create(userId, cartId, prodId);
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
    const result = await tables.orders.update(quantity, id);
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
    const result = await tables.orders.delete(id);
    if (result.affectedRows !== 0) {
      res.json({
        message: `Deleted entry ${id}`,
      });
    } else {
      res.status(404).json({
        message: "order not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { browse, readByUser, add, edit, destroy };
