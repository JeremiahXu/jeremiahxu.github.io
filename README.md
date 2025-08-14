demo site now [mirrored](https://weathered-bread-8229.on.fleek.co/) in [IPFS](https://github.com/ipfs/ipfs#quick-summary)!

[https://github.com/the-mvm/the-mvm.github.io](https://github.com/the-mvm/the-mvm.github.io)

# Jekyll theme: Adam Blog 2.0

by [Armando Maynez](https://github.com/amaynez) based on [V1.0](https://github.com/artemsheludko/adam-blog) by [Artem Sheludko](https://github.com/artemsheludko). 

Adam Blog 2.0 是一款 Jekyll 主题，旨在 100% 兼容 [GitHub Pages](https://pages.github.com/). 如果您不熟悉 GitHub Pages，可以查看 [their documentation](https://help.github.com/categories/github-pages-basics/) 了解更多信息. [Jonathan McGlone's guide](http://jmcglone.com/guides/github-pages/) 在 GitHub 上创建和托管个人网站的指南也是不错的资源。

### What is Jekyll?

Jekyll 是一款简单易用的、支持博客的静态网站生成器，适用于个人、项目或组织网站。Jekyll 会将你的页面内容与模板文件整合，生成一个完整的网站。 更多信息，请访问[official Jekyll site](https://jekyllrb.com/docs/home/) . 还提供了一门很棒的课程， [how to deploy a Jekyll site](https://www.codecademy.com/learn/deploy-a-website) 为初学者.

### Never Used Jekyll Before?

在 GitHub 上托管网站的好处在于，您无需在计算机上安装 Jekyll。所有操作都可以通过 GitHub 代码编辑器完成，即使您对 Jekyll 或命令行的使用了解甚少。您只需将帖子添加到  `_posts` 目录，然后编辑 `_config.yml` 文件即可更改网站设置。只需具备一些基本的 HTML 和 CSS 知识，您甚至可以根据自己的喜好修改网站。所有这些都可以通过 GitHub 代码编辑器完成，它的作用类似于内容管理系统 (CMS)。

## Features of v2.0:

- SEO 元标签
- Dark mode ([可在 _config.yml 文件中配置](https://github.com/the-mvm/the-mvm.github.io/blob/a8d4f781bfbc4107b4842433701d28f5bbf1c520/_config.yml#L10))
- automatic [sitemap.xml](http://the-mvm.github.io/sitemap.xml)
- automatic [archive page](http://the-mvm.github.io/archive/) 具有无限滚动功能
- [new page](https://the-mvm.github.io/tag/?tag=Coding) of posts 通过单个标签过滤 (无需分页器 V2 的自动分页), ，也可以无限滚动
- 点击推文功能 (just add a `<tweet> </tweet>` tag in your markdown.
- 自定义和响应式 [404 page](https://the-mvm.github.io/404.html)
- 响应式自动**目录toc** (每篇文章可选)
- 自动计算每篇文章的**阅读时间**
- 响应式帖子标签和社交分享图标 (粘贴或内联)
- 包括  linkedin, reddit and bandcamp 图标
- *将链接复制到剪贴板* 共享选项 (和icon)
- 在 GitHub 上查看链接按钮 (每篇文章可选)
- MathJax support (每篇文章可选)
- 主页中的 tag 云
- '返回顶部' 按钮
- 评论 'courtain' 以掩盖 disqus 界面 ，直到用户点击它 ([配置 in _config.yml](https://github.com/the-mvm/the-mvm.github.io/blob/d4a67258912e411b639bf5acd470441c4c219544/_config.yml#L13))
- [CSS 变量](https://github.com/the-mvm/the-mvm.github.io/blob/d4a67258912e411b639bf5acd470441c4c219544/assets/css/main.css#L8) 可轻松自定义所有颜色和字体
- 添加了几个代码语法高亮主题 [配置 from the _config.yml file](https://github.com/the-mvm/the-mvm.github.io/blob/e146070e9348c2e8f46cb90e3f0c6eb7b59c041a/_config.yml#L44).
- 响应式页脚菜单和页脚 logo ([在配置文件中设置](https://github.com/the-mvm/the-mvm.github.io/blob/d4a67258912e411b639bf5acd470441c4c219544/_config.yml#L7))
- 搜索结果基于完整的帖子内容，而不仅仅是描述
- 更流畅的菜单动画

## 保留的功能 from v1.0

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome icons](http://fontawesome.io/)
- [Disqus](https://disqus.com/)
- [MailChimp](https://mailchimp.com/)
- [Analytics分析](https://analytics.google.com/analytics/web/)
- [Search搜索](https://github.com/christian-fei/Simple-Jekyll-Search)

## Demo 演示

自定义响应式 404：

<img width="640px" src="https://github.com/the-mvm/the-mvm.github.io/blob/main/assets/img/template_screenshots/404-responsive.jpg?raw=true">


# 安装

## 本地安装

要完整安装 Adam Blog 2.0, [请下载 Adam Blog 2.0 的副本](https://github.com/the-mvm/the-mvm.github.io/archive/refs/heads/main.zip) 并将其解压到其自己的目录中。然后，打开您常用的命令行工具，输入 `bundle install`，再输入  `jekyll serve` 。您的网站应该会在[http://localhost:4000](http://localhost:4000)本地启动并运行。

如果您是 Jekyll 的新手，我建议您查看 <https://jekyllrb.com/> 上的文档，或者查看 [Smashing Magazine](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)的教程。

如果您将网站托管在 GitHub Pages 上，那么提交对 `_config.yml` 文件（或任何其他文件）的更改将强制使用 Jekyll 重建您的网站。任何更改应该很快就会可见。如果您将网站托管在本地，则必须再次运行 `jekyll serve` 才能使更改生效。

前往 `_posts` 目录，查看网站上当前的所有帖子，并查看帖子文件的示例。您可以直接复制模板帖子，然后开始添加您自己的内容。

## GitHub Pages 安装

### **STEP 1.**

[Fork this repository](https://github.com/the-mvm/the-mvm.github.io/fork/) 到您自己的帐户中。

#### 使用 Github Pages

你可以使用 Github Pages 免费托管你的 Jekyll 网站。 [Click here](https://pages.github.com/) 了解更多信息。

 When forking, 如果您使用的地址仓库，命名为 ``USERNAME.github.io`` 那么您的 URL 将为 ``https://USERNAME.github.io/``, 否则为 ``https://USERNAME.github.io/REPONAME/``) 并且您的网站将发布到 gh-pages 分支. 注意：如果您使用同一个 GitHub 用户名托管多个网站，则必须使用  [Project Pages 而不是 User Pages](https://help.github.com/articles/user-organization-and-project-pages/) - 只需将仓库名称更改为 'http://USERNAME.github.io'以外的其他名称即可。

##### 如果你使用 gh-pages 分支，则需要进行配置调整

除了映射到根 URL 的 github-username.github.io repo 之外，您还可以使用其他 repo 的 gh-pages 分支来提供站点，以便它们可在 github-username.github.io/repo-name 上使用。

这将要求您修改 `_config.yml` 如下：

```yml
# Site settings
title: Repo Name
email: your_email@example.com
author: Your Name
description: "Repo description"
baseurl: "/repo-name"
url: "https://github-username.github.io"
```

这将确保为您的资产和帖子构建正确的相对路径。

### **STEP 2.**

使用您的数据修改位于根目录中的 ``_config.yml`` 文件。

```YAML
# Site settings
title: The Title for Your Website
description: 'A description of your blog'
permalink: ':title:output_ext' # how the permalinks will behave
baseurl: "/" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com
logo: "" # the logo for your site
logo-icon: "" # a smaller logo, typically squared
logo-icon-SEO: "" # must be a non SVG file, could be the same as the logo-icon

# Night/Dark mode default mode is "auto", "auto" is for auto nightshift (19:00 - 07:00), "manual" is for manual toggle, and "on/off" is for default on/off. Whatever the user's choice is, it will supersede the default setting of the site and be kept during the visit (session). Only the dark mode setting is "manual", it will be always kept on every visit (i.e. no matter the browser is closed or not)
night_mode: "auto"
logo-dark: "/assets/img/branding/MVM-logo-full-dark.svg" #if you want to display a different logo when in dark mode
highlight_theme: syntax-base16.monokai.dark # select a dark theme for the code highlighter if needed


# Author settings
author: Your Name # add your name
author-pic: '' # a picture of you
about-author: '' # a brief description of you

# Contact links
email: your@email.com # Add your Email address
phone: # Add your Phone number
website:  # Add your website
linkedin:  # Add your Linkedin handle
github:  # Add your Github handle
twitter:  # Add your Twitter handle
bandcamp:  # Add your Bandcamp username

# Tracker
analytics: # Google Analytics tag ID
fbadmin: # Facebook ID admin

# Paginate
paginate: 6 # number of items to show in the main page
paginate_path: 'page:num'
words_per_minute: 200 # default words per minute to be considered when calculating the read time of the blog posts
```

### **STEP 3.**

要配置 newsletter, please 创建一个帐户 in https://mailchimp.com, 设置一个网络注册表单，并将嵌入注册表单中的链接粘贴到 `config.yml` 文件中：

```YAML
# Newsletter
mailchimp: "https://github.us1.list-manage.com/subscribe/post?u=8ece198b3eb260e6838461a60&id=397d90b5f4"
```

### **STEP 4.**

要配置 Disqus， 请先设置一个与您的网站同名的 [Disqus 网站](https://disqus.com/admin/create/) . Then, in `_config.yml`, 编辑 `disqus_identifier`  值以启用此功能。

```YAML
# Disqus
discus_identifier:  # Add your discus identifier
comments_curtain: yes # leave empty to show the disqus embed directly
```

更多信息 on [如何设置 Disqus](http://www.perfectlyrandom.org/2014/06/29/adding-disqus-to-your-jekyll-powered-github-pages/).

### **STEP 5.**

自定义站点颜色。修改  `/assets/css/main.css` 如下：

```CSS
html {
  --shadow:       rgba(32,30,30,.3);
  --accent:       #DB504A;    /* accent */
  --accent-dark:  #4e3e51;    /* accent 2 (dark) */
  --main:         #326273;    /* main color */
  --main-dim:     #879dab;    /* dimmed version of main color */
  --text:         #201E1E;
  --grey1:        #5F5E58;
  --grey2:        #8D897C;
  --grey3:        #B4B3A7;
  --grey4:        #DAD7D2;
  --grey5:        #F0EFED;
  --background:   #ffffff;
}

html[data-theme="dark"]  {
  --accent:       #d14c47;    /* accent */
  --accent-dark:  #CD8A7A;    /* accent 2 (dark) */
  --main:         #4C6567;    /* main color */
  --main-dim:     #273335;    /* dimmed version of main color */
  --text:         #B4B3A7;
  --grey1:        #8D897C;
  --grey2:        #827F73;
  --grey3:        #76746A;
  --grey4:        #66645D;
  --grey5:        #4A4945;
  --background:   #201E1E;
  --shadow:       rgba(180,179,167,.3);
}
```

### **STEP 6.**

自定义站点字体。修改  `/assets/css/main.css` 如下：

```CSS
...
  --font1: 'Lora', charter, Georgia, Cambria, 'Times New Roman', Times, serif;/* body text */
  --font2: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif; /* headers and titles   */
  --font1-light:      400;
  --font1-regular:    400;
  --font1-bold:       600;
  --font2-light:      200;
  --font2-regular:    400;
  --font2-bold:       700;
...
```

如果您更改字体，您还需要按如下方式修改 `/_includes/head.html` :取消注释并使用新的字体和字体粗细更改以下行：

```HTML
<link href="https://fonts.googleapis.com/css?family=Lora:400,600|Source+Sans+Pro:200,400,700" rel="stylesheet">
```

删除 `<style></style>` 中上述行之前的所有内容：

```HTML
<style>
/* latin */
@font-face {
  font-family: 'Lora';
  ...
</style>
```

### **STEP 7.**

You will find example posts in your `/_posts/` directory. Go ahead and edit any post and re-build the site to see your changes, for github pages, this happens automatically with every commit. 重建网站的方法有很多种，但最常用的方法是运行 `jekyll serve`，它会启动 Web 服务器并在文件更新时自动重新生成您的网站。

要添加新帖子，只需在 `_posts`  目录中添加一个遵循  `YYYY-MM-DD-name-of-post.md`  名称.md 格式的文件，并包含必要的头条内容。您可以查看任意示例帖子，了解其工作原理。如果您已经使用 Jekyll 搭建了网站，只需复制您的帖子即可迁移到 Adam Blog 2.0。

每篇文章的封面选项如下：

```YAML
---
layout: post #ensure this one stays like this
read_time: true # calculate and show read time based on number of words
show_date: true # show the date of the post
title:  Your Blog Post Title
date:   XXXX-XX-XX XX:XX:XX XXXX
description: "The description of your blog post"
img: # the path for the hero image, from the image folder (if the image is directly on the image folder, just the filename is needed)
tags: [tags, of, your, post]
author: Your Name
github: username/reponame/ # set this to show a github button on the post
toc: yes # leave empty or erase for no table of contents
---
```

使用 Markdown 编辑你的博文。 [这里有一个很棒的使用指南。](https://www.markdownguide.org/)

### **STEP 7.**

删除 ``/assets/img/posts/`` 内的图片并上传您自己的帖子图片。

### **STEP 8.**

确保在存储库设置中打开 Github Pages，并指向主分支或主分支（您克隆此存储库的位置）。

## 其他文档

### 目录结构

如果您熟悉 Jekyll，那么 Adam Blog 2.0 的目录结构应该不会太难浏览。以下是您可能注意到的与默认目录结构之间的一些差异。有关这些文件夹和文件用途的更多信息，请参阅 [Jekyll 文档网站 ](https://jekyllrb.com/docs/structure/).

```bash
Adam Blog 2.0/
├── _includes                  # Theme includes
├── _layouts                   # Theme layouts (see below for details)
├── _posts                     # Where all your posts will go
├── assets                     # Style sheets and images are found here
|  ├── css                     # Style sheets go here
|  |  └── _sass                # Folder containing SCSS files
|  |  └── main.css             # Main SCSS file
|  |  └── highlighter          # Style sheet for code syntax highlighting
|  └── img                     # 
|     └── posts                # Images go here
├── _pages                     # Website pages (that are not posts)
├── _config.yml                # Site settings
├── Gemfile                    # Ruby Gemfile for managing Jekyll plugins
├── index.html                 # Home page
├── LICENSE.md                 # License for this theme
├── README.md                  # Includes all of the documentation for this theme
├── feed.xml                   # Generates atom file which Jekyll points to
├── 404.html                   # custom and responsive 404 page
├── all-posts.json             # database of all posts used for infinite scroll
├── ipfs-404.html              # 404 page for IPFS
├── posts-by-tag.json          # database of posts by tag
├── robots.txt                 # SEO crawlers exclusion file
├── search.json                # database of posts used for search
└── sitemap.xml                # automatically generated sitemap for search engines
```

### 从零开始

要完全从头开始，只需删除 `_posts`, `assets/img/posts` 文件夹中的所有文件，然后添加您自己的内容。
`_config.yml` 文件中的所有内容都可以根据您的需求进行编辑。
此外，请将 `favicon.ico` 文件更改为您自己的网站图标。

### 点击 tweet

如果您的博客文章中有可推文的引文，并希望将其作为点击推文块，您只需使用 `<tweet></tweet>` 标签，它们之间的所有内容都将转换为点击推文框。

<img width="640px" src="https://github.com/the-mvm/the-mvm.github.io/blob/main/assets/img/template_screenshots/ctt-markdown.png?raw=true">

<img width="640px" src="https://github.com/the-mvm/the-mvm.github.io/blob/main/assets/img/template_screenshots/ctt-render.png?raw=true">

### 谷歌分析

您可以通过 [Google Analytics](https://www.google.com/analytics/)跟踪您的网站统计信息。与 Disqus 类似，您需要创建一个 Google Analytics 帐户，并在  `_config.yml` 文件的  `google-ID`  下输入您网站正确的 Google ID。
更多信息 on [如何设置  Google Analytics](https://michaelsoolee.com/google-analytics-jekyll/).

### Atom Feed

Atom 默认 提供 通过 [jekyll-feed](https://github.com/jekyll/jekyll-feed). 使用 jekyll-feed，你可以设置配置变量 such as 'title', 'description', and 'author', in the `_config.yml` file.

您的 atom feed 文件将在 `https://your.site/feed.xml` [example](https://the-mvm.github.io/feed.xml)中显示。

### Social Media Icons

所有社交媒体图标均由 [Font Awesome](http://fontawesome.io/)提供。您可以在 `_config.yml`文件中更改显示的图标以及它们链接到的帐户。

### MathJax

Adam Blog 2.0 内置  [MathJax](https://www.mathjax.org/), 
可让您使用 [LaTeX](http://www.andy-roberts.net/writing/latex/mathematics_1) 在文章中显示数学公式。只需在文章前言中添加`Mathjax: yes`  即可。

```markdown
<p style="text-align:center">
\(\theta_{t+1} = \theta_{t} - \dfrac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t\).
</p>
```

![rendered mathjax](/assets/img/template_screenshots/MathjaxRendered.jpg)

### 语法高亮

Adam Blog 2.0 通过 [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/)提供语法高亮功能。语法高亮功能允许您根据所显示的编程语言，以不同的颜色和字体显示源代码。您可以 [here](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers) 找到支持的编程语言的完整列表。另一种选择是通过 [Gist](https://en.support.wordpress.com/gist/)嵌入代码。

You can 选择语法高亮的颜色主题 in the `_config.yml` file:

```YAML
highlight_theme: syntax-base16.monokai.dark # select a theme for the code highlighter
```

See the [highlighter 目录](https://github.com/the-mvm/the-mvm.github.io/tree/main/assets/css/highlighter) 以获取有关选项的参考。

### Markdown

Jekyll 提供对 GitHub Flavored Markdown 的支持，允许您使用 [Markdown syntax](https://guides.github.com/features/mastering-markdown/)来格式化您的帖子。

## 其他一切

查看  [Jekyll docs][jekyll-docs] 了解更多关于如何充分利用 Jekyll 的信息。所有错误/功能请求请提交至 [Jekyll's GitHub repo][jekyll-gh]. 如有疑问，欢迎在 [Jekyll Talk][jekyll-talk]上提问。

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

---

## 导出 Docker 镜像

如果你使用 Docker 部署本博客，可以通过以下命令将镜像导出为 tar 文件：

```sh
docker save -o jekyll_blog_latest.tar jere/jekyll-blog:latest
```

这样会在当前目录下生成 `jekyll_blog_latest.tar` 文件，方便迁移或备份 Docker 镜像。


---
### 导入镜像
要在另一台机器或环境中导入该镜像，可以使用以下命令：

```sh
docker load -i jekyll_blog_latest.tar
```

这样即可将镜像导入到本地 Docker 环境中。

---
### 镜像备份
为镜像打上日期标签：

```bash
docker tag jere/jekyll-blog:latest jere/jekyll-blog:$(date +%Y%m%d)
```

---

## POST中的图片建议

在你的项目中，图片路径 `img: posts/2025-04-08/img.png` 通常会在文章模板中以 `<img>` 标签渲染。为了同时兼容 PC 和移动端，建议：

1. **图片本身**：  
   - 建议宽度为 1200px 左右（最大不超过 1920px），高度按比例自适应，格式为 `jpg` 或 `png`，压缩后大小控制在 200KB 以内。
   - 若图片内容简单，可适当减小分辨率（如 800px 宽），以提升移动端加载速度。

2. **前端样式**：  
   - 在你的 CSS 中，确保图片样式为响应式。你可以在 main.css 或 SASS 文件中添加如下样式：

````css
/* ...existing code... */
.post-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
/* ...existing code... */
````

这样，图片会根据父容器宽度自适应，无论在 PC 还是手机端都能良好显示。

3. **HTML 模板**：  
   - 确保模板输出的 `<img>` 标签没有写死宽高，或者使用 `width="100%"`，让 CSS 控制尺寸。

你可以参考 `_includes/post.html` 或相关模板文件，确认图片渲染方式。

**总结**：  
- 图片宽度建议 800~1200px，体积小于 200KB。
- 样式用 `max-width: 100%; height: auto;` 响应式适配。
- 模板不要写死图片宽高。

这样即可兼容 PC 和移动端。