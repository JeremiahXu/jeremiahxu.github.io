---
layout: post
read_time: true
show_date: true
title: 单点强制下线  VS  实时强制下线
date: 2022-07-27 12:00:00 +0800
description: 同一时间该账号仅能在一个设备（或登录端）上保持在线状态。
img: posts/2022-07-27-ForceLogout/ForceLogout.png
tags: [后端,dotnet]
author: Jeremiah
github: 
---


## 单点强制下线

- 单设备登录限制
- Single Session Enforcement（单会话强制）
- Concurrent Session Control（并发会话控制）
- 强制踢下线 / 强制登出（Force Logout）


“单点强制下线”是指在账号登录系统中，当同一账号在新的设备或新的登录端发起登录时，系统自动将该账号之前在其他设备（或登录端）的登录状态强制终止，确保同一时间该账号仅能在一个设备（或登录端）上保持在线状态。

这种机制的核心目的是**保障账号安全、避免权限冲突**，常见于需要严格控制账号使用范围的场景（如支付类、办公类、会员类系统）。

### 与“多点登录”的区别：
部分系统支持“多点登录”（如QQ可同时在手机和电脑登录），但“单点强制下线”是对登录权限的严格限制——本质是通过“限制同时在线设备数量为1”，降低账号被盗用、滥用的风险。


主流方案是：**后端会话唯一性校验 + 强制失效旧会话**，常见实现方式如下：

---

### 1. 会话唯一性存储（如 Redis）

- 每个用户登录时，后端生成一个唯一的会话标识（如 token/sessionId）。
- 后端将该标识与用户ID绑定，存储在 Redis 或数据库中（如 `userId -> token`）。
- 用户每次请求时，后端校验请求携带的 token 是否与存储的最新 token 一致。

---

### 2. 强制下线流程

1. 用户A在设备1登录，生成 token1，存储 `userId -> token1`。
2. 用户A在设备2登录，生成 token2，覆盖存储 `userId -> token2`。
3. 设备1再次请求时，携带 token1，后端校验发现已被覆盖（token1 ≠ token2），判定为“强制下线”，拒绝请求或提示重新登录。

---

### 3. 原理说明

- 只允许每个用户ID有一个有效会话标识。
- 新设备登录时，旧设备的会话自动失效。
- 可用分布式缓存（如 Redis）实现高效校验和存储。

---

### 4. 典型流程图

```
[设备1登录] -> [生成token1] -> [userId->token1]
[设备2登录] -> [生成token2] -> [覆盖userId->token2]
[设备1请求] -> [token1≠token2] -> [强制下线]
```

---

这种方案简单高效，是 .NET、Java、Node 等后端的主流做法。  

---

### 代码示例（.NET）

下面是 .NET（ASP.NET Core）实现单设备登录限制（强制下线）的核心代码示例，使用 Redis 存储会话标识：

---

### 1. 登录时写入 Redis

```csharp
// 登录成功后生成 token
string token = Guid.NewGuid().ToString();
string userId = user.Id.ToString();

// 写入 Redis（覆盖旧 token）
await redis.StringSetAsync($"login:{userId}", token);

// 返回 token 给客户端（如存 Cookie 或 Authorization 头）
```

---

### 2. 每次请求时校验 token

```csharp
// 获取用户ID和客户端携带的 token
string userId = GetUserIdFromClaims();
string clientToken = GetTokenFromRequest();

// 从 Redis 获取最新 token
string latestToken = await redis.StringGetAsync($"login:{userId}");

if (clientToken != latestToken)
{
    // 强制下线，返回 401 或跳转登录
    return Unauthorized("账号已在其他设备登录，请重新登录");
}

// ...正常业务处理...
```

---

### 3. 注销/登出时清理 Redis

```csharp
await redis.KeyDeleteAsync($"login:{userId}");
```

---

---


## 实时强制下线技术

，常见简称为：

- **实时会话控制**（Real-time Session Control）
- **即时强制下线**（Instant Force Logout）
- **主动会话失效推送**（Active Session Invalidation Push）

---

### 实现原理

实时强制下线是指：  
当用户在新设备登录后，系统能**立即通知其他已登录设备**，让它们自动登出，无需等到下次请求。

---

### 主流技术方案

1. **WebSocket / SignalR**
   - 后端与客户端建立长连接，后端可随时向客户端推送“强制下线”消息。
   - 客户端收到消息后，立即清除本地会话并跳转到登录页。

2. **轮询（Polling）**
   - 客户端定时向后端请求会话状态，发现被强制下线时自动登出。
   - 实时性较差，资源消耗大。

3. **推送通知（如移动端 Push）**
   - 后端通过推送服务（如 APNs、FCM）通知移动端强制下线。

---

### 典型流程

1. 用户A在设备2登录，后端检测到同账号已在设备1登录。
2. 后端通过 WebSocket/SignalR 向设备1推送“强制下线”消息。
3. 设备1客户端收到消息，立即清除会话并跳转到登录页。

---

### 代码示例（SignalR）

**后端推送：**
```csharp
await hubContext.Clients.User(userId).SendAsync("ForceLogout");
```

**前端监听：**
```javascript
connection.on("ForceLogout", () => {
    // 清除本地会话，跳转登录页
    window.location.href = "/login";
});
```

---

**总结：**  
- 实时强制下线需用推送技术（WebSocket/SignalR），可实现即时登出。
- 适用于对安全和实时性要求极高的场景，但实现复杂，资源消耗大。  
- 大多数系统采用被动强制下线，实时方案不是主流。