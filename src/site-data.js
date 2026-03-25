const siteUrl = 'https://www.zenmind.cc';
const githubUrl = 'https://github.com/linlay/zenmind';

export const downloadLinks = {
  android: null,
  ios: null,
  github: githubUrl,
};

export const routeMap = {
  zh: {
    home: '/',
    download: '/download',
    architecture: '/architecture',
    faq: '/faq',
    privacy: '/privacy',
  },
  en: {
    home: '/en',
    download: '/en/download',
    architecture: '/en/architecture',
    faq: '/en/faq',
    privacy: '/en/privacy',
  },
};

const installCommands = {
  mac: 'curl -fsSL https://www.zenmind.cc/install/mac.sh | bash',
  linux: 'curl -fsSL https://www.zenmind.cc/install/linux.sh | bash',
  wsl: 'curl -fsSL https://www.zenmind.cc/install/win-wsl.sh | bash',
};

export const languages = {
  zh: {
    code: 'zh-CN',
    switchLabel: 'EN',
    brandMark: 'ZenMind',
    seo: {
      title: 'ZenMind | 面向个人的本地优先 AI 工作台',
      description:
        'ZenMind 是面向个人的本地优先 AI 工作台，用一个入口管理安装、服务与配置。',
      url: siteUrl,
    },
    nav: {
      home: '首页',
      download: '下载',
      architecture: '架构',
      faq: 'FAQ',
      privacy: '隐私',
      github: 'GitHub',
    },
    home: {
      eyebrow: 'Local-first AI Workspace',
      headline: '本地优先的个人 AI 工作台',
      subtitle:
        '用一个入口管理安装、服务与配置，适合在 macOS、Linux 和 WSL 上快速部署 ZenMind。',
      typewriter: [
        '统一的安装入口',
        'release 版本一键部署',
        '适合个人环境与小型服务器',
      ],
      primaryCta: '立即安装',
      secondaryCta: '查看 GitHub',
      installTitle: '一行命令，安装最新稳定版。',
      installCards: [
        {
          name: 'macOS',
          platform: 'mac',
          command: installCommands.mac,
        },
        {
          name: 'Linux',
          platform: 'linux',
          command: installCommands.linux,
        },
        {
          name: 'Windows (WSL)',
          platform: 'windows',
          command: installCommands.wsl,
        },
      ],
      bentoFeatures: [
        {
          icon: 'agent',
          title: 'Agent Platform',
          body: '统一服务编排、配置和部署链路，让 Agent 工作流在本机和服务器上都可控。',
          span: 2,
        },
        {
          icon: 'terminal',
          title: 'Terminal Client',
          body: '命令行优先的操作入口，适合开发者的日常工作流。',
          span: 1,
        },
        {
          icon: 'voice',
          title: 'Voice Server',
          body: '语音交互服务，让 AI 助理更贴近自然沟通方式。',
          span: 1,
        },
        {
          icon: 'gateway',
          title: 'Gateway',
          body: '统一流量入口，把多服务整合成一条清晰、稳定的访问路径。',
          span: 2,
        },
        {
          icon: 'mcp',
          title: 'MCP Servers',
          body: 'Mock、Bash、Email 等服务以插件式方式接入，让能力更贴近个人场景。',
          span: 1,
        },
        {
          icon: 'web',
          title: 'Pan Web Client',
          body: '跨平台 Web 入口，从桌面到移动端都能访问你的 AI 助理。',
          span: 1,
        },
      ],
      showcaseTitle: 'ZenMind 实际效果',
      showcasePlaceholder: 'Demo coming soon',
      stats: [
        { value: '7', label: 'Services' },
        { value: '3', label: 'Platforms' },
        { value: '1', label: 'Command' },
      ],
      ctaTitle: '准备好了吗？',
      ctaButton: '前往下载',
      footerTagline: 'Built for personal AI workflows.',
    },
    download: {
      title: '下载与安装',
      intro:
        '官网当前提供 macOS、Linux 和 Windows (WSL) 的一键安装。同一条命令既用于首次安装，也用于后续升级：首次安装会自动打开 Config Studio 配置向导，已安装环境则会直接走 release 升级；如需锁定功能版本线，可设置 ZENMIND_RELEASE_LINE=vX.Y。',
      sections: [
        {
          title: 'macOS',
          subtitle: '默认安装最新稳定版',
          command: installCommands.mac,
          notes: [
            '需要 bash、curl、git 和可用的 Docker Compose 运行时',
            '脚本会先执行 ./setup-mac.sh --action check，再自动进入“首次安装向导”或“升级”分支',
            '首次安装会自动打开本地 Config Studio，保存 zenmind.profile.local.json 后继续启动服务',
            '默认仍按当前 setup 能力推荐 Docker Desktop；Podman 作为高级兼容选项',
            '重新运行同一条命令即可升级到最新稳定版并保留现有配置和数据',
            '如需锁定功能线，可先导出 ZENMIND_RELEASE_LINE=vX.Y',
          ],
        },
        {
          title: 'Linux',
          subtitle: '服务器与桌面 Linux',
          command: installCommands.linux,
          notes: [
            '默认推荐 Docker Engine + docker compose',
            'Podman 仅在 docker compose 可用时作为兼容方案',
            '脚本会先执行 ./setup-linux.sh --action check，再自动进入“首次安装向导”或“升级”分支',
            '首次安装会打开 Config Studio；若浏览器无法自动弹出，可按终端提示手动打开本地 HTML',
            '重新运行同一条命令即可升级到最新稳定版并保留现有配置和数据',
            '如需锁定功能线，可先导出 ZENMIND_RELEASE_LINE=vX.Y',
          ],
        },
        {
          title: 'Windows via WSL',
          subtitle: '请先进入 WSL Linux Shell',
          command: installCommands.wsl,
          notes: [
            '必须在 WSL 环境中执行',
            '默认推荐在 WSL 内安装 Docker Engine + docker compose',
            '不建议把 Docker Desktop 作为默认运行时',
            '脚本会先执行 ./setup-win-wsl.sh --action check，再自动进入“首次安装向导”或“升级”分支',
            '首次安装优先尝试用 wslview 打开 Config Studio，失败时会回退到 explorer.exe 或终端提示',
            '重新运行同一条命令即可升级到最新稳定版并保留现有配置和数据',
          ],
        },
      ],
      mobileTitle: '移动端分发（后续）',
      mobileCards: [
        {
          platform: 'Android APK',
          hrefKey: 'android',
          status: '后续提供',
          detail: '桌面与服务器安装是当前主入口，APK 分发位保留为后续补充。',
          cta: 'Coming Soon',
        },
        {
          platform: 'iOS App Store',
          hrefKey: 'ios',
          status: '等待商店链接',
          detail: 'iOS 仍以应用市场分发为主，官网后续只提供官方入口。',
          cta: 'App Store Placeholder',
        },
      ],
      sourceTitle: '源码入口',
      sourceBody: '如果你想先查看 setup、manifest 和 release 生成链路，可以直接访问 GitHub 仓库。',
    },
    architecture: {
      title: '架构概览',
      intro:
        'ZenMind 的网站端负责公开呈现与下载分发，真正的产品能力则由 Hub、Gateway、App Server 与多个 MCP 服务组成。',
      columns: [
        {
          title: 'Hub',
          body: '统一仓库与安装脚本层，管理 source / release / config，以及启动顺序。',
        },
        {
          title: 'Gateway',
          body: '以单一入口聚合各个上游服务，减少多端访问路径的复杂度。',
        },
        {
          title: 'App Server',
          body: '提供认证、管理与控制台体验，承担"系统可操作面"的核心角色。',
        },
        {
          title: 'MCP',
          body: 'Mock / Bash / Email 等服务按能力扩展，让个人助理更贴近真实任务流。',
        },
      ],
      timelineTitle: '部署心智模型',
      timeline: [
        '通过官网脚本进入 ZenMind Hub。',
        'Hub clone 或更新各活跃仓库，并生成 release 产物。',
        'Gateway 提供统一访问入口。',
        'App Server 与 MCP 服务按配置顺序协同启动。',
      ],
    },
    faq: {
      title: '常见问题',
      intro: '下面这些问题直接对应当前仓库和部署链路的真实能力，不做夸张承诺。',
      items: [
        {
          question: '现在可以直接用单个 shell 脚本完成安装吗？',
          answer:
            '可以。官网 bootstrap 脚本会先做环境检查，再根据本地 install-state 判断是“首次安装”还是“升级”；首次安装会自动打开 Config Studio，已安装环境会直接进入 release 升级。',
        },
        {
          question: 'Windows 为什么需要 WSL？',
          answer:
            '当前 ZenMind 的桌面部署链路已明确以 macOS、Linux 与 Windows 下的 WSL 为基线；原生 Windows 主系统不在当前支持范围内。',
        },
        {
          question: '为什么页面展示的是 vX.Y，实际安装结果是 vX.Y.Z？',
          answer:
            'vX.Y 代表用户感知的功能版本线，vX.Y.Z 代表该版本线下的具体修复版。默认安装会跟随最新稳定 patch；如果手动指定 ZENMIND_RELEASE_LINE=vX.Y，也会自动落到该线当前最新修复版。',
        },
        {
          question: '安装时如果 Docker 没启动、端口被占用，或者 WSL 没能自动打开浏览器怎么办？',
          answer:
            '安装脚本会先做环境检查并在终端给出提示。常见处理方式是先启动 Docker / docker compose、释放 11945/11946/11947/11950 等默认端口后重试；如果浏览器没有自动打开，可以按终端提示手动打开本地 Config Studio HTML 并保存配置文件。',
        },
        {
          question: 'Android 和 iOS 为什么还没有直接下载？',
          answer:
            '因为真实的 APK 和 App Store 链接尚未确定。官网先把结构和品牌感做好，等分发地址明确后再替换成正式链接。',
        },
        {
          question: '官网会和产品后台共用同一个域名吗？',
          answer:
            '不会。当前方案里 zenmind.cc 只承载官网，未来产品入口更适合走 app.zenmind.cc 或 api.zenmind.cc 这样的子域名。',
        },
      ],
    },
    privacy: {
      title: '隐私说明',
      intro:
        'ZenMind 官网主要用于品牌介绍、下载分发与 GitHub 导流，不承载产品级业务 API，也不会在主域名下提供账号系统。',
      points: [
        '官网本身不要求登录即可访问核心内容。',
        '桌面端安装脚本只负责拉取公开仓库并调用官方 setup 脚本。',
        '后续若接入统计、App Store 或 APK 下载链路，应在本页补充实际的数据处理说明。',
        '如未来上线 app.zenmind.cc 或 api.zenmind.cc，应在对应域名下单独维护服务级隐私政策。',
      ],
    },
    footer: {
      domain: '主站域名',
      rights: 'All rights reserved.',
      installLabel: '安装脚本',
    },
  },
  en: {
    code: 'en',
    switchLabel: '中',
    brandMark: 'ZenMind',
    seo: {
      title: 'ZenMind | A Local-first AI Workspace',
      description:
        'ZenMind is a local-first AI workspace for personal environments, with one entry point for install, services, and configuration.',
      url: `${siteUrl}/en`,
    },
    nav: {
      home: 'Home',
      download: 'Download',
      architecture: 'Architecture',
      faq: 'FAQ',
      privacy: 'Privacy',
      github: 'GitHub',
    },
    home: {
      eyebrow: 'Local-first AI Workspace',
      headline: 'A local-first AI workspace',
      subtitle:
        'Use one entry point for install, services, and configuration across macOS, Linux, and WSL.',
      typewriter: [
        'One install entry point',
        'Release-first deployment flow',
        'Built for personal setups and small servers',
      ],
      primaryCta: 'Install Now',
      secondaryCta: 'View on GitHub',
      installTitle: 'One command for the latest stable release.',
      installCards: [
        {
          name: 'macOS',
          platform: 'mac',
          command: installCommands.mac,
        },
        {
          name: 'Linux',
          platform: 'linux',
          command: installCommands.linux,
        },
        {
          name: 'Windows (WSL)',
          platform: 'windows',
          command: installCommands.wsl,
        },
      ],
      bentoFeatures: [
        {
          icon: 'agent',
          title: 'Agent Platform',
          body: 'Unified orchestration, configuration, and deployment so your agent stack stays controllable.',
          span: 2,
        },
        {
          icon: 'terminal',
          title: 'Terminal Client',
          body: 'CLI-first operations interface, designed for developer workflows.',
          span: 1,
        },
        {
          icon: 'voice',
          title: 'Voice Server',
          body: 'Voice interaction service for a more natural AI communication experience.',
          span: 1,
        },
        {
          icon: 'gateway',
          title: 'Gateway',
          body: 'A stable unified entrypoint that simplifies how multiple services are accessed.',
          span: 2,
        },
        {
          icon: 'mcp',
          title: 'MCP Servers',
          body: 'Composable capability modules — Mock, Bash, Email — tailored to personal workflows.',
          span: 1,
        },
        {
          icon: 'web',
          title: 'Pan Web Client',
          body: 'Cross-platform web access to your AI assistant, from desktop to mobile.',
          span: 1,
        },
      ],
      showcaseTitle: 'See ZenMind at work.',
      showcasePlaceholder: 'Demo coming soon',
      stats: [
        { value: '7', label: 'Services' },
        { value: '3', label: 'Platforms' },
        { value: '1', label: 'Command' },
      ],
      ctaTitle: 'Ready to start?',
      ctaButton: 'Go to Downloads',
      footerTagline: 'Built for personal AI workflows.',
    },
    download: {
      title: 'Download & Install',
      intro:
        'The website now focuses on one-line install flows for macOS, Linux, and Windows (WSL). The same command is used for first-time install and later upgrades: a fresh install opens Config Studio automatically, while an existing install goes straight into the release upgrade flow. To stay on a specific release line, set ZENMIND_RELEASE_LINE=vX.Y.',
      sections: [
        {
          title: 'macOS',
          subtitle: 'Latest stable by default',
          command: installCommands.mac,
          notes: [
            'Requires bash, curl, git, and a working Docker Compose runtime',
            'Runs ./setup-mac.sh --action check before choosing guided install or upgrade',
            'A fresh install opens local Config Studio and continues after you save zenmind.profile.local.json',
            'Docker Desktop remains the default recommendation for the current setup flow',
            'Run the same command again later to upgrade while keeping your config and data',
            'Set ZENMIND_RELEASE_LINE=vX.Y if you want to stay on one feature line',
          ],
        },
        {
          title: 'Linux',
          subtitle: 'Desktop and server environments',
          command: installCommands.linux,
          notes: [
            'Docker Engine + docker compose is the default recommendation',
            'Podman is only recommended when docker compose compatibility is already working',
            'Runs ./setup-linux.sh --action check before choosing guided install or upgrade',
            'A fresh install opens Config Studio; if that fails, follow the terminal hint and open the local HTML manually',
            'Run the same command again later to upgrade while keeping your config and data',
            'Set ZENMIND_RELEASE_LINE=vX.Y if you want to stay on one feature line',
          ],
        },
        {
          title: 'Windows via WSL',
          subtitle: 'Open a WSL Linux shell first',
          command: installCommands.wsl,
          notes: [
            'Must run inside a WSL Linux shell',
            'Prefer Docker Engine + docker compose inside WSL',
            'Docker Desktop is not the default recommendation here',
            'Runs ./setup-win-wsl.sh --action check before choosing guided install or upgrade',
            'Fresh install prefers wslview for Config Studio and falls back to explorer.exe or terminal guidance',
            'Run the same command again later to upgrade while keeping your config and data',
          ],
        },
      ],
      mobileTitle: 'Mobile distribution (later)',
      mobileCards: [
        {
          platform: 'Android APK',
          hrefKey: 'android',
          status: 'Later',
          detail: 'Desktop and server install paths come first. The APK slot remains reserved for a future public package.',
          cta: 'Coming Soon',
        },
        {
          platform: 'iOS App Store',
          hrefKey: 'ios',
          status: 'Awaiting store link',
          detail: 'iOS remains marketplace-first. The website will only expose the official store route.',
          cta: 'App Store Placeholder',
        },
      ],
      sourceTitle: 'Source code',
      sourceBody: 'If you want to inspect setup, manifest, and release generation directly, go to the GitHub repository.',
    },
    architecture: {
      title: 'Architecture',
      intro:
        'The website handles public presentation and distribution, while the actual product surface is composed by Hub, Gateway, App Server, and MCP services.',
      columns: [
        {
          title: 'Hub',
          body: 'The repository and setup layer that manages source / release / config and startup ordering.',
        },
        {
          title: 'Gateway',
          body: 'A unified traffic entrypoint that keeps multiple upstream services coherent.',
        },
        {
          title: 'App Server',
          body: 'Authentication, control surfaces, and the management experience for day-to-day operation.',
        },
        {
          title: 'MCP',
          body: 'Extensible service modules such as Mock, Bash, and Email capabilities.',
        },
      ],
      timelineTitle: 'Deployment mental model',
      timeline: [
        'Start from the website bootstrap scripts.',
        'ZenMind Hub clones or updates the active repositories and builds release artifacts.',
        'Gateway presents one stable entrypoint.',
        'App Server and MCP services start in a configured order.',
      ],
    },
    faq: {
      title: 'FAQ',
      intro: 'These answers stay close to what the current repositories actually support.',
      items: [
        {
          question: 'Is this really a one-line install?',
          answer:
            'Yes from the website perspective. The bootstrap script still shallow-clones or updates the official repository, but it now runs an environment check first, then decides between first-time guided install and release upgrade by checking the local install state.',
        },
        {
          question: 'Why does Windows rely on WSL?',
          answer:
            'The current ZenMind deployment baseline supports macOS, Linux, and Windows through WSL. Native Windows setup is outside the current scope.',
        },
        {
          question: 'Why do I see vX.Y while the actual install is vX.Y.Z?',
          answer:
            'vX.Y is the user-facing release line. vX.Y.Z is the exact patch shipped underneath it. Stable install follows the newest patch automatically, and ZENMIND_RELEASE_LINE=vX.Y stays on the newest patch inside that line.',
        },
        {
          question: 'What if Docker is not running, ports are already in use, or WSL did not open the browser?',
          answer:
            'The installer prints environment-check feedback in the terminal first. In practice that usually means starting Docker or docker compose, freeing the default ports such as 11945/11946/11947/11950, and reopening the local Config Studio HTML manually if the browser did not launch.',
        },
        {
          question: 'Why are Android and iOS still placeholders?',
          answer:
            'Because the real APK and App Store links are not available yet. The website keeps the structure ready without pretending those downloads already exist.',
        },
        {
          question: 'Will the main domain also host product APIs?',
          answer:
            'No. The current plan keeps zenmind.cc dedicated to the public website. Future product surfaces should live on subdomains like app.zenmind.cc or api.zenmind.cc.',
        },
      ],
    },
    privacy: {
      title: 'Privacy',
      intro:
        'The main ZenMind website is designed for storytelling, downloads, and GitHub routing. It does not expose product APIs or user accounts on the root domain.',
      points: [
        'The public website does not require account login for primary content.',
        'Bootstrap scripts only fetch the public repository and run the official setup scripts.',
        'If analytics, APK distribution, or store integrations are added later, this page should be updated with the real data handling details.',
        'Any future app.zenmind.cc or api.zenmind.cc service should maintain its own service-level privacy notice.',
      ],
    },
    footer: {
      domain: 'Primary domain',
      rights: 'All rights reserved.',
      installLabel: 'Install scripts',
    },
  },
};

export { githubUrl, siteUrl };
