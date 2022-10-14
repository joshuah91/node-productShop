// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "MyNewPass!",
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "MyNewPass!", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://joshuah91:JOSEphine@cluster0.5ppqk2h.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected Successfully!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
