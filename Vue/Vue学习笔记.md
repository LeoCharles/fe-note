# Vue 学习笔记

## 渲染目标元素

### Vue(options)

+ 直接使用 Vue 实例，传入一个选项对象。

```js
new Vue({
  el: "#app",
  template: "<h1>{{ msg }}</h1>",
  data: {
    msg: "Hello Vue.js!"
  }
})
```

### Vue.extend(options)

+ 使用 Vue.extend 扩展一个 Vue 基础构造器的 “子类”。参数同 Vue(options)一样，唯一的不同是没有 el 属性来指定挂载的DOM元素，所以这里需要通过 $mount() 方法，来手动实现挂载。
+ Vue.extend 生成了一个 Vue 的子类，需要 new 关键字来重新创建实例。需要注意Vue.extend()中 data 选项它必须是函数。

```js
var Extend = Vue.extend({
  template: "<h1>{{ msg }}</h1>",
  data () {
    return {
      msg: "Hello Vue.js!"
    }
  }
})
new Extend().$mount('#app');

```

### Vue.component( id, [definition] )

+ 使用 Vue.component(id, [definition]) 注册一个名称为 id 的全局组件，可以通过使用该组件来实现目标元素渲染。Vue.component(id) 获取名为 id 的全局组件。
+ definition 参数可以是 Vue.extend() 扩展的实例,也可以是一个对象(会自动调用extend方法) 。

```js
// 1. 注册组件
Vue.component('my-component', {
  template: "<h1>{{ msg }}</h1>",
  data () {
    return {
      msg: "Hello Vue.js!"
    }
  }
})
// 2. 通过创建Vue实例来使用
new Vue({
  el: '#app',
  template: "<my-component/>"
})
```

### Vue.directive( id, [definition] )

+ 使用 Vue.directive(id, [definition]) 来自定义一个指令，响应式地作用于目标元素。

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
}
// 使用
<input v-focus>
```

### Vue.compile(template)

+ Vue.compile(template) 参数也就是 Vue选项对象的 template 模板字符串属性，通过替换 Vue实例的 template选项，再手动指定render 函数的渲染模板来实现渲染。

```js
var tpl = Vue.compile('<h1>{{ msg }}</h1>')
new Vue({
  el: "#app",
  data () {
    return {
      msg: "Hello Vue.js!"
    }
  },
  render: tpl.render
})
```

### render

+ 字符串模板的代替方案，该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
+ Vue 选项对象中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。

```js
new Vue({
  el: "#app",
  data () {
    return {
      msg: "Hello Vue.js!"
    }
  },
  render: function (createElement) {
    return createElement('h1', this.msg)
  }
})
```