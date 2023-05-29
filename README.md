# star_rail_analysis
这是一个基于Vue3和ElementUI开发的星穹铁道抽卡分析工具。

## 功能
- 连接游戏服务器获取抽卡记录
- 统计各个卡池的四星角色数量、五星角色数量、保底次数及平均五星间隔
- 预览并导出数据进行本地保存
- 未来可能更新:使用Echarts进行数据可视化,导入本地数据,使用米哈游Token直接获取authKey等

## 技术栈
- Vue3
- Element UI
- Echarts
- Axios

## 使用
1. 安装依赖
```
npm install
```
2. 运行
```
npm run dev
```
3. 输入米哈游ID和卡池ID获取数据
4. 点击预览数据按钮预览并下载CSV数据

## 项目结构
```
├─public                  
│  └─index.html           // 入口html文件  
├─src                     
│  ├─router                  // 路由   
│  ├─views                    // 路由组件  
│  ├─components              // 公共组件   
│  ├─utils                    // 工具函数
│  ├─styles                   // 样式  
│  ├─store                     // vuex状态管理
│  └─main.js                   // 入口文件   
├─package.json
```

## 示例
![image](https://user-images.githubusercontent.com/52365743/236595653-27992516-c9f6-464a-bc10-f9c8af7801e6.png)
![image](https://user-images.githubusercontent.com/52365743/236595671-0f3b3c93-ac06-493e-8c60-0b2862e2c451.png)
![image](https://user-images.githubusercontent.com/52365743/236595682-8270af13-9b0d-4337-aebd-74dbeb91ae29.png)
![image](https://user-images.githubusercontent.com/52365743/236595689-36d13f71-9aa1-4a84-b000-b5e12e8630d2.png)
