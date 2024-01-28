const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table task "item" as configuration
    super({ table: "manufacturer" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select * from ${this.table} ORDER BY manuf_name ASC`
    );

    // Return the array of items
    return rows;
  }

  async readByName(name) {
    const [rows] = await this.database.query(
      `SELECT id FROM ${this.table} where manuf_name= ?`,
      [name]
    );
    return rows[0];
  }

  async update(id, name, country) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET manuf_name=?, country=?  where ID=?`,
      [id, name, country]
    );
    console.info(result);
    return result.affectedRows;
  }

  async create(name, country) {
    // Execute the SQL INSERT query to add a new gnome to the "gnome" table
    const [result] = await this.database.query(
      `insert into ${this.table} (manuf_name, country) VALUES (?, ?)`,
      [name, country]
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
