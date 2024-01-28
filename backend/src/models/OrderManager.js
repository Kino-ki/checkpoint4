const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "orders" });
  }

  async readAllOrders() {
    const [rows] = await this.database.query(`
    SELECT o.*, u.username, p.product_name FROM ${this.table} AS o 
    JOIN user AS u ON o.user_id=u.id
    JOIN product AS p ON o.product_id = p.id
    ORDER BY user_id DESC
    `);
    return rows;
  }

  async readOneOrder(userId) {
    const [rows] = await this.database.query(
      ` SELECT u.username, p.product_name, o.quantity FROM ${this.table} AS o 
      JOIN user AS u ON c.user_id=u.id
      JOIN product AS p ON c.product_id = p.id
      WHERE user_id=?
      ORDER BY user_id DESC`,
      [userId]
    );
    return rows;
  }

  async create(userId, productId) {
    const result = await this.database.query(
      `INSERT INTO ${this.table} (user_id, product_id) VALUES (? , ?)`,
      [userId, productId]
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

module.exports = OrdersManager;
