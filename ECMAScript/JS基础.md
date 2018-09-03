# JavaScript 基础

## 数据类型

### 简介

JavaScript 数据类型共 7 种，分为两大类：基本类型和引用类型（复杂类型）。

+ 基本类型：null（空值），undefined（未定义），boolean（布尔值），number（数值），string（字符串），symbol（独一无二的值）
+ 引用类型：object（对象）
+ 对象又可以分为3个子类型： 侠义的对象（object），数组（array），函数（function）。

### 类型判断

JavaScript 有三种方法判断数据类型：typeof 运算符，instanceof 运算符， Obect.prototype.toString() 方法。

+ typeof 运算符对于基本类型，除了 null 都可以显示正确的类型；对于对象，除了函数都会显示 object。

```js
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

+ instanceof 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。只能用于对象，不适用基本类型值的判断。

```js
var arr = [];
var obj = {};
arr instanceof Array; // true
obj instanceof Object;// true
null instanceof Object; // false
```

+ Obect.prototype.toString() 方法返回一个对象的[object Type]形式的字符串。可以通过 Type 字符串判断数据类型。

```js
// 自定义 类型判断方法
function $typeOf (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}
```

### 数值

JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。也就是所有数字都是小数（64位浮点数）。浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。

某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算。

```js
0.1 + 0.2 === 0.3   // false
0.3 / 0.1   // 2.9999999999999996
(0.3 - 0.2) === (0.2 - 0.1)  // false
-0 === +0 // true
```

NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number），NaN不等于任何值，包括它本身。

与数值相关的全局方法：

+ parseInt() 方法用于将字符串转为整数，默认十进制。
  + 如果字符串头部有空格，空格会被自动去除。
  + 如果参数不是字符串，则会先转为字符串再转换。
  + 如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
  + 如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析。
  + 如果字符串以0开头，将其按照10进制解析。
  + 对于那些会自动转为科学计数法的数字，会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。
  + parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制。

```js
parseInt(1.23) // 1
parseInt('15px') // 15
parseInt('0x10') // 16
parseInt('011') // 11
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1
parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8
parseInt('1000', 2) // 8

```

+ parseFloat() 方法用于将一个字符串转为浮点数。
  + 如果字符串头部有空格，空格会被自动去除。
  + 如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回NaN。
  + 如果字符串符合科学计数法，则会进行相应的转换。

```js
parseFloat('314e-2') // 3.14
parseFloat([]) // NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN
// parseFloat的转换结果不同于 Number函数。
parseFloat(true)  // NaN
Number(true) // 1
parseFloat(null) // NaN
Number(null) // 0
parseFloat('') // NaN
Number('') // 0
parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

### 字符串

JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。

JavaScript 允许直接在程序中使用 Unicode 码点表示字符，即将字符写成\uxxxx的形式，其中xxxx代表该字符的 Unicode 码点。

每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。由于历史原因，只支持两字节的字符，不支持四字节的字符。

```js
var s = '\u00A9'; // "©"
var f\u006F\u006F = 'abc';
foo // "abc"
```

Base64 是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。JavaScript 原生提供两个 Base64 相关的方法:

+ btoa() 方法：任意值转为 Base64 编码
+ atob() 方法：Base64 编码转为原来的值

```js
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

这两个方法不适合非 ASCII 码的字符，会报错。要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```js
// 编码
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}
// 解码
function b64Decode(str) {
  return decodeURIComponent(atob(str));
}
b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

### 对象

对象（object）是 JavaScript 语言的核心概念，也是最重要的数据类型。简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

+ 对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以。如果键名是数值，会被自动转为字符串。
+ 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。因此为其中任何一个变量添加属性，另一个变量都可以读写该属性。
+ 读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。数值键名不能使用点运算符。
+ 可以使用 Object.keys() 方法, 查看一个对象本身的所有属性。
+ delete命令用于删除对象的属性，删除成功后返回true。注意，删除一个不存在的属性，delete 不报错，而且返回true。

```js
var obj = {
  key1: 1,
  key2: 2
};
Object.keys(obj); // ['key1', 'key2']
delete obj.key1 // true
```

+ in 运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），它不能识别哪些属性是对象自身的，哪些属性是继承的。
+ 使用对象的 hasOwnProperty() 方法判断是否为对象自身的属性。
+ for...in 循环用来遍历一个对象的全部属性，它不仅遍历对象自身的属性，还遍历继承的属性。会跳过不可遍历的属性。

