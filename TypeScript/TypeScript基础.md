# TypeScript 基础

+ [原始数据类型](#原始数据类型)

+ [对象类型-接口](#对象类型-接口)

+ [数组类型](#数组类型)

+ [元组类型](#元组类型)

+ [枚举类型](#枚举类型)

+ [函数类型](#函数类型)

+ [类与接口](#类与接口)

+ [泛型](#泛型)

## 原始数据类型

JavaScript 的数据类型分为两类：原始数据类型（Primitive data types）和对象类型（Object types）

原始数据类型包括：Boolean、Number、String、null、undefined、Symbol

### 布尔值

使用 `boolean` 定义布尔值类型

```ts
// 使用 boolean 定义布尔值类型
let isDone: boolean = false

// 使用构造函数 Boolean 创造的是一个 Boolean 对象，而不是布尔值
let isShow: Boolean = new Boolean(1)

// 直接调用 Boolean 返回的是 boolean 类型
let hasUpdate: boolean = Boolean(1)
```

### 数值

使用 `number` 定义数值类型

```ts
// 十进制
let decLiteral: number = 10
// 0b 表示二进制
let binaryLiteral: number = 0b101010
// 0o 表示八进制
let octalLiteral: number = 0o777
// 0x 表示十六
let hexLiteral: number = 0xf00d
let notANumber: number = NaN
let infintyNumber: number = Infinity
```

### 字符串

使用 `string` 定义字符串类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个

```ts
let name: string = 'leo'

// 使用字符串字面量来约束取值
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, eventNmae: EventNames) {
  // do something
}
handleEvent(document.getElementById('btn'), 'click')
handleEvent(document.getElementById('btn'), 'dbclick') // 报错，eventName 不能为 'dbclick'
```

### 空值

JavaScript 没有空值（Void）的概念，在 TypeScript 中 可以用 `void` 定义没有返回值的函数

```ts
function alterName(): void {
  alert('My name is Leo')
}
// 声明一个 void 类型的变量没有什么用，只能赋值为 undefined 和 null
let unusable: void = undefined
```

### Null 和 Undefined

`undefined` 类型的变量只能被赋值为 `undefined`

`null` 类型的值只能赋值为 `null`

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型

```ts
let u: undefined = undefined
let n: null = null
```

### 任意值

任意值 `Any` 用来表示允许赋值为任意类型

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

```ts
//  `any` 类型，允许被赋值为任意类型，如果是普通类型则不允许改变类型
let anyValue: any = 'leo'
anyValue = 3
```

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

使用 `type` 创建类型别名

```ts
let myAge: string | number
myAge = '28'
myAge = 28
```

## 对象类型-接口

在 TypeScript 中，我们使用接口（Interface）来定义对象的类型

接口（Interface）是对行为的抽象，而具体如何行动需要由类（class）去实现（implement）

TypeScript 中的接口除了可用于对类的一部分行为进行抽象以外，也常用于对“对象的形状”（Shape）进行描述

`属性名?` ：表示可选属性，该属性可以不存在，但不允许添加未定义的属性

`[propName: 类型]: 类型` 表示任意属性，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性

`readonly` 定义只读属性

```ts
// 定义接口 Person
interface Person {
  readonly id: number;     // 只读属性
  name: string;            // 确定属性
  age?: number;            // 可选属性
  [propName: string]: any;  // 任意属性， any 类型, 如果改为 string 类型， age 属性也要改成 string 类型
}
// 定义一个变量，类型是 Person ，约束了对象的形状
let leo: Person = {
  id: 1,           // 只读属性
  name: 'Leo',     // 确定属性，必须存在
  age: 28,         // 可选属性，可以不存在
  gender: 'male'   // 新增属性
}
// 接口 Person 约束了对象 tom ，约束了对象的形状
let tom: Person = {
  id: 2,           // 只读属性
  name: 'Tom'      // 确定属性，必须存在
}
```

ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等

DOM 和 BOM 提供的内置对象有： Document、HTMLElement、Event、NodeList 等

我们可以在 TypeScript 中将变量定义为这些类型

```ts
let b: Boolean = new Boolean(1)
let e: Error = new Error('error')
let d: Date = new Date()
let r: RegExp = /[a-z]/

let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')
document.addEventListener('click', (e: MouseEvent) => {
  // do something
})
```

## 数组类型

最简单的方法是使用 `类型 []` 来表示数组，数组中不允许出现其他的类型

常见的做法是，用 `any` 表示数组中允许出现任意类型

也可以使用数组泛型 `Array<类型>` 来表示数组

还可以使用接口来描述数组

常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

```ts
// 不允许出现其他的类型
let fibonacci: number[] = [1, 1, 2, 3, 5, 8]
// 使用 any 表示数组中允许出现任意类型
let list: any[] = ['leo', 28, {website: 'www.baidu.com'}]
// 使用数组泛型
let colors: Array<string> = ['red', 'blue', 'yellow']
// 使用接口来描述数组
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5, 8]
// 使用接口定义类数组
function sum() {
  let args: IArguments = arguments;
}
```

## 元组类型

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型

```ts
// 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
let person: [string, number] = ['leo', 28]
// 只赋值其中一项
let person: [string, number]
person[0] = 'leo'
// 添加越界元素
let person: [string, number] = ['leo', 28]
person.push('www.baidu.com') // 只能是 string 或 number 类型
```

## 枚举类型

枚举（Enum）类型用于取值被限定在一定范围内的场景

枚举使用 `enum` 关键字来定义

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）

```ts
// 常数项
enum Days = {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
Days['Sun'] // 0
Days[0]     // 'Sun'
Days[1]     // 'Mon'
Days[2]     // 'Tue'

// 手动赋值枚举项，未手动赋值的枚举项会接着上一个枚举项递增
enum Days = {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat}
Days['Sun'] // 7
Days['Mon'] // 1
Days['Tue'] // 2
Days['Wed'] // 3
Days['Tue'] // 4

```

## 函数类型

一个函数有输入和输出，在 TypeScript 中对其进行约束， 输入多余或少于要求的参数是不被允许的

TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数

```ts
// 函数声明
function sum(x: number, y: number): number {
  return x + y
}
// 输入参数必须是两个
sum(1, 2)

// 函数表达式
let sum = function(x: number, y:number): number {
  return x + y
}
// 这种方式可以通过编译， 但事实上，只对等号右侧的匿名函数进行了类型定义
// 而等号左边的 sum 是通过赋值操作进行类型推论的推断出来的
// 手动给 sum 添加类型
let sum:(x: number, y: number) => number = function(x: number, y: number): number {
  return x + y
}
```

也可以使用接口的方式来定义一个函数需要符合的形状

```ts
// 定义接口
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function(source: string, subString:string) {
  return source.search(subString) !== -1
}
```

使用 `?` 表示可选参数，可选参数后面不允许在出现必选参数

```ts
// ? 表示可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return `${firstName} ${lastName}`
  } else {
    return firstName
  }
}
```

在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数

此时就不受「可选参数必须接在必需参数后面」的限制了

```ts
// 使用默认参数
function buildName(firstName: string = 'Tom', lastName: string) {
  return `${firstName} ${lastName}`
}
```

在 ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数，rest 参数只能是最后一个参数

```ts
// 使用 ...rest 参数， rest 是数组
function push(array: any[], ...items:any[]) {
  items.forEach(function(item) {
    array.push(item)
  })
}
```

## 类类与接口

类的相关概念：

+ 类（Class）：定义一类事物的抽象特点，包含它的属性和方法

+ 对象（Object）：类的实例，通过 `new` 操作符生成

+ 面向对象（OOP）的三大特征：封装、继承、多态

+ 封装：将对数据的操作细节隐藏起来，只暴露对外接口，外界不需要知道细节，就能通过接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据

+ 继承：子类继承父类，子类除了拥有父类的所有特征外，还有一些更具体的特征

+ 多态：由继承生生的相关的不同的类，对同一个方法可以有不同的实现

+ 存取器（getter & setter）：用以改变属性取值和赋值行为

+ 修饰符：修饰符是一些关键字，用于限定成员或类型的性质

+ 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化，抽象类中的抽象方法必须在子类中被实现

+ 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

+ 实现（implements）：一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现

```ts
// 定义类
class Animal {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    return `My name is ${this.name}`
  }
}
// 继承类
class Cat extends Animal {
  constructor (name) {
    super(name) // 调用父类的 constructor(name)
  }
  sayHi() {
    return 'Meow ~ , ' + super.sayHi() // 调用父类的 sayHi() 方法
  }
}
// 类的实例
let c = new Cat('Tom')
c.sayHi() // 'Meow ~ , My name is Tom'
```

TypeScript 可以使用三种访问修饰符（Access Modifiers）

+ `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的

+ `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问

+ `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```ts
class Animal {
    // private： 私有属性，外部不能访问，子类也不允许访问，protected：则允许在子类访问
    private name
    public constructor(name) {
        this.name = name;
    }
}
```

`abstract` 用于定义抽象类和其中的抽象方法

```ts
// 抽象类
abstract class Animal {
    public name
    public constructor(name) {
        this.name = name
    }
    // 抽象方法
    public abstract sayHi()
}
// 抽象类不能被实例化
let a = new Animal('Jack') // 报错， 抽象类不能被实例化
// 继承抽象类
class Cat extends Animal {
  // 必须实现抽象方法
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}
let c = new Cat('Tom')
```

接口（Interfaces）可以用于对“对象的形状（Shape）”进行描述，还可以对类的一部分行为进行抽象

有时候不同类之间可以有一些共有的特性，可以把这些公共特性提取成接口，用 `implements` 关键字来实现

一个类可以实现多个接口

接口与接口之间可以是继承关系

接口也可以继承类

```ts
// 门是一个类，防盗门是门的子类，防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法
// 车是另外一个类，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它

// 防盗器接口
interface Alarm {
  alert()
}
// 门类
class Door {}
// 防盗门 继承 父类-门 实现 接口-防盗器
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert!')
  }
}
// 汽车类 实现 接口-防盗器
class Car implements Alarm {
  alert() {
    console.log('Car alert!')
  }
}

// 一个类可以实现多个接口
interface Light {
  lightOn();
  lightOff();
}
class Car implements Alarm, Light {
  alert() {
    console.log('Car alert!')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}

// 接口继承接口
interface LightableAlarm extends Alarm {
  lightOn();
  lightOff();
}

// 接口继承类
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
let point：Point3d = {x: 3, y: 4, z: 5}
```

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

```ts
// 在函数名后添加了 <T>，其中 T 用来指代任意输入的类型
// 在后面的输入 value: T 和 输出 Array<T> 中即可使用
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
// 在调用的时候，可以指定 <T> 具体的类型为 string, 也可以不手动指定，而让类型推论自动推算出来
createArray<string>(3, 'x'); // ['x', 'x', 'x']

// 定义多个泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
([7, 'seven']); // ['seven', 7]
```
