const siteUrl = 'https://www.zenmind.cc';
const githubUrl = 'https://github.com/linlay/zenmind';
const deployRepoUrl = 'https://github.com/linlay/zenmind-deploy';

export const externalLinks = {
  github: githubUrl,
  deployDocs: deployRepoUrl,
  deployRepo: deployRepoUrl,
};

export const routeMap = {
  zh: {
    home: '/',
    download: '/download',
    faq: '/faq',
    privacy: '/privacy',
  },
  en: {
    home: '/en',
    download: '/en/download',
    faq: '/en/faq',
    privacy: '/en/privacy',
  },
};

export const installEntries = [
  {
    key: 'mac',
    name: 'macOS',
    command: 'curl -fsSL https://www.zenmind.cc/install/mac.sh | bash',
    docsHref: deployRepoUrl,
    zh: {
      summary: '推荐个人开发者使用',
      notes: [
        '需要 Docker Desktop 运行环境。',
        '首次执行进入引导安装，后续使用同一命令即可升级。',
      ],
    },
    en: {
      summary: 'Recommended for individual developers.',
      notes: [
        'Requires Docker Desktop.',
        'The first run launches guided setup, and the same command can be used for upgrades later.',
      ],
    },
  },
  {
    key: 'linux',
    name: 'Linux',
    command: 'curl -fsSL https://www.zenmind.cc/install/linux.sh | bash',
    docsHref: deployRepoUrl,
    zh: {
      summary: '适合服务器与长期运行环境',
      notes: [
        '需要 Docker Engine 与 Docker Compose。',
        '支持 Ubuntu、Debian、CentOS 等主流发行版。',
      ],
    },
    en: {
      summary: 'Great for servers and long-running environments.',
      notes: [
        'Requires Docker Engine and Docker Compose.',
        'Supports mainstream distributions such as Ubuntu, Debian, and CentOS.',
      ],
    },
  },
  {
    key: 'windows',
    name: 'Windows (WSL)',
    command: 'curl -fsSL https://www.zenmind.cc/install/win-wsl.sh | bash',
    docsHref: deployRepoUrl,
    zh: {
      summary: '通过 WSL 运行，需先进入 Linux Shell',
      notes: [
        '需安装 WSL 2 与 Docker Desktop。',
        '请在 WSL 终端中执行安装命令。',
      ],
    },
    en: {
      summary: 'Runs through WSL and starts from a Linux shell.',
      notes: [
        'Requires WSL 2 and Docker Desktop.',
        'Run the install command inside your WSL terminal.',
      ],
    },
  },
];

