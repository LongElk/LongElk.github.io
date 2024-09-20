import { defineConfig } from 'vitepress'


export default defineConfig({
    title: 'LongElkのBlog',
    description: '分享我的技术与生活-由vitepress搭建的个人博客',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
      ],
    themeConfig: {
        siteTitle: 'LongElk',
        logo: '../public/头像.svg',
        socialLinks: [
          { icon: 'github', link: 'https://github.com/longelk' }
        ],
    
        // 导航栏
        nav: [
          { text: '首页', link: '/' },
          { text: '博客', link: '/blog/' },
          { text: '关于我', link: '/about' }
        ],
    
        // 侧边栏（以博客页面为例）
        sidebar: {
          '/blog/': [
            {
              text: '博客文章',
              items: [
                { text: '第一篇文章', link: '/blog/post-1' },
                { text: '第二篇文章', link: '/blog/post-2' }
              ]
            }
          ]
        },
    
        // 页脚
        footer: {
          message: '感谢访问我的博客',
          copyright: '版权所有 © 2024'
        }
      }
})
