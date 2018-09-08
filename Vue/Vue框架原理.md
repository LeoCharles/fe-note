# Vue 框架原理

+ [MVVM框架](#MVVM)

## MVVM

MVVM 由以下三个内容组成：

+ View：视图
+ Model：数据模型
+ ViewModel；负责沟通 View 和 Model 的桥梁。

在 MVVM 中，最核心的就是数据的双向绑定。视图通过数据驱动，数据一旦改变就会刷新视图。如果视图发生改变，也会改变对应的数据。这样就可以在业务处理中只关心数据的流转，不要直接操作 DOM。

Vue 通过数据劫持实现数据双向绑定。

## 数据劫持

Vue 内部使用了 Object.defineProperty() 来实现双向绑定，通过设定对象属性的 setter/getter 方法来监听数据的变化，通过 getter 进行依赖收集，而每个 setter 方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

```js
// 劫持数据，将数据变成可观察的（observable）
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
// 定义属性的 getter 和 setter
function defineReactive(obj, key, val) {
  // 递归 劫持属性的属性值
  observe(val)
  // 修改属性描述对象
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log('get value')
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set value')
      val = newVal
    }
  })
}

// 绑定数据
let data = { name: 'leo' }
observe(data)
let name = data.name; // get value
data.name = 'Tom'; // set value
```

以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，还需要在适当的时候给属性添加发布订阅。

```js
// 发布订阅器
class Dep {
  constructor() {
    // 用来收集观察者实例
    this.subs = []
  }
  // 添加观察者实例
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知所有观察者更新视图
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 全局属性，通过该属性配置观察者实例
Dep.target = null

// 模拟视图更新
function update(value) {
  document.querySelector('div').innerText = value
}

// 观察者
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target =  null
  }
  update() {
    // 获取新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 DOM
    this.cb(this.value)
  }
}
// 对 defineReactive 函数进行改造
function defineReactive(obj, key, val) {
  observe(val)
  // 为为每个属性创建 发布订阅器 实例
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log('get value')
      // 将观察者实例添加到订阅器
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set value')
      val = newVal
      // 数据改变时 通过订阅器通知所有的观察者更新视图
      dep.notify()
    }
  })
}
```