```js
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true

var obj = {
      a: 1,
      b: 2,
      c: 3
    };
for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 只遍历对象自身的属性，而不遍历继承的属性
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

### 数组

数组（array）是按次序排列的一组值，每个值的位置都有编号（从0开始）。任何类型的数据，都可以放入数组。本质上属于一种特殊的对象。

+ 数组的 length 属性，返回数组的成员数量。清空数组的一个有效方法，就是将 length 属性设为0。
+ 检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
+ for...in 循环也可以遍历数组，不仅会遍历数组所有的数字键，还会遍历非数字键。所以，不推荐使用 for...in 遍历数组。
+ 数组的遍历可以考虑使用 for 循环或 while 循环。
+ 当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。空位不影响length属性。
+ 如果最后一个元素后面有逗号，并不会产生空位。也就是说，有没有这个逗号，结果都是一样的。
+ 数组的空位是可以读取的，返回undefined。
+ 使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。
+ 数组的某个位置是空位，与某个位置是 undefined，是不一样的。如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。如果某个位置是undefined，遍历的时候就不会被跳过。

```js
var arr = ['a', 'b', 'c'];
Object.keys(arr) // ["0", "1", "2"]
2 in arr  // true
'2' in arr // true
4 in arr // false

// for循环
for(var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// while循环
var i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

var a = [1, , 1];
a.length // 3
delete a[1];
a[1] // undefined
a.length // 3

// 遍历时空位都会被跳过
var a = [, , ,];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
}) // 不产生任何输出
for (var i in a) {
  console.log(i);
} // 不产生任何输出
Object.keys(a) // []

// undefined
var a = [undefined, undefined, undefined];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
for (var i in a) {
  console.log(i);
}
// 0
// 1
// 2
Object.keys(a)
// ['0', '1', '2']
```

+ 如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）。
+ 数组的 slice 方法可以将“类似数组的对象”变成真正的数组。

```js
var arr = Array.prototype.slice.call(arrayLike);
```

### 函数

JavaScript 将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。

+ 可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。
+ 由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。
+ JavaScript 引擎将函数名视同变量名，所以采用 function 命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。

arguments 对象：

+ arguments对象包含了函数运行时的所有参数，arguments[0]就是第一个参数，arguments[n]就是第 n 个参数。这个对象只有在函数体内部，才可以使用。

函数的属性和方法：

+ name 属性： 返回函数的名字。
+ length 属性: 返回函数预期传入的参数个数，即函数定义之中的参数个数。
+ toString() 方法：返回一个字符串，内容是函数的源码。

函数作用域:

+ 作用域（scope）指的是变量存在的范围。
+ Javascript 有三种作用域：
  + 局作用域，变量在整个程序中一直存在，所有地方都可以读取。
  + 函数作用域，变量只在函数内部存在。
  + 块级作用域，一对大括号内。
+ 数外部声明的变量就是全局变量（global variable），它可以在函数内部读取。
+ 在函数内部定义的变量，外部无法读取，称为“局部变量”（local variable）。局部变量会在该作用域内覆盖同名全局变量。
+ 对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。
+ 与全局作用域一样，函数作用域内部也会产生“变量提升”现象。var命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部。
+ 函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。
+ 函数体内部声明的函数，作用域绑定函数体内部。

闭包：

+ 正常情况下，函数外部无法读取函数内部声明的变量。通过在函数内部再定义一个内部函数，并把它作为返回值, 就可以在函数外部访问函数内的变量了。这个内部函数就是“闭包”。

```js
function foo() {
  var x = 1;
  // 定义一个内部函数
  function bar() {
    console.log(x);
  }
  // 返回这个内部函数
  return bar;
}
var x = 2;
var f = foo();
// 调用这个内部函数，就可以在函数外部调用函数内部的变量了, 这个内部函数就是闭包
f() // 1
```

+ 闭包的最大用处有两个：
  + 可以读取函数内部的变量。
  + 可以让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。

### 数据类型转换

强制转换主要指使用 Number()、String()和 Boolean()三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

Number() 函数，将任意类型的值转化成数值。

+ 第一步，调用对象自身的 valueOf 方法。如果返回原始类型的值，则直接对该值使用 Number 函数，不再进行后续步骤。
+ 第二步，如果 valueOf 方法返回的还是对象，则改为调用对象自身的 toString 方法。如果 toString 方法返回原始类型的值，则对该值使用 Number 函数，不再进行后续步骤。
+ 第三步，如果 toString 方法返回的是对象，就报错。

+ 基本类型的值：
  + 数值：转换后还是原来的值
  + 字符串：如果可以被解析为数值，则转换为相应的数值，如果不可以被解析为数值，返回 NaN，空字符串转为 0。
  + 布尔值：true 转成 1，false 转成 0。
  + undefined：转成 NaN。
  + null：转成 0
  + Number() 函数将字符串转为数值，要比parseInt() 函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。
  + parseInt() 和Number() 函数都会自动过滤一个字符串前导和后缀的空格。

+ 对象：
  + Number() 方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。

```js
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

