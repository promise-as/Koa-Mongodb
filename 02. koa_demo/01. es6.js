// 回调函数
function getData(callback) {
  // ajax
  setTimeout(function () {
    var name = '张三';
    callback(name)
  }, 1000);
}
// 外部获取异步方法里面的数据
// getData(function(data){
//   console.log(data+'111');
// })


// Promise 来处理异步
// resolve 成功的回调函数
// reject 失败的回调函数
// 第一种
// var p = new Promise(function (resolve, reject) {
//   // ajax
//   setTimeout(function () {
//     var name = '张三';
//     if (Math.random() < 0.5) {
//       resolve(name)
//     } else {
//       reject('失败')
//     }
//   }, 1000)
// })
// p.then((data) => {
//   console.log(data);
// })

// 第二种
function getData(resolve, reject){
  // ajax
  setTimeout(function(){
    var name = '张三';
    resolve(name);
  }, 1000)
}
var p = new Promise(getData);
p.then((data) => {
  console.log(data);
})