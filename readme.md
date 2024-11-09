# 创建桌面组件项目

### 创建桌面组件项目

:::tip 前提条件

- 熟悉命令行
- 已安装 18.0 或更高版本的 [Node.js](https://nodejs.org/)
- 熟悉 [Vue3](https://cn.vuejs.org/guide/quick-start.html)
  :::

在命令行中运行以下命令，创建桌面组件项目

```bash
npm create widget@latest
```

这一指令将会安装并执行 create-widget，输入下项目名称即可:

```shell
✔ Project name: … <your-project-name>
```

完成创建后，项目目录结构如下：

```shell{8-13,15,25}
.
├── public
├── src
│   ├── App.vue
│   ├── assets
│   ├── main.ts
│   ├── router
│   ├── widgets                           # 👈 组件文件存放目录
│   │   ├── clock                         # 👈 这是一个简单的示例组件
│   │   │   ├── Clock.widget.ts           # 👈 组件信息文件
│   │   │   ├── ClockConfigView.vue       # 👈 组件设置页面
│   │   │   ├── ClockWidgetRoutes.ts      # 👈 组件路由
│   │   │   ├── ClockWidgetView.vue       # 👈 组件页面
│   │   │   ├── model
│   │   │   │   └── ClockModel.ts         # 👈 组件数据模型
│   │   └── widget-router.ts
├── .vscode
├── env.d.ts
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── vite.config.ts
├── widget.package.ts                     # 👈 组件包信息，记得修改
└── ...
```

记得更新下依赖

```shell
cd <your-project-name>
npm install
```

### 运行项目

开启vite服务

```shell
npm run dev
```
控制台会打印以下信息，代表组件已经注册成功。
```shell
i Register widgets at： 2024-01-06T14:13:30.214Z                                                                                        22:13:30
i Register widget: cn.example.widget.clock, path: /widget/clock                                                                         22:13:30
i Widget size:1
```
