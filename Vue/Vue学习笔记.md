# Vue 学习笔记

## Vue 实例

创建 Vue 实例时，可以传入一个 `选项对象`。

```js
var vm = new Vue({
  // 选项
})
```

一个 Vue 应用是由一个根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。

只有当实例被创建时 `data` 中存在的属性才是响应式的。

### 生命周期

- `beforeCreate`：此时获取不到 `prop` 和 `data` 中的数据
- `created`：可以获取到 `prop` 和 `data` 中的数据
- `beforeMount`：获取到了 `VDOM`
- `mounted`：`VDOM` 解析成了真实 `DOM`
- `beforeUpdate`：在更新之前调用
- `updated`：在更新之后调用；
- `keep-alive`：切换组件之后，组件放进 `activated`，之前的组件放进 `deactivated`
- `beforeDestory`：在组件销毁之前调用，可以解决内存泄露的问题，如 `setTimeout` 和 `setInterval` 造成的问题
- `destory`：组件销毁之后调用

## 模板语法

### 插值

- 文本

  数据绑定最常见的形式就是使用双大括号 `{{}}` 的文本插值。

- 原始 `HTML`

  双大括号会将数据解释为普通文本，而非 `HTML` 代码，使用 `v-html` 指令输出真正的 `HTML`。

- `HTML`特性

  双大括号语法不能作用在 `HTML` 特性上，遇到这种情况应该使用 `v-bind` 指令。

  `<div v-bind:id="dynamicId"></div>`

- 使用 JS 表达式

  可以使用 JS 单个表达式，像三元表达式等

### 指令

指令是带有 `v-` 前缀的特殊特性，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数。

修饰符是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

```html
<p v-if="seen">现在你看到我了</p>
<a v-bind:href="url"></a>

<!-- 动态参数 -->
<a v-bind:[attributeName]="url"></a>
<a v-on:[eventName]="doSomething"></a>

<!-- 修饰符 -->
<form v-on:submit.prevent="onSubmit">...</form>

<!-- 缩写 -->
<a :href="url">...</a>
<a @click="doSomething">...</a>
```

## 计算属性(computed)和监听器(watch)

### 计算属性

模板内复杂的逻辑，应当使用计算属性(`computed`)。

计算属性是基于它们的依赖进行缓存的，只在相关依赖发生改变时它们才会重新求值。

相比之下，每当触发重新渲染时，调用方法(`methods`)将总会再次执行函数。

计算属性默认只有 `getter` ，不过在需要时你也可以提供一个 `setter`。

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}

```

### 监听器

当需要在数据变化时执行异步或开销较大的操作时，使用监听器(`watch`)。

除了 `watch` 选项之外，您还可以使用命令式的 `vm.$watch` API。

为了发现对象内部值的变化，可以在选项参数中指定 `deep: true`。

在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调。

```js
watch: {
  obj: {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    deep: true
  },
  // 使用字符串形式监听
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    // deep: true
  }
}
```

## Class 与 Style 绑定

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 `v-bind` 处理它们。

在将 `v-bind` 用于 `class` 和 `style` 时，表达式结果的类型除了字符串之外，还可以是对象或数组。

### 绑定 HTML 的 class

- 对象语法

可以传给 `v-bind:class` 一个对象，以动态地切换 class：`<div v-bind:class="{ active: isActive }"></div>`

在对象中传入更多属性来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存。

也可以在这里绑定一个返回对象的计算属性。

`<div v-bind:class="classObject"></div>`

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

- 数组语法

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表。

果你也想根据条件切换列表中的 class，可以用三元表达式。

`<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>`

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

当有多个条件 class 时这样写有些繁琐,所以在数组语法中也可以使用对象语法：

`<div v-bind:class="[{ active: isActive }, errorClass]"></div>`

### 绑定内联样式

- 对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。

CSS 属性名可以用驼峰式或短横线分隔 (要用单引号括起来) 来命名。

`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`

`<div v-bind:style="styleObject"></div>`

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

- 数组语法

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上。

`<div v-bind:style="[baseStyles, overridingStyles]"></div>`

- 自动添加前缀

当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

- 多重值

从 2.3.0 起可以为 `style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值。

这样写只会渲染数组中最后一个被浏览器支持的值。

`<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`

## 条件渲染

- `v-if`

`v-if` 指令用于条件性地渲染一块内容。

可以使用 `v-else` 指令来表示 `v-if` 的“else 块”。

`v-else-if`，充当 `v-if` 的“else-if 块”，可以连续使用。

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

如果两个元素是完全独立的，不要复用，则只需添加一个具有唯一值的 `key` 属性即可。

- `v-show`

`v-show` 的元素始终会被渲染并保留在 DOM 中，`v-show` 只是简单地切换元素的 CSS 属性 display。

- `v-if` vs `v-show`

