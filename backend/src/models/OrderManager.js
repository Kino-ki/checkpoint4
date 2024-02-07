const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "orders" });
  }

  async readAllOrders() {
    const [rows] = await this.database.query(`
    SELECT u.id, u.firstname, u.lastname, u.adress, GROUP_CONCAT(p.product_name) as products, GROUP_CONCAT(c.quantity) as quantities, GROUP_CONCAT(p.price) AS price
    FROM ${this.table} AS o
    LEFT JOIN user AS u ON o.user_id=u.id
    LEFT JOIN product AS p ON o.product_id=p.id
    LEFT JOIN cart AS c ON c.id=o.cart_id
    GROUP BY u.id
    ORDER BY u.firstname, u.lastname ASC
    `);
    return rows;
  }

  async readOneOrder(sub) {
    const [rows] = await this.database.query(
      `SELECT u.firstname, u.lastname, u.adress, p.product_name, SUM(c.quantity) as quantity, (p.price) AS price
      FROM ${this.table} AS o
      JOIN user AS u ON o.user_id = u.id 
      JOIN product AS p ON p.id = o.product_id
      JOIN cart AS c ON c.id = o.cart_id
      WHERE o.user_id= ?
      GROUP BY u.firstname, u.lastname, u.adress, p.product_name, p.price`,
      [sub]
    );
    return rows;
  }

  async create(userId, cartId, prodId) {
    const result = await this.database.query(
      `INSERT INTO ${this.table} (user_id, cart_id, product_id) VALUES (? , ?, ?)`,
      [userId, cartId, prodId]
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
