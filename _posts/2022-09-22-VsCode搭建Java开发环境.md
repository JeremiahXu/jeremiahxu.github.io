---
layout: post
read_time: true
show_date: true
title: VsCode搭建Java开发环境
date: 2022-09-22 09:04:09 +0800
description: VsCode搭建Java开发环境
img: posts/2022-09-22-VsCode搭建Java开发环境/2022-11-02-18-16-47-image.png
tags: [Java,后端]
author: Jeremiah
github: 
---

<div id="cnblogs_post_body" class="blogpost-body blogpost-body-html">
<h2>配置Java开发环境</h2>
<p>主要参考官方教程：<a href="https://code.visualstudio.com/docs/java/java-tutorial" rel="nofollow">https://code.visualstudio.com/docs/java/java-tutorial</a></p>
<h3> 1.先安装JDK</h3>
<p>JDK下载地址：<a href="https://www.oracle.com/java/technologies/javase-downloads.html" rel="nofollow">https://www.oracle.com/java/technologies/javase-downloads.html</a></p>
<p><img src="../assets/img/posts/20220922/1783030-20200708194025139-21141222.png" alt="" loading="lazy"></p>
<h3>2.配置变量</h3>
<p>配置 JAVA  环境变量：参考 <a href="https://www.cnblogs.com/happyAzhan/p/11271274.html">https://www.cnblogs.com/happyAzhan/p/11271274.html</a>；</p>
<h3>3.安装 Java Extension Pack</h3>
<p>这个Java Extension Pack是6个扩展的一个集成，只需要安装这一个就可以了，很方便。</p>
<p>直接点击链接：https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack或者在VScode拓展那里安装</p>
<p>然后会提示：</p>
<p><img src="../assets/img/posts/20220922/1783030-20200708194204441-590349704.png" alt="" loading="lazy" class="medium-zoom-image"></p>
<p><br>选择打开就好。然后在VS Code中点install就好。</p>
<h3>3.配置VS Code的jdk版本</h3>
<p>在VS Code界面键入：<code>Ctrl+Shift+P</code>，然后输入：<code>Java: Configure Java Runtime</code><br>如下图：</p>
<p><img src="../assets/img/posts/20220922/1783030-20200708195706287-1222821792.png" alt="" loading="lazy" class="medium-zoom-image"></p>
<p><br>这里填一下jdk路径</p>
<p><img src="../assets/img/posts/20220922/1783030-20200708195815152-1842871445.png" alt="" loading="lazy" class="medium-zoom-image"></p>
<h3>4.开始编写Java程序：Hello，world！</h3>
<p><img src="../assets/img/posts/20220922/1783030-20200708195048093-2109079837.png" alt="" loading="lazy"></p>
<p>然后<code>F5</code>就可以运行了。</p>
<p>自然会有想要的输出。<br>如果没有输出，或者报错：<br>1）确认自己是不是安装了<code>Java Extension Pack</code><br>2）在下方terminal输入：<code>java -version</code>确认一下jdk是不是装了。</p>
<p><img src="../assets/img/posts/20220922/1783030-20200708195135963-1504260724.png" alt="" loading="lazy"></p>
<p> 备注：<br>在VS Code界面同时按：<code>Ctrl+Shift+P</code>，然后输入：<code>Java: Getting Started</code>就能看到一些有关java开发的提示了（快捷键之类的，还是很友好的）。</p>
<p><img src="../assets/img/posts/20220922/1783030-20200708195931075-1090837330.png" alt="" loading="lazy" class="medium-zoom-image"></p>
</div>
