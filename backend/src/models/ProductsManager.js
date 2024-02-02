const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table task "item" as configuration
    super({ table: "product" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select p.id, p.product_name, p.quantity, p.price, m.manuf_name as manufacturer, c.category_name as category from ${this.table} AS p 
      LEFT JOIN MANUFACTURER AS m ON m.id=p.manufacturer_id
      LEFT JOIN CATEGORY AS c ON c.id=p.category_id`
    );

    // Return the array of items
    return rows;
  }

  async readWithManuf(manufacturerId) {
    const [rows] = await this.database.query(
      `SELECT product_name FROM ${this.table} where manufacturer_id= ?`,
      [manufacturerId]
    );
    return rows;
  }

  async readWithId(id) {
    const [rows] = await this.database.query(
      `SELECT quantity FROM ${this.table} where id= ?`,
      [id]
    );
    return rows[0];
  }

  async update(quantity, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET quantity=? where ID=?`,
      [quantity, id]
    );
    return result.affectedRows;
  }

  async create(name, quantity, price, CategoryId, manufacturerId) {
    // Execute the SQL INSERT query to add a new gnome to the "gnome" table
    const [result] = await this.database.query(
      `insert into ${this.table} (product_name, quantity, price, category_id, manufacturer_id) VALUES (?, ?, ?, ?, ?)`,
      [name, quantity, price, CategoryId, manufacturerId]
    );

    // Return the ID of the newly inserted gnome
    return result.insertId;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );

    return result;
  }
}

module.exports = ProductsManager;
