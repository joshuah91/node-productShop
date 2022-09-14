const Product = require('../models/product');





exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    docTitle: "Your Cart",
  });
};

exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', {
    path: "/checkout",
    docTitle: "Checkout"
  });
};
