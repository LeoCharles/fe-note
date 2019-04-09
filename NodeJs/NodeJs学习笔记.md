# NodeJs 学习笔记

## 全局变量

此处列出的对象特定于 Node.js。 有许多内置对象是 JavaScript 语言本身的一部分，它们也是全局可访问的。

+ `global`： 全局的命名空间对象。

+ `process`： 进程对象。

+ `module`： 对当前模块的引用。

+ `require()`： 用于引入模块、 JSON、或本地文件。

+ `exports`： 这是一个对于 `module.exports` 的更简短的引用形式。

+ `__dirname`： 当前模块的目录名。

+ `__filename`： 当前模块的文件名。 这是当前的模块文件的绝对路径。

+ `setImmediate(callback[, ...args])`： 预定在 I/O 事件的回调之后立即执行的 callback。

+ `setInterval(callback, delay[, ...args])`： 预定每隔 delay 毫秒重复执行 callback。

+ `setTimeout(callback, delay[, ...args])`： 预定在 delay 毫秒之后执行一次性的 callback。

+ `clearImmediate(immediate)`： 取消由 `setImmediate()` 创建的 `Immediate` 对象。

+ `clearInterval(intervalObject)`： 取消由 `setInterval()` 创建的 `Timeout` 对象。

+ `clearTimeout(timeout)`： 取消由 `setTimeout()` 创建的 `Timeout` 对象。

+ `Buffer` 类： 用于处理二进制数据。

+ `URL` 类： 浏览器兼容的 URL 类。

+ `URLSearchParams`： 供对 URL query 部分的读写权限。

+ `WebAssembly`： 作为所有 W3C WebAssembly 相关功能的命名空间的对象。

## events（事件触发器）

`events` 模块只提供了一个对象：`events.EventEmitter` 的核心就是事件触发与事件监听器功能的封装。

大多数时候我们不会直接使用 `EventEmitter`，而是在对象中继承它。包括 `fs`、`net`、 `http` 在内的，只要是支持事件响应的核心模块都是 `EventEmitter` 的子类。

所有产生事件的对象都是 `events.EventEmitter` 的实例。

```js
const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()
// 注册监听器 1
event.on('connection', () => {
  console.log('监听器 1 触发了！');
})
// 事件处理函数 2
const listenerTwo = () => {
  console.log('监听器 2 触发了！');
}
// 注册监听器 2
event.addListener('connection', listenerTwo)
// 触发事件
event.emit('connection')
// 移除事件监听器 2
event.removeListener('connection', listenerTwo)
// 再次触发事件
event.emit('connection')
// 监听器 1 触发了！
// 监听器 2 触发了！
// 监听器 1 触发了！
```

### EventEmitter 实例方法

+ `addListener(event, listener)`： 为指定事件添加一个监听器到监听器数组的尾部。

+ `on(event, listener)`： 为指定事件注册一个监听器，接受一个字符串事件名和一个回调函数。

+ `once(event, listener)`： 为指定事件注册一个单次监听器，监听器最多只会触发一次，触发后立刻解除该监听器。

+ `removeListener(event, listener)`： 移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。

+ `removeAllListeners([event])`： 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

+ `emit(event, [arg1], [arg2], [...])`： 按参数的顺序执行每个监听器，如果事件有注册监听返回 `true`，否则返回 `false`。

+ `listeners(event)`： 返回指定事件的监听器数组。

+ `setMaxListeners(n)`： 设置监听器的默认限制的数量（默认10个)。

### EventEmitter 事件

+ `newListener`： 该事件在添加新监听器时被触发。event：事件名; listener： 事件处理函数。

+ `removeListener`:  从指定监听器数组中删除一个监听器。event：事件名; listener： 事件处理函数。

### error 事件

`EventEmitter` 定义了一个特殊的事件 `error`，在遇到 异常的时候通常会触发 `error` 事件。

当 `error` `被触发时，EventEmitter` 规定如果没有监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

一般要为会触发 `error` 事件的对象设置监听器，避免遇到错误后整个程序崩溃。

## Buffer(缓冲器)

在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。

`Buffer` 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

现在可以使用 TypedArray， `Buffer` 类以更优化和更适合 Node.js 的方式实现了 Uint8Array API。

`Buffer` 类的实例类似于整数数组，但对应于 V8 堆外部的固定大小的原始内存分配。 Buffer 的大小在创建时确定，且无法更改。

`Buffer` 类在全局作用域中，因此无需使用 `require('buffer').Buffer`。