String() 函数，将任意类型的值转化成字符串。

+ 第一步，先调用对象自身的 toString 方法。如果返回原始类型的值，则对该值使用 String 函数，不再进行以下步骤。
+ 第二步，如果 toString 方法返回的是对象，再调用原对象的 valueOf 方法。如果 valueOf 方法返回原始类型的值，则对该值使用 String 函数，不再进行以下步骤。
+ 第三步，如果 valueOf 方法返回的是对象，就报错。

+ 基本类型值:
  + 数值：转为相应的字符串。
  + 字符串：转换后还是原来的值。
  + 布尔值：true转为字符串"true"，false转为字符串"false"。
  + undefined：转为字符串"undefined"。
  + null：转为字符串"null"。

+ 对象:
  + String() 方法的参数如果是对象，返回一个类型字符串；
  + 如果参数是数组，返回该数组的字符串形式。

```js
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

Boolean() 函数, 将任意类型的值转为布尔值。

+ 除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象。
+ 注意，所有对象（包括空对象、空数组）的转换结果都是 true ，甚至连false对应的布尔对象new Boolean(false)也是true。

```js
function $isEmpty (val) {
  return val === null || !(Object.keys(val) || val).length;
}
```

## 标准库

### Object 对象

JavaScript 的所有其他对象都继承自 Object 对象，即那些对象都是 Object 对象的实例。

Object 对象本身是一个函数，可以当作工具方法使用，将任意值转为对象。

Object 对象不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用new命令。

静态方法:

+ Object.keys() 方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的所有可枚举属性名。
+ Object.getOwnPropertyNames() 方法也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。
+ 对象属性模型的相关方法:
  + Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
  + Object.defineProperty()：通过描述对象，定义某个属性。
  + Object.defineProperties()：通过描述对象，定义多个属性。
+ 控制对象状态的方法:
  + Object.preventExtensions()：防止对象扩展。
  + Object.isExtensible()：判断对象是否可扩展。
  + Object.seal()：禁止对象配置。
  + Object.isSealed()：判断一个对象是否可配置。
  + Object.freeze()：冻结一个对象。
  + Object.isFrozen()：判断一个对象是否被冻结。
+ 原型链相关的方法：
  + Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
  + Object.getPrototypeOf()：获取对象的Prototype对象。

实例方法：

+ valueOf()：返回当前对象对应的值。
+ toString()：返回当前对象对应的字符串形式。
  + 数组、字符串、函数、Date 等对象都分别部署了自定义的 toString 方法，覆盖了toString方法。
+ toLocaleString()：返回当前对象对应的本地字符串形式。
+ hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
+ isPrototypeOf()：判断当前对象是否为另一个对象的原型。
+ propertyIsEnumerable()：判断某个属性是否可枚举。

### 属性描述对象

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。

+ Object.getOwnPropertyDescriptor方法可以获取属性描述对象。它的第一个参数是一个对象，第二个参数是一个字符串，对应该对象的某个属性名。

```js
var obj = { p: 'a' };
Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

属性描述对象提供6个元属性:

+ value：该属性的属性值，默认为undefined。
+ writable：是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
+ enumerable：是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
+ configurable：是一个布尔值，表示可配置性，默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。也就是说，configurable属性控制了属性描述对象的可写性。
+ get是一个函数，表示该属性的取值函数（getter），默认为undefined。
+ set是一个函数，表示该属性的存值函数（setter），默认为undefined。
  
