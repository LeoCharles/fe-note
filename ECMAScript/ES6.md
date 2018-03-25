# ES6

## let命令和const命令

### let命令

+ let命令用来声明变量，和var类似，但let所声明的变量只在命令所在的代码块内有效。
+ let命令所声明的变量不存在“变量提升”，一定要先声明后使用，否则报错。
+ let命令不允许在相同作用域内，重复声明同一个变量。因此，不能在函数内部重新声明参数。
+ 在for循环中使用let替换var进行变量初始化。循环语句之内和循环体是两个不同的作用域。

### const

+ const命令用来声明一个只读的常量，一旦声明，常量的值就不能改变。
+ const一旦声明变量，就必须立即初始化，不能留到以后赋值。var和let可以先声明不赋值。
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

## 数组的解构赋值

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

## 对象的解构赋值

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

## 字符串的解构赋值

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

## 数值和布尔值的解构赋值

+ 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
    ```js
    let {toString: ts} = 123
    let {toString: bs} = true
    ts === Number.prototype.toString /* true */
    bs === Boolean.prototype.toString /* true */
    ```
+ 只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

## 函数参数解构赋值

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

## 解构赋值的用途

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