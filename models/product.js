const db = require("../util/database");

class Product {
  constructor({ title, price, description, imageUrl, _id, id, userId }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id || id || null;
    this.id = this._id;
    this.userId = userId || null;
  }

  async save() {
    if (this._id) {
      const [result] = await db.execute(
        "UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ?, userId = ? WHERE id = ?",
        [this.title, this.price, this.description, this.imageUrl, this.userId, this._id]
      );
      return result;
    }

    const [result] = await db.execute(
      "INSERT INTO products (title, price, description, imageUrl, userId) VALUES (?, ?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl, this.userId]
    );
    this._id = result.insertId;
    this.id = this._id;
    return result;
  }

  static async find() {
    const [rows] = await db.execute("SELECT * FROM products ORDER BY id DESC");
    return rows.map((row) => new Product({ ...row, _id: row.id, id: row.id }));
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Product({ ...row, _id: row.id, id: row.id });
  }

  static async findByIdAndRemove(id) {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);
    return result;
  }
}

module.exports = Product;
