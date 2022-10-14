// const rootDir = require("../util/path");

// const Cart = require("./cart");

// // const p = path.join(rootDir, "data", "products.json");

// //function to import database connection file
// const db = require("../util/database");

//     //function to read data from a file stored on the filesystem(fs) and also fetch product data from it
//     //fs is to be required here. fs is a core node method and don't need to be installed
// // const getProductsFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

//     //create product model with constructor method to initialize properties of the method
// module.exports = class Product {
//   constructor(id, title, image, price, description) {
//     this.id = id;
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.image = image;
//   }

//       //save method to save data product data to the fs (writeFile method)
//   save() {
//     // getProductsFromFile((products) => {
//     //   if (this.id) {
//     //     const existingProductIndex = products.findIndex(
//     //       (prod) => prod.id === this.id
//     //     );
//     //     const updatedProduct = [...products];
//     //     updatedProduct[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), (err) => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });

//         //db.execute is used to store product model data in the database on mysql
//     return db.execute(
//       "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.description, this.image]
//     );
//   }

//       //method to delete a product model data from the fs
//   static deleteById(id) {
//     // getProductsFromFile((products) => {
//     //   const product = products.find((prod) => prod.id === id);
//     //   const remainingProducts = products.filter((prod) => prod.id !== id);
//     //   fs.writeFile(p, JSON.stringify(remainingProducts), (err) => {
//     //     if (!err) {
//     //       Cart.deleteProduct(id, product.price);
//     //     }
//     //   });
//     // });
//   }

//       //method to fetch all data from the fs
//   static fetchAll() {
//     // getProductsFromFile(cb);
//         //method to fetch all data from the database
//     return db.execute("SELECT * FROM products");
//   }

//       //method to find a single model data by id from the fs.
//   static findById(id, cb) {
//     // getProductsFromFile((products) => {
//     //   const product = products.find((p) => p.id === id);
//     //   cb(product);
//     // });
//         //method to fetch a single model data by id from the database on mysql
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }
// };

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

const getDb = require("../util/database").getDb;
class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("res", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   image: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
