/*
node.js 操作 mongodb 数据库
  1. 安装 mongodb
    cnpm install mongodb --save
  2. 引入 mongodb 下面的 MongoClient
    var MongoClient = require('mongodb').MongoClient;
  3. 定义数据库连接的地址 以及配置数据库
    koa 数据库的名称
    var url = 'mongodb://localhost:27017';
    var dbName = 'koa'
  4. node.js 连接数据库
    MongoClient.connnect(url, function(err, client)){
      const db = client.db(dbName); // 数据库 db 对象
    })
  5. 操作数据库
    db.user.insert
    MongoClient.connect(url, function(err, db){
      db.collection('user').insertOne({'name': '张三'}, function(err, result){
        db.close() // 关闭连接
      })
    })
*/

// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017/';

var dbName = 'koa';

// 连接数据库
// console.time('start');
// MongoClient.connect(dbUrl, (err, client) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   var db = client.db(dbName);
//   console.timeEnd('start');

//   // 增加数据
//   db.collection('user').insertOne(
//     {
//       'username': '王五',
//       'age': 26,
//       'sex': '男',
//       'status': '1'
//     },function(err, result){
//       if(!err){
//         console.log('增加数据成功');

//         client.close();
//       }
//     }
//   )
// })

console.time('start1');
MongoClient.connect(dbUrl, (err, client) => {
  if(err){
    console.log(err);
    return
  }
  
  var db = client.db(dbName);
  // 查询数据

  var result = db.collection('user').find({});

  result.toArray((err, docs) => {
    console.timeEnd('start1');
    console.log(docs);
  })
})

console.time('start2');
MongoClient.connect(dbUrl, (err, client) => {
  if(err){
    console.log(err);
    return
  }
  
  var db = client.db(dbName);
  // 查询数据

  var result = db.collection('user').find({});

  result.toArray((err, docs) => {
    console.timeEnd('start2');
    console.log(docs);
  })
})