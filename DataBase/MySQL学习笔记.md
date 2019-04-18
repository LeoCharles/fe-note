# MySQL 学习笔记

+ 关系型数据库

  关系型数据库是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。

  + 数据库: 数据库是一些关联表的集合。
  + 数据表: 表是数据的矩阵。
  + 行：一行（=元组，或记录）是一组相关的数据。
  + 列: 一列(数据元素) 包含了相同的数据。
  + 主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
  + 外键：外键用于关联两个表。
  + 复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
  + 索引：索引是对数据库表中一列或多列的值进行排序的一种结构。可快速访问数据库表中的特定信息。

+ 数据类型

  + 数值

  | 类型        | 大小   | 范围（有符号）             | 范围（无符号）   | 用途           |
  | --          | --     | --                       | --              | --            |
  | tinyint     | 1 字节 | (-128，127)               | (0，255)        | 小整数值       |
  | smallint    | 2 字节 | (-32768，32767)           | (0，65 535)     | 大整数值       |
  | mendiumint  | 3 字节 | (-8388608，8388607)       | (0，16 777 215) | 大整数值       |
  | int/integer | 4 字节 | (-2147483648，2147483647) | (0，4294967295) | 大整数值       |
  | bigint      | 8 字节 | /                         | /               | 极大整数值     |
  | float       | 4 字节 | /                         | /               | 单精度浮点数值 |
  | double      | 8 字节 | /                         | /               | 双精度浮点数值 |
  | decimal     |   /    | /                         | /               | 小数值        |

  + 日期和时间类型

  | 类型      | 大小   | 范围                                    | 格式                | 用途            |
  | --        | --    | --                                      | --                  | --             |
  | date      | 3 字节 | 1000-01-01/9999-12-31                  | YYYY-MM-DD          | 日期值          |
  | time      | 3 字节 | -838:59:59'/'838:59:59'                | HH:MM:SS            | 时间值或持续时间 |
  | year      | 1 字节 | 1901/2155                              | YYYY                | 年份值          |
  | datetime  | 8 字节 | 000-01-01 00:00:00/9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 日期和时间值     |
  | timestamp | 4 字节 | /                                      | YYYYMMDD HHMMSS     | 时间戳          |

  + 字符串类型

  | 类型       | 大小             | 用途                          |
  | --         | --               | --                           |
  | char       | 0-255 字节       | 定长字符串                    |
  | varchar    | 0-65535 字节     | 变长字符串                    |
  | tinyblob   | 0-255 字节       | 不超过 255 个字符的二进制字符串 |
  | tinytext   | 0-255 字节       | 短文本字符串                   |
  | blob       | 0-65535 字节     | 二进制形式的长文本数据          |
  | text       | 0-65535 字节     | 长文本字符串                   |
  | mediumblob | 0-16 777215字节  | 二进制形式的中等长度文本数据    |
  | mediumtext | 0-16 777215字节  | 中等长度文本数据               |
  | longblob   | 0-4294967295字节 | 二进制形式的极大文本数据        |
  | longtext   | 0-4294967295字节 | 极大文本数据                   |

+ 插入数据

  `INSERT INTO table_name(field1, field2, ...) VALUES (value1, value2, ...);`

+ 查询数据

  `SELLECT column_name1, column_name2 From table_name [WHERE Clause] [LIMIT N] [OFFSET M]`
  + 查询语句中可以使用一个或者多个表，表之间使用逗号(,)分割，并使用 `WHERE` 语句来设定查询条件。
  + `SELECT` 命令可以读取一条或者多条记录。
  + 可以使用星号（`*`）来代替其他字段，`SELECT` 语句会返回表的所有字段数据。
  + 可以使用 `WHERE` 语句来包含任何条件。
  + 可以使用 `LIMIT` 属性来设定返回的记录数。
  + 可以使用 `OFFSET` 指定 `SELECT` 语句开始查询的数据偏移量。默认情况下偏移量为 0 。

+ `WHERE` 子句

  `SELECT field1, field2,...fieldN FROM table_name1, table_name2...[WHERE condition1 [AND [OR]] condition2... ;`

  + `WHERE` 子句类似于程序语言中的 `if` 条件，根据 MySQL 表中的字段值来读取指定的数据。
  + 可以使用 `AND` 或者 `OR` 指定一个或多个条件。
  + `WHERE` 子句也可以运用于 SQL 的 `DELETE` 或者 `UPDATE` 命令。

