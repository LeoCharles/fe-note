# Go 开发配置

在安装go插件时，会自动更新很多依赖库文件，都是从Github更新下来，但是因为Github的文件中，多有应用go官网中的文件，导致，因为网络缘故，不能直接下载，导致安装失败。这些失败的库，不是没有下载下来，而是以来的文件在go官网上，导致失败。以下为解决办法：

1. 在%GOPATH%\src\ 目录下，建立golang.org 文件夹，并再新建 x 文件夹。  目录为 "%GOPATH\src\golang.org\x\"

2. 完成目录切换后，开始下载插件包：git clone https://github.com/golang/tools.git tools

3. 执行完以后，会多一个tools文件夹，打开vsCode终端，切换到 终端，进入“%GOPATH”目录,执行：

go install github.com/ramya-rao-a/go-outline
go install github.com/acroca/go-symbols
go install golang.org/x/tools/cmd/guru
go install golang.org/x/tools/cmd/gorename
go install github.com/josharian/impl
go install github.com/rogpeppe/godef
go install github.com/sqs/goreturns
go install github.com/golang/lint/golint
go install github.com/cweill/gotests/gotests
go install github.com/ramya-rao-a/go-outline
go install github.com/acroca/go-symbols
go install golang.org/x/tools/cmd/guru
go install golang.org/x/tools/cmd/gorename
go install github.com/josharian/impl
go install github.com/rogpeppe/godef
go install github.com/sqs/goreturns
go install github.com/golang/lint/golint
go install github.com/cweill/gotests/gotests