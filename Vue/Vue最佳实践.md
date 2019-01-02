# Vue最佳实践

>记录在使用 Vue 中发现的一些好的代码实践及使用技巧

## this 引用

在组件作用域内使用箭头函数，可以保证 `this` 永远指向组件本身

```js
export default {
  data () {
    return {
      msg: 'hello'
    }
  },
  methods: {
    hello () {
      setTimeout(() => {
        console.log(this.msg) // this 指向组件
      })
    }
  }
}
```

## 在 destoryed 生命周期释放资源

在 `destroyed` 生命周期释放原生事件、第三方组件、全局事件总线等

```js
import bus from 'event-bus'
import plugin from 'plugin'

export default {
  // ...
  created () {
    // 注册全局事件
    bus.$on('hello', this.hello)
    // 注册 DOM 事件
    window.addEventListener('resize', this.onResize)
    // 第三方组件初始化
    plugin.init()
  },
  destoryed () {
    bus.$off('hello', this.hello)
    window.removeEventListener('resize', onResize)
    plugin.destory()
  }
}

```

## 使用过滤器 filter

过滤器的最佳应用场景应该是值的转换，比如：Date 类型日期转字符串、货币、字符截断等等

```js
// 按长度截断文字，补... 中文 = 2
const cnReg = /[\u4e00=\u9fa5]/
Vue.filter('ellipsis', (str, len = 10) => {
  const text = String(str).trim()
  const max = text.length
  let i = 0
  let j = 0
  let ret = ''
  while (j < max && i < len) {
    const c = text.chartAt(j)
    ret += c
    j += 1
    i = cnReg.test(c) ? i + 2 : i + 1
  }
  return ret === text ? text : `${ret}...`
})
// 日期转换
import moment from 'moment'
Vue.filter('format', (value, format) => moment(value).format(format))
Vue.filter('fromNow', (value, format) => moment(value, format).fromNow())
// 角色区分
Vue.filter('userRole', value => ['创建者', '管理员', '成员'][value])
```

## 使用继承 extends

通过继承来扩展 `Element-ui` 等第三方组件库

```js
// dialogEx.js
import { Dialog } from 'element-ui'
import appendToBody from 'mixins/appendToBody'

export default {
  name: 'ElDialogEx',
  extends: Dialog, // 继承
  mixins: [appendToBody], // 混入
  props: {
    center: Boolean
  },
  computed: {
    // 这个 sizeClass 计算属性是组件源码里就有的
    // 这里是利用了类名支持字符串拼接的特性，在这个函数里增加了垂直居中的自定义类拼接
    sizeClass () {
      return `el-dialog--${this.size}` + this.center ? 'dialog-center' : ''
    }
  }
}

// mixins/appendToBody.js
export default {
  props: {
    // 把组件插入 body 下
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.appendToBody) document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this.appendToBody) this.$el.parentNode.remove(this.$el)
  }
}
```

## 使用 provide / inject

一个组件使用 provide 向下提供数据，那其下所有的子组件都可以通过 inject 来注入，不论组件层次有多深

一旦注入了某个数据，那这个组件中就不能再声明这个数据了

```js
// 把 app.vue 作为一个最外层的根组件
export default {
  provide () {
    return {
      // 向所有子组件提供  app.vue 的实例 this
      app: this
    }
  },
  data () {
    return {
      userInfo: null
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
      $.ajax('/user/info', (data) => {
        this.userInfo = data
      })
    }
  }
}
```

任何组件（或路由）只要通过 inject 注入了 app.vue 的 app ，都可以直接通过 this.app.xxx 来访问 app.vue 的 data、computed、methods 等内容

```js
export default {
  // 在子组建注入 app， this.app 就是整个 app.vue 的实例
  inject: ['app'],
  methods: {
    changeUserInfo () {
      // 这里修改完用户数据后，通知 app.vue 更新，以下为伪代码
      $.ajax('/user/update', () => {
        // 直接通过 this.app 就可以调用 app.vue 里的方法
        this.app.getUserInfo()
      })
    }
  }
}
```

## 使用派发与广播

使用 `dispatch` 和 `broadcast` 方法解决父子组件（含跨级）间的通信问题

+ 在子组件调用 `dispatch` 方法，向上级指定的组件实例（最近的）上触发自定义事件，并传递数据，上级组件通过 `$on` 监听了这个事件

+ 在父组件调用 `broadcast` 方法，向下级指定的组件实例（最近的）上触发自定义事件，并传递数据，下级组件通过 `$on` 监听了这个事件

```js
//  在 emitter.js 实现 dispatch 和 broadcast 方法
function broadcast(componentName, eventName, params) {
  // 遍历子组件
  this.$children.forEach(child => {
    // 组件名
    const name = child.$options.name

    if (name === componentName) {
      // 触发事件
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // 执行 broadcast方法
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    // 向上获取父级组件并触发 eventName 事件
    dispatch(componentName, eventName, params) {
      // 父级组件及其组件名
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName

      // 有父级组件 同时 没有 name 或者 name 不等于组件名
      while (parent && (!name || name !== componentName)) {
        // parent 向上获取父级组件
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      // 触发 eventName 事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    // 向下遍历子组件触发 eventName 事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
```

