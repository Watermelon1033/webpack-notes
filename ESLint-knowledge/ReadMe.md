# ESLint


- [官网文档]()
- 要看文章: [从 0 到 1 配置 ESLint](https://juejin.im/entry/599e5ad4f265da2488089ad3)




## Catalog
1. Getting Started with ESLint
2. Configuring ESLint [高级配置](https://cn.eslint.org/docs/user-guide/configuring)
3. 推荐规则收集


## New Words




## Content
### 1. Getting Started with ESLint
- ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，
  它的目标是保证代码的一致性和避免错误。在许多方面，它和 JSLint、JSHint 相似，
  除了少数的例外:
    + ESLint 使用 [Espree](https://github.com/eslint/espree)
      解析 JavaScript。
    + ESLint 使用 AST 去分析代码中的模式
    + ESLint 是完全插件化的。每一个规则都是一个插件并且你可以在运行时添加更多的规则。
#### 1.1 Installation and Usage(安装和使用)
- 先决条件: `Node.js`(>= 6.14), npm version 3+.
  
  可以使用 npm 安装 ESLint, 比如创建好的 vue 项目 `vue-project`,
  在控制台通过 `cd` 进入到项目内, 然后执行: 
  ```shell
    npm install eslint --save-dev
  ```
  紧接着使用: 
  ```shell
    eslint --init
  ```
  创建 `.eslintrc` 文件 (Tip: 就是一个 JSON).
#### 1.2 Configuration(配置)
- `.eslintrc` 文件, 默认规则为这样:
  ```json
    {
        "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "double"]
        }
    }
  ```
  `"semi"` 和 `"quotes"` 是 ESLint 中
  [规则](https://cn.eslint.org/docs/rules/)(或见 `./Rules-规则.pdf`)
  的名称. 第一个值是错误级别, 可以使用下面的值之一:
    + (1) `"off"` or `0` -- 关闭规则  
    + (2) `"warn"` or `1` -- 将规则视为一个警告(不会影响退出码)
    + (3) `"error"` or `2` --  将规则视为一个错误(退出码为 1)
  
  这 3 个错误级别是可以允许你细粒度的控制 ESLint
  是如何应用规则(更多关于配置选项和细节的问题, 请查看
  [配置文件](https://cn.eslint.org/docs/user-guide/configuring)).

  你的 `.eslintrc` 配置文件可以包含下面的一行:
  ```json
    "extends": "eslint:recommended"
  ```
  由于这行, 所有在[规则页面](https://cn.eslint.org/docs/rules/)
  被标记为 "√" 的规则将会默认开启. 另外, 你可以在
  [npmjs.com](https://www.npmjs.com/search?q=eslint-config)
  搜索 "eslint-config" 使用别人创建好的配置.
  只有在你的配置文件中扩展了一个可分享的配置或者明确开启了一个规则, ESLint
  才会去校验你的代码.

### 2. Configuring ESLint [高级配置](https://cn.eslint.org/docs/user-guide/configuring)



### 3. 推荐规则收集
- 规则收集: `./Rules-规则.md`.
- 出现这种错误 `Parsing error: The keyword 'import' is reserved`,
  是因为没有指定 ES 版本为 ES2016, 并指定模块类型(`sourceType`) 为 module, 
  如此便支持 `export` 和 `import` 来导出并引用文件:
  ```json
    {
        "parserOptions": {
            "ecmaVersion": 7,
            "sourceType": "module",
        }
    }
  ```

