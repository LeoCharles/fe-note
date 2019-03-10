# Git 常用命令

## 创建

+ `git init`  初始化本地版本库

+ `git clone <url>`  克隆远程版本库

## 提交

+ `git add .`  缓存变更的文件

+ `git commit -m 'message'`  提交变更的文件

+ `git commit --amend -m 'message'`  修改最后一次提交

+ `git mv <old> <new>`  文件改名

+ `git rm <file>` 删除文件

## 文件暂存

+ `git stash`  文件暂存

+ `git stash pop`  文件恢复

+ `git stash list`  查看暂存内容

## 查看

+ `git status`  查看状态

+ `git diff`  查看文件不同

+ `git log`  查看提交历史

## 撤销

+ `git checkout .`  撤销本地修改

+ `git reset HEAD .`  撤销缓存

+ `git reset --hard HEAD^`  撤销本次提交，回到上个版本

+ `git reset --hard  <版本号>`  回退到任意版本

## 分支和标签

+ `git branch -a`  查看分支

+ `git checkout <brach/tag>`  切换到指定分支或标签

+ `git checkout -b <new-brach>`  创建并切换到新分支

+ `git branch -d <brachname>`  删除分支

+ `git merge <branch>` 合并分支

+ `git tag`  查看标签

+ `git tag <tagname>`  创建标签

+ `git tag -d <tagname>` 删除标签

## 远程操作

+ `git push -u origin master`  提交本地 master 到远程 master, 并关联

+ `git fetch origin`  获取远程代码

+ `git pull origin <branch>`  拉取远程代码并合并

+ `git push origin <branch>`  推送代码到远程并合并

+ `git push --tags`  上传所有标签
