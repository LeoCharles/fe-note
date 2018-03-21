# Vuex

## Vuex是什么

+ 专为Vue.js应用程序开发的 状态管理模式
+ 采用集中式存储管理应用的所有组件的状态
+ 以相应的规则保证状态以一种可预测的方式发生变化
+ 每一个 Vuex 应用的核心就是 store（仓库）

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
+ 引入Vue和Vuex
    ```js
      import Vue from 'vue'
      import Vuex from 'vuex'
    ````
+ 使用Vuex
    ```js
      Vue.use(Vuex)
      const store = new Vuex.Store({...options})
    ````
