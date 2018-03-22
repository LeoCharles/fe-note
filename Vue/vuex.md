# Vuex

## Vuex是什么

+ 专为Vue.js应用程序开发的 状态管理模式
+ 采用集中式存储管理应用的所有组件的状态
+ 以相应的规则保证状态以一种可预测的方式发生变化
+ 每一个 Vuex 应用的核心就是 store（容器）

## 状态（数据）

+ 组件内部状态：仅在一个组件内使用的状态（data字段）
+ 应用级别状态：多个组件共用的状态，如：用户名、用户登录状态、用户地理位置等

## 状态自管理应用

+ state：驱动应用的数据源
+ view：以声明的方式将state映射到视图
+ actions：响应在view上的用户输入导致的状态变化

## 什么情况下使用Vuex

+ 多个视图依赖同一状态
+ 来自不同视图的行为需要变更同一状态

## 引入Vuex

+ 使用npm包管理工具安装Vuex
    ```js
      npm install vuex --save
    ````
+ 引入Vue和Vuex，并将Vuex挂载到Vue
    ```js
      import Vue from 'vue'
      import Vuex from 'vuex'
      Vue.use(Vuex)
    ````
+ 创建store容器，并注入到根组件
    ```js
      const store = new Vuex.Store({...options})
      new Vue({
        el: '#app',
        store,
        template: '<App/>',
        components: { App }
      })
    ````

## 最简单的store（容器）

  ```js
    const store = new Vuex.Store({
      /* 状态 */
      state: {
        count: 0
      },
      /* 改变状态的方法 */
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })
  ```

+ 通过 store.state 来获取状态对象，通过 store.commit 方法显式的触发状态变更。
    ```js
    store.commit('increment')
    ```
+ store（容器） 中的状态（state）是响应式的，在组件中调用 store 中的状态只需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。

## State 状态

+ Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态，这也意味着，每个应用将仅仅包含一个 store 实例。
+ 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store.state 访问到状态对象。
+ mapState 辅助函数，当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余，可以使用 mapState 辅助函数帮助我们生成计算属性。
+ 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    ```js
    computed: mapState([
      'count'
    ])
    ```
+ mapState 函数返回的是一个对象，使用对象展开运算符将它与局部计算属性合并为一个对象，将最终对象传给 computed 属性。
    ```js
    computed: {
    localComputed () { /* ... */ },
    /* 使用对象展开运算符将此对象混入到外部对象中 */
    ...mapState({
      /* ... */
    })
  }
    ```
+ 使用 Vuex 并不意味着需要将所有的状态放入 state，如果有些状态严格属于单个组件，最好还是作为组件的局部状态。

## Getter

+ Vuex 可以在 store 中定义“getter”（可以认为是 store 的计算属性）。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
+ Getter 接受 state 作为其第一个参数，也可以接受其他 getter 作为第二个参数。
+ mapGetters 辅助函数将 store 中的 getter 映射到计算属性。
    ```js
    import { mapGetters } from 'vuex'
    export default {
      computed: {
        /* 使用对象展开运算符将 getter 混入 computed 对象中 */
        ...mapGetters([
          /* ... */
        ])
      }
    }
    ```

## Mutation

+ 更改 store 中的状态的唯一方法是提交 mutations
+ mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
    ```js
      const store = new Vuex.Store({
      state: {
        count: 1
      },
      /* 类似事件注册 */
      mutations: {
        /* 当触发一个类型为 increment 的 mutation 时，调用此函数 */
        increment (state) {
          /* 变更状态 */
          state.count++
        }
      }
    })
    ```
+ 不能直接调用一个 mutation 回调函数，需要以相应的 type 调用 store.commit 方法，`store.commit('increment')`
+ 向 store.commit 传入额外的参数，即 mutation 的 载荷（payload），在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读。
    ```js
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
    store.commit('increment', {
      amount: 10
    })
    ```
+ 提交 mutation 的另一种方式是直接使用包含 type 属性的对象
    ```js
    store.commit({
      type: 'increment',
      amount: 10
    })
    ```
+ Mutation 需遵守 Vue 的响应规则
    1. 提前在state中初始化所有所需属性
    2. 在对象上添加新属性时，使用`Vue.set(obj, 'newProp', 123)` 或 `state.obj = {...state.obj, newProp: 123}`
+ 使用常量替代 Mutation 事件类型
+ mutation必须是同步函数，异步无法追踪
+ 组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。
    ```js
    import { mapMutations } from 'vuex'
    export default {
      methods: {
        ...mapMutations([
          'increment'
        ]),
        ...mapMutations({
          add: 'increment'
        })
      }
    }
    ```

## Action

+ Action 类似于 mutation，不同在于：
    1. Action 提交的是 mutation，而不是直接变更状态
    1. Action 可以包含任意异步操作
    ```js
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })
    ```
+ action 接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
+ 当需要调用 commit 很多次的时候，可以用 参数解构 来简化代码
    ```js
      actions: {
        increment ({ commit }) {
          commit('increment')
        }
      }
    ```
+ action 通过 store.dispatch 方法触发，支持载荷方式和对象方式进行分发。
    ```js
    incrementAsync ({ commit }) {
      /* 在 action 内部执行异步操作 */
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
    /* 以载荷形式分发 */
    store.dispatch('incrementAsync', {
      amount: 10
    })
    ```
+ 在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用。