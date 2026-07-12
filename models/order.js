const db = require("../util/database");

class Order {
  constructor({ products, userId, userName, _id, id }) {
    this._id = _id || id || null;
    this.id = this._id;
    this.products = products || [];
    this.userId = userId || null;
    this.userName = userName || null;
  }

  async save() {
    const [result] = await db.execute(
      "INSERT INTO orders (userId, userName) VALUES (?, ?)",
      [this.userId, this.userName]
    );

    const orderId = result.insertId;
    for (const item of this.products) {
      const product = item.product || item.productId;
      const productId = product._id || product.id;
      await db.execute(
        "INSERT INTO order_items (orderId, productId, quantity, title, price, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [orderId, productId, item.quantity, product.title, product.price, product.description, product.imageUrl]
      );
    }

    this._id = orderId;
    this.id = orderId;
    return result;
  }

  static async findByUserId(userId) {
    const [orders] = await db.execute("SELECT * FROM orders WHERE userId = ? ORDER BY id DESC", [userId]);
    const results = [];

    for (const order of orders) {
      const [items] = await db.execute("SELECT * FROM order_items WHERE orderId = ?", [order.id]);
      results.push({
        _id: order.id,
        id: order.id,
        products: items.map((item) => ({
          quantity: item.quantity,
          product: {
            _id: item.productId,
            id: item.productId,
            title: item.title,
            price: item.price,
            description: item.description,
            imageUrl: item.imageUrl,
          },
        })),
      });
    }

    return results;
  }

  static async find(query = {}) {
    const userId = query["user.userId"];
    if (userId) {
      return Order.findByUserId(userId);
    }
    return [];
  }
}

module.exports = Order;
