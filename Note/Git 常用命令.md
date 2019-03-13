# Git 常用命令

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（版本库）
- Remote：远程仓库

## 基本命令

- `mkdir <文件夹名>` 创建文件夹
- `cd <文件夹名>` 打开文件夹
- `ls` , `ll` 查看文件
- `ls -a` 查看隐藏文件
- `pwd` 查看当前目录

## 配置

- `git config --list` 查看当前配置信息
- `git config --global user.name <用户名>` 配置用户名
- `git config --global user.email <邮箱>` 配置邮箱

## 创建

- `git init` 在当前目录下创建本地版本库

- `git init <目录名>` 在指定目录下创建本地版本库

- `git clone <url>` 克隆远程版本库

## 添加/提交

- `git add <文件名>` 添加文件到暂存区，多个文件名用空格隔开

- `git add <目录名>` 添加目录到暂存区

- `git add .` 添加当前目录下所有文件到暂存区

- `git commit -m '提交日志描述'` 将文件从暂存区提交到版本库

- `git commit -a -m '提交日志描述'` 先将文件添加到暂存区，再提交到版本库

- `git commit -v` 提交时显示所有 diff 信息

- `git commit --amend -m '提交日志描述'` 使用一次新的提交，替代上一次提交，如果无新变化，则用来改写上一次提交信息)

- `git mv <原文件名> <新文件名>` 文件改名

## 查看

- `git status` 查看当前状态

- `git log` 查看提交日志

- `git reflog` 查看历史提交日志

- `git log --oneline --graph` 图形化显示提交所有日志)

- `git log --pretty=oneline` 一行显示提交所有日志

- `git log -g` 查看最近历史提交日志

- `git ls-files --stage` 查看暂存区的文件

- `git ls-files -u` 查看冲突的文件

- `git diff` 查看工作区与暂存区的差异

- `git diff --cached` 查看暂存区与版本库的差异

- `git diff --staged` 查看暂存区与版本库的差异

- `git diff HEAD` 查看工作区和上次提交的差异

- `git diff master<分支的名字>` 查看工作区与版本库的差异

## 暂存

- `git stash` 文件暂存

- `git stash pop` 文件恢复

- `git stash list` 查看暂存内容

## 撤销/删除

- `git checkout <文件名>` 从暂存区中恢复某个文件到工作区

- `git checkout <版本id> <文件名>` 从一个版本中恢复某个文件到暂存区和工作区

- `git checkout .` 从暂存区中恢复所有文件到工作区

- `git reset HEAD .` 撤销 add 操作

- `git reset --hard HEAD^` 撤销本次提交，回到上个版本

- `git reset --hard <版本号>` 回退到某个版本

- `git rm <文件名>` 删除文件

## 分支/标签

- `git branch -a` 查看分支

- `git checkout <brach/tag>` 切换到指定分支或标签

- `git checkout -b <new-brach>` 创建并切换到新分支

- `git branch -d <brachname>` 删除分支

- `git merge <branch>` 合并分支

- `git tag` 查看标签

- `git tag <tagname>` 创建标签

- `git tag -d <tagname>` 删除标签

## 远程操作

- `git push -u origin master` 提交本地 master 到远程 master, 并关联

- `git fetch origin` 获取远程代码，不合并到本地分支

- `git pull origin <branch>` 拉取远程代码并合并

- `git push origin <branch>` 推送代码到远程并合并

- `git push --tags` 上传所有标签
