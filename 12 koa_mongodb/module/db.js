// DB库
var MongoClient = require('mongodb').MongoClient;

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
    this.connect();

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

  update() {

  }

  insert() {

  }
}

module.exports = Db.getInstance();