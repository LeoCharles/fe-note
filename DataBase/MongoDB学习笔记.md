# MongoDB 学习笔记

+ 基本概念：

  + `collection`：数据库表/集合
  + `document`：数据记录行/文档
  + `fidld`：数据字段
  + `index`：索引
  + `primary key`：主键，MongoDB 将自动将 `_id` 字段设置为主键

+ 基本命令：

  + `show dbs`：查看所有的数据库
  + `db`：查看当前数据库
  + `use`：使用一个数据库
  + `show collections`：查看当前数据库下所有的集合

+ 连接数据库：

  `mongodb://username:password@host:port/database?options`

  + `mongodb://`：固定格式，必选项
  + `username:password@`： 用户名密码，可选项
  + `host:port`：主机和端口，指定要连接服务器的地址，默认端口27017
  + `/database`：要连接的数据库名，若不指定，默认打开 test 数据库
  + `?options`: 连接选项

+ 创建数据库：

  `use database_name`

  如果数据库不存在，则创建数据库，否则切换到指定数据库

  数据库中有数据才会在数据库列表中显示

+ 删除数据库：

  `db.dropDatabase()`

+ 创建集合：

  `db.createCollection(name, options)`

  options: 可选参数, 指定有关内存大小及索引的选项

  + `capped`：可选，如果为 true，则创建固定集合。当达到最大值时，会自动覆盖最早的文档
  + `size`：可选，为固定集合指定一个最大值（以字节计）。如果 capped 为 true，需要指定该字段
  + `autoIndexId`：可选，如为 true，自动在 _id 字段创建索引。默认为 false
  + `max`：可选，指定固定集合中包含文档的最大数量

+ 删除集合：

  `db.collection.drop()`

    如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false

+ 插入文档：

  MongoDB 使用 `insert()` 或 `save()` 方法向集合中插入文档

  + `db.collection_name.insert(document)`
    如果该集合不存在， 则会自动创建该集合并插入文档

  + `db.collection_name.save(document)`
    如果不指定 `_id` 字段 `save()` 方法类似于 `insert()` 方法
    如果指定 `_id` 字段，则会更新该 `_id` 的数据

+ 更新文档：
  
  `update()` 方法用于更新已存在的文档

  ```js
  db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   })
  ```

  + `query` : 查询条件
  + `update` : 更新的对象和一些更新的操作符（如$,$inc...）等
  + `upsert` : 可选，如果不存在要更新的文档，是否插入新文档，true为插入，默认是false，不插入
  + `multi` : 可选，默认是false，只更新找到的第一条记录，如果为true,就把按条件查出来多条记录全部更新
  + `writeConcern` :可选，抛出异常的级别

+ 删除文档：

  `remove()` 方法用于文档

  ```js
  db.collection.remove(
    <query>,
    {
     justOne: <boolean>,
     writeConcern: <document>
   }
  )
  ```

  + `query` : 可选，查询条件
  + `justOne` : 可选，如果为 true 或 1，则只删除一个文档，如果不设置该参数，或 false，则删除所有匹配条件的文档
  + `writeConcern` :可选，抛出异常的级别

+ 查询文档：

  `find()` 方法以非结构化的方式来显示所有文档

  `findOne()` 方法，只返回一个文档

  `find().pretty()` 方法以易读的方式来查询数据

  `db.collection.find(query, projection)`

  + `query`：可选，使用查询操作符指定查询条件
  + `projection`：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）

+ 查询语句：

  + `{key：value}`：等于，类似 `where key = value`
  + `{key：{$lt: value}}`：小于，类似 `where key < value`
  + `{key：{$lte: value}}`：小于等于，类似 `where key <= value`
  + `{key：{$gt: value}}`：大于，类似 `where key > value`
  + `{key：{$gte: value}}`：大于等于，类似 `where key >= value`
  + `{key：{$ne: value}}`：不等于，类似 `where key != value`

  AND 条件：传入多个键(key)，每个键(key)以逗号隔开

  OR 条件：使用关键字 `$or`

+ `$type`操作符：

  `$type` 操作符是基于 BSON 类型来检索集合中匹配的数据类型，并返回结果

+ Limit与Skip方法：

  如果需要读取指定数量的数据记录，可以使用 `limit()` 方法，该方法接受一个数字参数，指定读取记录的条数

  还可以使用 `skip()` 方法来跳过指定数量的数据，该方法同样接受一个数字参数作为跳过的记录条数

  使用 `limit()` 和 `skip()`可以用作分页查询

  `db.col.find().skip(20).limit(10)` 查询从第20条记录后10条记录

+ 排序：

  `sort()` 方法可以通过参数指定排序的字段，其中 1 为升序排列，而 -1 是用于降序排列

  `db.col.find().sort({key: 1})`

+ 索引：

  使用 `createIndex()` 方法来创建索引（3.0.0版本前使用`ensureIndex`）

  `db.col.createIndex({key: options})` 
  
    key 为要创建的索引字段，options 为 1 按升序创建索引， -1 按降序来创建索引

+ 聚合：

  `aggregate()` 聚合主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果

  `db.col.aggregate(options)`

  聚合表达式：

  + `$sum`：计算总和
  + `$avg`：计算平均值
  + `$min`：获取集合中所有文档对应值得最小值
  + `$max`：获取集合中所有文档对应值得最大值
  + `$push`：在结果文档中插入值到一个数组中
  + `$addToSet`：在结果文档中插入值到一个数组中，但不创建副本
  + `$first`：根据资源文档的排序获取第一个文档数据
  + `$last`：根据资源文档的排序获取最后一个文档数据

  聚合中常用的操作：

  + `$group`：将集合中的文档分组，可用于统计结果
  + `$project`：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档
  + `$match`：用于过滤数据，只输出符合条件的文档
  + `$limit`：用来限制聚合管道返回的文档数
  + `$skip`：在聚合管道中跳过指定数量的文档，并返回余下的文档
  + `$unwind`：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值
  + `$sort`：将输入文档排序后输出
  + `$geoNear`：输出接近某一地理位置的有序文档
