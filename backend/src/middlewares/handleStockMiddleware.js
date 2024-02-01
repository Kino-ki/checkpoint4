const tables = require("../tables");

const handleStock = async (req, res, next) => {
  try {
    const { quantitySelected, prodId } = req.body;
    const productdata = await tables.product.readAll();
    req.quantity = productdata[prodId - 1].quantity - quantitySelected;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = handleStock;
