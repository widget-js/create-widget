import { WidgetPackage } from '@widget-js/core'

// TODO 完善组件包信息
export default new WidgetPackage({
  author: '修改成你的信息',
  description: {
    'zh-CN': '修改成你的组件描述',
  },
  entry: '/',
  hash: true,
  remote: {
    base: '/',
    hostname: '修改成你的域名',
    hash: true,
  },
  homepage: '',
  name: 'cn.example.widget',
  title: {
    'zh-CN': '修改成你的组件标题',
  },
  devOptions: {
    folder: './src/widgets/',
  },
})