### 创建 Buffer

在 6.0.0 之前的 Node.js 版本中， `Buffer` 实例是使用 `Buffer` 构造函数创建的。

为了使 `Buffer` 实例的创建更可靠且更不容易出错，各种形式的 `new Buffer()` 构造函数都已被弃用，且改为单独的 `Buffer.from()`，`Buffer.alloc()` 和 `Buffer.allocUnsafe()` 方法。

+ `Buffer.from(array)`： 返回一个新的 `Buffer`，其中包含提供的八位字节数组的副本。

+ `Buffer.from(arrayBuffer[, byteOffset [, length]])`： 返回一个新的 `Buffer`，它与给定的 `ArrayBuffer` 共享相同的已分配内存。

+ `Buffer.from(buffer)`： 返回一个新的 `Buffer`，其中包含给定 `Buffer` 的内容的副本。

+ `Buffer.from(string[, encoding])`： 返回一个新的 `Buffer`，其中包含提供的字符串的副本。

+ `Buffer.alloc(size[, fill[, encoding]])`： 返回一个指定大小的新建的的已初始化的 `Buffer`。 此方法比 `Buffer.allocUnsafe(size)`慢，但能确保新创建的 `Buffer` 实例永远不会包含可能敏感的旧数据。

+ `Buffer.allocUnsafe(size)`： 和 `Buffer.allocUnsafeSlow(size)` 分别返回一个指定大小的新建的未初始化的 `Buffer`。 由于 `Buffer` 是未初始化的，因此分配的内存片段可能包含敏感的旧数据。

