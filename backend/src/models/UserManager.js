const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAllusers() {
    const [rows] = await this.database.query(`
    SELECT * FROM ${this.table}
    ORDER BY username ASC
    `);
    return rows;
  }

  async readOneuser(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table}
      WHERE id=?`,
      [id]
    );
    return rows;
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * from ${this.table} WHERE email=?`,
      [email]
    );
    return rows[0];
  }

  async create(userName, email, hashedpwd) {
    const result = await this.database.query(
      `INSERT INTO ${this.table} (username, email, hashed_password) VALUES (? , ?, ?)`,
      [userName, email, hashedpwd]
    );
    return result;
  }

  async update(
    userName,
    email,
    hashedPassword,
    firstName,
    lastName,
    adress,
    id
  ) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET username = ? ,email=?, hashed_password=?, firstname=?, lastname=?, adress=?   WHERE id=?`,
      [userName, email, hashedPassword, firstName, lastName, adress, id]
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

module.exports = UserManager;
