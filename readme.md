# TinyEngine
专注于微信开放域内的简易引擎（MIT License）

## Feature（RoadMap yet ）
欢迎提需求，更欢迎PR 

(✂️表示支持自动裁剪，只打包用到的功能)
- [x] 基于节点树结构的基础渲染功能
    - [ ] 增加锚点概念 
- [x] 触摸事件处理✂️
- [x] 资源加载、缓存
- [ ] Host端sdk，简化域内渲染控制和消息传递
- 控件 ✂️
    - [x] Label ✂️
    - [x] Sprite ✂️
        - [x] 支持九宫
    - [x] ScrollList ✂️ (暂时只支持垂直滚动)
    - [x] ScrollView
    - [ ] ~~clip~~ （暂时移除，严重性能问题，等待微信修复）
- [x] 强大的动画系统(移植https://github.com/tweenjs/tween.js)✂️
- [ ] 基于yaml的UI描述文件 ✂️
- [ ] 供Egret使用的一些工具函数
- [ ] .d.ts 描述文件

## Quick Start
1. 安装Nodejs
2. git clone
3. cd tiny
4. npm i --registry=https://registry.npm.taobao.org
5. src/main.js 为子域工程入口文件,根据需要进行修改
6. npm run build
7. 将dist/index.js拷贝到项目目录

## ChangeLog
- v0.2.0 2018.07.04
    - 拆分ScrollList和ScrollView
    - ScrollView增加惯性支持
    - 暂时移除clip（微信bug）
    - 修复label初始化bug
    - 增加label baseline设置支持
    - 新控件：ScrollList 节点循环利用的滚动列表
- v0.3.0 2018.07.04
    - 动画支持！

## License (MIT)
Copyright 2018 盛庆鸿

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.