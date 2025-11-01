import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import widget from '@widget-js/vite-plugin-widget'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig((config) => {
  const offlineMode = config.mode === 'offline'
  const base = offlineMode ? './' : '/clock'
  return {
    base,
    plugins: [
      vue(),
      widget({
        zipName: 'test-widget',
        generateZip: offlineMode,
      }),
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
