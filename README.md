# ZenMind Website

ZenMind 官网仓库，用于构建并发布 `www.zenmind.cc` 公网品牌站。

## 1. 项目简介

这是 ZenMind 的网站端项目，定位为一个面向公网发布的双语静态官网，负责：

- 品牌展示
- 下载分发入口
- GitHub 导流
- 官网级隐私与 FAQ 页面
- 提供 `/install/*.sh` 一键 bootstrap 脚本

当前网站主域名约定为：

- `https://www.zenmind.cc`：官网主入口
- `https://zenmind.cc`：301 跳转到 `www`

根域名只承载官网，不承载业务 API。未来产品入口应通过子域名承载，例如 `app.zenmind.cc`、`api.zenmind.cc`。

## 2. 快速开始

### 前置要求

- Node.js 20+
- npm 10+

### 本地启动

```bash
npm install
npm run dev
```

默认使用 Vite 本地开发服务器。

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

### 当前页面路由

- 中文：
  - `/`
  - `/download`
  - `/architecture`
  - `/faq`
  - `/privacy`
- English:
  - `/en`
  - `/en/download`
  - `/en/architecture`
  - `/en/faq`
  - `/en/privacy`

### 官网安装脚本

构建后会一起发布以下静态脚本：

- `/install/mac.sh`
- `/install/linux.sh`
- `/install/win-wsl.sh`

脚本行为：

- 默认安装目录为 `$HOME/zenmind`
- 若目录不存在则 clone `https://github.com/linlay/zenmind.git`
- 若目录已存在则执行 `git pull --ff-only`
- 然后转交到正式安装脚本：
  - `./setup-mac.sh`
  - `./setup-linux.sh`
  - `./setup-win-wsl.sh`

## 3. 配置说明

本仓库当前是纯静态品牌站，不依赖必须填写的运行时环境变量。

- 根目录 `.env.example` 仅作为未来扩展保留位与约定说明
- 当前前端代码未消费任何 `VITE_*` 变量
- Android APK 与 iOS App Store 链接当前仍为占位
- 若后续接入真实移动端下载地址，建议优先将链接收敛到前端单一配置文件或明确的环境变量契约，不要分散维护

当前关键事实文件：

- 使用说明与部署说明：`README.md`
- 项目事实与架构：`CLAUDE.md`
- 官网 Nginx 示例：`deploy/nginx/zenmind.cc.conf`
- 前端文案与路由数据：`src/site-data.js`

## 4. 部署

### 静态站部署

```bash
npm install
npm run build
```

将 `dist/` 发布到服务器静态目录，例如：

```bash
/var/www/zenmind.cc/current/dist
```

### Nginx 配置

项目已提供参考配置：

- `deploy/nginx/zenmind.cc.conf`

部署说明见：

- `deploy/nginx/README.md`

当前约定：

- `80` 全量跳转到 `https://www.zenmind.cc`
- `443` 承载静态站
- `/assets/*` 长缓存
- `/install/*` 不缓存，直接输出 shell 脚本
- `/api/*` 返回 `404`
- 其他路径使用 SPA 回退到 `index.html`

### 证书

Nginx 配置默认按 Certbot 路径示例编写：

- `/etc/letsencrypt/live/www.zenmind.cc/fullchain.pem`
- `/etc/letsencrypt/live/www.zenmind.cc/privkey.pem`

如服务器路径不同，请按实际环境调整。

## 5. 运维

### 常用命令

```bash
npm run build
bash -n public/install/mac.sh
bash -n public/install/linux.sh
bash -n public/install/win-wsl.sh
```

### 常见排查

- 页面刷新 404：
  - 检查 Nginx 是否使用了 `try_files $uri $uri/ /index.html;`
- `/install/*.sh` 无法访问：
  - 检查构建产物中是否已包含 `dist/install/`
  - 检查 Nginx 是否对 `/install/` 单独放行
- 官网访问到 `/api/*`：
  - 这是预期行为，根域名不承载 API
- Android / iOS 按钮还是占位：
  - 当前属于未补真实下载链接的正常状态
- 样式或路由变更没有生效：
  - 重新执行 `npm run build`
  - 检查服务器是否部署了最新 `dist/`

### 发布前建议检查

```bash
npm run build
nginx -t
```

确认：

- `dist/install/*.sh` 已生成
- `dist/404.html` 与 `dist/50x.html` 已生成
- 中英文路由在刷新场景下可正常访问

## 6. FAQ

### 这是内容站还是产品站？

当前是官网与下载入口，不是产品后台。

### 为什么根域名不挂 API？

这是有意的边界设计。官网只做品牌和分发，业务入口后续走独立子域名，避免路由职责混乱。

### 现在可以直接发到线上吗？

可以。当前仓库已经具备：

- 本地开发
- 生产构建
- 静态错误页
- 安装脚本静态输出
- Nginx 参考配置

剩余待补的主要是：

- Android APK 真实地址
- iOS App Store 真实地址
# zenmind-website
