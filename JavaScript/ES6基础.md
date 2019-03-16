# ES6基础

+ [let和const](#let和const)
+ [解构赋值](#解构赋值)
+ [字符串的扩展](#字符串的扩展)
+ [数值的扩展](#数值的扩展)
+ [函数的扩展](#函数的扩展)
+ [数组的扩展](#数组的扩展)
+ [对象的扩展](#对象的扩展)
+ [Symbol](#symbol)
+ [Set](#set)
+ [Map](#map)
+ [类和类的继承](#类和类的继承)
+ [模块](#模块)

## let和const

let 命令：

+ let 命令用来声明变量，所声明的变量只在命令所在的代码块内有效。for 循环的计数器，很合适使用 let 命令。
+ let 命令所声明的变量不存在“变量提升”，一定要先声明后使用，否则报错。
+ let 命令不允许在相同作用域内，重复声明同一个变量。因此，不能在函数内部重新声明参数。

const 命令：

+ const 命令用来声明一个只读的常量，一旦声明，常量的值就不能改变。（和 let 命令的不同点）
+ const 命令一旦声明变量，就必须立即初始化，不能留到以后赋值。var 和 let 可以先声明不赋值。（和 let 命令的不同点）
+ const 命令的作用域和 let 命令相同，只在声明所在的块级作用域内有效。
+ const 命令声明的常量不存在提升，同样存在暂时性死区，只能先声明后使用。
+ const 命令声明的常量，也与 let 一样不可重复声明。

const 命令实际上是保证变量指向的内存地址不可变，而不是变量值不可变。

对于简单数据类型，值就保存在变量指向的那个内存地址；

对于复合数据类型，变量指向的内存地址是一个指针，const 只能保证这个指针是固定的，不能保证指针指向的数据结构不变。

暂时性死区（TDZ）：

+ ES6 规定，如果区块中存在 let 和 const 命令声明的变量，凡是在声明之前就使用这些变量，就会报错。在语法上，称为“暂时性死区”（TDZ）。

块级作用域：

+ ES5 只有全局作用域和函数作用域，没有块级作用域。缺点：内层变量可能会覆盖外层变量；用来计数的循环变量泄露为全局变量。
+ ES6 中新增块级作用域，允许块级作用域的任意嵌套，外层作用域无法读取内层作用域的变量，内层作用域可以定义外层作用域的同名变量。
+ ES6 明确允许在块级作用域之中声明函数，函数声明会当作 let 处理。

为减轻兼容问题，浏览器的 ES6 环境中的函数声明类似于 var 声明的变量。

应避免在块级作用域中声明函数，如果需要，应该用函数表达式，而不是函数声明语句。

ES6声明变量的方法：

+ ES5 有两种声明变量的方法：var 命令、function 命令。
+ ES6 有六种声明变量的方法：var 命令、function 命令、let 命令、const 命令、import 命令、class 命令。

顶层对象的属性：

在浏览器环境顶层对象指的是 window 对象，在 Node 环境指的是 global 对象。ES5 中，顶层对象的属性与全局变量是等价的（不好）。

+ ES6 规定 let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性，全局变量将和顶层对象的属性脱钩。
+ 为保持兼容性，var 命令和 function  命令声明的全局变量，依旧是顶层对象的属性。

## 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。

解构赋值本质是一种匹配模式，只要等号两边的模式相同，那么左边的变量就可以被赋予对应的值。

### 数组的解构赋值

数组的元素是按次序排列的，数组的解构赋值是按变量的位置赋值。

```js
let [a, [[b], c]] = [1, [[2], 3]]
// 等价于
let a = 1
let b = 2
let c = 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果解构不成功，变量的值就等于 undefined。如果只匹配一部分的等号右边的数组，这种情况下，解构依然可以成功。

```js
// 只匹配一部分，也可以解构成功
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

对于 Set 结构，也可以使用数组的解构赋值。事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

解构赋值可以指定默认值。注意 ES6 内部使用严格相等运算符（===），判断一个位置是否有值，只有当一个数组成员严格等于 undefined，默认值才会生效。

```js
// 判断位置是否有值
let [x, y = 2] = [1]
x // 1
y // 2
let [x = 1] = [undefined]
x // 1

// 默认值不会生效
let [x = 1] = [null]
x  // null
```

### 对象的解构赋值

对象解构赋值是按属性名赋值，必须与属性名相同才能取到正确的值。

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量，真正被赋值的是变量而不是属性名。

```js
// 先找到同名属性，然后再赋值给对应的变量
let {a, b, c} = {b: 'bbb', a: 'aaa'}
a // 'aaa'
b // 'bbb
c // undefined

// 对象的解构赋值实际上是对象的简写
let { first: first, last: last } = { first: 'hello', last: 'world' };
first // 'hello'
last // 'world'

// 属性名 和 变量名不一致时
let { first: f, last: l } = { first: 'hello', last: 'world' };
f // 'hello'
l // 'world'
```

解构也可以用于嵌套结构的对象。

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj
x  // "Hello"
y  // "World"
p  // ["Hello", {y: "World"}]
```

对象的解构也可以指定默认值，默认值生效的条件是，对象的属性值严格等于 undefined。

```js
let {x, y = 2} = {x : 1}
x // 1
y // 2
let {x: y = 3} = {x: 5};
y // 5
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
// 将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便
let { log, sin, cos } = Math

```

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello'
a, b, c, d, e  // 'h', 'e', 'l', 'l', 'o'
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len  // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对应的包装对象，再匹配包装对象的属性，进行赋值。

由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let {toString: ts} = 123
let {toString: bs} = true
ts === Number.prototype.toString // true
bs === Boolean.prototype.toString // true
```

### 函数参数解构赋值

函数的参数也可以使用解构赋值，函数参数的解构也可以使用默认值。

```js
function add([x, y]){
  return x + y
}
add([1, 2])  // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b)
// [ 3, 7 ]

// 可以使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y]
}
// move 的参数是一个对象，通过对这个对象进行解构，得到变量 x 和 y 的值
move({x: 3, y: 8}) // [3, 8]
// 如果解构失败，x 和 y 等于默认值。
move() // [0, 0]
```

### 解构赋值的用途

交换变量的值

```js
let x = 1
let y = 2
// 交换变量的值
[x, y] = [y, x]
```

如果函数返回值是一个数组或对象，使用解构赋值来取值就很方便。

```js
// 返回值是一个数组
function foo() {
  return [1, 2, 3]
}
let [a, b, c] = foo()

// 返回值是一个对象
function foo() {
  return {
    a: 1,
    b: 2
  }
}
let { a, b } = foo()
```

解构赋值可以方便地将一组参数与变量名对应起来，方便函数内部使用。

```js
// 参数是数组
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是对象
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})
```

提取 JSON 数据，常用于网络请求的返回值的提取。

```js
let json = {
  id: 42,
  status: "OK",
  data: [867, 5309]
}
let { id, status, data: number } = json
console.log(id, status, number) // 42, "OK", [867, 5309]
```

指定参数的默认值，就避免了在函数体内部再写 ``var foo = config.foo || 'default.foo';``这样的语句。

```js
// 指定函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

遍历 Map 结构，配合变量的解构赋值，获取键名和键值就非常方便。

```js
// map的每个成员都是一个双元素的数组
const map = new Map();
map.set('first', 'hello')
map.set('second', 'world')
map // {"first" => "hello", "second" => "world"}
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [, value] of map) {
  // ...
}
// 获取键名和键值
for (let [key, value] of map) {
  // ...
}
```

加载模块时，可以指定需要加载的方法，解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map")
```

## 字符串的扩展

### 模板字符串

模板字符串是增强版的字符串，用反引号（ ` ）标识。

+ 使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
+ 如果在模板字符串中需要使用反引号，则前面要用反斜杠（ \ ）转义。
+ `${}` 大括号内部可以放入任意的 JS 表达式或变量，可以进行运算，以及引用对象属性，还可以调用函数。还可以嵌套。

```js
let obj = {x: 1, y: 2};
`${obj.x + obj.y}` // "3"

function fn() {
  return "Hello World";
}
`foo ${fn()} bar` // foo Hello World bar
```

### 加强对 Unicode 的支持

JavaScript 允许采用 \uxxxx 形式表示一个字符，其中 xxxx 表示字符的 Unicode 码点。

但是，这种表示法只限于码点在 \u0000~\uFFFF 之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

ES6 做出了改进，只要将码点放入大括号，就能正确解读该字符。大括号表示法与四字节的 UTF-16 编码是等价的。

+ codePointAt()：方法能够正确处理 4 个字节储存的字符，返回一个字符的码点。这是一个实例方法。
+ String.fromCodePoint()：方法可以识别大于 0xFFFF 的字符，弥补了 String.fromCharCode 方法的不足。

### 字符串的实例方法

JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法：

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

这三个方法都支持第二个参数，表示开始搜索的位置。使用第二个参数 n 时，endsWith 针对前 n 个字符，而其他两个方法针对从第 n 个位置直到字符串结束。

```js
let s = 'Hello world!'
s.includes('Hello', 6) // false
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
```

+ repeat()：返回一个新字符串，表示将原字符串重复 n 次，参数如果是小数，会被取整。
+ padStart()：用于头部补全，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
+ padEnd()： 用于尾部补全。
  + 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
  + 如果省略第二个参数，默认使用空格补全长度。

```js
// 字符串重复
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"

// 字符串补全
'xxx'.padStart(2, 'ab') // 'xxx' // 返回源字符串
'x'.padEnd(4) // 'x   ' // 默认使用空格补全长度
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
// 补全指定位数
'123456'.padStart(10, '0') // "0000123456"
// 提示字符串格式
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

+ matchAll()；方法返回一个正则表达式在当前字符串的所有匹配。

## 数值的扩展

ES6 提供了二进制和八进制数值的新的写法：

+ 二进制：用前缀 0b 或 0B 表示
+ 八进制：用前缀 0o 或 0O 表示
+ 十六进制：用前缀 0x 或 0X 表示

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀 0 表示，ES6 进一步明确，要使用前缀 0o 表示。

可以使用 Number() 函数转换成十进制。

```js
Number('0b111')  // 7
Number('0o10')  // 8
```

### Number 对象的扩展

ES6 将全局方法 parseInt() 和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。

```js
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

+ Number.isNaN()：用来检查一个值是否为 NaN。如果参数类型不是 NaN，一律返回 false。
+ Number.isFinite()：用来检查一个数值是否有限。如果参数类型不是数值，一律返回 false。
+ Number.isInteger()：用来判断一个数值是否为整数。
+ Number.EPSILON：一个极小的常量,实质是一个可以接受的最小误差范围。
+ Number.isSafeInterger()：安全整数判断，判断一个值是否在Number.MAX_SAFE_INTEGER 与Number.MIN_SAFE_INTEGER之间。

```js
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isNaN('15') // false
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isInteger(25) // true
Number.isInteger(25.1) // false
```

### 指数运算符

ES2016 新增了一个指数运算符（**）。数运算符可以与等号结合，形成一个新的赋值运算符（**=）。

```js
2 ** 2 // 4
2 ** 3 // 8

// 多个指数运算符连用时，是从最右边开始计算
2 ** 3 ** 2// 相当于 2 ** (3 ** 2)
// 512

let b = 4;
b **= 3; // 等同于 b = b * b * b;
```

## 函数的扩展

### 函数参数的默认值

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面，不能有同名参数。

参数变量是默认声明的，所以不能用 let 或 const 再次声明。

```js
function foo(x = 5) {
    let x = 1; // 报错
}
```

如果函数调用时显式的传入 undefined，将触发该参数等于默认值，传入 null 则没有这个效果。

指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。

参数默认值可以与解构赋值的默认值，结合起来使用。

```js
// 只是用了对象的解构赋值默认值，没有使用函数参数默认值
function foo({x, y = 5}) {
  console.log(x, y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // 报错

// 使用函数的默认参数
function foo({x, y = 5} = {}) {
  console.log(x, y);
}
foo() // undefined 5

// 双重默认值
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com') // "GET"
```

### rest参数

ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。

rest 参数搭配的变量是一个数组，数组特有的方法都可以使用，该变量将多余的参数放入数组中。

```js
// rest 参数 使用数组的方法 完成排序
const sortNumbers = (...numbers) => numbers.sort();

// 利用 rest 参数改写改写 push 方法
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item)
  })
}
var a = []
push(a, 1, 2, 3)
```

rest 参数之后不能再有其他参数，否则会报错。函数的 length 属性，不包括 rest 参数。

### 箭头函数

ES6 允许使用“箭头”（=>）定义函数，可以简化回调函数。

+ 如果不需要参数或需要多个参数，要使用一个圆括号代表参数部分。
+ 如果箭头函数的代码块部分多于一条语句，要使用大括号将它们括起来，并且使用 return 语句返回。
+ 所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

```js
// 表达更加简洁
let isEven = n => n % 2 == 0
let square = n => n * n

// 简化回调函数
[1, 2, 3].map(x => x * x)

// 结合 rest 参数
let numbers = (...nums) => nums
numbers(1, 2, 3, 4, 5) // [1, 2, 3, 4, 5]
```

箭头函数有几个使用注意点：

+ 没有自己的 this，其内部 this 指向定义时的环境对象，而不是调用的对象。
+ 不能使用 call、apply 和 bind 去改变内部的 this。
+ 不能使用 arguments 对象，该对象在函数体内不存在。可以用 rest 参数代替。
+ 不能当作构造函数，也就是说，不可以使用 new 命令。
+ 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

## 数组的扩展

### 扩展运算符

扩展运算符是三个点（`...`），将一个数组转为用逗号分隔的参数序列，主要用于函数调用，它好比 rest 参数的逆运算。

扩展运算符可以展开数组，所以不再需要 apply 方法将数组转为函数的参数了。

```js
// 将数组转换成逗号分隔的参数序列
console.log(1, ...[2, 3, 4], 5) // 1 2 3 4 5

function add(x, y) {
  return x + y;
}
// 将数组转换为函数参数
add(...[4, 38]) // 42

// 扩展运算符后面还可以放置表达式
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

扩展运算符的应用：

```js
// 复制数组
let arr1 = [1, 2]
let arr2 = [...arr1]

// 合并数组 注意是浅拷贝
let arr1 = [1, 2, 3]
let arr2 = [3, 4, 5]
[...arr1, ...arr2]

// 求数组最大值最小值
Math.max(...[1, 2, 3])

// 可以直接将数组传入 push 方法
let arr1 = [0, 1, 2]
let arr2 = [3, 4, 5]
arr1.push(...arr2)

new Date(...[2017, 1, 1])

// 与解构赋值结合，生成数组 扩展运算符只能放在最后一位
let [first, ...rest] = [1, 2, 3, 4, 5]
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// 将字符串转变成真正的数组
[...'hello']  // [ "h", "e", "l", "l", "o" ]
```

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符。

```js
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
])
let arr = [...map.keys()]; // [1, 2, 3]
let go = function*(){
    yield 1;
    yield 2;
    yield 3;
};
[...go()] // [1, 2, 3]
```

### 数组的静态方法

+ Array.from()：用于将类数组对象和可遍历对象（iterable）转为真正的数组，并且还提供 map 功能。
  + 常见的类数组对象是 DOM 操作返回的 NodeList 集合，及函数内部的 arguments 对象，Array.from 都能将其转为数组。
  + 部署了 Iterator 接口的数据结构（可遍历），Array.from 都能将其转为数组。
  + 可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
  + 如果 map 函数里面用到了 this 关键字，还可以传入 Array.from 的第三个参数，用来绑定 this。

```js
// 类数组对象
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
let arr = Array.from(arrayLike); //['a', 'b', 'c']

// NodeList对象
let ps = document.querySelectorAll('p')
Array.from(ps).filter(p => {
  return p.textContent.length > 100
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 部署了 Iterator 接口的数据结构
Array.from('hello')// ['h', 'e', 'l', 'l', 'o']
Array.from(new Set(['a', 'b']))  // ['a', 'b']

// 接受第二个参数
Array.from([1, 2, 3], (x) => x * x) // [1, 4, 9]
// 取出 span 标签内的文本内容
let spans = document.querySelectorAll('span.name')
let names = Array.from(spans, s => s.textContent)
// 将数组中布尔值为 false 的成员变成 0
Array.from([1, , 2, , 3], (n) => n || 0) // [1, 0, 2, 0, 3]

```

+ Array.of()；用于将一组值转换为数组，这个方法是弥补数组构造函数 Array() 的不足。

```js
// 参数个数的不同，会导致 Array()的行为有差异
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
// Array.of() 行为很统一
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

### 数组的实例方法

+ copyWithin()：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。接受三个参数：
  + target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  + start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
  + end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
// 将 3 号位复制到 0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]
```

+ find()：返回第一个符合条件的成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。
+ findIndex()：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 -1。
  + 两个方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
  + 两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
  + 这两个方法都可以发现 NaN，弥补了数组的 indexOf 方法的不足。

```js
// 返回第一个符合条件的成员
[1, 5, 10, 15].find((value, index, arr) => value > 9) // 10
// 返回第一个符合条件的成员的位置
[1, 5, 10, 15].findIndex((value, index, arr) => value > 9) // 2
// 弥补了 indexOf 的不足
[NaN].indexOf(NaN)// -1
[NaN].findIndex(y => Object.is(NaN, y)) // 0
```

+ fill()：使用给定值，填充一个数组，用于空数组的初始化非常方便。
  + 还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
// 用于数组的初始化非常方便。数组中已有的元素，会被全部抹去。
['a', 'b', 'c'].fill(7) // [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']
new Array(3).fill(7) // [7, 7, 7]
```

ES6 提供三个新的方法：`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（Iterator），可以用`for...of`循环进行遍历。

+ `keys()`：对键名的遍历, 返回一个遍历器对象
+ `values()`：对键值的遍历，返回一个遍历器对象
+ `entries()`：对键值对的遍历，返回一个遍历器对象

```js
// 遍历键名，返回遍历器
for (let index of ['a', 'b', 'c'].keys()) {
  console.log(index)
}
// 1
// 2
// 3

// 遍历键值，返回遍历器
for (let item of ['a', 'b', 'c'].values()) {
    console.log(item)
}
// 'a'
// 'b'
// 'c'

// 遍历键值对, 返回遍历器
for (let [index, item] of ['a', 'b', 'c'].entries()) {
    console.log(index, item)
}
// 0 'a'
// 1 'b'
// 2 'c'
```

+ `includes()`：返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。Map 和 Set 数据结构有一个 has方法，需要注意与includes区分。
  + 第二个参数表示搜索的起始位置，如果为负数，则表示倒数的位置。
  + Map 结构的 has方法，是用来查找键名的。
  + Set 结构的 has方法，是用来查找键值的。
+ `flat ()`：将数组变成一维数组，法返回一个新数组。
  + 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可传入一个整数参数，默认为 1。
  + 如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数。
+ `flatMap()`：对原数组的每个成员执行一个函数（相当于 map），然后对返回值组成的数组执行 flat() 方法。

```js
// 判断数组是否包含给定的值
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(3, -1); // true

// 数组扁平化
[1, 2, [3, 4]].flat() // [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
[1, [2, [3]]].flat(Infinity) // [1, 2, 3]

// 数组先 map 再扁平化一层
[1, 2, 3, 4].flatMap(x => [[x * 2]]) // [[2], [4], [6], [8]]
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
```

## 对象的扩展

### 属性的简洁表示法

ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。方法也可以简写。

注意，简洁写法的属性名总是字符串。

ES6 允许字面量定义对象时，将表达式作为对象的属性名，即把表达式放在方括号内。还可以用于定义方法名。

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

```js
// 属性简洁表示法
let name = 'leo'
let Person = {
    name,
    hello() {
        console.log(`hello, ${this.name}`)
    }
}

// 属性名表达式
let obj = {
  ['a' + 'bc']: 123,
  ['h' + 'ello']() {
    return 'hi';
  }
}
```

### 对象的静态方法

+ `Object.is()`：用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
  + 相等运算符（==）缺点是会自动转换数据类型。
  + 严格相等运算符（===）缺点是的 NaN 不等于自身，以及 +0 等于 -0。

```js
// 判断两个值是否严格相等
Object.is('foo', 'foo') // true
Object.is({}, {}) // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

+ `Object.assign()`：用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。
  + 第一个参数是目标对象，后面的参数都是源对象。undefined 和 null无法转成对象，它们作为第一个参数，就会报错。
  + 如果只有一个参数，会直接返回该参数。如果该参数不是对象，则会先转成对象，然后返回。
  + 实行的是浅拷贝，而不是深拷贝，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
  + 只拷贝源对象的自身属性，不拷贝继承属性，也不拷贝不可枚举的属性。
  + 一旦遇到同名属性，会替换同名属性。
  + 可以用来处理数组，但是会把数组视为对象。

```js
// 如果只有一个参数会直接返回参数。
let obj = {a: 1}
Object.assign(obj) === obj // true
Object.assign(undefined) // 报错
Object.assign(null) // 报错

// 为对象添加属性
class Point {
  constructor(x, y) {
    // 将 x 属性和 y 属性添加到 Point 类的对象实例
    Object.assign(this, {x, y})
  }
}
// 为对象添加方法
Object.assign(Point.prototype, {
  someMethod(arg1, arg2) {
    // ···
  },
  anotherMethod() {
    // ···
  }
})

// 克隆对象，只能克隆原始对象自身的值，不能克隆它继承的值
function clone(origin) {
  return Object.assign({}, origin)
}
//克隆对象，克隆继承的属性
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin)
  return Object.assign(Object.create(originProto), origin)
}

// 多个对象合并成一个对象
let merge = (target, ...sources) => Object.assign(target, ...sources)
// 多个对象合并成一个新对象
let merge = (...sources) => Object.assign({}, ...sources)

// 指定默认值
let default = {
  level: 0,
  format: 'html'
}
function process(options) {
  // 注意是浅拷贝
  options = Object.assign({}, default, options)
  console.log(options)
  // ...
}
```

+ Object.getOwnPropertyDescriptors():返回指定对象所有自身属性（非继承属性）的描述对象。
+ Object.getOwnPropertyDescriptor(): 返回某个对象属性的描述对象（descriptor）。
+ Object.setPrototypeOf(): 作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。
+ Object.getPrototypeOf(): 与 Object.setPrototypeOf 方法配套，用于读取一个对象的原型对象。
+ Object.getOwnPropertyNames()：返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
+ Object.getOwnPropertySymbols()；返回一个数组，包含对象自身的所有 Symbol 属性的键名。

属性的可枚举性可枚举性：

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。

Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

描述对象的 enumerable 属性，称为“可枚举性”，如果该属性为 false，表示不可枚举。以下操作会忽略不可枚举属性:

+ `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
+ `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
+ `JSON.stringify()`：只序列化对象自身的可枚举的属性。
+ `Object.assign()`： 只拷贝对象自身的可枚举的属性。

ES6 规定，所有 `class` 的原型的方法都是不可枚举的。

`for...in` 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。所以，尽量不要用 for...in 遍历，而用 Object.keys()代替。

### 对象的遍历

+ Object.keys()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
+ Object.values()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
+ Object.entries()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```js
// 通过解构赋值 分别取出 Object 的这三个方法
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 }

// 返回包含可遍历属性的属性名的数组
keys(obj) // ["a", "b", "c"]

// 返回包含可遍历属性的属性值的数组
values(obj) // [1, 2, 3]

entries(obj) // [['a', 1], ['b', 2], ['c', 3]]
for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

```

## Symbol

### 概述

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。

Symbol 值通过 Symbol() 函数生成。Symbol函数前不能使用new命令，否则会报错。

对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。

相同参数的 Symbol 函数的返回值是不相等的。相同参数的 Symbol 函数的返回值是不相等的。

Symbol 值不能与其他类型的值进行运算，会报错。

Symbol 值作为对象属性名时，不能用点运算符。

在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

```js
let s1 = Symbol('a')
let s2 = Symbol('a')
s1 === s2 // false

let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
a[mySymbol] // "Hello!"
```

Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。

## Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

Set.prototype.size：返回 Set 实例的成员总数。

```js
// 没有重复成员
let set = new Set([1, 2, 3, 4, 4])
set.size // 4
[...set]
// [1, 2, 3, 4]

// 数组去重
[...new Set(array)]

let items = new Set([1, 2, 3, 4, 5]);
let array = Array.from(items);

```

### Set的实例方法

+ add(value)：添加某个值，返回 Set 结构本身。
+ delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
+ has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
+ clear()：清除所有成员，没有返回值。

遍历方法：

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回键值对的遍历器。
+ forEach()：使用回调函数遍历每个成员。

Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。

```js
let set = new Set(['red', 'green', 'blue'])
// 遍历键名
for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
// 遍历键值， 和键名一样
for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue
// 遍历键值对， 键名和键值一样
for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

for (let x of set) {
  console.log(x)
}
// red
// green
// blue
```

## Map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。

但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应。

size属性返回 Map 结构的成员总数。

+ set(key, value)： 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
+ get(ley)：方法读取 key 对应的键值，如果找不到 key，返回 undefined。
+ has()：方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
+ delete()：方法删除某个键，返回true。如果删除失败，返回false。
+ clear()：方法清除所有成员，没有返回值。

```js
let map = new Map();
let obj = {p: 'Hello World'}
// 将 obj 作为 map 的一个键
map.set(obj, 'content')
// 获取键名为 obj 的值
map.get(obj) // "content"
// 判断是否有 obj 这个键
map.has(obj) // true
// 删除obj这个键
map.delete(obj) // true
map.has(obj) // false
```

Map 可以接受一个数组作为参数，该数组的成员是一个双元素数组。

不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。

```js
let items = [
  ['name', '张三'],
  ['title', 'Author']
]
let map = new Map();
items.forEach(([key, value]) => map.set(key, value))
map // {"name" => "张三", "title" => "Author"}

// 使用 Set 生成 Map
let set = new Set([
  ['foo', 1],
  ['bar', 2]
])
let m1 = new Map(set); // {"foo" => 1, "bar" => 2}
m1.get('foo') // 1

// 使用双元素数组 生成 Map
let m2 = new Map([['baz', 3]]) // {"baz" => 3}

// 使用 Map 生成 Map
let m3 = new Map(m2); // {"baz" => 3}
m3.get('baz') // 3
```

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题。

```js
let map = new Map();
// set和get方法 表面是针对同一个键，但实际上这是两个值，内存地址是不一样的
map.set(['a'], 555);
map.get(['a']) // undefined

let k1 = ['a']
let k2 = ['a']

map.set(k1, 111).set(k2, 222) {['a'] => 111, ['a'] => 222}
map.get(k1) // 111
map.get(k2) // 222

```

遍历方法:

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回所有成员的遍历器。
+ forEach()：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。

```js
let map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
])

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用 map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤。

```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

## 类和类的继承

### 类

ES6 引入了 Class（类）这个概念，通过 class 关键字，可以定义类。

```js
// 定义类
class Point {
  // 构造方法
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  // 静态方法 添加 static
  static hello() {
    return 'hello'
  }
  // 方法 不需要 function 关键字， 方法之间不能加 逗号
  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
Point.hello() // "hello"
let p1 = new Point('a', 'b')
p1.toString() // "(a, b)"

typeof Point // "function"
Point === Point.prototype.constructor // true

// 添加新的方法
Object.assign(Point.prototype, {
  toValue(){}
});
```

上面代码定义了一个“类”，可以看到里面有一个 constructor 方法，这就是构造方法，而 this 关键字则代表实例对象。

还定义了一个 toString 方法。注意，定义“类”的方法的时候，前面不需要加上 function 这个关键字，方法之间不需要逗号分隔，加了会报错。

类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对 类 使用 new  命令，跟构造函数的用法完全一致。

利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值。

与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

### 类的继承

Class 可以通过 extends 关键字实现继承。子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。

因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

如果不调用 super 方法，子类就得不到 this 对象。

在子类的构造函数中，只有调用super之后，才可以使用 this 关键字，否则会报错。

如果子类没有定义 constructor 方法，这个方法会被默认添加，不管有没有显式定义，任何一个子类都有 constructor 方法。

父类的静态方法，也会被子类继承。

```js
class Point {
  // ...
}
// 通过 extends 继承
class ColorPoint extends Point {
  constructor(x, y, color) {
    // 调用父类的 constructor(x, y)
    super(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString() // 调用父类的toString()
  }
}

```

上面代码中，constructor 方法和 toString 方法之中，都出现了 super 关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到 this 上面（Parent.call(this)）。

ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用super方法），然后再用子类的构造函数修改 this。

super 关键字:

super 作为函数调用时，代表父类的构造函数。只能用在子类的构造函数之中，用在其他地方就会报错。

super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

## 模块

模块功能主要由两个命令构成：export 和 import。

export 命令用于规定模块的对外接口。

export 命令除了输出变量，还可以输出函数或类（class）。

export 命令输出的变量就是本来的名字，但是可以使用 as 关键字重命名。

export default 命令，为模块指定默认输出。

```js
export function f() {}

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
export default function () {
  console.log('foo');
}
```

import 命令用于输入其他模块提供的功能。

import 命令要使用as关键字，将输入的变量重命名。

用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

```js
// 重命名
import { foo as f } from './aaa.js';
// 加载需要的方法
import { area, circumference } from './circle';
// 整体加载
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

```js
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口
export { default } from 'foo';
```