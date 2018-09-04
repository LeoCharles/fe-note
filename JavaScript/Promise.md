# Promise对象

## 基本用法

+ Promise 是一个对象，从它可以获取异步操作的消息。
+ Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
+ Promise对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。
+ 这两种情况发生，状态就凝固了resolved（已定型），不会再变了。通常将resolved统一只指fulfilled状态，不包含rejected状态。
+ Promise对象是一个构造函数，用来生成Promise实例。
+ Promise 新建后就会立即执行。
+ Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。

```js
let promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

+ resolve 函数将Promise对象的状态从 pending 变为 resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
+ reject 函数的作用是，将Promise对象的状态从 pending 变为 rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```js
  // 用Promise对象实现的 Ajax
  function getRequestData(url) {
    let promise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();
    });
    return promise;
  }
  // 调用
  getRequestData('/test.json').then(res => {
    console.log(res);
  }, error => {
    console.log(error)
  })
```

+ Promise 实例具有then方法，它的作用是为 Promise 实例添加状态改变时的回调函数。第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
+ then方法返回的是一个新的Promise实例（不是原来那个Promise实例）。因此可以采用链式写法。
+ catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
+ finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
+ Promise.resolve方法将现有对象转为 Promise 对象。