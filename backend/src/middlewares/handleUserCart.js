const tables = require("../tables");

const handleUserCart = async (req, res, next) => {
  try {
    const { product_id: prodId, quantity } = req.body;
    const { sub } = req.auth;
    const cartData = await tables.cart.readOneCart(sub);
    let prodExists;
    let oldQuantity = 0;
    if (!cartData.length) {
      prodExists = false;
    }
    let count = 0;
    let cartQuantity = 0;
    cartData.forEach((c) => {
      if (c.product_id === prodId && c.is_ordered === 0) {
        count += 1;
        cartQuantity += parseInt(c.cart_quantity, 10);
      }
    });
    if (count !== 0) {
      prodExists = true;
      oldQuantity = cartQuantity;
    } else {
      prodExists = false;
    }

    req.body.exists = prodExists;
    req.body.newQuantity = oldQuantity + quantity;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = handleUserCart;
