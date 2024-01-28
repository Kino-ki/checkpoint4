const tables = require("../tables");

const foreignKey = async (req, res, next) => {
  const { manufacturer } = req.body;
  // const { category_id: CategoryId } = res.body;
  try {
    const theId = await tables.manufacturer.readByName(manufacturer);
    req.manufacturer_id = theId.id;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = foreignKey;
