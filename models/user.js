const db = require("../util/database");

class User {
  constructor({ id, _id, name, email }) {
    this._id = _id || id || null;
    this.id = this._id;
    this.name = name;
    this.email = email;
    this.cart = { items: [] };
  }

  async save() {
    if (this._id) {
      const [result] = await db.execute(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [this.name, this.email, this._id]
      );
      return result;
    }

    const [result] = await db.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [this.name, this.email]
    );
    this._id = result.insertId;
    this.id = this._id;
    return result;
  }

  async addToCart(product) {
    const productId = product._id || product.id;
    const [rows] = await db.execute(
      "SELECT * FROM carts WHERE userId = ? AND productId = ?",
      [this._id, productId]
    );

    if (rows.length > 0) {
      await db.execute(
        "UPDATE carts SET quantity = quantity + 1 WHERE userId = ? AND productId = ?",
        [this._id, productId]
      );
    } else {
      await db.execute(
        "INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)",
        [this._id, productId, 1]
      );
    }

    return true;
  }

  async removeFromCart(productId) {
    await db.execute("DELETE FROM carts WHERE userId = ? AND productId = ?", [this._id, productId]);
    return true;
  }

  async clearCart() {
    await db.execute("DELETE FROM carts WHERE userId = ?", [this._id]);
    return true;
  }

  async populate() {
    const [rows] = await db.execute(
      `SELECT carts.quantity, products.id AS productId, products.title, products.price, products.description, products.imageUrl
       FROM carts
       JOIN products ON carts.productId = products.id
       WHERE carts.userId = ?`,
      [this._id]
    );

    this.cart = {
      items: rows.map((row) => ({
        quantity: row.quantity,
        productId: {
          _id: row.productId,
          id: row.productId,
          title: row.title,
          price: row.price,
          description: row.description,
          imageUrl: row.imageUrl,
        },
      })),
    };

    return this;
  }

  async execPopulate() {
    return this;
  }

  async getCart() {
    await this.populate();
    return this.cart.items;
  }

  toSessionObject() {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
    };
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new User({ id: row.id, _id: row.id, name: row.name, email: row.email });
  }

  static async findOne() {
    const [rows] = await db.execute("SELECT * FROM users ORDER BY id LIMIT 1");
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new User({ id: row.id, _id: row.id, name: row.name, email: row.email });
  }
}

module.exports = User;
