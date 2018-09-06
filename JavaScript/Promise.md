# Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。ES6 原生提供了 Promise 对象。

Promise 对象初始是 pending 状态，可以通过函数 resolve() 和 reject() ，将状态转变为 resolved 或者 rejected 状态，状态一旦改变就不能再次变化。

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。

```js
// 生成 Promise 实例
let promise = new Promise(function(resolve, reject) {
  // ...
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve() 函数将 Promise 对象的状态从 pending 变为 resolved，在异步操作成功时调用。并将异步操作的结果，作为参数传递出去。

reject() 函数将 Promise 对象的状态从 pending 变为 rejected，在异步操作失败时调用。并将异步操作报出的错误，作为参数传递出去。

Promise 实例的 then() 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

then() 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例），因此可以采用链式写法。

一般来说，调用 resolve() 或 reject() 以后，Promise 的使命就完成了，后续操作应该放到实例的 then() 方法里，而不应该直接写在 resolve() 或 reject() 的后面。所以，最好在它们前面加上 return 语句。

```js
  // 用 Promise 对象实现 Ajax
  function getJSON(url) {
    // 创建 Promise 实例
    let promise = new Promise((resolve, reject) => {
      // 实现 Ajax
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
          // 异步操作成功时调用
          return resolve(this.response)
        } else {
          // 异步操作失败时调用
          return reject(new Error(this.statusText))
        }
      }
      xhr.responseType = 'json'
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send()
    })
    // 返回 Promise 实例
    return promise
  }
  // 使用时调用 Promise 实例的 then 方法
  getJSON('/test.json').then(res => {
    // 第一个参数是 resolved 状态的回调
    console.log(res);
  }, error => {
    // 第二个参数是 rejected 状态的回调
    console.log(error)
  })
```

catch() 方法是 then(null, rejection) 方法的别名，用于指定发生错误时的回调函数。

另外，then() 方法指定的回调函数，如果运行中抛出错误，也会被 catch() 方法捕获。

一般来说，不要在 then() 方法里定义第二个参数，要使用 catch() 方法捕获错误。

```js
getJSON('/posts.json').then((res) => {
  // ...
}).catch((error) => {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
})

```

finally() 方法不管 Promise 最后的状态，在执行完 then() 或 catch() 指定的回调函数以后，都会执行 finally() 方法指定的回调函数。本质上是 then() 方法的特例。

Promise.all() 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

+ 接受一个数组作为参数，成员都是 Promise 实例，如果不是则会先调用 Promise.resolve() 方法转为 Promise 实例。
+ 只有 p1, p2, p3 的状态都为 resolved 时，返回的新  Promise 实例 p 的状态才是 resolved。此时p1、p2、p3的返回值组成一个数组，传递给 p 的回调函数。
+ 只要 p1、p2、p3 中有一个状态为 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

```js
// Promise.all的参数为成员为 Promise 实例的数组
const p = Promise.all([p1, p2, p3])

// 生成一个 Promise 对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + '.json')
})
// 只有当 promises 中所有实例的状态都变成 resolved，或其中有一个变为 resolved
// 才会调用 Promise.all方法后面的回调函数。
Promise.all(promises).then(function (res) {
  // ...
}).catch(function(error){
  // ...
})
```

Promise.resolve() 方法将现有对象转为 Promise 对象。不带参数时，直接返回一个 resolved 状态的 Promise 对象。

Promise.reject() 方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

```js
// 将 jQuery 生成的deferred对象，转为一个新的 Promise 对象
const jsPromise = Promise.resolve($.ajax('/whatever.json'))

// setTimeout(fn, 0)在下一轮“事件循环”开始时执行
setTimeout(function () {
  console.log('three')
}, 0)
// Promise.resolve()在本轮“事件循环”结束时执行
Promise.resolve().then(function () {
  console.log('two')
})
console.log('one')
// one
// two
// three
```