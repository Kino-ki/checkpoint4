const tables = require("../tables");

const categoryId = async (req, res, next) => {
  const { category } = req.body;
  // const { category_id: CategoryId } = res.body;
  try {
    const theId = await tables.category.readByName(category);
    req.category_id = theId.id;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = categoryId;
