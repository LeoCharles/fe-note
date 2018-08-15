# ES6基础

## let命令和const命令

### let命令

+ let命令用来声明变量，和var类似，但let所声明的变量只在命令所在的代码块内有效。
+ let命令所声明的变量不存在“变量提升”，一定要先声明后使用，否则报错。
+ let命令不允许在相同作用域内，重复声明同一个变量。因此，不能在函数内部重新声明参数。
+ 在for循环中使用let替换var进行变量初始化。循环语句之内和循环体是两个不同的作用域。

### const

+ const命令用来声明一个只读的常量，一旦声明，常量的值就不能改变。
+ const命令一旦声明变量，就必须立即初始化，不能留到以后赋值。var和let可以先声明不赋值。
+ const命令的作用域只在声明所在的块级作用域内有效。
+ const命令声明的常量不存在提升，只能先声明后使用。
+ const声明的常量，也与let一样不可重复声明。
+ const实际上是保证变量指向的内存地址不可变，而不是变量值不可变。对于简单数据类型（数值、字符串、布尔值），值就保存在变量指向的那个内存地址；对于复合数据类型（对象和数组），变量指向的内存地址是一个指针，const只能保证这个指针是固定的，不能保证指针指向的数据结构不变。
    ```js
    const foo = {}
    foo.prop = 123
    foo = {} // 报错
    ```

### 暂时性死区（TDZ）

+ 在代码块中使用let或const命令声明变量之前，该变量都是不可用的，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

### 块级作用域

+ ES5 只有全局作用域和函数作用域，没有块级作用域。缺点：内层变量可能会覆盖外层变量；用来计数的循环变量泄露为全局变量。
+ ES6 中新增块级作用域，允许块级作用域的任意嵌套，外层作用域无法读取内层作用域的变量，内层作用域可以定义外层作用域的同名变量。
+ 避免在块级作用域中声明函数，如果确实需要，应该用函数表达式，而不是函数声明语句。

### ES6声明变量的方法

+ ES5 有两种声明变量的方法：var命令、function命令。
+ ES6 有六种声明变量的方法：var命令、function命令、let命令、const命令、import命令、class命令。

### 顶层对象的属性

+ 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
+ ES6 规定：var命令和function命令声明的全局变量，依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

## 变量的解构赋值

### 数组的解构赋值

+ 解构赋值本质是一种匹配模式，只要等号两边的模式相同，那么左边的变量就可以被赋予对应的值。
    ```js
    let [a, [[b], c]] = [1, [[2], 3]]
    /* 等价于 */
    let a = 1
    let b = 2
    let c = 3
    ```
+ 如果解构不成功，变量的值就等于undefined。如果只匹配一部分的等号右边的数组，这种情况下，解构依然可以成功。
    ```js
    /* 解构不成功 */
    let [x] = []
    console.log(x) /* undefined */
    /* 只匹配一部分，也可以解构成功 */
    let [a, [b], d] = [1, [2, 3], 4]
    console.log(a, b, d) /* 1, 2, 4 */
    ```
+ 解构赋值可以指定默认值。注意，只有当一个数组成员严格等于undefined，默认值才会生效。
    ```js
    let [x, y = 2] = [1]
    console.log(x, y) /* 1, 2 */
    let [x = 1] = [undefined]
    console.log(x) /* 1 */
    /* 默认值不会生效 */
    let [x = 1] = [null]
    console.log(x)  /* null */
    ```

### 对象的解构赋值

+ 对象解构赋值不同于数组是按位置顺序赋值，而是按属性名赋值，必须与属性同名才能取到正确的值。
    ```js
    let {a, b} = {b: 'bbb', a: 'aaa'}
    /* 先找到同名属性，然后再赋值给对应的变量 */
    console.log(a, b) /* 'aaa', 'bbb' */
    ```
+ 解构也可以用于嵌套结构的对象。
    ```js
    let obj = {
      p: [
        'Hello',
        { y: 'World' }
      ]
    };

    let { p, p: [x, { y }] } = obj
    console.log(x)  /* "Hello" */
    console.log(y)  /* "World" */
    console.log(p)  /* ["Hello", {y: "World"}] */
    ```
