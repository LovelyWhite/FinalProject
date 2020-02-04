# <img src='./readme/icon.png' height="20" width="20" style='margin-right:20px'> 多源手机信息采集平台(FinalDesign) ![GitHub license](https://img.shields.io/badge/license-GNUv3-blue.svg) ![react-native version](https://img.shields.io/badge/ReactNative-0.6.1-yellow.svg)

多源手机信息采集平台是一款能够使用移动设备进行传感器信息采集、分析和可视化的软件。

* **数据丰富：** 利用手机平台的传感器的多样性和可移动性，可以方便的在不同时间与空间进行大量的数据收集。可采集的数据有：[大气温度](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_AMBIENT_TEMPERATURE)、[重力](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_GRAVITY)、[环境地磁场](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_MAGNETIC_FIELD)、[气压](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_PRESSURE)、[相对湿度](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_RELATIVE_HUMIDITY)、[设备温度](https://developer.android.google.cn/reference/android/hardware/Sensor.html#TYPE_TEMPERATURE)，详细传感器信息请访问[这个链接](https://developer.android.google.cn/guide/topics/sensors/sensors_overview)。

* **多平台适应：** 本平台采用[ReactNative(v0.6.1)](https://reactnative.cn/)进行手机端的程序编写，React Native允许我们使用[TypeScript(v3.7)](https://www.typescriptlang.org/)语言进行多端原生UI组件的编写，与此同时还可以使用Native Module 进行手动封装模块代码。后端采用了Express + nodejs 框架对服务进行处理。

* **数据可视化：** 将采集到的数据上传到服务器，并采用特殊算法进行处理加工（也会保存原始数据）。并将采集到的数据加工出来。

* **可扩展性：** 本平台预先开发了一套应用处理接口，方便开发者后续扩展功能。

## 功能框架
### 手机端

### 服务器端

## 接口定义
### 服务器端
  
请求前缀 ：http://localhost:3000/api/{module}

|module|提交方式|参数|描述|
:-: | :-: | :-: | :-: | 
bd-map|GET|-|获取自定义百度地图
## 随笔
本项目是一个毕业设计项目，也是我的第一个React-Native 项目。其中的内容难免会有些错误，欢迎大家提Issue，我也会认真的完成这个项目的。觉得还不错的话欢迎Star，本人博客地址：[一只小白喵的进阶之路](https://lovelywhite.cn/)。

## 踩坑记录

1. expo-cli 安装的时候出错

* 错误内容：npm ERR! Error: EACCES: permission denied, access
![expo-cli1](./readme/error/expo-cli1.png)
* 错误起因：因为要导入sensors包，expo install expo-sensors，所以需要安装expo-cli。安装expocli的时候出现这种错误。
* 解决方法：sudo npm install --unsafe-perm=true --allow-root ([链接](https://blog.csdn.net/testcs_dn/article/details/78869419))

2. react-navigation-tabs 切换闪一下白屏

3. typescript 导入不了json模块

* 错误内容：Cannot find module '../../app.json'. Consider using '--resolveJsonModule' to import module with '.json' extension![json1](./readme/error/json1.png)
* 错误起因：需要使用JSON当中的常量字符串，发现导入不了
* 解决方法：在tsconfig.json中加入"resolveJsonModule":true 就可解决

4. ejs找不到模板

* 错误内容：Error: Failed to lookup view "bd-map.ejs" in views directory"./page" ![ejs1](./readme/error/ejs1.png)
* 错误起因：-
* 解决方法：原来app.set('views', './page')语句的第二个参数的相对路径为项目目录而不是server.ts的目录，把./page 改成 ./src/page 就可以了。

5. 手机端载入不了计算机建立的express服务器

* 错误内容：-
* 错误起因：-
* 解决方法：使用adb reverse tcp:3000(手机端) tcp:3000(计算机端)将计算机的3000端反代到手机的3001端口

6. yarn 安装全局包后找不到命令

* 错误内容：-
* 错误起因：安装 yarn global add create-react-native-module 后无法使用。![yarn1](./readme/error/yarn1.png)
* 解决方法：我使用的是zsh，没有配置yarn的执行目录，将export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"添加到~/.zshrc文件即可

6. ---------------

* 错误内容：
* 错误起因：
* 解决方法：
## 参考

### 视频

* [Nodejs+Express+Mongo实战TodoList(共17讲)](https://www.bilibili.com/video/av20196752)

## 版权声明

本软件遵循GNUv3开源协议。
