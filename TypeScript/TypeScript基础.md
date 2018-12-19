# TypeScript 基础

+ [原始数据类型](#原始数据类型)

## 原始数据类型

JavaScript 的数据类型分为两类：原始数据类型（Primitive data types）和对象类型（Object types）

原始数据类型包括：布尔值、数值、字符串、null、undefined、Symbol

### 布尔值

在 TypeScript 中，使用 `boolean` 定义布尔值类型

```typescript
// 使用 boolean 定义布尔值类型
let isDone: boolean = false

// 使用构造函数 Boolean 创造的是一个 Boolean 对象，而不是布尔值
let isShow: Boolean = new Boolean(1)

// 直接调用 Boolean 返回的是 boolean 类型
let hasUpdate: boolean = Boolean(1)
```