`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。

如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## 列表渲染

用 `v-for` 指令根据一组数组的选项列表进行渲染。

`v-for` 指令需要使用 `item in list` 形式的特殊语法，`list` 是源数据数组并且 `item` 是数组元素迭代的别名。

需要为每项提供一个唯一 `key` 属性。

可以利用带有 `v-for` 的 `<template>` 渲染多个元素。

在 `v-for` 块中，我们拥有对父作用域属性的完全访问权限。

`v-for` 还支持一个可选的第二个参数为当前项的索引。

可以用 `of` 替代 `in` 作为分隔符，因为它是最接近 JavaScript 迭代器的语法。

可以用 `v-for` 通过一个对象的属性来迭代，提供第二个的参数为键名，第三个参数为索引。

在遍历对象时，是按 `Object.keys()` 的结果遍历。

```html
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

`v-for` 的优先级比`v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。

```js
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

### 数组更新检查

- 变异方法，将会触发视图更新

  - push()
  - pop()
  - shift()
  - unshift()
  - splice()
  - sort()
  - reverse()

- 非变异方法，不会改变原始数组，但总是返回一个新数组，可以用新数组替换旧数组

  - filter()
  - -concat()
  - slice()

- 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

  1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
  2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

解决第一类问题，有以下两种方式：`vm.$set`和`splice`

```js
// vm.$set 方法是全局方法 Vue.set 的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

`vm.items.splice(newLength)`

### 对象更改检测注意事项

由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除。

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。

可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性。

还可以使用 `vm.$set` 实例方法，它只是全局 Vue.set 的别名。

`vm.$set(vm.userProfile, 'age', 27)`

可以使用 `Object.assign()` 或 `_.extend()` 为已有对象赋予多个新属性。

```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

`<li v-for="n in evenNumbers">{{ n }}</li>`

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个 method 方法：

`<li v-for="n in even(numbers)">{{ n }}</li>`

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 事件处理

可以用 `v-on` 指令监听 DOM 事件。

有时也需要在内联语句处理器中访问原始的 DOM 事件，可以用特殊变量 `$event` 把它传入方法。

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

### 事件修饰符

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

`.once` 修饰符还能被用到自定义的组件事件上。

```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

Vue 还对应 `addEventListener` 中的 `passive` 选项提供了 `.passive` 修饰符。

这个 `.passive` 修饰符尤其能够提升移动端的性能。

不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略。

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

### 按键修饰符

你可以直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 `kebab-case` 来作为修饰符。

`<input v-on:keyup.page-down="onPageDown">`

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

  2.5.0 新增 `.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

## 表单输入绑定

可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。

应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部使用不同的属性为不同的输入元素并抛出不同的事件：

- `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件；
- `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件；
- `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件。

### 值绑定

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle" />

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

### 修饰符

- `.lazy`

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。

可以添加 `.lazy` 修饰符，从而转变为使用 `change` 事件进行同步。

- `.number`

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符。

这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。

如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

- `.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符。

## 组件

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

一个组件的 `data` 必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。

### 注册组件

组件是可复用的 Vue 实例，在注册一个组件的时候，需要给它一个名字，可以使用短横线分隔命名，也可以使用大驼峰命名。

在引用这个自定义元素时两种命名法都可以使用，直接在 DOM (非模板或单文件组件中) 中使用时只有短横线分隔命名是有效的。

使用 `Vue.component` 来全局注册组件。

可以 `components` 选项中局部注册自定义组件。

### Prop

HTML 中的特性名是大小写不敏感的，浏览器会把所有大写字符解释为小写字符。

当使用 DOM 中的模板时，驼峰命名法 的 `prop` 名需要使用其等价的短横线分隔命名，如果使用字符串模板，没有这个限制。

`prop` 可以通过 `v-bind` 动态赋值。

`prop` 传入数字、布尔值、数组、对象需要 `v-bind`。

如果要将一个对象的所有属性都作为 `prop` 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

`<blog-post v-bind="post"></blog-post>`

可以为组件的 `prop` 指定验证要求。

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 `inheritAttrs: false`。

所有的 `prop` 都使得其父子 `prop` 之间形成了一个单向下行绑定。不应该在一个子组件内部改变 `prop`。

两种常见的试图改变一个 prop 的情形：

- 这个 `prop` 用来传递一个初始值，定义一个本地的 `data` 属性并将这个 `prop` 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

- 这个 `prop` 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 `prop` 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
normalizedSize: function () {
  return this.size.trim().toLowerCase()
  }
}
```

### 自定义事件

不同于组件和 `prop`，事件名不存在任何自动化的大小写转换。

而是触发的事件名需要完全匹配监听这个事件所用的名称。

一个组件上的 `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件。