```js
// 创建一个长度为 10、且用零填充的 Buffer。
const buf1 = Buffer.alloc(10);
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

当字符串数据被存储入 `Buffer` 实例或从 Buffer 实例中被提取时，可以指定一个字符编码。

```js
const buf = Buffer.from('hello world', 'ascii');
console.log(buf.toString('hex')); // 68656c6c6f20776f726c64
console.log(buf.toString('base64')); // aGVsbG8gd29ybGQ=
console.log(Buffer.from('hello world', 'ascii')); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(Buffer.from('hello world', 'utf16le'));// <Buffer 68 00 65 00 6c 00 6c 00 6f 00 20 00 77 00 6f 00 72 00 6c 00 64 00>
```

## stream（流）

`stream` 是 Node.js 中处理流式数据的抽象接口。 `stream` 模块用于构建实现了流接口的对象。

Node.js 提供了多种流对象。 例如，`HTTP 服务器的请求`和 `process.stdout` 都是流的实例。

流可以是可读的、可写的、或者可读可写的。 所有的流都是 `EventEmitter` 的实例。

四种基本的流类型：

+ `Writable`： 可写入数据的流，例如 `fs.createWriteStream()`。

+ `Readable`： 可读取数据的流，例如 `fs.createReadStream()`。

+ `Duplex`： 可读又可写的流，例如 `net.Socket`。

+ `Transform`： 在读写过程中可以修改或转换数据的 Duplex 流，例如 `zlib.createDeflate()`

`可写流`和`可读流`都会在内部的缓冲器中存储数据，可以分别使用的 `writable.writableBuffer` 或 `readable.readableBuffer` 来获取。

因为 `Duplex` 和 `Transform` 都是可读又可写的，所以它们各自维护着两个相互独立的内部缓冲器用于读取和写入， 这使得它们在维护数据流时，读取和写入两边可以各自独立地运作。

### 可读流

`可读流`运作于两种模式之一：

+ flowing 流动模式：数据自动从底层系统读取，并通过 `EventEmitter` 接口的事件尽可能快地被提供给应用程序。

+ paused 暂停模式：必须显式调用 `stream.read()` 读取数据块。

`可读流`方法：

+ `readable.read([size])`： 从内部缓冲拉取并返回数据。 如果没有可读的数据，则返回 null。 默认情况下，返回的数据是 Buffer 对象。
  + `size <number>` 要读取的数据的字节数。
  + `返回: <string> | <Buffer> | <null> | <any>`

+ `readable.pipe(destination[, options])`： 绑定可写流到可读流，将可读流自动切换到流动模式，并将可读流的所有数据推送到绑定的可写流。
  + `destination <stream.Writable>` 数据写入的目标。
  + `options <Object>` 选项。
    + `end <boolean>` 当读取器结束时终止写入器。默认为 true。
  + `返回: <stream.Writable>` 目标可写流，如果是 `Duplex` 流或 `Transform` 流则可以形成管道链。

+ `readable.destroy([error])`： 销毁流，并触发 `error` 事件和 `close` 事件。

+ `readable.pause()`： 使流动模式的流停止触发 `data` 事件，并切换出流动模式。

+ `readable.resume()`： 将被暂停的可读流恢复触发 `data` 事件，并将流切换到流动模式。

`可读流`事件：

+ `close`： 当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。

+ `data`： 当流将数据块传送给消费者后触发。 chunk 数据块。

+ `readable`： 当流中有数据可供读取时触发。

+ `end`： 当流中没有数据可供消费时触发。

+ `error`： 当流因底层内部出错而不能产生数据、或推送无效的数据块时触发。

### 可写流

`可写流`方法：

+ `writable.write(chunk[, encoding][, callback])`： 写入数据到流，并在数据被完全处理之后调用 callback。
  + `chunk <string> | <Buffer> | <Uint8Array> | <any>` 要写入的数据。
  + `encoding <string>` 如果 chunk 是字符串，则指定字符编码。
  + `callback <Function>` 当数据块被输出到目标后的回调函数。
  + `返回: <boolean>` 如果流需要等待 'drain' 事件触发才能继续写入更多数据，则返回 false，否则返回 true。

+ `writable.cork()`： 强制把所有写入的数据都缓冲到内存中。 当调用 `stream.uncork()` 或 `stream.end()` 时，缓冲的数据才会被输出。

+ `writable.destroy([error])`： 销毁流，并触发 `error` 事件且传入 error 参数。

+ `writable.end([chunk][, encoding][, callback])`： 调用 `writable.end()` 表明已没有数据要被写入可写流。

`可写流`事件：

+ `close`： 当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。

+ `drain`： 如果调用 `stream.write(chunk)` 返回 false，则当可以继续写入数据到流时会触发 `drain` 事件。

+ `finish`： 调用 `stream.end()` 且缓冲数据都已传给底层系统之后触发。

+ `pipe`： 当在可读流上调用 `stream.pipe()` 时触发。

+ `unpipe`： 当在可读流上调用 `stream.unpipe()` 时触发。

+ `end`： 当流中没有数据可供消费时触发。

+ `error`： 当写入数据发生错误时触发。

### 双工流与转换流

双工流 `Duplex` 是同时实现了 `Readable` 和 `Writable` 接口的流。

转换流 `Transform` 是一种 `Duplex` 流，但它的输出与输入是相关联的。

+ `stream.pipeline(...streams[, callback])`： 使用管道连接多个流，并传递错误与完成清理工作，当管道连接完成时通知回调函数。
  + `...streams <Stream>` 要用管道连接的两个或多个流。
  + `callback <Function>` 通知回调函数。

+ `stream.finished(stream, callback)`： 当流不再可读、可写、发生错误、或提前关闭时，通过该函数获得通知。

+ `transform.destroy([error])`：销毁流，并触发 'error' 事件。

## fs（文件系统）

所有文件系统操作都具有同步和异步的形式。

异步的形式总是将完成回调作为其最后一个参数。

使用同步的操作发生的异常会立即抛出，可以使用 `try/catch` 处理，也可以允许冒泡。

大多数 `fs` 操作接受的文件路径可以指定为字符串、`Buffer`、或使用 `file:` 协议的 `URL` 对象。

### 常用方法：

+ `fs.stat(path[, options], callback)`： 异步获取文件信息。
  + `path <string> | <Buffer> | <URL>` 文件的路径。
  + `options <Object>`
    + `bigint <boolean>` 返回的 `fs.Stats` 对象中的数值是否应为 bigint 型。默认值: false。
  + `callback <Function>`
    + `err <Error>`
    + `stats <fs.Stats>`

  `fs.stat(path)` 执行后，会将 `stats` 类的实例返回给其回调函数。可以通过 `stats` 类中的提供方法判断文件的相关属性。

  + `stats.isFile()`： 是否为文件。
  + `stats.isDirectory()`： 是否为目录。

+ `fs.open(path, flags[, mode], callback)`： 异步地打开文件。
  + `path <string> | <Buffer> | <URL>` 文件的路径。
  + `flags <string> | <number>` 文件打开的行为标志。
  + `mode <integer>` 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
  + `callback <Function>` 回调函数，带有两个参数。
    + `err <Error>`
    + `fd <integer>`

+ `fs.read(fd, buffer, offset, length, position, callback)`： 从 fd 指定的文件中读取数据。
  + `fd <integer>` 通过 `fs.open()` 方法返回的文件描述符。
  + `buffer <Buffer> | <TypedArray> | <DataView>` 数据写入的缓冲区。
  + `offset <integer>` 缓冲区写入的写入偏移量。
  + `length <integer>` 要从文件中读取的字节数。
  + `position <integer>` 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。
    + `bytesRead <integer>` 表示读取的字节数。
    + `buffer <Buffer>` 缓冲区对象。

+ `fs.writeFile(file, data[, options], callback)`： 异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。
  + `file <string> | <Buffer> | <URL> | <integer>` 文件名或文件描述符。
  + `data <string> | <Buffer> | <TypedArray> | <DataView>` 要写入文件的数据。
  + `options <Object> | <string>`
    + `encoding <string> | <null>` 默认值: 'utf8'。
    + `mode <integer>` 默认值: 0o666。
    + `flag <string>` 参阅支持的文件系统标志。默认值: 'w'。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。

```js
const fs = require('fs')
fs.writeFile('test.txt', '这是通过写入的文件内容', (err) => {
  if (err) console.log(err);
  console.log('写入成功');
  fs.readFile('test.txt', (err, data) => {
    if (err) console.log(err)
    console.log('读取文件数据：' + data.toString());;
  })
})
// 写入成功
// 读取文件数据：这是通过写入的文件内容
```

+ `fs.write(fd, string[, position[, encoding]], callback)`： 将 string 写入到 fd 指定的文件。
  + `fd <integer>` 文件描述符。
  + `string <string>`  如果 string 不是一个字符串，则该值会被强制转换为字符串。
  + `position <integer>` 指定文件开头的偏移量（数据应该被写入的位置）。
  + `encoding <string>` 字符串编码，默认值: 'utf8'。
  + `callback <Function>` 回调函数
    + `err <Error>` 错误信息。
    + `written <integer>` 指定传入的字符串中被要求写入的字节数。
    + `string <string>`

```js
const fs = require('fs')
fs.open('test.txt', 'r+', (err, fd) => {
  if (err) console.log(err);
  fs.write(fd, 'hello world!', (err, written, string) => {
    console.log(written);
    console.log(string);
  })
})
// 12
// hello world!
```

+ `fs.close(fd, callback)`： 关闭文件。

+ `fs.ftruncate(fd[, len], callback)`： 截取文件。
  + `fd <integer>` 文件描述符。
  + `len` 文件内容截取的长度，默认值是 0。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。

+ `fs.unlink(path, callback)`： 删除文件。
  + `path <string> | <Buffer> | <URL>` 文件路径。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。

+ `fs.mkdir(path[, options], callback)`： 创建目录。
  + `path <string> | <Buffer> | <URL>` 文件路径。
  + `options <Object> | <string>`
    + `recursive <boolean>` 默认值: false。
    + `mode <integer>`  设置目录权限，Windows 上不支持。默认值: 0o777。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。

+ `fs.readdir(path[, options], callback)`： 读取目录的内容。 
  + `path <string> | <Buffer> | <URL>` 文件路径。
  + `options <Object> | <string>`
    + `encoding <string>` 字符串编码，默认值: 'utf8'。
    + `withFileTypes <boolean>` 默认值: false。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。
    + `files <string[]> | <Buffer[]> | <fs.Dirent[]>`

+ `fs.rmdir(path, callback)`： 删除目录。
  + `path <string> | <Buffer> | <URL>` 文件路径。
  + `callback <Function>` 回调函数。
    + `err <Error>` 错误信息。

## url

`url` 模块用于处理与解析 URL。

URL 字符串是结构化的字符串，包含多个含义不同的组成部分。 解析字符串后返回的 URL 对象，每个属性对应字符串的各个组成部分。

`url` 模块提供了两套 API 来处理 URL：一个是实现了 WHATWG 标准的新 API，一个是旧版本遗留的 API。

### URL 类 (v6.13.0)

浏览器兼容的 URL 类，根据 WHATWG URL 标准实现。

+ `new URL(input[, base])`：过将 input 解析到 base 上创建一个新的 URL 对象。
  + `input <string>` 要解析的输入 URL。
  + `base <string> | <URL>` 如果 input 是相对 URL，则为要解析的基本 URL。

+ `url.href`： 获取及设置序列化的 URL。

+ `url.username`： 获取及设置 URL 的用户名(username)部分。

+ `url.password`： 获取及设置 URL 的密码(password)部分。

+ `url.origin`： 获取只读序列化的 URL origin 部分。

+ `url.protocol`： 获取及设置 URL 的协议(protocol)部分。

+ `url.host`： 获取及设置 URL 的主机(host)部分。包含端口。

+ `url.hostname`： 获取及设置 URL 的主机名(hostname)部分。 不包含端口。

+ `url.port`： 获取及设置 URL 的端口(port)部分。

+ `url.pathname`： 获取及设置 URL 的路径(path)部分。

+ `url.search`： 获取及设置 URL 的序列化查询(query)部分部分。

+ `url.searchParams`： 获取表示 URL 查询参数的 URLSearchParams 对象。

+ `url.hash`： 获取及设置 URL 的分段(hash)部分。

+ `url.toString()`： 返回序列化的 URL。返回值与 `url.href` 和 `url.toJSON()` 的相同。

+ `url.toJSON()`： 返回序列化的 URL。返回值与 `url.href` 和 `url.toJSON()` 的相同。

```js
const { URL } = require('url')
const str = 'http://user:pass@sub.example.com:8080/p/a/t/h?aa=11&bb=22#hash'
const myURL = new URL(str)
console.log(myURL.href); // http://user:pass@sub.example.com:8080/p/a/t/h?aa=11&bb=22#hash
console.log(myURL.username); // user
console.log(myURL.password); // pass
console.log(myURL.origin); // http://sub.example.com:8080
console.log(myURL.protocol); // http:
console.log(myURL.host); // sub.example.com:8080
console.log(myURL.hostname); // sub.example.com
console.log(myURL.port); // 8080
console.log(myURL.pathname); // /p/a/t/h
console.log(myURL.search); // ?aa=11&bb=22
console.log(myURL.searchParams); // URLSearchParams { 'aa' => '11', 'bb' => '22' }
console.log(myURL.hash); // #hash
```

### URLSearchParams 类

`URLSearchParams` API接口提供对 `URL` query 部分的读写权限。

`URLSearchParams` 接口和 `querystring` 模块有相似的目的，但是 `querystring` 模块的目的更加通用，因为它可以定制分隔符（＆和=）。

+ `new URLSearchParams()`：实例化一个新的URLSearchParams 对象。

如果参数为字符串且以 `?` 打头，则 `?`将会被忽略。

```js
const { URLSearchParams } = require('url')
const param1 = new URLSearchParams('user=abc&query=xyz')
console.log(param1.toString()); // user=abc&query=xyz
console.log(param1.get('user')); // abc

