#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import * as process from 'node:process'
import chalk from 'chalk'
import gradient from 'gradient-string'
import minimist from 'minimist'
import prompts from 'prompts'
import { postOrderDirectoryTraverse } from './utils/directoryTraverse'
import { FileUtils } from './utils/FileUtils'
import getCommand from './utils/getCommand'

function canSkipEmptying(dir: string) {
  if (!fs.existsSync(dir)) {
    return true
  }

  const files = fs.readdirSync(dir)
  if (files.length === 0) {
    return true
  }
  if (files.length === 1 && files[0] === '.git') {
    return true
  }
  return false
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }

  postOrderDirectoryTraverse(
    dir,
    dir => fs.rmdirSync(dir),
    file => fs.unlinkSync(file),
  )
}

async function init() {
  console.log()
  const defaultBanner = 'Widget.js - The Desktop Widget Framework'
  const gradientBanner = gradient([
    { color: '#42d392', pos: 0 },
    { color: '#42d392', pos: 0.1 },
    { color: '#647eff', pos: 1 },
  ])(defaultBanner)
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? gradientBanner
      : defaultBanner,
  )
  console.log()
  const argv = minimist(process.argv.slice(2), {
    alias: {
      'typescript': ['ts'],
      'with-tests': ['tests'],
      'router': ['vue-router'],
    },
    string: ['_'],
    // all arguments are treated as booleans
    boolean: true,
  })
  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'widget-project' : targetDir
  const forceOverwrite = argv.force
  const unocss = argv.unocss
  const vueuse = argv.vueuse
  const iconpark = argv.iconpark
  const githubPage = argv.githubPage

  const cwd = process.cwd()
  let result: {
    projectName?: string
    shouldOverwrite?: boolean
    useVueUse?: boolean
    useUnoCss?: boolean
    useIconPark?: boolean
    useGithubPage?: boolean
  } = {}
  result = await prompts(
    [
      {
        name: 'projectName',
        type: targetDir ? null : 'text',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: state =>
          (targetDir = String(state.value).trim() || defaultProjectName),
      },
      {
        name: 'shouldOverwrite',
        type: () =>
          canSkipEmptying(targetDir) || forceOverwrite ? null : 'confirm',
        message: () => {
          const dirForPrompt
            = targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`
          return `${dirForPrompt} is not empty. Remove existing files and continue?`
        },
      },
      {
        name: 'useVueUse',
        type: () => (vueuse ? null : 'confirm'),
        message: () => {
          return `Use VueUse (Collection of Essential Vue Composition Utilities)?`
        },
      },
      {
        name: 'useUnoCss',
        type: () => (unocss ? null : 'confirm'),
        message: () => {
          return `Use Unocss(Atomic CSS Engine)?`
        },
      },
      {
        name: 'useIconPark',
        type: () => (iconpark ? null : 'confirm'),
        message: () => {
          return `Use IconPark (2000+ high-quality icons)?`
        },
      },
      {
        name: 'useGithubPage',
        type: () => (githubPage ? null : 'confirm'),
        message: () => {
          return `Use GitHub Page to deploy your project?`
        },
      },
    ],
    {
      onCancel: () => {
        throw new Error(`${chalk.red('✖')} Operation cancelled`)
      },
    },
  )

  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    projectName,
    shouldOverwrite = argv.force,
    useVueUse = argv.vueuse,
    useUnoCss = argv.unocss,
    useIconPark = argv.iconpark,
    useGithubPage = argv.githubPage,
  } = result

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  }
  else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateRoot = path.join(__dirname, './template')

  // Copy all template files to the target directory
  await FileUtils.copyFolderRecursive(templateRoot, root)
  const packageJsonPath = path.resolve(`${root}/package.json`)
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())
  if (useVueUse) {
    packageJson.dependencies['@vueuse/core'] = 'latest'
  }
  if (useUnoCss) {
    packageJson.devDependencies.unocss = 'latest'
    const unocssTemplateRoot = path.join(__dirname, './unocss')
    await FileUtils.copyFolderRecursive(unocssTemplateRoot, root)
  }
  if (useIconPark) {
    packageJson.dependencies['@icon-park/vue-next'] = 'latest'
  }
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  if (useGithubPage) {
    const githubPageTemplateRoot = path.join(__dirname, './github-page')
    await FileUtils.copyFolderRecursive(githubPageTemplateRoot, root)
  }
  // const callbacks = []
  //
  // const render = function render(templateName) {
  //   const templateDir = path.resolve(templateRoot, templateName)
  //   renderTemplate(templateDir, root, callbacks)
  // }
  // // 将template里的文件都复制到 root目录下
  // const templateFiles = fs.readdirSync(templateRoot)
  // for (const file of templateFiles) {
  //   render(file)
  // }

  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent)
    ? 'pnpm'
    : /yarn/.test(userAgent)
      ? 'yarn'
      : 'npm'

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    const cdProjectName = path.relative(cwd, root)
    console.log(
      `  ${chalk.bold(
        chalk.green(
          `cd ${
            cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
          }`,
        ),
      )}`,
    )
  }
  console.log(
    `  ${chalk.bold(chalk.green(getCommand(packageManager, 'install')))}`,
  )
}

init().catch((e) => {
  console.error(e)
})
