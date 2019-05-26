# Vim 基础

+ 命令行使用 `vim` 默认进入 `normal` 模式
+ 使用 `i/a/o` 进入编辑模式，使用 `ESC` 切换到 `normal` 模式
+ `i(insert)` 当前字符前面插入
+ `a(append)` 当前字符后面插入
+ `o(open a line below)` 在新的一行插入
+ `I` 当前行前面插入
+ `A` 当前行后面插入
+ `O` 当前行上一行插入
+ `ctrl + h` 删除上一个字符
+ `ctrl + w` 删除上一个单词
+ `ctrl + u` 删除当前行
+ `h、j、k、l` 光标移动，`h` 左，`j` 下，`k` 上，`l` 右
+ `w/W` 移动到下一个 `word/WORD` 开头，
+ `b/B` 移动到上一个 `word/WORD` 开头
+ 在 `normal` 模式下输入 `:` 执行命令，进入命令模式
+ 使用 `:q` 直接退出，`:w(written)` 保存(已写入)， `:wq` 保存并退出
+ 使用 `sp(split)` 上下分屏，`:vs` 左右分屏
+ 使用 `set nu(number)` 设置行号
+ 使用 `:% s/(old)/(new)/g` 全局替换，`%` 表示全部文件，`s` 表示替换，`/g` 表示全局
+ 在 `normal` 模式下使用 `v` 进入 `visual` 可视模式选择，`V` 选择行，`ctrl + v` 选择块
+ 在 `visual` 可视模式下使用