const param2 = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second']
});
console.log(param2.toString()); // user=abc&query=first%2Csecond
console.log(param2.getAll('query')); // [ 'first,second' ]

const param3 = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second']
]);
console.log(param3.toString()); // user=abc&query=first&query=second
console.log(param3.has('user')); // true
```

+ `urlSearchParams.has(name)`： 如果存在至少一对键是name的键值对则返回 true。

+ `urlSearchParams.get(name)`： 返回键是 name 的第一个键值对的值。如果没有，则返回null。

+ `urlSearchParams.getAll(name)`：返回键是 name 的所有键值对的值，如果没有，则返回一个空的数组。

+ `urlSearchParams.append(name, value)`： 在查询字符串中附加一个新的键值对。

+ `urlSearchParams.delete(name)`： 删除所有键为name的键值对。

+ `urlSearchParams.keys()`：在每一个键值对上返回一个键的 ES6 迭代器。

+ `urlSearchParams.values(name)`： 在每一个键值对上返回一个值的 ES6 迭代器。

+ `urlSearchParams.entries()`： 返回一个 `[name, value]` 迭代器。

+ `urlSearchParams.forEach(fn[, thisArg])`： 在查询字符串中迭代每个键值对，并调用给定的函数。

+ `urlSearchParams.toString()`： 返回查询参数序列化后的字符串，必要时存在百分号编码字符。

+ `urlSearchParams.set(name, value)`： 将 URLSearchParams 对象中与 name 相对应的值设置为 value。如果已经存在键为 name 的键值对，将第一对的值设为 value 并且删除其他对。如果不存在，则将此键值对附加在查询字符串后。

```js
const { URL } = require('url');
const myURL = new URL('https://example.org/?a=b&c=d');
myURL.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL.searchParams === searchParams);
});
// a b true
// c d true
```

### 遗留的 URL 接口

遗留的 `urlObject` (require('url').Url)由 `url.parse()` 函数创建并返回。

+ `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`： 解析 URL 字符串并返回 URL 对象。
  + `urlString <string>` 要解析的 URL 字符串。
  + `parseQueryString <boolean>` 如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。 如果设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false。
  + `slashesDenoteHost <boolean>`  默认为 false。

+ `url.format(urlObject)`： 返回一个从 urlObject 格式化后的 URL 字符串。

+ `url.resolve(from, to)`： 把一个目标 URL 解析成相对于一个基础 URL。

+ `urlObject.href`： href 属性是解析后的完整的 URL 字符串， protocol 和 host 都会被转换为小写的。

+ `urlObject.auth`： auth 属性是 URL 的用户名与密码部分。

+ `urlObject.protocol`： protocol 属性表明 URL 的小写的协议体制。

+ `urlObject.host`： host 属性是 URL 的完整的小写的主机部分，包括 port（如果有）。

+ `urlObject.hostname`： hostname 属性是 host 组成部分排除 port 之后的小写的主机名部分。

+ `urlObject.port`： port 属性是 host 组成部分中的数值型的端口部分。

+ `urlObject.path`： path 属性是一个 pathname 与 search 组成部分的串接。

+ `urlObject.pathname`： pathname 属性包含 URL 的整个路径部分。

+ `urlObject.query`： query 属性是不含开头问号 `?` 的查询字符串。

+ `urlObject.search`：search 属性包含 URL 的整个查询字符串部分，包括开头的问号字符 `?`。

+ `urlObject.hash`：hash 属性包含 URL 的碎片部分，包括开头的哈希字符 `#`。

