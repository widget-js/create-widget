#!/usr/bin/env node

// node_modules/.pnpm/tsup@8.5.1_postcss@8.4.47_tsx@4.19.2_typescript@5.6.3_yaml@2.6.0/node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import fs3 from "fs";
import path3 from "path";
import * as process from "process";
import chalk from "chalk";
import gradient from "gradient-string";
import minimist from "minimist";
import prompts from "prompts";

// src/utils/directoryTraverse.ts
import fs from "fs";
import path2 from "path";
function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    if (filename === ".git") {
      continue;
    }
    const fullpath = path2.resolve(dir, filename);
    if (fs.lstatSync(fullpath).isDirectory()) {
      postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback);
      dirCallback(fullpath);
      continue;
    }
    fileCallback(fullpath);
  }
}

// src/utils/FileUtils.ts
import * as fs2 from "fs";
import { copy, ensureDir } from "fs-extra";
var FileUtils = class {
  static async copyFolderRecursive(src, dest) {
    try {
      await ensureDir(dest);
      const items = await fs2.promises.readdir(src);
      for (const item of items) {
        const srcPath = `${src}/${item}`;
        const destPath = `${dest}/${item}`;
        const stats = await fs2.promises.stat(srcPath);
        if (stats.isDirectory()) {
          await this.copyFolderRecursive(srcPath, destPath);
        } else {
          await copy(srcPath, destPath, { overwrite: true });
        }
      }
    } catch (error) {
      console.error(`Error copying folder: ${error.message}`);
    }
  }
};

// src/utils/getCommand.ts
function getCommand(packageManager, scriptName, args) {
  if (scriptName === "install") {
    return packageManager === "yarn" ? "yarn" : `${packageManager} install`;
  }
  if (args) {
    return packageManager === "npm" ? `npm run ${scriptName} -- ${args}` : `${packageManager} ${scriptName} ${args}`;
  } else {
    return packageManager === "npm" ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`;
  }
}

// src/index.ts
function canSkipEmptying(dir) {
  if (!fs3.existsSync(dir)) {
    return true;
  }
  const files = fs3.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }
  return false;
}
function emptyDir(dir) {
  if (!fs3.existsSync(dir)) {
    return;
  }
  postOrderDirectoryTraverse(
    dir,
    (dir2) => fs3.rmdirSync(dir2),
    (file) => fs3.unlinkSync(file)
  );
}
async function init() {
  console.log();
  const defaultBanner = "Widget.js - The Desktop Widget Framework";
  const gradientBanner = gradient([
    { color: "#42d392", pos: 0 },
    { color: "#42d392", pos: 0.1 },
    { color: "#647eff", pos: 1 }
  ])(defaultBanner);
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8 ? gradientBanner : defaultBanner
  );
  console.log();
  const argv2 = minimist(process.argv.slice(2), {
    alias: {
      "typescript": ["ts"],
      "with-tests": ["tests"],
      "router": ["vue-router"]
    },
    string: ["_"],
    // all arguments are treated as booleans
    boolean: true
  });
  let targetDir = argv2._[0];
  const defaultProjectName = !targetDir ? "widget-project" : targetDir;
  const forceOverwrite = argv2.force;
  const unocss = argv2.unocss;
  const vueuse = argv2.vueuse;
  const iconpark = argv2.iconpark;
  const githubPage = argv2.githubPage;
  const eslintConfig = argv2.eslintConfig;
  const cwd2 = process.cwd();
  let result = {};
  result = await prompts(
    [
      {
        name: "projectName",
        type: targetDir ? null : "text",
        message: "Project name:",
        initial: defaultProjectName,
        onState: (state) => targetDir = String(state.value).trim() || defaultProjectName
      },
      {
        name: "shouldOverwrite",
        type: () => canSkipEmptying(targetDir) || forceOverwrite ? null : "confirm",
        message: () => {
          const dirForPrompt = targetDir === "." ? "Current directory" : `Target directory "${targetDir}"`;
          return `${dirForPrompt} is not empty. Remove existing files and continue?`;
        }
      },
      {
        name: "useVueUse",
        type: () => vueuse ? null : "confirm",
        message: () => {
          return `Use VueUse (Collection of Essential Vue Composition Utilities)?`;
        }
      },
      {
        name: "useUnoCss",
        type: () => unocss ? null : "confirm",
        message: () => {
          return `Use Unocss(Atomic CSS Engine)?`;
        }
      },
      {
        name: "useIconPark",
        type: () => iconpark ? null : "confirm",
        message: () => {
          return `Use IconPark (2000+ high-quality icons)?`;
        }
      },
      {
        name: "useGithubPage",
        type: () => githubPage ? null : "confirm",
        message: () => {
          return `Use GitHub Page to deploy your project?`;
        }
      },
      {
        name: "useEslintConfig",
        type: () => eslintConfig ? null : "confirm",
        message: () => {
          return `Use @antfu/eslint-config (Anthony's ESLint config preset)?`;
        }
      }
    ],
    {
      onCancel: () => {
        throw new Error(`${chalk.red("\u2716")} Operation cancelled`);
      }
    }
  );
  const {
    projectName,
    shouldOverwrite = argv2.force,
    useVueUse = argv2.vueuse,
    useUnoCss = argv2.unocss,
    useIconPark = argv2.iconpark,
    useGithubPage = argv2.githubPage,
    useEslintConfig = argv2.eslintConfig
  } = result;
  const root = path3.join(cwd2, targetDir);
  if (fs3.existsSync(root) && shouldOverwrite) {
    emptyDir(root);
  } else if (!fs3.existsSync(root)) {
    fs3.mkdirSync(root);
  }
  console.log(`
Scaffolding project in ${root}...`);
  const templateRoot = path3.join(__dirname, "../template");
  await FileUtils.copyFolderRecursive(templateRoot, root);
  const packageJsonPath = path3.resolve(`${root}/package.json`);
  const packageJson = JSON.parse(fs3.readFileSync(packageJsonPath).toString());
  if (useVueUse) {
    packageJson.dependencies["@vueuse/core"] = "latest";
  }
  if (useUnoCss) {
    packageJson.devDependencies.unocss = "latest";
    const unocssTemplateRoot = path3.join(__dirname, "../unocss");
    await FileUtils.copyFolderRecursive(unocssTemplateRoot, root);
  }
  if (useIconPark) {
    packageJson.dependencies["@icon-park/vue-next"] = "latest";
  }
  if (useEslintConfig) {
    packageJson.devDependencies["@antfu/eslint-config"] = "latest";
    packageJson.devDependencies.eslint = "latest";
    packageJson.scripts = {
      ...packageJson.scripts,
      "lint": "eslint .",
      "lint:fix": "eslint . --fix"
    };
    const eslintTemplateRoot = path3.join(__dirname, "../eslint");
    await FileUtils.copyFolderRecursive(eslintTemplateRoot, root);
  }
  fs3.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  if (useGithubPage) {
    const githubPageTemplateRoot = path3.join(__dirname, "../github-page");
    await FileUtils.copyFolderRecursive(githubPageTemplateRoot, root);
  }
  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent) ? "pnpm" : /yarn/.test(userAgent) ? "yarn" : "npm";
  console.log(`
Done. Now run:
`);
  if (root !== cwd2) {
    const cdProjectName = path3.relative(cwd2, root);
    console.log(
      `  ${chalk.bold(
        chalk.green(
          `cd ${cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName}`
        )
      )}`
    );
  }
  console.log(
    `  ${chalk.bold(chalk.green(getCommand(packageManager, "install")))}`
  );
}
init().catch((e) => {
  console.error(e);
});
