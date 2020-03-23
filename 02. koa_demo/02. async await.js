// async 是让方法变成异步
// async function getData(){
//   return '这是一个数据'
// }
// console.log(getData());

// 如何获取 async 异步方法里面的额数据
// 第一种方法
// async function getData(){
//   return '这是一个数据';
// }
// var p = getData();
// p.then((data) => {
//   console.log(data);
// })

// 第二种
// async function getData(){
//   return '这是一个数据'
// }
// async function test(){
//   var d = await getData();
//   console.log(d);
// }
// test();

// await 是 es7 的方法
// await 阻塞的功能，把异步改成一个同步
// async function getData(){
//   console.log(2);
//   return '这是一个数据';
// }
// async function test(){
//   console.log(1);
//   var d = await getData();
//   console.log(d);
//   console.log(3);
// }
// test();

// async 定义的方法返回的是 Promise 对象
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var username = '张三';
      resolve(username);
    }, 1000)
  })
}
// var p = getData();
// p.then(function (d) {
//   console.log(d);
// })
async function test(){
  var data = await getData();
  console.log(data);
}
test();