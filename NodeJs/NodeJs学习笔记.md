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

## 文件系统