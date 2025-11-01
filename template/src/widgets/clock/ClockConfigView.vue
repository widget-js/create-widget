<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { BrowserWindowApi } from '@widget-js/core'
import {
  useWidget,
  WidgetConfigOption,
  WidgetEditDialog,
} from '@widget-js/vue3'

const { widgetParams, save } = useWidget()
const title = useStorage('title', 'Clock')
// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  title: '时钟设置',
  theme: {
    backgroundColor: true,
    borderRadius: true,
  },
})
</script>

<template>
  <WidgetEditDialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save()"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      标题 <input v-model="title">
    </template>
  </WidgetEditDialog>
</template>

<style scoped>

</style>