+ 修改数据

  `UPDATE table_name SET field1=new_value1, field2=new_value2 [WHERE Clause];`

  + 可以同时更新一个或多个字段。
  + 可以在 `WHERE` 子句中指定任何条件。
  + 可以在一个单独表中同时更新数据。

+ 删除数据

  `DELETE FROM table_name [WHERE Clause]`

  + 如果没有指定 `WHERE` 子句，MySQL 表中的所有记录将被删除。
  + 可以在 `WHERE` 子句中指定任何条件。
  + 可以在单个表中一次性删除记录。

+ `LIKE` 子句

  `WHERE` 子句中可以使用等号 `=` 来设定获取数据的条件，`LIKE` 子句中使用百分号 `%` 来表示任意字符，类似于正则表达式中的星号 `*`。

  `SELECT field FROM table_name WHERE field LIKE condition;`

  + 可以在 `WHERE` 子句中指定任何条件。
  + 可以在 `WHERE` 子句中使用 `LIKE` 子句。
  + 可以使用 `LIKE` 子句代替等号 `=`。
  + `LIKE` 通常与 `%`一同使用，类似于一个元字符的搜索。
  + 可以使用 `AND` 或者 `OR` 指定一个或多个条件。
  + 可以在 `DELETE` 或 `UPDATE` 命令中使用 `WHERE...LIKE` 子句来指定条件。

+ 正则表达式

  使用 `REGEXP` 操作符来进行正则表达式匹配。

+ `UNION` 操作符

  `UNION` 操作符用于连接两个以上的 `SELECT` 语句的结果组合到一个结果集合中。多个 `SELECT` 语句会删除重复的数据。

  ```php
  SELECT expression1, expression2 FROM table_name
  [WHERE conditions]
  UNION [ALL | DISTINCT]
  SELECT expression1, expression2 FROM table_name
  [WHERE conditions];
  ```

  + `expression1, expression2`: 要检索的列。
  + `tables`: 要检索的数据表。
  + `WHERE conditions`: 可选， 检索条件。
  + `DISTINCT`: 可选，删除结果集中重复的数据。默认情况下 `UNION` 操作符已经删除了重复数据，所以 `DISTINCT` 修饰符对结果没影响。
  + `ALL`: 可选，返回所有结果集，包含重复数据。

+ 排序

  使用 `ORDER BY` 子句将查询数据排序后再返回数据。

  `SELECT field FROM table_name ORDER BY field [ASC | DESC];`

  + 可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
  + 可以设定多个字段来排序。
  + 可以使用 `ASC` 或 `DESC` 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。
  + 可以添加 `WHERE...LIKE` 子句来设置条件。

+ 分组

  `GROUP BY` 语句根据一个或多个列对结果集进行分组。在分组的列上我们可以使用 `COUNT`, `SUM`, `AVG` 等函数。

  `WITH ROLLUP` 可以实现在分组统计数据基础上再进行相同的统计（`COUNT`, `SUM`, `AVG`...）。

  ```php
  SELECT field, func(field)
  FROM table_name
  WHERE field operator value
  GROUP BY field;
  ```

+ 多表查询

  在 `SELECT`, `UPDATE` 和 `DELETE` 语句中使用 `JOIN` 来联合多表查询。

  `JOIN` 按照功能大致分为如下三类:

  + `INNER JOIN`（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
  + `LEFT JOIN`（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
  + `RIGHT JOIN`（右连接）：获取右表所有记录，即使左表没有对应匹配的记录。

+ 事务

  事务主要用于处理操作量大，复杂度高的数据。
  事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。

  事务控制语句：

  + `BEGIN` 或 `START TRANSACTION`： 显式地开启一个事务；
  + `COMMIT` 或 `COMMIT WORK`：提交事务，并使已对数据库进行的所有修改成为永久性的；
  + `ROLLBACK` 或 `ROLLBACK WORK`：回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；
  + `SAVEPOINT identifier`，`SAVEPOINT` 允许在事务中创建一个保存点，一个事务中可以有多个 `SAVEPOINT`；
  + `RELEASE SAVEPOINT identifier` 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；
  + `ROLLBACK TO identifier` 把事务回滚到标记点；
  + `SET TRANSACTION` 用来设置事务的隔离级别。

  处理事务的两种方法：

  + 用 `BEGIN`, `ROLLBACK`, `COMMIT` 来实现
    + `BEGIN` 开始一个事务
    + `ROLLBACK` 事务回滚
    + `COMMIT` 提交事务
  
  + 直接用 `SET` 来改变 `MySQL` 的自动提交模式
    + `SET AUTOCOMMIT=0` 禁止自动提交
    + `SET AUTOCOMMIT=1` 开启自动提交