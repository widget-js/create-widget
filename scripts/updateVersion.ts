import fs from 'node:fs'
import ora from 'ora'
import packageJson from 'package-json'

const spinner = ora('Loading unicorns').start()
async function run() {
  const packages = ['@widget-js/core', '@widget-js/vue3', '@widget-js/cli', '@widget-js/vite-plugin-widget']
  const packageContent = (await import('../template/package.json')).default

  for (const packageName of packages) {
    spinner.start(`Fetching package info: ${packageName}`)
    const packageInfo = await packageJson(packageName)
    spinner.succeed(`Package version: ${packageName}:${packageInfo.version}`)
    if (packageContent.dependencies[packageName]) {
      packageContent.dependencies[packageName] = `^${packageInfo.version}`
    }
    else if (packageContent.devDependencies[packageName]) {
      packageContent.devDependencies[packageName] = `^${packageInfo.version}`
    }
  }

  fs.writeFileSync('./template/package.json', JSON.stringify(packageContent, null, 2))
  spinner.succeed('Update template package.json success')
}

run()
