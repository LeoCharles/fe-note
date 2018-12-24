# TypeScript 基础

+ [原始数据类型](#原始数据类型)

+ [对象类型](#对象类型)

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

```ts
let name: string = 'leo'
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

```ts
let myAge: string | number
myAge = '28'
myAge = 28
```

## 对象的类型

在 TypeScript 中，我们使用接口（Interface）来定义对象的类型

接口（Interface）是对行为的抽象，而具体如何行动需要由类（class）去实现（implement）

TypeScript 中的接口除了可用于对类的一部分行为进行抽象以外，也常用于对“对象的形状”（Shape）进行描述

`属性名?` ：表示可选属性，该属性可以不存在，但不允许添加未定义的属性

`[propName: 类型]: 类型` 表示任意属性，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性

`readonly` 定义只读属性

```ts
// 使用接口 interface 定义对象
interface Person {
  readonly id: number,     // 只读属性
  name: string,            // 确定属性
  age?: number,            // 可选属性
  [propName: string]: any  // 任意属性， any 类型, 如果改为 string 类型， age 属性也要改成 string 类型
}
let leo: Person = {
  id: 1,           // 只读属性
  name: 'Leo',     // 确定属性，必须存在
  age: 28,         // 可选属性，可以不存在
  gender: 'male'   // 新增属性
}
let tom: Person = {
  id: 2,           // 只读属性
  name: 'Tom'      // 确定属性，必须存在
}
```
