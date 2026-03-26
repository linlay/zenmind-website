# ZenMind Website

ZenMind 官网仓库，用于构建并发布 `www.zenmind.cc` 的双语静态品牌站。

## 1. 项目定位

`zenmind-website` 现在只负责官网展示，不再负责安装脚本源码、release 产物生成、Nginx 部署配置或服务器部署编排。

当前职责边界：

- 官网首页与下载页展示
- 中英文双语路由
- FAQ 与隐私页
- GitHub 与官方 deploy 入口引导

不负责的内容：

- `/install/*.sh` 脚本源码维护
- release manifest / index 生成
- Docker / Compose / Nginx 部署资产
- 服务器发布与部署

以上发布与部署相关流程统一由 `zenmind-deploy` 负责。

## 2. 本地开发

### 前置要求

- Node.js 20+
- npm 10+

### 启动开发环境

```bash
npm install
npm run dev
```

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 3. 当前路由

中文：

- `/`
- `/download`
- `/faq`
- `/privacy`

English:

- `/en`
- `/en/download`
- `/en/faq`
- `/en/privacy`

## 4. 内容与数据维护

当前前端事实源集中在以下文件：

- `src/site-data.js`
  - 维护路由映射
  - 维护官网文案
  - 维护 `externalLinks` 与 `installEntries`
- `src/App.jsx`
  - 维护页面结构、路由映射与复用组件
- `src/styles.css`
  - 维护字体、配色、布局、响应式与动效

安装入口策略：

- 官网仍展示 macOS、Linux、Windows (WSL) 的安装命令
- 首页与下载页复用同一份 `installEntries`
- 官网只展示命令与说明，不再把这些脚本作为仓库产物维护

## 5. 与 zenmind-deploy 的关系

官网与部署仓库的协作方式如下：

- `zenmind-website` 负责公开页面与品牌表达
- `zenmind-deploy` 负责安装脚本生成、release 产物、官网静态发布和服务器部署
- 当安装入口或 deploy 流程变化时，官网只需要更新文案与链接常量

当前代码中为 deploy 预留了统一入口：

- `externalLinks.deployDocs`
- `externalLinks.deployRepo`

如果后续 deploy 的公开入口地址变化，只需修改 `src/site-data.js` 中对应常量。

## 6. 开发约定

- 新增或修改官网文案时，优先更新 `src/site-data.js`
- 保持首页主导的信息结构，不再恢复独立 `Architecture` 页面
- 官网只负责说明和引导，不要把 deploy 逻辑重新带回本仓库
- 动效需兼容 `prefers-reduced-motion`
- 修改页面后至少执行一次 `npm run build`

## 7. 验证建议

发布前建议检查：

```bash
npm run build
```

确认：

- 中英文 8 个页面入口可构建
- 首页首屏能直接看到三平台安装命令
- Download 页能清楚展示官网与 deploy 的职责分离

# zenmind-website
