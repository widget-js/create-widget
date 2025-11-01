<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { useWidget } from '@widget-js/vue3'
import { ref } from 'vue'

useWidget({})
const title = useStorage('title', 'Clock')
const time = ref(new Date().toLocaleTimeString())
setInterval(() => {
  time.value = new Date().toLocaleTimeString()
}, 1000)
</script>

<template>
  <widget-wrapper>
    <div class="clock">
      <span>{{ title }}</span>
      <span>{{ time }}</span>
    </div>
  </widget-wrapper>
</template>

<style scoped>
*{
  user-select: none;
}
.clock {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  height: 100%;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  color: var(--widget-color);
  justify-content: center;
}
</style>
