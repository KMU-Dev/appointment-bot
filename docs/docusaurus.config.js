module.exports = {
  title: '掛號對不隊',
  tagline: '掛號對不隊利用 LINE Bot 給予使用者最精準的掛號資訊',
  url: 'https://docs.appointment.kmu.webzyno.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ZhaoTzuHsien', // Usually your GitHub org/user name.
  projectName: 'appointment-bot', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '掛號對不隊',
      logo: {
        alt: '掛號對不隊',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ZhaoTzuHsien/appointment-bot',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs',
            },
            {
              label: 'Node.js',
              to: 'docs/nodejs/overview',
            },
            {
              label: 'Kubernetes',
              to: 'docs/kubernetes/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ZhaoTzuHsien/appointment-bot',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 掛號對不隊. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['powershell'],
      defaultLanguage: 'python',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/ZhaoTzuHsien/appointment-bot/edit/master/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/ZhaoTzuHsien/appointment-bot/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
