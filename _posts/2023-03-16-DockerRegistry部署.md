---
layout: post
read_time: true
show_date: true
title: Docker容器镜像仓库
date: 2023-03-16 11:07:00 +0800
description: 部署Docker容器镜像仓库
img: posts/20220814/Snipaste_2022-08-16_13-59-49.png
tags: [运维]
author: Jeremiah
github: 
---

部署Docker容器镜像仓库

## 自建域为Localhost的registry仓库

1. `localhost:5000/my-ubuntu`从本地registry仓库中拉取映像。
   
   ```
   $ docker pull localhost:5000/my-ubuntu
   ```

2. 使用如下命令启动registry容器：
   
   ```
   $ docker run -d -p 5000:5000 --restart=always --name registry registry:2
   ```

registry仓库现在可以使用了。

## 自建外部可访问的registry仓库

1. Docker 客户端现在可以使用其外部地址从您的registry仓库中拉取和推送到您的registry仓库。以下命令演示了这一点：
   
   ```
   $ docker pull myregistry.domain.com/my-ubuntu
   ```

2. 启动registry仓库，指示它使用 TLS 证书。此命令将目录绑定挂载`certs/`到位于 的容器中`/certs/`，并设置环境变量来告诉容器在哪里可以找到`domain.crt` 和`domain.key`文件。registry仓库在默认的 HTTPS 端口 443 上运行。容器内部端口443可指向外部主机任意端口any port。
   
   ```
   $ docker run -d \
    --restart=always \
    --name registry \
    -v "$(pwd)"/certs:/certs \
    -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
    -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
    -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
    -p 7443:443 \
    registry:2
   ```

注意：证书颁发者可能会为您提供*中间*证书。在这种情况下，您必须将您的证书与中间证书连接起来以形成一个*证书包*。

## 本机基本身份验证

实现访问限制的最简单方法是通过基本身份验证（这与其他 Web 服务器的基本身份验证机制非常相似）。此示例使用本机基本身份验证`htpasswd`来存储机密。

1. 使用镜像`httpd:2`，为用户创建一个包含一个条目的密码文件`testuser`，密码为 `testpassword`：
   
   ```
   $ mkdir auth
   $ docker run \
   --entrypoint htpasswd \
   httpd:2 -Bbn testuser testpassword > auth/htpasswd
   ```

2. 使用基本身份验证启动registry仓库。
   
   ```
   $ docker run -d \
    -p 5000:5000 \
    --restart=always \
    --name registry \
    -v "$(pwd)"/auth:/auth \
    -e "REGISTRY_AUTH=htpasswd" \
    -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
    -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
    -v "$(pwd)"/certs:/certs \
    -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
    -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
    registry:2
   ```

3. 登录registry仓库。
   
   ```
   $ docker login myregistrydomain.com:5000
   ```
   
   提供第一步中的用户名和密码。
   
   测试您现在是否可以从registry仓库中拉取映像或将映像推送到registry仓库。

#### X509 错误：

X509 错误通常表示您在未正确配置 Docker 守护程序的情况下尝试使用自签名证书。请参阅[运行不安全的registry仓库](https://docs.docker.com/registry/insecure/)。

+ **Http**类型 
  
  1. 编辑/etc/docker/daemon.json 
     
     ```
     insecure-registries
     { 
     "insecure-registries":["私库地址"]
     }
     ```
  
  2. 重启docker
     
     ```
     sudo systemctl restart docker
     ```
     
     在访问的客户端设置允许insecure-registries

+ **自签名证书**，机构未认可的，需要加证书在`/etc/docker/certs.d/myregistrydomain.com:5000/ca.crt `