```js
const url = require('url')
const str = 'http://user:pass@sub.example.com:8080/p/a/t/h?aa=11&bb=22#hash'
const urlObj = url.parse(str)
console.log(urlObj.href); // http://user:pass@sub.example.com:8080/p/a/t/h?aa=11&bb=22#hash
console.log(urlObj.auth); // user:pass
console.log(urlObj.protocol); // http:
console.log(urlObj.host); // sub.example.com:8080
console.log(urlObj.hostname); // sub.example.com
console.log(urlObj.port); // 8080
console.log(urlObj.path); // /p/a/t/h?aa=11&bb=22
console.log(urlObj.pathname); // /p/a/t/h
console.log(urlObj.search); // ?aa=11&bb=22
console.log(urlObj.query); // aa=11&bb=22
console.log(urlObj.hash); // #hash
```

## 工具模块

### os

`os` 模块提供了操作系统相关的实用方法。

+ `os.EOL`: 一个字符串常量，定义操作系统相关的行末标志，`\n` 在 POSIX 系统上 `\r\n` 在 Windows 系统上

+ `os.arch()`： 操作系统CPU架构，能的值有: 'arm'，'arm64'，'ia32'，'mips'，'mipsel'，'ppc'，'ppc64'，'s390'，'s390x'，'x32'，'x64'。

