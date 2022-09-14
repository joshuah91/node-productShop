const fs = require('fs');
const path = require('path');

// const products = [];
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, price, image, description) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


};