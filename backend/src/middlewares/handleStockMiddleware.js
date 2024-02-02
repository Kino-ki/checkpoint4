const tables = require("../tables");

const handleStock = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    const productdata = await tables.product.readWithId(id);
    req.body.updatedQuantity = productdata.quantity - quantity;

    next();
  } catch (e) {
    next(e);
  }
};
module.exports = handleStock;
