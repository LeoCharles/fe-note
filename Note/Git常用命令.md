# Git 常用命令

![git](/img/git.png)

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

## 命令清单

```bash
git init                                                  # 初始化本地git仓库（创建新仓库）
git config --global user.name "xxx"                       # 配置用户名
git config --global user.email "xxx@xxx.com"              # 配置邮件
git config --global color.ui true                         # git status等命令自动着色
git config --global color.status auto
git config --global color.diff auto
git config --global color.branch auto
git config --global color.interactive auto
git config --global --unset http.proxy                    # remove  proxy configuration on git
git clone git+ssh://git@192.168.53.168/VT.git             # clone远程仓库
git status                                                # 查看当前版本状态（是否修改）
git add xyz                                               # 添加xyz文件至index
git add .                                                 # 增加当前子目录下所有更改过的文件至index
git commit -m 'xxx'                                       # 提交
git commit --amend -m 'xxx'                               # 合并上一次提交（用于反复修改）
git commit -am 'xxx'                                      # 将add和commit合为一步
git rm xxx                                                # 删除index中的文件
git rm -r *                                               # 递归删除
git log                                                   # 显示提交日志
git log -1                                                # 显示1行日志 -n为n行
git log -5
git log --stat                                            # 显示提交日志及相关变动文件
git log -p -m
git show dfb02e6e4f2f7b573337763e5c0013802e392818         # 显示某个提交的详细内容
git show dfb02                                            # 可只用commitid的前几位
git show HEAD                                             # 显示HEAD提交日志
git show HEAD^                                            # 显示HEAD的父（上一个版本）的提交日志 ^^为上两个版本 ^5为上5个版本
git tag                                                   # 显示已存在的tag
git tag -a v2.0 -m 'xxx'                                  # 增加v2.0的tag
git show v2.0                                             # 显示v2.0的日志及详细内容
git log v2.0                                              # 显示v2.0的日志
git diff                                                  # 显示所有未添加至index的变更
git diff --cached                                         # 显示所有已添加index但还未commit的变更
git diff HEAD^                                            # 比较与上一个版本的差异
git diff HEAD -- ./lib                                    # 比较与HEAD版本lib目录的差异
git diff origin/master..master                            # 比较远程分支master上有本地分支master上没有的
git diff origin/master..master --stat                     # 只显示差异的文件，不显示具体内容
git remote add origin git+ssh://git@192.168.53.168/VT.git # 增加远程定义（用于push/pull/fetch）
git branch                                                # 显示本地分支
git branch --contains 50089                               # 显示包含提交50089的分支
git branch -a                                             # 显示所有分支
git branch -r                                             # 显示所有原创分支
git branch --merged                                       # 显示所有已合并到当前分支的分支
git branch --no-merged                                    # 显示所有未合并到当前分支的分支
git branch -m master master_copy                          # 本地分支改名
git checkout -b master_copy                               # 从当前分支创建新分支master_copy并检出
git checkout -b master master_copy                        # 上面的完整版
git checkout features/performance                         # 检出已存在的features/performance分支
git checkout --track hotfixes/BJVEP933                    # 检出远程分支hotfixes/BJVEP933并创建本地跟踪分支
git checkout v2.0                                         # 检出版本v2.0
git checkout -b devel origin/develop                      # 从远程分支develop创建新本地分支devel并检出
git checkout -- README                                    # 检出head版本的README文件（可用于修改错误回退）
git merge origin/master                                   # 合并远程master分支至当前分支
git cherry-pick ff44785404a8e                             # 合并提交ff44785404a8e的修改
git push origin master                                    # 将当前分支push到远程master分支
git push origin :hotfixes/BJVEP933                        # 删除远程仓库的hotfixes/BJVEP933分支
git push --tags                                           # 把所有tag推送到远程仓库
git fetch                                                 # 获取所有远程分支（不更新本地分支，另需merge）
git fetch --prune                                         # 获取所有原创分支并清除服务器上已删掉的分支
git pull origin master                                    # 获取远程分支master并merge到当前分支
git mv README README2                                     # 重命名文件README为README2
git reset --hard HEAD                                     # 将当前版本重置为HEAD（通常用于merge失败回退）
git rebase
git branch -d hotfixes/BJVEP933                           # 删除分支hotfixes/BJVEP933（本分支修改已合并到其他分支）
git branch -D hotfixes/BJVEP933                           # 强制删除分支hotfixes/BJVEP933
git ls-files                                              # 列出git index包含的文件
git show-branch                                           # 图示当前分支历史
git show-branch --all                                     # 图示所有分支历史
git whatchanged                                           # 显示提交历史对应的文件修改
git revert dfb02e6e4f2f7b573337763e5c0013802e392818       # 撤销提交dfb02e6e4f2f7b573337763e5c0013802e392818
git ls-tree HEAD                                         # 内部命令：显示某个git对象
git rev-parse v2.0                                        # 内部命令：显示某个ref对于的SHA1 HASH
git reflog                                                # 显示所有提交，包括孤立节点
git show HEAD@{5}
git show master@{yesterday}                               # 显示master分支昨天的状态
git log --pretty=format:'%h %s' --graph                   # 图示提交日志
git show HEAD~3
git show -s --pretty=raw 2be7fcb476
git stash                                                 # 暂存当前修改，将所有至为HEAD状态
git stash list                                            # 查看所有暂存
git stash show -p stash@{0}                               # 参考第一次暂存
git stash apply stash@{0}                                 # 应用第一次暂存
git grep "delete from"                                    # 文件中搜索文本“delete from”
git grep -e '#define' --and -e SORT_DIRENT
git gc
git fsck
```