通过属性描述对象定义或修改一个属性:

+ Object.defineProperty() 方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，接受三个参数：
  + 属性所在的对象
  + 属性名（它应该是一个字符串）
  + 属性描述对象，它的writable、configurable、enumerable这三个属性的默认值都为false。
+ 如果属性已经存在，Object.defineProperty方法相当于更新该属性的属性描述对象。
+ Object.defineProperties() 方法，可以一次性定义或修改多个属性。
+ 注意，一旦定义了取值函数 get（或存值函数 set ），就不能将 writable 属性设为true，或者同时定义 value 属性，否则会报错。

```js
// 定义一个属性
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false, // 属性不可写
  enumerable: true,
  configurable: false
});
obj.p // 123
obj.p = 246;
obj.p // 123
// 定义多个属性
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: {
    get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});
obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
// 存取器
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});
obj.p // "getter"
obj.p = 123 // "setter: 123"
```

### Array 对象

Array 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。

静态方法：

+ Array.isArray() 方法返回一个布尔值，表示参数是否为数组。它可以弥补 typeof 运算符的不足。

实例方法：

+ valueOf() 方法是所有对象都拥有的方法，表示对该对象求值。数组的 valueOf 方法返回数组本身。
+ toString() 方法也是对象的通用方法，数组的 toString 方法返回数组的字符串形式。

```js
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
arr.toString() // "1,2,3"
```

+ push() 方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
+ pop() 方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。
+ shift() 方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
+ unshift() 方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
+ join() 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
+ concat() 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
+ slice() 方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
  + 第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。
  + 如果没有参数，实际上等于返回一个原数组的拷贝。如果省略第二个参数，则一直返回到原数组的最后一个成员。
  + 如果slice方法的参数是负数，则表示倒数计算的位置。
  + 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。
  + slice方法的一个重要应用，是将类似数组的对象转为真正的数组。

```js
var a = ['a', 'b', 'c'];
a.slice() // ["a", "b", "c"]
a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
a.slice(4) // []
a.slice(2, 1) // []
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })// ['a', 'b']
```

