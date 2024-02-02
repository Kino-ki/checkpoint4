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
      `SELECT u.username, p.product_name,c.id, p.id AS product_id, u.id AS user_id, c.is_ordered ,p.quantity AS product_quantity, SUM(c.quantity) AS cart_quantity, SUM(p.price) AS total_price
      FROM ${this.table} AS c
      JOIN user AS u ON c.user_id=u.id
      JOIN product AS p ON c.product_id=p.id
      WHERE c.user_id=?
      GROUP BY p.product_name,  p.quantity,  u.username, c.id, c.is_ordered `,
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

  async setOrder(isOrdered, prodId, sub) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET is_ordered = ? WHERE product_id= ? AND user_id=?`,
      [isOrdered, prodId, sub]
    );
    return result;
  }

  async update(quantity, prodId, sub) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET quantity = ? WHERE product_id= ? AND user_id=?`,
      [quantity, prodId, sub]
    );
    return result;
  }

  async delete(prodId, sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE product_id=? AND user_id=?`,
      [prodId, sub]
    );
    return result;
  }
}

module.exports = CartManager;