export const languages = {
  zh: {
    code: 'zh-CN',
    switchLabel: 'EN',
    brandMark: 'ZenMind',
    seo: {
      title: 'ZenMind | 私有部署的一站式 AI 助理平台',
      description: 'ZenMind 是面向个人与团队的私有化 AI 助理平台，支持一键部署，数据完全自主可控。',
      url: siteUrl,
    },
    nav: {
      home: '首页',
      download: '下载',
      faq: 'FAQ',
      privacy: '隐私',
      github: 'GitHub',
    },
    shared: {
      installKicker: '安装',
      deployDocs: '安装文档',
      deployRepo: '部署仓库',
      sourceRepo: 'GitHub 仓库',
      openDocs: '查看文档',
      copyLabel: '复制命令',
      copiedLabel: '已复制',
    },
    kickers: {
      features: '核心价值',
      quickStart: '快速开始',
      next: '下一步',
      download: '下载',
      faq: 'FAQ',
      privacy: '隐私',
    },
    home: {
      eyebrow: 'Self-Hosted AI Platform',
      headline: '你的 AI 助理\n由你掌控',
      subtitle:
        '一站式私有部署平台，将终端、Web 与智能服务整合为统一工作台。部署简单，数据自主，适合个人开发者与小型团队。',
      primaryCta: '开始安装',
      secondaryCta: 'GitHub',
      installTitle: '选择平台，一键安装',
      installBody: '复制对应平台的安装命令，按引导完成部署即可开始使用。',
      featuresTitle: '为什么选择 ZenMind',
      featuresBody: '',
      featureHighlights: [
        {
          key: 'assistant',
          title: '统一的 AI 工作台',
          body: '将对话、工具调用、知识检索与自动化工作流整合到同一个界面，无需在多个工具之间切换。',
        },
        {
          key: 'privacy',
          title: '数据完全自主可控',
          body: '所有数据存储在你自己的基础设施上，不经过第三方服务器，满足隐私与合规要求。',
        },
        {
          key: 'workflow',
          title: '分钟级部署',
          body: '基于 Docker Compose，一条命令完成安装，开箱即用，无需复杂配置。',
        },
      ],
      quickTitle: '三步开始使用',
      quickBody: '',
      quickSteps: [
        {
          title: '安装部署',
          body: '选择你的平台，复制安装命令，在终端中执行。',
        },
        {
          title: '完成配置',
          body: '按引导设置端口、密码等基础参数，几分钟即可完成。',
        },
        {
          title: '开始使用',
          body: '打开浏览器访问你的 ZenMind 工作台，开始探索 AI 助理能力。',
        },
      ],
      ctaTitle: '查看完整安装说明',
      ctaBody: '下载页提供各平台的详细安装说明与系统要求。',
      ctaPrimary: '前往下载',
      ctaSecondary: '查看文档',
      footerTagline: '私有部署的一站式 AI 助理平台',
    },
    download: {
      title: '下载与安装',
      intro: '选择你的操作系统，复制安装命令即可开始部署 ZenMind。',
      installTitle: '平台安装命令',
      installBody: '',
      notesTitle: '系统要求',
      notes: [
        'Docker Compose 运行环境（macOS / Windows 推荐 Docker Desktop）。',
        '可用的终端环境（Windows 用户需通过 WSL）。',
        '建议至少 4GB 可用内存。',
      ],
      linksTitle: '相关资源',
      linksBody: '',
    },
    faq: {
      title: '常见问题',
      intro: '关于部署、使用与数据隐私的常见问题。',
      items: [
        {
          question: 'ZenMind 是什么？',
          answer:
            'ZenMind 是一个私有部署的 AI 助理平台，将对话、工具调用和自动化工作流整合到统一的工作台中，适合个人开发者和小型团队使用。',
        },
        {
          question: '部署 ZenMind 需要什么环境？',
          answer:
            '需要安装 Docker Compose 运行环境。macOS 和 Windows 推荐使用 Docker Desktop，Linux 使用 Docker Engine。建议至少 4GB 可用内存。',
        },
        {
          question: 'Windows 上如何安装？',
          answer:
            'ZenMind 目前通过 WSL（Windows Subsystem for Linux）运行。请先安装 WSL 2 和 Docker Desktop，然后在 WSL 终端中执行安装命令。',
        },
        {
          question: '我的数据存储在哪里？',
          answer:
            '所有数据存储在你自己的服务器或本地机器上，不会传输到任何第三方服务器。你对数据拥有完全的控制权。',
        },
        {
          question: '如何升级到新版本？',
          answer:
            '使用与首次安装相同的命令即可完成升级，已有配置和数据会自动保留。',
        },
      ],
    },
    privacy: {
      title: '隐私',
      intro: 'ZenMind 重视你的数据隐私。以下是我们的隐私实践说明。',
      points: [
        'ZenMind 采用私有部署模式，所有数据存储在你自己的基础设施上。',
        '官网本身不要求用户登录，也不收集个人身份信息。',
        '安装过程中产生的配置数据仅保存在你的本地环境。',
        '如未来引入分析统计功能，将在此页面更新具体的数据处理说明。',
      ],
    },
    footer: {
      domain: '主站域名',
      rights: 'All rights reserved.',
    },
  },
  en: {
    code: 'en',
    switchLabel: '中',
    brandMark: 'ZenMind',
    seo: {
      title: 'ZenMind | Self-hosted AI Assistant Platform',
      description:
        'ZenMind is a self-hosted AI assistant platform for individuals and teams. Deploy in minutes, keep your data private.',
      url: `${siteUrl}/en`,
    },
    nav: {
      home: 'Home',
      download: 'Download',
      faq: 'FAQ',
      privacy: 'Privacy',
      github: 'GitHub',
    },
    shared: {
      installKicker: 'Install',
      deployDocs: 'Install Docs',
      deployRepo: 'Deployment Repo',
      sourceRepo: 'GitHub Repo',
      openDocs: 'View Docs',
      copyLabel: 'Copy command',
      copiedLabel: 'Copied',
    },
    kickers: {
      features: 'Why ZenMind',
      quickStart: 'Quick Start',
      next: 'Next',
      download: 'Download',
      faq: 'FAQ',
      privacy: 'Privacy',
    },
    home: {
      eyebrow: 'Self-Hosted AI Platform',
      headline: 'Your AI Assistant\nUnder Your Control',
      subtitle:
        'A self-hosted AI platform that unifies terminal, web, and intelligent services into one workspace. Easy to deploy, fully private, built for developers and small teams.',
      primaryCta: 'Get Started',
      secondaryCta: 'GitHub',
      installTitle: 'Pick Your Platform',
      installBody: 'Copy the install command for your platform and follow the setup guide.',
      featuresTitle: 'Why ZenMind',
      featuresBody: '',
      featureHighlights: [
        {
          key: 'assistant',
          title: 'Unified AI Workspace',
          body: 'Bring conversations, tool calls, knowledge retrieval, and automation into a single interface.',
        },
        {
          key: 'privacy',
          title: 'Your Data, Your Infrastructure',
          body: 'All data stays on your own infrastructure. No third-party servers involved.',
        },
        {
          key: 'workflow',
          title: 'Deploy in Minutes',
          body: 'Powered by Docker Compose. One command to install, ready to use out of the box.',
        },
      ],
      quickTitle: 'Get Started in Three Steps',
      quickBody: '',
      quickSteps: [
        {
          title: 'Install',
          body: 'Choose your platform, copy the command, and run it in your terminal.',
        },
        {
          title: 'Configure',
          body: 'Follow the setup guide to configure ports, credentials, and basic settings.',
        },
        {
          title: 'Launch',
          body: 'Open your browser, access your ZenMind workspace, and start exploring.',
        },
      ],
      ctaTitle: 'View Full Install Guide',
      ctaBody: 'The Download page has detailed install instructions and system requirements for each platform.',
      ctaPrimary: 'Go to Download',
      ctaSecondary: 'View Docs',
      footerTagline: 'Self-hosted AI assistant platform for individuals and teams.',
    },
    download: {
      title: 'Download & Install',
      intro: 'Choose your operating system and copy the install command to start deploying ZenMind.',
      installTitle: 'Install Commands',
      installBody: '',
      notesTitle: 'System Requirements',
      notes: [
        'Docker Compose runtime (Docker Desktop recommended for macOS and Windows).',
        'A terminal environment (Windows users need WSL).',
        'At least 4GB of available memory recommended.',
      ],
      linksTitle: 'Resources',
      linksBody: '',
    },
    faq: {
      title: 'FAQ',
      intro: 'Common questions about deployment, usage, and data privacy.',
      items: [
        {
          question: 'What is ZenMind?',
          answer:
            'ZenMind is a self-hosted AI assistant platform that brings conversations, tool calls, and automation workflows into one unified workspace for individual developers and small teams.',
        },
        {
          question: 'What environment do I need to deploy ZenMind?',
          answer:
            'You need a Docker Compose runtime. Docker Desktop is recommended for macOS and Windows, while Linux should use Docker Engine. At least 4GB of available memory is recommended.',
        },
        {
          question: 'How do I install ZenMind on Windows?',
          answer:
            'ZenMind currently runs through WSL (Windows Subsystem for Linux). Install WSL 2 and Docker Desktop first, then run the install command inside your WSL terminal.',
        },
        {
          question: 'Where is my data stored?',
          answer:
            'All data is stored on your own server or local machine and is never sent to third-party servers. You stay fully in control of your data.',
        },
        {
          question: 'How do I upgrade to a new version?',
          answer:
            'Run the same command you used for the initial installation to upgrade. Your existing configuration and data are kept automatically.',
        },
      ],
    },
    privacy: {
      title: 'Privacy',
      intro: 'ZenMind values your data privacy. Here is how we handle it.',
      points: [
        'ZenMind follows a self-hosted deployment model, so all data stays on infrastructure you control.',
        'The website itself does not require login and does not collect personally identifiable information.',
        'Configuration data generated during installation stays only in your local environment.',
        'If analytics features are introduced in the future, this page will be updated with specific data handling details.',
      ],
    },
    footer: {
      domain: 'Primary domain',
      rights: 'All rights reserved.',
    },
  },
};

export { githubUrl, siteUrl };
