const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    let user = await User.findOne();
    if (!user) {
      const createdUser = new User({
        name: "Josh",
        email: "email@test.com",
      });
      await createdUser.save();
      user = createdUser;
    }

    req.session.isLoggedIn = true;
    req.session.user = user.toSessionObject();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
