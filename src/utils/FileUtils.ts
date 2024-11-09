import * as fs from 'node:fs'
import { copy, ensureDir } from 'fs-extra'

export class FileUtils {
  static async copyFolderRecursive(src: string, dest: string): Promise<void> {
    try {
      await ensureDir(dest)
      const items = await fs.promises.readdir(src)
      for (const item of items) {
        const srcPath = `${src}/${item}`
        const destPath = `${dest}/${item}`

        const stats = await fs.promises.stat(srcPath)

        if (stats.isDirectory()) {
          await this.copyFolderRecursive(srcPath, destPath)
        }
        else {
          await copy(srcPath, destPath, { overwrite: true })
        }
      }
    }
    catch (error) {
      console.error(`Error copying folder: ${error.message}`)
    }
  }
}
