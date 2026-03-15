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
      title: 'ZenMind | 面向个人的智能 AI 助理生态',
      description:
        'ZenMind 是一个面向个人的高端 AI 助理生态，覆盖服务端、App 端与网站端体验，强调本地优先、统一入口与多服务协作。',
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
      eyebrow: 'Personal AI Agent Platform',
      headline: '你的 AI。\n你的栈。\n你的设备。',
      subtitle:
        'ZenMind 把 Server、App 与 Web 串成一体，用克制而强大的方式，把个人智能助理真正带到你的设备和工作流里。',
      typewriter: [
        '为个人用户而生',
        '本地优先的统一入口',
        '多服务协作的 AI 助理',
      ],
      primaryCta: '立即安装',
      secondaryCta: '查看 GitHub',
      installTitle: '一行命令，开始部署。',
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
        '官网当前以桌面脚本安装为主，移动端预留标准分发入口。所有桌面脚本都会 clone 或更新 GitHub 仓库，然后调用官方 setup 脚本。',
      sections: [
        {
          title: 'macOS',
          subtitle: '一键安装',
          command: installCommands.mac,
          notes: [
            '默认安装到 $HOME/zenmind',
            '首次执行会 clone 仓库；后续执行会自动 pull',
            '最终调用 ./setup-mac.sh',
          ],
        },
        {
          title: 'Linux',
          subtitle: '服务器与桌面 Linux',
          command: installCommands.linux,
          notes: [
            '适合 Linux 主机与云服务器',
            '默认安装到 $HOME/zenmind',
            '最终调用 ./setup-linux.sh',
          ],
        },
        {
          title: 'Windows via WSL',
          subtitle: '请先进入 WSL Shell',
          command: installCommands.wsl,
          notes: [
            '必须在 WSL 环境中执行',
            '当前不支持原生 Windows 主系统脚本安装',
            '最终调用 ./setup-win-wsl.sh',
          ],
        },
      ],
      mobileTitle: '移动端分发',
      mobileCards: [
        {
          platform: 'Android APK',
          hrefKey: 'android',
          status: '即将提供',
          detail: '页面已预留直接下载位，等真实 APK 地址确定后可立即替换。',
          cta: 'Coming Soon',
        },
        {
          platform: 'iOS App Store',
          hrefKey: 'ios',
          status: '等待上架链接',
          detail: 'iOS 通过应用市场分发，官网只提供官方入口，不提供侧载说明。',
          cta: 'App Store Placeholder',
        },
      ],
      sourceTitle: '源码入口',
      sourceBody: '如果你更倾向于手动查看部署链路，可以直接访问 GitHub 仓库。',
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
            '可以通过官网 bootstrap 脚本一键进入安装流程，但它的本质是先 clone 或更新 GitHub 仓库，再调用仓库里的正式 setup 脚本。',
        },
        {
          question: 'Windows 为什么需要 WSL？',
          answer:
            '当前 ZenMind 的桌面部署链路已明确以 macOS、Linux 与 Windows 下的 WSL 为基线；原生 Windows 主系统不在当前支持范围内。',
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
      title: 'ZenMind | A Personal AI Assistant Ecosystem',
      description:
        'ZenMind is a premium personal AI assistant ecosystem spanning server, app, and web experiences with a local-first architecture.',
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
      eyebrow: 'Personal AI Agent Platform',
      headline: 'Your AI.\nYour Stack.\nYour Device.',
      subtitle:
        'ZenMind brings server, app, and web into one refined ecosystem — a truly personal AI assistant that lives on your device.',
      typewriter: [
        'Designed for personal AI',
        'A local-first unified entry point',
        'Multi-service orchestration with calm polish',
      ],
      primaryCta: 'Install Now',
      secondaryCta: 'View on GitHub',
      installTitle: 'One command to get started.',
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
        'The public website focuses on desktop bootstrap scripts today, with proper placeholders for mobile distribution. Every desktop script clones or updates the GitHub repo before handing off to the official setup script.',
      sections: [
        {
          title: 'macOS',
          subtitle: 'One-line bootstrap',
          command: installCommands.mac,
          notes: [
            'Installs into $HOME/zenmind by default',
            'Clones on first run and pulls on later runs',
            'Hands off to ./setup-mac.sh',
          ],
        },
        {
          title: 'Linux',
          subtitle: 'Desktop and server environments',
          command: installCommands.linux,
          notes: [
            'Suitable for Linux workstations and servers',
            'Installs into $HOME/zenmind by default',
            'Hands off to ./setup-linux.sh',
          ],
        },
        {
          title: 'Windows via WSL',
          subtitle: 'Enter WSL first',
          command: installCommands.wsl,
          notes: [
            'Must run inside a WSL Linux shell',
            'Native Windows bootstrap is intentionally unsupported',
            'Hands off to ./setup-win-wsl.sh',
          ],
        },
      ],
      mobileTitle: 'Mobile distribution',
      mobileCards: [
        {
          platform: 'Android APK',
          hrefKey: 'android',
          status: 'Coming soon',
          detail: 'The direct APK slot is ready as soon as the real package URL is available.',
          cta: 'Coming Soon',
        },
        {
          platform: 'iOS App Store',
          hrefKey: 'ios',
          status: 'Awaiting store link',
          detail: 'iOS stays marketplace-first. The website only exposes the official store route.',
          cta: 'App Store Placeholder',
        },
      ],
      sourceTitle: 'Source code',
      sourceBody: 'If you prefer to inspect the deployment flow yourself, go directly to the GitHub repository.',
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
            'Yes, from the website perspective. The bootstrap script still clones or updates the official GitHub repository before it delegates to the real setup script.',
        },
        {
          question: 'Why does Windows rely on WSL?',
          answer:
            'The current ZenMind deployment baseline supports macOS, Linux, and Windows through WSL. Native Windows setup is outside the current scope.',
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