`v-model` 是语法糖，`<input v-model="searchText">` 等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
/>
```

但是像单选框、复选框等类型的输入控件可能会将 `value` 特性用于不同的目的。`model` 选项可以用来避免这样的冲突：

```js
Vue.component('base-checkbox', {
  // 名为 checked 的 prop,名为 change 的事件
  model: {
    prop: 'checked',
    event: 'change'
  },
  // 需要在组件的 props 选项里声明 checked 这个 prop
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

监听一个原生事件可以使用 `v-on` 的 `.native` 修饰符。

`<base-input v-on:focus.native="onFocus"></base-input>`

`$listeners` 属性是一个对象，里面包含了作用在这个组件上的所有监听器。

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function() {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

在有些情况下，我们可能需要对一个 `prop` 进行“双向绑定”。推荐以 `update:myPropName` 的模式触发事件。

举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

`this.$emit('update:title', newTitle)`

然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如：

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符。

`<text-document v-bind:title.sync="doc.title"></text-document>`

有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用，只能提供你想要绑定的属性名，类似 `v-model`。

当我们用一个对象同时设置多个 `prop` 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用。

`<text-document v-bind.sync="doc"></text-document>`

这样会把 doc 对象中的每一个属性都作为一个独立的 `prop` 传进去，然后各自添加用于更新的 `v-on` 监听器。

### 插槽

在 2.6.0 中，为具名插槽和作用域插槽引入了一个新的统一的语法 (即 `v-slot` 指令)。

它取代了 `slot` 和 `slot-scope` 这两个目前已被废弃但未被移除且仍在文档中的特性。

Vue 实现了一套内容分发的 API，将 `<slot>` 元素作为承载分发内容的出口。

有时我们需要多个插槽，`name` 特性可以用来定义额外的插槽，个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称。

绑定在 `<slot>` 元素上的特性被称为插槽 `prop`。可以给 `v-slot` 带一个值来定义我们提供的插槽 `prop` 的名字。

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上。

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确。

只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>

<!-- 有效 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

可以使用解构来传入具体的插槽 `prop`

```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

动态指令参数也可以用在 `v-slot` 上，来定义动态的插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。和其它指令一样，该缩写只在其有参数的时候才可用

例如 `v-slot:header` 可以被重写为 `#header`

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

<!-- 缩写只在其有参数的时候才可用 -->
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

### 动态组件和异步组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里。

可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` 特性来实现。

`<component v-bind:is="currentTabComponent"></component>`

`currentTabComponent` 可以包括已注册组件的名字，或一个组件的选项对象。

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。

可以用一个 `<keep-alive>` 元素将其动态组件包裹起来，`<keep-alive>` 要求被切换到的组件都有自己的名字。

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。

Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

异步组件工厂函数也可以返回一个如下格式的对象：

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### 处理边界情况

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` 属性进行访问。

根实例中：

```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function() {}
  },
  methods: {
    baz: function() {}
  }
})
```

所有的子组件都可以将这个实例作为一个全局 `store` 来访问或使用。

```js
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

和 `$root` 类似，`$parent` 属性可以用来从一个子组件访问父组件的实例。

可以通过 `ref` 特性为子组件赋予一个 ID 引用，使用 `$refs` 来访问。

`provide` 选项允许我们指定我们想要提供给后代组件的数据/方法。

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收。

## 可复用性和组合

### 混入(mixins)

混入 (mixins) 是一种分发 Vue 组件中可复用功能的一种方式，混入对象可以包含任意组件选项。

当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。

`data` 对象在内部会进行递归合并，在和组件的数据发生冲突时以组件数据优先。

同名钩子函数将混合为一个数组，都将被调用，混入对象的钩子将在组件自身钩子之前调用。

值为对象的选项，例如 `methods`, `components` 和 `directives`，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。

`Vue.extend()` 也使用同样的策略进行合并。

### 自定义指令

代码复用和抽象的主要形式是组件。然而，当需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})

// 组件中也接受一个 directives 的选项
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

指令钩子函数会被传入以下参数:

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
- `binding`：一个对象，包含以下属性：
  - `name`：指令名，不包括 v- 前缀。
  - `value`：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - `oldValue`：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - `arg`：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### render 函数

Vue 推荐在绝大多数情况下使用 `template` 来创建你的 HTML。

也可以用 `render` 函数，它比 `template` 更接近编译器。

Vue 通过建立一个`虚拟 DOM` 对真实 `DOM` 发生的变化保持追踪。

`<h1>{{ blogTitle }}</h1>`

```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

`createElement` 接受的参数:

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者
  // 解析上述任何一种的一个 async 异步函数。必需参数。
  'div',

  // {Object}
  // 一个包含模板相关属性的数据对象
  // 你可以在 template 中使用这些特性。可选参数。
  {
    // ( VNode 数据对象)
  },

  // {String | Array}
  // 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选参数。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

`VNode` 数据对象

```js
{
  // 和`v-bind:class`一样的 API
  // 接收一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  // 接收一个字符串、对象或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽格式
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中向多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

### 插件

Vue.js 的插件应该有一个公开方法 `install`。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成

### 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 `v-bind` 表达式

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

可以在一个组件的选项中定义本地的过滤器，也可以在创建 Vue 实例之前全局定义过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。

过滤器可以串联：`{{ message | filterA | filterB }}`
