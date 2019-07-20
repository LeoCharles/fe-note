# React 小技巧

+ 使用 dva 时，引入多个 models

```js
// 在 /models 目录下新建 index.js , 导入所有 models
const context = require.context('./', false, /\.js$/)

export default context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key))


// 在入口文件 index.js 中，将所有 models 引入
require('./models').default.forEach(item => app.model(item.default))
```
