# uCode v4 插件脚手架

该脚手架依赖于 [Yeoman](https://yeoman.io/) 生成

## 使用指南

两种使用方式:

1. 全局安装 yeoman

- 配置 registry，添加该行到全局的 ~/.npmrc 里面
  `@ubt:registry=http://npm.edu.ubtrobot.com/`
- 安装 yeoman `yarn global add yo`
- `yo @ubt/ucode`

2. 直接使用 npx 或者 yarn create

- 配置 registry，添加该行到全局的 ~/.npmrc 里面
  `@ubt:registry=http://npm.edu.ubtrobot.com/`
- `npx yo @ubt/ucode` 或者 `yarn create yo @ubt/ucode`

还有另外一种方法：`npm init yo @ubt/ucode`

## 目前问题

Yeoman 目前在 mac 12.0 上面还有问题，可以参照以下解决方案

This issue causes by the [insight](https://www.npmjs.com/package/insight) is using a outdated [os-name](https://www.npmjs.com/package/os-name) dependencies (actually it was the outdated [macos-release ](https://www.npmjs.com/package/macos-release))

```json
"dependencies": {
  "async": "^2.6.2",
  "chalk": "^2.4.2",
  "conf": "^1.4.0",
  "inquirer": "^6.3.1",
  "lodash.debounce": "^4.0.8",
  "os-name": "^3.1.0",
  "request": "^2.88.0",
  "tough-cookie": "^3.0.1",
  "uuid": "^3.3.2"
},
```

## Temporary Solution

Find the `macos-release` index.js, the error trace would print out in the console.

In my case.

```shell
❯ yo @ubt/ucode
/Users/alex/.config/yarn/global/node_modules/os-name/node_modules/macos-release/index.js:26
	const [name, version] = nameMap.get(release);
	                        ^

TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
    at macosRelease (/Users/alex/.config/yarn/global/node_modules/os-name/node_modules/macos-release/index.js:26:26)
    at osName (/Users/alex/.config/yarn/global/node_modules/os-name/index.js:21:18)
    at new Insight (/Users/alex/.config/yarn/global/node_modules/insight/lib/index.js:37:13)
    at Object.<anonymous> (/Users/alex/.config/yarn/global/node_modules/yo/lib/cli.js:54:17)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

Check this line, open the `index.js` file

```shell
    at macosRelease (/Users/alex/.config/yarn/global/node_modules/os-name/node_modules/macos-release/index.js:26:26)
```

I add the below line to make it works temporary.

`[21, ['Monterey', '12']],`

```javascript
const nameMap = new Map([
  [21, ['Monterey', '12']], // Here
  [20, ['Big Sur', '11']],
  [19, ['Catalina', '10.15']],
  [18, ['Mojave', '10.14']],
  [17, ['High Sierra', '10.13']],
  [16, ['Sierra', '10.12']],
  [15, ['El Capitan', '10.11']],
  [14, ['Yosemite', '10.10']],
  [13, ['Mavericks', '10.9']],
  [12, ['Mountain Lion', '10.8']],
  [11, ['Lion', '10.7']],
  [10, ['Snow Leopard', '10.6']],
  [9, ['Leopard', '10.5']],
  [8, ['Tiger', '10.4']],
  [7, ['Panther', '10.3']],
  [6, ['Jaguar', '10.2']],
  [5, ['Puma', '10.1']],
]);
```
