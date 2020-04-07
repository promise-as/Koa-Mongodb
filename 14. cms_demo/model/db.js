// DB库
var MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID;

var Config = require('./config.js');

class Db {

  static getInstance() { // 单例 多次实例化不共享的问题
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {

    this.dbClient = ''; // 属性 放 db 对象
    this.connect();     // 实例化的时候就连接数据库
  }

  connect() { // 连接数据库
    let _that = this;
    return new Promise((resolve, reject) => {

      if (!_that.dbClient) { // 解决数据库多次链接的问题
        MongoClient.connect(Config.dbUrl, (err, client) => {

          if (err) {
            reject(err)

          } else {

            _that.dbClient = client.db(Config.dbName);

            resolve(_that.dbClient)
          }

        })

      } else {
        resolve(_that.dbClient);
      }

    })
  }

  find(collectionName, json) {

    return new Promise((resolve, reject) => {

      this.connect().then((db) => {

        var result = db.collection(collectionName).find(json);

        result.toArray(function (err, docs) {

          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        })
      })
    })
  }

  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {

      this.connect().then((db) => {

        // db.user.update({}, {$set: {}})
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {

        db.collection(collectionName).insertOne(json, function (err, result) {

          if (err) {
            reject(err);
          } else {
            resolve(result)
          }

        })

      })

    })
  }

  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {

        db.collection(collectionName).removeOne(json, function (err, result) {

          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }

  getObjectId(id) { // mongodb 里面查询 _id 把字符串转成对象
    return new ObjectID(id);
  }
}

module.exports = Db.getInstance();