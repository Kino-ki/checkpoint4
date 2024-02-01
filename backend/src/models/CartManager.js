const AbstractManager = require("./AbstractManager");

class CartManager extends AbstractManager {
  constructor() {
    super({ table: "cart" });
  }

  async readAllCarts() {
    const [rows] = await this.database.query(`
    SELECT u.username, p.product_name, SUM(c.quantity) AS qantity, SUM(p.price) AS total_price
    FROM ${this.table} AS c
    JOIN user AS u ON c.user_id=u.id
    JOIN product AS p ON c.product_id=p.id
    GROUP BY u.username, p.product_name
    ORDER BY u.username ASC
    `);
    return rows;
  }

  async readOneCart(sub) {
    const [rows] = await this.database.query(
      `SELECT u.username, p.product_name, SUM(c.quantity) AS qantity, SUM(p.price) AS total_price
      FROM ${this.table} AS c
      JOIN user AS u ON c.user_id=u.id
      JOIN product AS p ON c.product_id=p.id
      WHERE c.user_id=?
      GROUP BY u.username, p.product_name`,
      [sub]
    );
    return rows;
  }

  async create(sub, productId, quantity) {
    const result = await this.database.query(
      `INSERT INTO ${this.table} (user_id, product_id, quantity) VALUES (? , ?, ?)`,
      [sub, productId, quantity]
    );
    return result;
  }

  async update(quantity, id) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET quantity = ? WHERE id=?`,
      [quantity, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = CartManager;
