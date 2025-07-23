---
layout: post
read_time: true
show_date: true
title: ubuntu环境安装docker-ce
date: 2022-08-14 00:59:43 +0800 
description: linux下安装docker.
img: posts/20220814/Snipaste_2022-08-16_13-59-49.png
tags: [运维,docker]
author: Jeremiah
github: 

---

## ubuntu环境切换至root用户

+ 方式一：
  
  1. 执行【sudo su root】命令，直接切换用户

+ 方式二：
  
  1. 执行【sudo passwd root】命令;
  2. 设置root用户的密码;
  3. 执行【su root】命令,这样就可以自由地切换到root用户了。

## ubuntu下 安装docker-ce

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

## 使用官方安装脚本自动安装

安装命令如下：

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用国内 daocloud 一键安装命令：

```bash
curl -sSL https://get.daocloud.io/docker | sh
```
