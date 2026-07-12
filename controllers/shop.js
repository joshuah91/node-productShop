const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products',
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const products = await req.user.getCart();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await req.user.removeFromCart(prodId);
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const products = await req.user.getCart();
    const order = new Order({
      products: products.map(item => ({ quantity: item.quantity, product: item.productId })),
      userId: req.user._id,
      userName: req.user.name,
    });
    await order.save();
    await req.user.clearCart();
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findByUserId(req.user._id);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