+ 对象的解构也可以指定默认值，默认值生效的条件是，对象的属性值严格等于undefined。
    ```js
    let {x, y = 2} = {x : 1}
    console.log(x, y) /* 1, 2 */
    ```
+ 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
    ```js
    let { log, sin, cos } = Math
    /* 将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便 */
    ```

### 字符串的解构赋值

+ 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
    ```js
    const [a, b, c, d, e] = 'hello'
    console.log(a, b, c, d, e)  /* 'h', 'e', 'l', 'l', 'o' */
    ```
+ 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
    ```js
    let {length : len} = 'hello';
    console.log(len)  /* 5 */
    ```

### 数值和布尔值的解构赋值

+ 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
    ```js
    let {toString: ts} = 123
    let {toString: bs} = true
    ts === Number.prototype.toString /* true */
    bs === Boolean.prototype.toString /* true */
    ```
+ 只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

### 函数参数解构赋值

+ 函数的参数也可以使用解构赋值，函数参数的解构也可以使用默认值。
    ```js
    function add([x, y]){
      return x + y
    }
    add([1, 2])  /* 3 */
    /* 可以使用默认值 */
    function move({x = 0, y = 0} = {}) {
      return [x, y]
    }
    move() /* [0, 0] */
    ```

### 解构赋值的用途

+ 交换变量的值
    ```js
    let x = 1
    let y = 2
    /* 交换变量的值 */
    [x, y] = [y, x]
    ```
+ 从函数返回多个值
    ```js
    /* 返回一个数组 */
    function foo() {
      return [1, 2, 3]
    }
    let [a, b, c] = foo()
    /* 返回一个对象 */
    function foo() {
      return {
        a: 1,
        b: 2
      }
    }
    let { a, b } = foo()
    ```
+ 函数参数的定义
    ```js
    /* 参数是一组有次序的值 */
    function f([x, y, z]) { ... }
    f([1, 2, 3]);
    /* 参数是一组无次序的值 */
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1});
    ```
+ 提取 JSON 数据
    ```js
    let jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    }
    let { id, status, data: number } = jsonData
    ```
+ 函数参数的默认值
+ 遍历 Map 结构
    ```js
    const map = new Map();
    map.set('first', 'hello')
    map.set('second', 'world')
    /* 配合变量的解构赋值，获取键名和键值就非常方便 */
    for (let [key, value] of map) {
      console.log(key + " is " + value)
      /* first is hello */
      /* second is world */
    }
    ```
+ 输入模块的指定方法，加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
    ```js
    const { SourceMapConsumer, SourceNode } = require("source-map")
    ```

## 字符串的扩展

### 模板字符串

