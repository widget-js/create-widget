import { Widget, WidgetKeyword } from '@widget-js/core'

// TODO 修改组件信息，标题，描述，关键词
const ClockWidget = new Widget({
  name: 'cn.example.widget.clock',
  title: { 'zh-CN': '时钟' },
  description: { 'zh-CN': 'Hello world!' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  width: 2,
  height: 2,
  minWidth: 2,
  maxWidth: 6,
  minHeight: 2,
  maxHeight: 6,
  previewImage: '/preview_clock.png',
  path: '/widget/clock',
  configPagePath: '/widget/config/clock',
})

export default ClockWidget