作为 mixins 导入， mixins 里定义的 dispatch 和 broadcast 方法会被混合到组件里，可以用 `this.dispatch` 和 `this.broadcast` 来使用

两个方法都接收了三个参数，第一个是组件的 name 值，用于向上或向下递归遍历来寻找对应的组件，第二个和第三个参数是自定义事件名称和要传递的数据

```js
// 父组件 A 向子组件 B 广播事件
import Emitter from '../mixins/emitter.js'
export default {
  name: 'ComponentA',
  mixins: [ Emitter ],
  created () {
    // 监听子组件 B 派发的事件
    this.$on('on-hello', msg)
    console.log(msg)
  },
  methods: {
    handleBroadcast () {
      // 向子组件 B 广播事件
      this.broadcast('ComponentB', 'on-message', 'Hello Vue.js');
    }
  }
}

// 子组件 B 监听事件
import Emitter from '../mixins/emitter.js'
export default {
  name: 'ComponentB',
  mixins: [ Emitter ],
  created () {
    // 监听父组件 A 广播的事件
    this.$on('on-message', msg)
    console.log(msg)
  },
  methods: {
    handleDispatch () {
      // 向父组件 A 派发事件
      this.dispatch('ComponentA', 'on-hello', 'hello, word')
    }
  }
}
```

## 找到任意组件实例 findComponents 系列方法

### 向上找到最近的指定组件 —— findComponentUpward

接收两个参数，第一个是当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 `this`；第二个参数是要找的组件的 `name`

```js
// 由一个组件，向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export { findComponentUpward }
```

### 向上找到所有的指定组件 —— findComponentsUpward

findComponentsUpward 返回的是一个数组，包含了所有找到的组件实例

该方法使用场景较少，一般只用在递归组件里面，因为这个函数是一直向上寻找父级的，只有递归组件的父级才是自身

```js
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
  let parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return [];
  }
}
export { findComponentsUpward }
```

### 向下找到最近的指定组件 —— findComponentDownward

```js
// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}
export { findComponentDownward }
```

### 向下找到所有指定的组件 —— findComponentsDownward

```js
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}
export { findComponentsDownward }
```

### 找到指定组件的兄弟组件 —— findBrothersComponents

findBrothersComponents 多了一个参数 exceptMe，是否把本身除外，默认是 true

```js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}
export { findBrothersComponents }
```

## 第三方库的集成

第三方库一般是传统的基于 DOM 和原生 js。一般都会提供以下的接口：

+ 使用自定义配置初始化
+ 可访问的属性
+ 可调用的功能函数
+ 事件绑定
+ 良好的生命周期钩子

### 把第三方库转换为一个 Vue 组件

其实就是把这个库的接口挂到 Vue 组件对应的组件选项上去

```js
import Lib from 'lib'

export default {
  props: {
    options: Object
  },
  data() {
    return {
      instance: null
    }
  },
  computed: {
    libProp() {
      // lib 的可访问属性使用计算属性访问
      // 外部使用 $refs 调用
      return this.instance.prop
    }
  },
  watch: {
    options(val) {
      // 监听配置更新，调用 lib 接口更新配置
      if (val) this.instance.updateOptions(val)
    }
  },
  mounted() {
    // mounted 或者 created 对应 lib 实例化并传入自定义配置
    this.instance = new Lib(this.$el, this.options)
    // lib 内的事件 $emit 出去，外部监听
    this.instance.on('update', (...args) => {
      this.$emit('update', ...args)
    })
  },
  methods: {
    // 外部使用 $refs 调用
    doSomething(xxx) {
      // lib 的操作函数
      this.instance.doSomething(xxx)
    }
  },
  destroyed() {
    // lib 如果提供了 destroy 等销毁资源的函数一般都会对其内部的 DOM 事件解绑
    this.instance.destroy()
  }
}
```

### 把一个库变为一个 Vue 指令

指令有着完善的生命周期钩子，但在数据管理上偏弱。一般用于单一功能的集成，或者只需要一次初始化的插件

```js
import Lib from 'lib'
export default {
  install(Vue, option = {}) {
    // 存放全局配置
    const defaults = option
    Vue.directive('my-directive', {
      bind(el, { value }) {
        // 当前配置混合全局配置
        const options = Object.assign({}, defaults, value)
        // 创建 lib 实例
        const lib = new Lib(el, options)
        // 缓存 lib 实例，挂载到 el
        el._libInstace = lib
      },
      update(el, { value }, vnode) {
        // 更新 lib 配置
        el._libInstace.setOptions(value)
      },
      unbind(el) {
        // 销毁 lib
        el._libInstace.destroy()
        delete el._libInstace
      }
    })
  }
}
```
