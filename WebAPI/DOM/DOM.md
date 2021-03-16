# DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作。

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。

DOM 的最小组成单位叫做节点（node），节点的类型有七种：

+ Document：整个文档树的顶层节点。类型值：9, 常量: Node.DOCUMENT_NODE
+ DocumentType：doctype 标签（比如`<!DOCTYPE html>`）。类型值：10， 常量: Node.DOCUMENT_TYPE_NODE
+ Element：网页的各种HTML标签（比如`<body>、<a>`等）。类型值：1， 常量: Node.ELEMENT_NODE
+ Attribute：网页元素的属性（比如`class="right"`）。类型值：2， 常量: Node.ATTRIBUTE_NODE
+ Text：标签之间或标签包含的文本。类型值：3， 常量: Node.TEXT_NODE
+ Comment：注释。类型值：8， 常量: Node.COMMENT_NODE
+ DocumentFragment：文档的片段。类型值：11， 常量: Node.DOCUMENT_FRAGMENT_NODE

浏览器原生提供 document 节点，代表整个文档。

文档的第一层只有一个节点，就是 HTML 网页的第一个标签 `<html>`，它构成了树结构的根节点（root node）。

除了根节点，其他节点都有三种层级关系：

+ 父节点关系（parentNode）：直接的那个上级节点
+ 子节点关系（childNodes）：直接的下级节点
+ 同级节点关系（sibling）：拥有同一个父节点的节点

## Node

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。

实例属性:

+ `nodeType` 属性返回一个整数值，表示节点的类型。
+ `nodeName` 属性返回节点的名称。
+ `nodeValue` 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。只有文本节点和注释节点有文本值，其他类型的节点一律返回 null。
+ `textContent` 属性返回当前节点和它的所有后代节点的文本内容，该属性可读写。
  + 该属性会自动忽略当前节点内部的 HTML 标签，返回所有文本内容。
  + 设置该属性的值时，会用一个新的文本节点，替换所有原来的子节点。会自动对 HTML 标签转义。会将标签解释为文本，而不会当作标签处理。
+ `baseURI` 属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。
+ `ownerDocument` 属性返回当前节点所在的顶层文档对象，即document对象。
+ `nextSibling` 属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null。返回的节点还包括文本节点和注释节点。
+ `previousSibling` 属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。
+ `parentNode` 属性返回当前节点的父节点。
  + 父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。
+ `parentElement` 属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null。
+ `firstChild` 属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。返回的返回的节点，还可能是文本节点或注释节点。
+ `lastChild` 属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。返回的返回的节点，还可能是文本节点或注释节点。
+ `childNodes` 属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
+ `isConnected` 属性返回一个布尔值，表示当前节点是否在文档之中。

实例方法：

+ `appendChild()` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
  + 如果 appendChild 方法的参数是 DocumentFragment 节点，那么插入的是 DocumentFragment 的所有子节点，而不是DocumentFragment节点本身。
+ `cloneNode` 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
  + 克隆一个节点，会拷贝该节点的所有属性，但是会丧失 addEventListener 方法和 on- 属性（即node.onclick = fn），添加在这个节点上的事件回调函数。
  + 该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如 Node.appendChild 这样的方法添加到文档之中。
  + 克隆一个节点之后，DOM 有可能出现两个有相同 id 属性的网页元素，这时应该修改其中一个元素的 id 属性。如果原节点有 name 属性，可能也需要修改。
+ `insertBefore` 方法用于将某个新节点插入父节点内部的指定位置。返回值是插入的新节点。
  + 第一个参数是所要插入的新节点，第二个参数是父节点内部的一个子节点。新节点将插在这个子节点的前面。
  + 如果第二个参数为 null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。
+ `removeChild()` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
+ `replaceChild()` 方法用于将一个新的节点，替换当前节点的某一个子节点。
+ `isEqualNode()` 方法返回一个布尔值，用于检查两个节点是否相等。
+ `isSameNode()` 方法返回一个布尔值，表示两个节点是否为同一个节点。
+ `normailize()` 方法用于清理当前节点内部的所有文本节点（text）。
+ `getRootNode()` 方法返回当前节点所在文档的根节点，与 ownerDocument 属性的作用相同。
+ `hasChildNodes` 方法返回一个布尔值，表示当前节点是否有子节点。

## NodeList

NodeList 实例是一个类似数组的对象，可以使用 length 属性和 forEach 方法。它的成员是节点对象。

通过以下方法可以得到 NodeList 实例。

+ Node.childNodes 属性。
+ document.querySelectorAll()等节点搜索方法。

实例方法：

+ `item()` 方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
+ `keys()` 返回键名的遍历器。
+ `values()` 返回键值的遍历器。
+ `entries()` 返回键值对的遍历器。

## HTMLCollection

HTMLCollection 是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。

HTMLCollection 实例都是动态集合，节点的变化会实时反映在集合中。

它的返回值是一个类似数组的对象，但是与 NodeList 接口不同，HTMLCollection 没有 forEach 方法，只能使用 for 循环遍历。

返回 HTMLCollection 实例的，主要是一些 Document 对象的集合属性，比如 document.links、docuement.forms、document.images等。

## Document

document 节点对象代表整个文档，每张网页都有自己的 document 对象。window.document 属性就指向这个对象。

document 对象继承了 EventTarget 接口、Node  接口、ParentNode 接口。这些接口的方法都可以在document对象上调用。