+ splice() 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
  + 第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
  + 起始位置如果是负数，就表示从倒数位置开始删除。
  + 如果只是单纯地插入元素，第二个参数可以设为0。
  + 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```js
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]

var a = [1, 1, 1];
a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]

var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

+ indexOf() 方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。可以接受第二个参数，表示搜索的开始位置。
+ lastIndexOf() 方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
+ reverse() 方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。
+ sort() 方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
  + 默认不是按照大小排序，而是按照Unicode码点顺序。也就是说，数值会被先转成字符串，再按照Unicode码点顺序进行比较，所以101排在11的前面。
  + 如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数。
  + sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

```js
[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

+ forEach() 方法用于遍历数组，对数组的所有成员依次执行参数函数。
  + 没有返回值，只用来操作数据。
  + forEach 方法不会跳过 undefined 和 null，但会跳过空位。

+ map() 方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果映射成一个新数组返回。
  + 接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
  + map方法不会跳过undefined和null，但是会跳过空位。
  + 如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法。

+ filter() 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。该方法不会改变原数组。
  + 它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 true 的成员组成一个新数组返回。
  + filter方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。

+ some() 方法接受一个函数作为参数，所有数组成员依次执行该函数，只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
+ every() 方法接受一个函数作为参数，所有数组成员依次执行该函数，当所有成员的返回值是true，则整个every方法的返回值才是true,否则返回false。

+ reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值。
  + 累加器接受四个参数：
    + 上一次调用回调返回的值（previousValue），或者是提供的初始值（initialValue），类型可能与数组中的每一项不同。
    + 数组中当前被处理的元素（currentValue）
    + 当前元素在数组中的索引（可选）
    + 原数组（可选）
  + reduce 方法第二个参数是初始值（initialValue），如果没有提供初始值，则将使用数组中的第一个元素。
  + 如果存在 initialValue，那么第一个 previousValue 等于 initialValue，并且 currentValue 等于数组中的第一个值。
  + 如果 initialValue 不存在，那么 previousValue 等于数组中的第一个值，currentValue 等于数组中的第二个值。
+ reduceRight() 方法和 reduce() 用法一样，区别是 reduceRight 是从右到左。

```js
// 数组求和
[1, 2, 3, 4, 5].reduce((a, b) => {
  return a + b;
}, 10);// 25

// 求总成绩
var result = [
  {
    subject: 'math',
    score: 88
  },
  {
    subject: 'chinese',
    score: 95
  },
  {
    subject: 'english',
    score: 80
  }
];
var sum = result.reduce((prev, curr) => {
  return prev + curr.score
}, 0) // 注意初始值不是默认数组的第一项，而是一个数值
sum // 263

// 串字符串中每个字母出现的次数
var str = 'asdsaasssd'
var res = str.split('').reduce((prev, curr) => {
  prev[curr] ? prev[curr] ++ : prev[curr] = 1
  return prev
}, {}) // 初始值为空对象
res // {a: 3, s: 5, d: 2}
```

### 包装对象

JavaScript 基本类型的值数值、字符串、布尔值—在一定条件下，也会自动转为对象，也就是基本类型的“包装对象”

所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把基本类型的值变成（包装成）对象。

它们都从 Object 对象继承了 valueOf 方法和 toString 方法。

+ valueOf() 方法返回包装对象实例对应的原始类型的值。
+ toString() 方法返回对应的字符串形式。
+ 原始类型的值，可以自动当作包装对象调用，即调用包装对象的属性和方法。
+ 自动转换生成的包装对象是只读的，无法修改。
+ 除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用。

```js
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
var str =  'abc'
str.length // 3
str.x = 123;
str.x // undefined
```

### Boolean 对象

Boolean 对象作为构造函数，它主要用于生成布尔值的包装对象实例。

Boolean对象还可以单独使用，将任意值转为布尔值。这时 Boolean 就是一个单纯的工具方法。

```js
// 注意，false对应的包装对象实例，布尔运算结果也是true。
if (new Boolean(false)) {
  console.log('true');
} // true 因为所有对象对应的布尔值都是true
if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出 因为实例的 valueOf方法，返回实例对应的原始值，本例为 false

Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false
Boolean(1) // true
Boolean('false') // true
Boolean([]) // true 注意 空数组会被转换为 true
Boolean({}) // true 注意 空对象会被转换为 true
Boolean(function () {}) // true
Boolean(/foo/) // true
// 使用双重的否运算符（!）也可以将任意值转为对应的布尔值。
!![] // true
!!{} // true
```

### Number 对象

Number对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

实例方法：

+ toString() 方法用来将一个数值转为字符串形式。
+ toFixed() 方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
+ toExponential() 方法用于将一个数转为科学计数法形式。
+ toPrecision() 方法用于将一个数转为指定位数的有效数字。

```js
// 10一定要放在括号里，这样表明后面的点表示调用对象属性。如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。
(10).toString() // "10"
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
(10).toFixed(2) // "10.00"
(1234).toExponential(2) // "1.23e+3"
(12.34).toPrecision(5) // "12.340"
```

### String 对象

String 对象用来生成字符串对象。字符串对象是一个类似数组的对象（有数值键和length属性）。

静态方法：

+ String.fromCharCode() 方法参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。

```js
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"
```

实例方法：

+ charAt() 方法返回指定位置的字符，参数是从0开始编号的位置。这个方法完全可以用数组下标替代。
+ charCodeAt() 方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于 String.fromCharCode() 的逆操作。
+ concat() 方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
+ split() 方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
+ slice() 方法用于从原字符串取出子字符串并返回，不改变原字符串。
  + 第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
  + 如果省略第二个参数，则表示子字符串一直到原字符串结束。
  + 如果参数是负值，表示从结尾开始倒数计算的位置。
+ substring() 方法用于从原字符串取出子字符串并返回，不改变原字符串。跟 slice 方法很相像，优先使用 slice 方法。
+ substr() 方法用于从原字符串取出子字符串并返回，不改变原字符串，跟 slice 和 substring 方法的作用相同。
+ indexOf() 方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。
  + 可以接受第二个参数，表示从该位置开始向后匹配。
+ lastIndexOf() 方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配。
+ trim() 方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。
+ toLowerCase()方法用于将一个字符串全部转为小写。返回一个新字符串，不改变原字符串。
+ toUpperCase() 方法用于将一个字符串全部转为大写。返回一个新字符串，不改变原字符串。
+ match() 方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。
+ search() 方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。
+ replace() 方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。