# Vue最佳实践

>记录在使用 Vue 中发现的一些好的代码实践

## this 引用

在组件作用域内使用箭头函数，可以保证 `this` 永远指向组件本身。

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

## 释放资源

在 `destroyed` 生命周期释放原生事件、第三方组件、全局事件总线等。

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

## 过滤器

过滤器的最佳应用场景应该是值的转换，比如：Date 类型日期转字符串、货币、字符截断等等。

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

## 继承和混合

通过继承和混合来扩展 `Element-ui` 等第三方组件库。

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

## 第三方库的集成

第三方库一般是传统的基于 DOM 和原生 js。一般都会提供以下的接口：

+ 使用自定义配置初始化
+ 可访问的属性
+ 可调用的功能函数
+ 事件绑定
+ 良好的生命周期钩子

### 把第三方库转换为一个 Vue 组件

其实就是把这个库的接口挂到 Vue 组件对应的组件选项上去。

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

把一个库变为一个 Vue 指令。指令有着完善的生命周期钩子，但在数据管理上偏弱。一般用于单一功能的集成，或者只需要一次初始化的插件。

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