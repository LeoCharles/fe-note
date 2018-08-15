# Promise对象

## Promise的含义及特点

+ Promise 是一个对象，从它可以获取异步操作的消息。
+ Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
+ Promise对象的状态改变，只有两种可能：从 pending变为fulfilled和从pending变为rejected。这两种情况发生，状态就凝固了resolved（已定型），不会再变了。通常将resolved统一只指fulfilled状态，不包含rejected状态。

用Promise对象实现的 Ajax的例子

```js
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