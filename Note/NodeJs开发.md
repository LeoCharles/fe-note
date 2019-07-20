# NodeJs 开发

+ 使用 babel7 和 nodemon 进行项目开发

  1. 安装相关 npm 包

  ```shll
    cnpm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
    cnpm install --save-dev nodemon
  ```

  1. 创建 `.babelrc` 文件

  ```js
  "presets": [
    "@babel/preset-env"
  ]
  ```

  1. 在 `package.json` 中添加 `scripts` 语句

  ```js
  "scripts": {
    "start": "nodemon --exec babel-node server/index.js"
  }
  ```
