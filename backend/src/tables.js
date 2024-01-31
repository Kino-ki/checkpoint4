/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables

const ProductsManager = require("./models/ProductsManager");
const CategoriesManager = require("./models/CategoriesManager");
const ManufacturerManager = require("./models/ManufacturerManager");
const CartManager = require("./models/CartManager");
const UserManager = require("./models/UserManager");
const OrdersManager = require("./models/OrderManager");

const managers = [
  ProductsManager,
  CategoriesManager,
  ManufacturerManager,
  CartManager,
  UserManager,
  OrdersManager,
  // Add other managers here
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