+ `os.type()`： 操作系统的名字，能的值有: 'Linux' ，'Darwin'，'Windows_NT'。

+ `os.platform()`： 操作系统平台，能的值有: 'aix'，'darwin'，'freebsd'，'linux'，'openbsd'，'sunos'，'win32'。

+ `os.release()`： 操作系统的发行版本。

+ `os.hostname()`:  操作系统的主机名。

+ `os.totalmem()`： 系统内存总量，单位为字节。

+ `os.freemem()`：操作系统空闲内存量，单位是字节。

+ `os.cpus()`:  返回一个对象数组, 包含每个逻辑 CPU 内核的信息。

+ `os.tmpdir()`： 返回操作系统的默认临时文件夹。

+ `os.networkInterfaces()`：获得网络接口列表。

### path

`path` 模块提供用于处理文件路径和目录路径的实用工具。

+ `path.parse(path)`： 返回路径字符串的对象。

+ `path.format(pathObject)`： 从对象中返回路径字符串，和 `path.parse` 相反。

+ `path.normalize(path)`： 规范化路径。

+ `path.dirname(path)`： 返回路径中代表文件夹的部分。

+ `path.basename(path[, ext])`： 返回路径中的最后一部分。

+ `path.extname(path)`： 返回路径中文件的后缀名。

+ `path.join([...paths])`： 使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

+ `path.isAbsolute(path)`： 判断参数 path 是否是绝对路径。

+ `path.resolve([...paths])`： 将路径或路径片段的序列解析为绝对路径。

+ `path.relative(from, to)`： 将相对路径转为绝对路径。

## http