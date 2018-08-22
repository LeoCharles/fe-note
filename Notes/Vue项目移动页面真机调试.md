# Vue项目移动web页面真机调试

+ 确保手机和电脑在同一个局域网下（连接同一个wifi）。
+ 手机打开开发者模式，小米手机：设置-我的设备-全部参数-MIUI版本连续四次点击，再次进入设置-更多设置-开发者选项-打开USB调试。
+ 手机和电脑都打开 Chrome 浏览器，在PC端 Chrome打开 chrome://inspect/#devices，在手机端打开Chrome 浏览器，刷新几次后会在PC端看到连接的设备。若没有看到，拔掉usb多试几次。
+ Vue-cli构建的项目 需要把config下的index.js 中的 host 改为本机的ip地址，再次npm run dev, 之后在手机端通过ip访问。
+ 注意 调试完成后需要把本机 ip 改回 localhost。