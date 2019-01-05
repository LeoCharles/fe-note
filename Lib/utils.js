/* 工具函数 */

/**
 * 判断数据类型
 */
function $typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}


/**
 * 判断是否对象是否为空
 */
function $isEmpty(val) {
  return val === null || !(Object.keys(val) || val).length
}


/**
 * 数组和对象的深拷贝，不能序列化函数，会忽略 undefined
 */
function $clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}


/**
 * 深拷贝
 */
function $deepClone(obj) {
  let temp = obj.constructor === Array ? [] : {}
  for (let k in obj) {
    temp[k] = $typeOf(obj[k]) == 'object' ? $deepClone(obj[k]) : obj[k]
  }
  return temp
}

/**
 * 生成唯一ID
 */
function $generateUniqueId() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 对象数组去重
 */

function $unique(array) {
  var obj = {}
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

/**
 * 根据对象数组根据对象中的元素去重
 */

function $uniqueBy(array, key) {
  var obj = {}
  return array.reduce(function (item, next) {
    obj[next[key]] ? '' : obj[next[key]] = true && item.push(next)
    return item
  }, [])
}

/**
 * 格式化时间
 * 时间格式 "{y}-{m}-{d} {a} {h}:{i}:{s}"
 */
function $parseTime(time, cFormat) {
  if (!arguments) {
    return ''
  }
  // 默认显示 年月日
  let format = cFormat || '{y}-{m}-{d}'
  let date
  if ($typeOf(time) === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    }
    date = new Date(time)
  }
  let formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  let timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}


/**
 * 已过时间
 */
function $formatPassTime(startTime) {
  let currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12)
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}


/**
 * 截止时间
 */
function $formatRemainTime(endTime) {
  var startDate = new Date() //开始时间
  var endDate = new Date(endTime) //结束时间
  var t = endDate.getTime() - startDate.getTime() //时间差
  var d = 0,
    h = 0,
    m = 0,
    s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒"
}


/**
 *  url 参数转对象
 */
function $parseQueryString(url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}



/**
 * 设置 localStorage
 */
function $setLocalStorage(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
  }
}


/**
 * 获取 localStorage
 */
function $getLocalStorage(key) {
  var json = ''
  if (window.localStorage) {
    json = window.localStorage.getItem(key)
  }
  return window.JSON.parse(json)
}


/**
 * 删除 localStorage
 */
function $delLocalStorage(key) {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  }
}

/**
 * 函数节流
 */
function $throttle(fn, wait = 100) {
  // 利用闭包保存定时器和上次执行时间
  let timer = null
  let previous // 上次执行时间
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const args = arguments
    const now = +new Date()
    if (previous && now < previous + wait) { // 周期之中
      clearTimeout(timer)
      timer = setTimeout(function () {
        previous = now
        fn.apply(context, args)
      }, wait)
    } else {
      previous = now
      fn.apply(context, args)
    }
  }
}

/**
 * 函数防抖
 */
function $debounce(fn, delay = 100) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/*
* 扁平对象转为树形对象，parent字段为空字符串的节点为根节点
*/
function plain2Tree(obj) {
  let key = null
  let res = {}
  for (key in obj) {
    const parent = obj[key].parent
    if (parent === '') {
      res = obj[key]
    } else {
      obj[parent][key] = obj[key]
    }
  }
  return res
}

/**
 *  微信小程序异步函数转成 promise
 */
 const promisify = original => {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}
  /* 示例
  promisify(wx.getStorage)({key: 'key'}).then(res => {
    // success
  }).catch(err => {
      // fail
  })
 */
 
 /**
 * 微信实现 watch 属性，监听数据变化
 * 首先在需要的页面引入
 * 在 Page 的onLoad钩子设置监听器
 */
 function observe(obj, key, watchFun, deep, page) {
  let val = obj[key];

  if (val != null && typeof val === "object" && deep) {
    Object.keys(val).forEach((item) => {
      observe(val, item, watchFun, deep, page);
    });
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function(value) {
      watchFun.call(page, value, val);
      val = value;

      if (deep) {
        observe(obj, key, watchFun, deep, page);
      }
    },
    get: function() {
      return val;
    }
  });
}

export function setWatcher(page) {
  let data = page.data;
  let watch = page.watch;

  Object.keys(watch).forEach((item) => {
    let targetData = data;
    let keys = item.split(".");

    for (let i = 0; i < keys.length - 1; i++) {
      targetData = targetData[keys[i]];
    }

    let targetKey = keys[keys.length - 1];

    let watchFun = watch[item].handler || watch[item];

    let deep = watch[item].deep;
    observe(targetData, targetKey, watchFun, deep, page);
  });
}
