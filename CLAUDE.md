# CLAUDE.md

## 1. 项目概览

`zenmind-website` 是 ZenMind 的公网官网仓库，负责承载品牌展示、下载分发、GitHub 导流和基础公开说明页面。

当前业务边界：

- 承载 `www.zenmind.cc` 官网
- 输出双语静态页面
- 提供 `/install/*.sh` bootstrap 脚本
- 提供网站级 FAQ 与隐私页
- 不承载业务 API
- 不承载登录态和产品后台能力

主域名策略：

- 规范入口：`https://www.zenmind.cc`
- `https://zenmind.cc` 需重定向到 `www`

## 2. 技术栈

- React 19
- React Router DOM 6
- Vite 7
- 原生 CSS
- 静态托管 + Nginx

部署方式：

- 前端构建为纯静态资源
- Nginx 提供静态文件服务、错误页、缓存策略和 HTTPS 终止

## 3. 架构设计

项目采用“单前端应用 + 静态分发资源”的结构。

核心分层：

1. 页面与路由层
   - `src/App.jsx`
   - 定义中英文路由、页面布局、导航、打字效果、滚动显现效果
2. 内容与站点契约层
   - `src/site-data.js`
   - 集中维护站点文案、下载命令、语言路由映射、公开链接
3. 视觉系统层
   - `src/styles.css`
   - 维护颜色、排版、背景、动效和响应式规则
4. 静态公开资源层
   - `public/`
   - 包含 favicon、404/50x 页面和官网 bootstrap 脚本
5. 部署配置层
   - `deploy/nginx/`
   - 维护生产参考 Nginx 配置和部署说明

系统边界：

- 官网根域名只做静态站点
- 根域名显式拒绝 `/api/*`
- 未来业务服务建议通过独立子域名接入

## 4. 目录结构

```text
zenmind-website/
  README.md
  CLAUDE.md
  .env.example
  package.json
  vite.config.js
  index.html

  src/
    main.jsx
    App.jsx
    site-data.js
    styles.css

  public/
    favicon.svg
    404.html
    50x.html
    install/
      mac.sh
      linux.sh
      win-wsl.sh

  deploy/
    nginx/
      zenmind.cc.conf
      README.md
```

目录职责：

- `src/`：站点源码
- `public/`：原样拷贝到构建产物的公开静态文件
- `deploy/nginx/`：服务端部署参考配置
- `dist/`：构建产物目录，不作为事实源

## 5. 数据结构

本项目无数据库，也无后端领域模型。

当前核心“数据结构”主要是前端静态内容对象：

1. `routeMap`
   - 定义 `zh` 和 `en` 两套路由
   - 是站内路径契约的单一事实源
2. `downloadLinks`
   - 维护 Android / iOS / GitHub 外链
   - Android 与 iOS 当前允许为空占位
3. `languages`
   - 维护各语言的 SEO、导航、首页、下载页、架构页、FAQ、隐私页文案

这些对象集中定义在 `src/site-data.js`，避免页面内部重复维护文案与路径。

## 6. API 定义

本仓库不提供应用级 API。

当前只定义公开站点路由与静态脚本出口：

页面路由：

- `/`
- `/download`
- `/architecture`
- `/faq`
- `/privacy`
- `/en`
- `/en/download`
- `/en/architecture`
- `/en/faq`
- `/en/privacy`

静态脚本路由：

- `/install/mac.sh`
- `/install/linux.sh`
- `/install/win-wsl.sh`

Nginx 行为契约：

- `/assets/*`：长缓存
- `/install/*`：不缓存，输出 shell 文本
- `/api/*`：返回 `404`
- 其他路径：SPA 回退到 `index.html`

## 7. 开发要点

1. 文案与路由统一维护
   - 新增页面或文案优先修改 `src/site-data.js`
   - 避免在多个组件里分散硬编码同一路径和同一段内容
2. 官网脚本是公开静态资源
   - 所有 `/install/*.sh` 必须放在 `public/install/`
   - 脚本要能独立被 `curl | bash` 调用
3. 根域名不承载 API
   - 不要在官网 Nginx 配置里混入产品反向代理
4. 视觉风格保持高端极简
   - 优先克制、清晰、留白和节制动效
   - 避免堆砌通用模板式组件
5. 兼容性
   - 页面动效需要兼容 `prefers-reduced-motion`
   - 静态部署必须兼容 SPA 路由刷新

## 8. 开发流程

本地开发：

```bash
npm install
npm run dev
```

构建验证：

```bash
npm run build
bash -n public/install/mac.sh
bash -n public/install/linux.sh
bash -n public/install/win-wsl.sh
```

部署流程：

1. 本地或服务器执行 `npm run build`
2. 上传 `dist/` 到目标静态目录
3. 应用 `deploy/nginx/zenmind.cc.conf`
4. 运行 `nginx -t`
5. 重载 Nginx

修改下载链接时的建议流程：

1. 先更新 `src/site-data.js` 中的 `downloadLinks`
2. 检查下载页和首页是否都已反映变化
3. 重新构建并发布

## 9. 已知约束与注意事项

1. Android APK 与 iOS App Store 当前仍为占位链接
2. 当前仓库没有接入运行时环境变量消费逻辑
3. 网站是纯静态站，不支持服务端渲染
4. `dist/` 是构建结果，不应手工维护
5. `node_modules/` 是本地依赖目录，不应作为仓库事实源
6. 官网脚本依赖 `https://github.com/linlay/zenmind.git` 可访问
7. Windows 安装链路当前仅支持 WSL，不支持原生 Windows Shell
