const rootDir = require("../util/path");

const Cart = require("./cart");

// const p = path.join(rootDir, "data", "products.json");
const db = require("../util/database");

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, image, price, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
  }

  save() {
    // getProductsFromFile((products) => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     const updatedProduct = [...products];
    //     updatedProduct[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
    return db.execute(
      "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.image]
    );
  }

  static deleteById(id) {
    // getProductsFromFile((products) => {
    //   const product = products.find((prod) => prod.id === id);
    //   const remainingProducts = products.filter((prod) => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(remainingProducts), (err) => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    // getProductsFromFile(cb);
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {
    // getProductsFromFile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
