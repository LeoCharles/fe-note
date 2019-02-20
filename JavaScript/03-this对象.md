# this 对象

`this` 总是返回一个对象，也就是返回属性或者方法当前所在的对象。

可以近似地认为， `this` 是所有函数在运行时的一个隐藏参数，指向该函数在运行时的环境对象。

如果一个函数在调用时，被某一个对象所拥有，那么该函数在调用时，内部的 `this` 指向该对象。

如果函数独立调用，那么该函数内部的 `this`，则指向undefined。

在非严格模式中，当 `this` 指向 undefined 时，它会被自动指向全局对象 window。

即函数在调用时， `this` 总指向它的拥有者(调用者)，若自己独立调用，就指向undefined，非严格模式中独立调用指向window。

```js
    // 使用严格模式
    function foo() {
        'use strict';
        console.log(this);
    }
    foo();  // foo()独立调用 this指向undefined
    window.foo(); // foo()被window调用，this指向window
```

`this` 指向在运行时确定，一旦确定，不可更改。

```js
    var name = 'Tom';
    var obj = {
        name: 'Leo'
    };
    function sayName() {
        this = obj; // 试图在函数运行时修改this
        console.log(this.name);
    }
    sayName();//报错，函数在运调用时已确定this指向，无法更改
```

赋值操作会改变 `this` 指向。

```js
    var name = 'Tom'
    function sayName() {
        console.log(this.name);
    }
    var obj = {
        name: 'Leo',
        say: sayName  // 将sayName函数的引用赋值给say
    }
    obj.say(); //Leo
    var foo = obj.say;  // 将sayName函数的的引用赋值给全局变量foo
    foo();
    // obj.say()在obj中被调用，this指向obj
    // foo()独立调用，非严格模式中，this指向window
    // 也可以理解为foo()在window中被调用，因为在全局环境中foo()==window.foo()

    var name = 'Tom';
    var obj = {
        name: 'Leo',
        foo: {
            name: 'Bob',
            sayName: function () {
                console.log(this.name);
            }
        }
    }
    obj.foo.sayName(); // Bob
    var say = obj.foo.sayName; //将sayName函数的引用地址赋值给say
    say(); // Tom 函数sayName独立执行，this指向window
    var box = obj.foo; // 将对象foo的引用地址赋值给box
    box.sayName(); // Bob  函数sayName在foo对象中执行，this指向foo
```

`this` 指向函数运行时的环境对象，与函数定义时的位置无关。

```js
    var name = 'Tom';
    var obj = {
        name: 'Leo',
        sayName: function () {  // sayName函数在obj中定义
            console.log(this.name);
        }
    };
    obj.sayName(); // Leo，在obj中调用sayName，指向obj
    var foo = obj.sayName;  // 将sayName引用地址赋值给foo
    foo(); // Tom  独立调用sayName，this指向window
    var box = {
        name: 'Bob',
        say:foo // 将sayName引用地址赋值给say
    };
    box.say(); // Bob 在box中调用sayName，this指向box
```

分析一些例子

```js
    // demo01
    function sayName() {
        // 'use strict';
        console.log(this.name)
    }
    function func(fn) {
        fn(); // 函数被传进来后独立调用
    }
    var name = 'Tom';
    var obj = {
        name: 'Leo',
        say: sayName // 函数sayName引用地址赋值给say
    };
    func(obj.say);  // Tom
    // 将sayName函数传入func函数,并调用sayName
    // 函数sayName独立调用，非严格模式时函数中的this为window
    // 使用严格模式时，this为undefined，执行this.name会报错

    // demo02
    var name = 'Tom';
    var obj = {
        name: 'Leo',
        func: function () {
            (function () {
                //'use strict'
                console.log(this.name);
            })();
        }
    }
    obj.func();//Tom
    // obj.func()调用时，内部自执行函数自动执行，没有调用者，this指向window
    // 使用严格模式时，this为undefined，执行this.name会报错
```

JavaScript 提供了三种绑定this的方法：`call`、`apply` 和 `bind`。

call 方法，第一个参数是this的指向(即函数执行时所在的作用域)，然后在所指定的作用域中，调用该方法。

call 方法的第一个参数应该是一个对象，如果参数为空、null、和 undefined，则默认传入全局对象。

如果传入的第一参数是原始值，那么会自动转换成对应的包装类型，然后再传入 call 方法。
call 第二个及以后的参数是函数调用时所需的参数。

apply 方法和 call 方法类似，第一个参数也是 this 的指向。唯一区别是它接受一个数组作为函数执行时的参数。

apply/call 方法不仅绑定函数执行时所在的对象，还会立即执行函数，因此要把绑定的语句写在函数体内。

bind 方法将函数体内的 this 绑定到某个对象，然后每次返回一个新函数。

bind 方法比 apply/call 方法更进一步，除了绑定 this，还可以绑定原函数的参数。

```js
    function fn(n, m) {
        console.log(this.a + n + m);
    }
    var obj = {
        a: 20
    }
    fn.call(obj, 100, 10); // 130
    fn.apply(obj, [20, 10]); // 50

    var arr = [8,3,4,1,5,9];
    console.log(Math.max.apply(null, arr)); // 9

    // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
    var arg = [].slice.call(arguments);
    //将DOM中的nodelist转换为数组
    [].slice.call( document.getElementsByTagName('li') );

    // 实现继承
    var Person = function (name) {
        this.name = name;
    }
    var Student = function (age) {
        this.age = age;
        Person.call(this, name);
    }
    Student.prototype.message = function () {
        console.log('name:'+ this.name+', age:'+this.age);
    }
    new Student('Leo', '26').message();
```

灵活使用this。

```js
    var name = 'Tom';
    var obj = {
        name: 'Leo',
        sayName: function() {
            setTimeout(function() {
                console.log(this.name)
            }, 500)
        }
    }
    obj.sayName(); // Tom*/
    // 定时器中回调函数独立调用，this指向window
    // 要获取obj中的name
    // 方法1，使用一个变量，保存this
    var obj = {
        name: 'Leo',
        sayName: function() {
            var _this = this;
            setTimeout(function() {
                console.log(_this.name)
            }, 500)
        }
    }
    obj.sayName() // Leo
    // 方法2 使用bind (注意：若使用call/apply会立即执行回调函数)
    var obj = {
        name: 'Leo',
        sayName: function() {
            setTimeout(function() {
                console.log(this.name)
            }.bind(this), 500)
        }
    }
    obj.sayName() // Leo
```