+ 模板字符串是增强版的字符串，用反引号 ( ` )标识。使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
+ 如果在模板字符串中需要使用反引号，则前面要用反斜杠( \ )转义。
+ 模板字符串中嵌入变量，需要将变量名写在 `${}` 之中。
+ `${}` 大括号内部可以放入任意的 JS 表达式，可以进行运算，以及引用对象属性，还可以调用函数。还可以嵌套。

### 字符串查找

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
+ 这三个方法都支持第二个参数，表示开始搜索的位置。使用第二个参数n时，endsWith针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
    ```js
    let s = 'Hello world!';
    s.includes('Hello', 6)  /* false */
    s.startsWith('world', 6) /* true */
    s.endsWith('Hello', 5) /* true */
    ```

### 复制字符串

+ repeat()：返回一个新字符串，表示将原字符串重复n次,参数如果是小数，会被取整。
    ```js
    'x'.repeat(3) // "xxx"
    ```

### 字符串补全长度

+ padStart()：用于头部补全，padEnd()用于尾部补全。第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
    ```js
    'x'.padStart(4, 'ab') /* 'abax' */
    'x'.padEnd(5, 'ab') /* 'xabab' */
    ```
+ 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
+ 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
+ 如果省略第二个参数，默认使用空格补全长度。
+ padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
    ```js
    '123456'.padStart(10, '0') // "0000123456"
    ```
+ 提示字符串格式。
    ```js
    '12'.padStart(10, 'YYYY-MM-DD') /* "YYYY-MM-12" */
    '09-12'.padStart(10, 'YYYY-MM-DD') /* "YYYY-09-12" */
    ```

## 数值的扩展

### Number对象的扩展

+ 二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（大小写都可以），然后跟上二进制的值。
    ```js
    ob111110111 === 503;//true
    ```
+ 八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（字母o或O），然后跟上八进制的值。
    ```js
    0o767 === 503;//true
    ```
+ 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
    ```js
    Number('0b111')  /* 7 */
    Number('0o10')  /* 8 */
    ```
+ Number.isFinite()：用来检查一个数值是否有限。如果参数类型不是数值，一律返回false。
+ Number.isNaN()：用来检查一个值是否为NaN。如果参数类型不是NaN，一律返回false。
+ ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
    ```js
    /* ES5的写法 */
    parseInt('12.34') /* 12 */
    parseFloat('123.45#') /* 123.45 */
    /* ES6的写法 */
    Number.parseInt('12.34') /* 12 */
    Number.parseFloat('123.45#') /* 123.45 */
    ```
+ Number.isInteger()：用来判断一个数值是否为整数。Js 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
+ Number.EPSILON：一个极小的常量,实质是一个可以接受的最小误差范围。
+ Number.isSafeInterger()：安全整数判断，判断一个值是否在Number.MAX_SAFE_INTEGER 与Number.MIN_SAFE_INTEGER之间。

### Math对象的扩展

+ Math.trunc()：用来去除一个数的小数部分，返回整数部分。对于空值和无法截取整数的值，返回NaN。
+ Math.sign()：用来判断一个数是正数(+1)、负数(-1)、还是零(0)。
+ Math.cbrt()：用来计算一个数的立方根。
+ Math.clz32()：返回一个数的32位无符号整数形式有多少个前导0。
+ Math.imul()：返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
+ Math.fround(): 返回一个数的32位单精度浮点数形式。
+ Math.hypot()：返回所有参数的平方和的平方根。
+ Math.expm1(x)：返回 e^x - 1，即Math.exp(x) - 1。
+ Math.log1p(x)：返回1 + x的自然对数，即Math.log(1 + x)。
+ Math.log10()：返回以 10 为底的x的对数。
+ Math.log2()：返回以 2 为底的x的对数。

### 指数运算符

+ ES2016 新增了一个指数运算符（**）。
    ```js
    2 ** 3; // 8
    ```
+ 数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
    ```js
    let b = 4;
    b **= 3; // 等同于 b = b * b * b;
    ```

## 函数的扩展

### 函数参数的默认值

+ ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
+ 参数变量是默认声明的，所以不能用let或const再次声明。
    ```js
    function foo(x = 5) {
        let x = 1; /* error */
        const x = 2; /* error */
    }
    ```
+ 使用参数默认值时，函数不能有同名参数。
+ 如果函数调用时显式的传入`undefined`, 将触发该参数等于默认值，传入`null`则没有这个效果。
+ 参数默认值可以与解构赋值的默认值，结合起来使用。
    ```js
    function foo({x, y = 5} = {}) {
        console.log(x, y);
    }
    /* 函数参数的默认值是空对象{}，对象的解构赋值默认值 y=5
    *  如果函数参数不指定默认值{}，x和y就不能解构成功，从而报错
    */
    foo() /* undefined 5 */
    /* 写法一 函数参数的默认值是空对象，但是设置了对象解构赋值的默认值*/
    function m1({x = 0, y = 0} = {}) {
        return [x, y];
    }
    /* 写法二 函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值 */
    function m2({x, y} = { x: 0, y: 0 }) {
        return [x, y];
    }
    /* x 有值，y 无值的情况 */
    m1({x: 3}) /* [3, 0] */
    m2({x: 3}) /* [3, undefined] */
    ```
+ 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。

### rest参数

+ rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用arguments类数组对象了。
+ rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
    ```js
    const sortNumbers = (...numbers) => numbers.sort();
    ```
+ rest 参数之后不能再有其他参数，否则会报错。
+ 函数的length属性，不包括 rest 参数。

### 箭头函数

+ ES6 允许使用“箭头”（`=>`）定义函数，可以简化回调函数。
    ```js
    const isEven = n => n % 2 == 0;
    const result = values.sort((a, b) => a - b);
    [1,2,3].map(x => x * x);
    ```
+ 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
+ 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
+ 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
    ```js
    let getTempItem = id => ({ id: id, name: "Temp" });
    ```
+ 箭头函数可以与变量解构结合使用。
    ```js
    const full = ({ first, last }) => first + ' ' + last;
    const numbers = (...nums) => nums;
    const headAndTail = (head, ...tail) => [head, tail];
    headAndTail(1, 2, 3, 4, 5) // [1,[2,3,4,5]]
    ```
+ 箭头函数没有自己的this,其内部 `this` 指向定义时的环境对象，而不是调用的对象。
+ 不能使用call apply bind 去改变内部的 `this`。
+ 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
+ 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
+ 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

## 数组的扩展

+ 扩展运算符是三个点（`...`）,将一个数组转为用逗号分隔的参数序列。它好比 rest 参数的逆运算。
    ```js
    console.log(1, ...[2, 3, 4], 5) // 1 2 3 4 5
    ```
+ 扩展运算符可以结合函数参数使用。
+ 扩展运算符后面还可以放置表达式。
+ 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
+ 扩展运算符的应用：
    ```js
    /* 复制数组 */
    const a1 = [1, 2];
    const a2 = [...a1];
    /* 合并数组 */
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    [...arr1, ...arr2];
    /* 求数组最大值最小值 */
    Math.max(...[1, 2, 3]);
    /* 可以直接将数组传入push方法 */
    let arr1 = [0, 1, 2];
    let arr2 = [3, 4, 5];
    arr1.push(...arr2);
    new Date(...[2017, 1, 1]);
    /* 与解构赋值结合，生成数组 */
    const [first, ...rest] = [1, 2, 3, 4, 5]
    console.log(first); /* 1 */
    console.log(rest);  /* [2, 3, 4, 5] */
    /* 将字符串转变成真正的数组 */
    [...'hello']  /* [ "h", "e", "l", "l", "o" ] */
    ```
+ 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符。
    ```js
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    let arr = [...map.keys()]; /* [1, 2, 3] */
    const go = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    [...go()] /* [1, 2, 3] */
    ```
+ 扩展运算符后面还可以放置表达式
    ```js
    const arr = [...(x > 0 ? ['a'] : []), 'b'];
    ```
+ Array.from()：用于将两类对象转为真正的数组：类数组对象(必须有length属性)和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map）。
+ 常见的类数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
    ```js
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    }
    let arr = Array.from(arrayLike); //['a', 'b', 'c']
    ```
+ 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
    ```js
    Array.from('hello') // ['h', 'e', 'l', 'l', 'o']
    ```
+ 任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。扩展运算符调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
+ Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
    ```js
    // 第二个参数类似 map
    Array.from([1, 2, 3], (x) => x * x) /* [1, 4, 9] */
    Array.from([1, , 2, , 3], (n) => n || 0) /* [1, 0, 2, 0, 3] */
    ```
+ 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
+ Array.of()；用于将一组值转换为数组，返回参数值组成的数组，如果没有参数，就返回一个空数组。
+ Array.of基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。
+ copyWithin(target, start = 0, end = this.length)：将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
    ```js
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4) /* [4, 2, 3, 4, 5] 将3号位复制到0号位 */
    ```
+ find()：用于找出第一个符合条件的数组成员，如果没有符合条件的成员，则返回undefined。find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
    ```js
    [1, 4, -5, 10].find((n) => n < 0) /* -5 */
    [1, 5, 10, 15].find((value, index, arr) => value > 9) /* 10 */
    ```
+ findIndex()：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。find()方法和findIndex()方法都可以接受第二个参数，用来绑定回调函数的this对象。
+ fill(num, start, end)：使用给定值，填充一个数组，用于空数组的初始化非常方便。还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
    ```js
    ['a', 'b', 'c'].fill(7) /* [7, 7, 7] */
    new Array(3).fill(7) /* [7, 7, 7] */
    ```
+ keys()：对键名的遍历, 返回一个遍历器对象
+ values()：对键值的遍历，返回一个遍历器对象
+ entries()：对键值对的遍历，返回一个遍历器对象
    ```js
    for (let index of ['a', 'b', 'c'].keys()) {
        console.log(index)
    } /* 1; 2; 3; */
    for (let item of ['a', 'b', 'c'].values()) {
        console.log(item)
    } /* 'a'; 'b'; 'c'; */
    for (let [index, item] of ['a', 'b', 'c'].entries()) {
        console.log(index, item)
    } /* 0 'a'; 1 'b'; 2 'c'; */
    ```
+ includes(target, start)：返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。第二个参数表示搜索的起始位置
+ flat()：将数组变成一维数组，法返回一个新数组, 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可传入一个整数参数，默认为 1， 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
+ flatMap()：对原数组的每个成员执行一个函数（相当于执行map()），然后对返回值组成的数组执行flat()方法。
    ```js
    [1, 2, [3, 4]].flat() /* [1, 2, 3, 4] */
    [1, 2, [3, [4, 5]]].flat(2) /* [1, 2, 3, 4, 5] */
    [1, [2, [3]]].flat(Infinity) /* [1, 2, 3] */
    [1, 2, 3, 4].flatMap(x => [[x * x]]) /* [[2], [4], [6], [8]] */
    ```

## 对象的扩展

+ 属性的简洁表示法,ES6允许直接写入变量和函数，作为对象的属性和方法。
    ```js
    let name = 'leo'
    const Person = {
        name,
        hello() {
            console.log(`hello, ${this.name}`)
        }
    }
    ```
+ ES6 允许字面量定义对象时，可以将表达式作为对象的属性名，即把表达式放在方括号内。表达式还可以用于定义方法名。属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]。
    ```js
    let obj = {
        ['a' + 'bc']: 123,
        ['h' + 'ello']() {
            return 'hi';
        }
    }
    ```
+ Object.assign()：用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
+ Object.assign(): 实行的是浅拷贝，而不是深拷贝，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
    ```js
    /* 为对象添加属性 */
    class Point {
        constructor(x, y) {
            Object.assign(this, {x, y})
        }
    }
    /* 为对象添加方法 */
    Object.assign(SomeClass.prototype, {
        someMethod(arg1, arg2) {
            ···
        },
        anotherMethod() {
            ···
        }
    })
    /* 克隆对象 */
    function clone(origin) {
        return Object.assign({}, origin)
    }
    /* 合并对象 */
    const merge = (target, ...sources) => Object.assign(target, ...sources)
    const merge = (...sources) => Object.assign({}, ...sources)
    ```

### 属性的可枚举性和遍历

+ 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
+ 描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，以下操作会忽略当前属性:
  + for...in循环：只遍历对象自身的和继承的可枚举的属性。
  + Object.keys()：返回对象自身的所有可枚举的属性的键名。
  + JSON.stringify()：只串行化对象自身的可枚举的属性。
  + Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
+ ES6 规定，所有 Class 的原型的方法都是不可枚举的。
+ 大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。

### Object.setPrototypeOf()，Object.getPrototypeOf() 

+ Object.getOwnPropertyDescriptors():返回指定对象所有自身属性（非继承属性）的描述对象。
+ Object.getOwnPropertyDescriptor(): 返回某个对象属性的描述对象（descriptor）。
+ Object.setPrototypeOf(): 作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。
+ Object.getPrototypeOf(): 与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

+ super 关键字， 指向当前对象的原型对象。super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
    ```js
    const proto = {
        foo: 'hello'
    }
    const obj = {
        foo: 'world',
        find() {
            return super.foo;
        }
    }
    Object.setPrototypeOf(obj, proto);
    obj.find() // "hello"
    ```

### Object.keys()，Object.values()，Object.entries()

+ Object.keys()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
+ Object.values()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
+ Object.entries()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
