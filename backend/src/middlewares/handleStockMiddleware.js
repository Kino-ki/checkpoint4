const tables = require("../tables");

const handleStock = async (req, res, next) => {
  const { is_fav: IsFav, id } = req.body;
  try {
    const productdata = await tables.product.readAll();
    req.quantity =
      productdata[id - 1].quantity - (IsFav - productdata[id - 1].is_fav);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = handleStock;
