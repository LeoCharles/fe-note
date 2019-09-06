/* 工具函数 */

/**
 * 判断数据类型
 */
function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}


/**
 * 判断是否对象是否为空
 */
function isEmpty(val) {
  return val === null || !(Object.keys(val) || val).length
}


/**
 * 数组和对象的深拷贝，不能序列化函数，会忽略 undefined
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}


/**
 * 深拷贝
 */
function deepClone(obj) {
  let temp = obj.constructor === Array ? [] : {}
  for (let k in obj) {
    temp[k] = typeOf(obj[k]) == 'object' ? deepClone(obj[k]) : obj[k]
  }
  return temp
}

function deepCopy(data) {
  const t = typeOf(data)
  let o
  
  if (t === 'array') {
    o = []
  } else if ( t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if ( t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * 生成唯一ID
 */
function getUniqueId() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 生成随机字符串
 */
function getRandomStr() {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}


/**
 * 字符串首位大写
 */
function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getExplorerInfo() {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}

/**
 * 对象数组去重
 */
function unique(array) {
  let obj = {}
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

/**
 * 对象数组根据某一属性名去重
 */

function uniqueBy(array, key) {
  return array.filter((item, index, self) => {
    return self.findIndex(el => el[key] === item[key]) ===index
  })
}

function uniqueBy2(array, key) {
  let obj = {}
  return array.reduce(function (item, next) {
    obj[next[key]] ? '' : obj[next[key]] = true && item.push(next)
    return item
  }, [])
}

/**
 * 格式化时间
 * dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
 * dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
 */
function dateFormater(formater, t){
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g,Y)
    .replace(/YY|yy/g,Y.substr(2,2))
    .replace(/MM/g,(M<10?'0':'') + M)
    .replace(/DD/g,(D<10?'0':'') + D)
    .replace(/HH|hh/g,(H<10?'0':'') + H)
    .replace(/mm/g,(m<10?'0':'') + m)
    .replace(/ss/g,(s<10?'0':'') + s)
}


/**
 * 将指定字符串由一种时间格式转化为另一种
 * dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 */
function dateStrForma(str, from, to){
  str += ''
  let Y = ''
  if(~(Y = from.indexOf('YYYY'))){
    Y = str.substr(Y, 4)
    to = to.replace(/YYYY|yyyy/g,Y)
  }else if(~(Y = from.indexOf('YY'))){
    Y = str.substr(Y, 2)
    to = to.replace(/YY|yy/g,Y)
  }

  let k,i
  ['M','D','H','h','m','s'].forEach(s =>{
    i = from.indexOf(s+s)
    k = ~i ? str.substr(i, 2) : ''
    to = to.replace(s+s, k)
  })
  return to
}


/**
 * 已过时间
 */
function formatPassTime(startTime) {
  let currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12)
  if (year) return year + '年前'
  if (month) return month + '个月前'
  if (day) return day + '天前'
  if (hour) return hour + '小时前'
  if (min) return min + '分钟前'
  else return '刚刚'
}


/**
 * 截止时间
 */
function formatRemainTime(endTime) {
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
  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒'
}

/**
 *  url 参数转对象
 */
function parseQueryString(url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


/**
 * 全屏
 */
function toFullScreen(){
  let elem = document.body;
  elem.webkitRequestFullScreen
  ? elem.webkitRequestFullScreen()
  : elem.mozRequestFullScreen
  ? elem.mozRequestFullScreen()
  : elem.msRequestFullscreen
  ? elem.msRequestFullscreen()
  : elem.requestFullScreen
  ? elem.requestFullScreen()
  : alert('浏览器不支持全屏');
}

/**
 * 退出全屏
 */
function exitFullscreen(){
  let elem = parent.document;
  elem.webkitCancelFullScreen
  ? elem.webkitCancelFullScreen()
  : elem.mozCancelFullScreen
  ? elem.mozCancelFullScreen()
  : elem.cancelFullScreen
  ? elem.cancelFullScreen()
  : elem.msExitFullscreen
  ? elem.msExitFullscreen()
  : elem.exitFullscreen
  ? elem.exitFullscreen()
  : alert('切换失败,可尝试Esc退出');
}


/**
 * base64数据导出文件，文件下载
 */
function downloadFile(filename, data){
  let DownloadLink = document.createElement('a');
  if ( DownloadLink ){
    document.body.appendChild(DownloadLink);
    DownloadLink.style = 'display: none';
    DownloadLink.download = filename;
    DownloadLink.href = data;
    if ( document.createEvent ){
      let DownloadEvt = document.createEvent('MouseEvents');
      DownloadEvt.initEvent('click', true, false);
      DownloadLink.dispatchEvent(DownloadEvt);
    }
    else if ( document.createEventObject )
      DownloadLink.fireEvent('onclick');
    else if (typeof DownloadLink.onclick == 'function' )
      DownloadLink.onclick();
    document.body.removeChild(DownloadLink);
  }
}

/**
 * 设置 localStorage
 */
function setLocalStorage(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
  }
}

/**
 * 禁止右键、选择、复制
 */
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
  document.addEventListener(ev, function(event){
      return event.returnValue = false
  })
})

/**
 * 获取 localStorage
 */
function getLocalStorage(key) {
  var json = ''
  if (window.localStorage) {
    json = window.localStorage.getItem(key)
  }
  return window.JSON.parse(json)
}


/**
 * 删除 localStorage
 */
function delLocalStorage(key) {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  }
}

/**
 * 函数节流
 */
function throttle(fn, wait = 100) {
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
function debounce(fn, delay = 100) {
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
 * 把一个树形结构，变成扁平化列表
 */
function toFlat(tree, [key, ...rest], result = {}) {
  if (result[key] == null) {
    result[key] = tree.value;
  } else if (result[key] !== tree.value) {
    result = {
      ...result,
      [key]: tree.value
    };
  }
  return rest.length ? toFlatList(tree.children, rest, result) : [result];
}

/**
 * 把一个树形结构的列表，变成扁平化列表
 */
function toFlatList(treeList, keys, result = {}) {
  return treeList.reduce(
    (list, tree) => list.concat(toFlat(tree, keys, result)),
    []
  );
}

/**
 * 转换树形结构为列表结构
 */
function treeToList(treeList = [], keys) {
  return toFlatList(treeList, keys);
}

/**
 * 将一个扁平对象，根据 keys 树形化
 */
function toTree(obj, [key, ...rest], result = {}) {
  if (result.value == null) {
    result.value = obj[key]
    if (rest.length) {
      result.children = toTreeList(obj, rest)
    }
  } else if (result.value === obj[key] && rest.length) {
    toTreeList(obj, rest, result.children)
  }
  return result
}

/**
 * 一个扁平对象的树形化产物，不重复地放到 list 里
 */
function toTreeList(obj, keys, list = []) {
    let value = obj[keys[0]]
    let target = list.find(item => item.value === value)
    if (target) {
      toTree(obj, keys, target)
    } else {
      list.push(toTree(obj, keys))
    }
    return list
}

/**
 * 将一个扁平化对象组成的列表，变成树形化的列表
 */
function listToTree(list=[], keys=[]) {
  return list.reduce(
    (result, obj) => toTreeList(obj, keys, result),
    []
  )
}

