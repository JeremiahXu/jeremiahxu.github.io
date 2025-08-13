我来详细介绍 Keycloak + OAuth 2.0/OIDC 方案的完整实施细节。

## Keycloak SSO 完整实施方案

### 1. **Keycloak 部署和配置**

#### **Docker 部署方式**

```yaml
# docker-compose.yml
version: '3.8'
services:
  keycloak:
    image: quay.io/keycloak/keycloak:23.0.0
    container_name: keycloak
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin123
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password
      KC_HOSTNAME: localhost
      KC_HOSTNAME_PORT: 8080
      KC_HOSTNAME_STRICT: false
      KC_HTTP_ENABLED: true
    ports:
      - "8080:8080"
    command: start-dev
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    container_name: keycloak-db
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### **启动和初始配置**

```bash
# 启动服务
docker-compose up -d

# 访问管理控制台
# http://localhost:8080/admin
# 用户名：admin 密码：admin123
```

### 2. **Keycloak 基础配置**

#### **创建Realm（领域）**
```json
{
  "realm": "company-sso",
  "displayName": "Company SSO",
  "enabled": true,
  "sslRequired": "external",
  "registrationAllowed": false,
  "loginWithEmailAllowed": true,
  "duplicateEmailsAllowed": false,
  "resetPasswordAllowed": true,
  "editUsernameAllowed": false,
  "bruteForceProtected": true
}
```

#### **创建客户端应用**

**Web应用客户端配置：**
```json
{
  "clientId": "webapp-client",
  "name": "Web Application",
  "protocol": "openid-connect",
  "clientAuthenticatorType": "client-secret",
  "secret": "your-client-secret",
  "redirectUris": [
    "http://localhost:3000/auth/callback",
    "http://localhost:5000/signin-oidc"
  ],
  "webOrigins": [
    "http://localhost:3000",
    "http://localhost:5000"
  ],
  "standardFlowEnabled": true,
  "implicitFlowEnabled": false,
  "directAccessGrantsEnabled": true,
  "serviceAccountsEnabled": false
}
```

**API服务客户端配置：**
```json
{
  "clientId": "api-service",
  "name": "API Service",
  "protocol": "openid-connect",
  "publicClient": false,
  "bearerOnly": true,
  "standardFlowEnabled": false,
  "serviceAccountsEnabled": true
}
```

### 3. **多语言客户端集成**

#### **.NET Core 集成**

**安装包：**
```xml
<PackageReference Include="Microsoft.AspNetCore.Authentication.OpenIdConnect" Version="7.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="7.0.0" />
```

**配置代码：**
```csharp
// Program.cs
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// 配置认证
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = "http://localhost:8080/realms/company-sso";
    options.ClientId = "webapp-client";
    options.ClientSecret = "your-client-secret";
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    
    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "preferred_username",
        RoleClaimType = "realm_access.roles"
    };
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// 登录端点
app.MapGet("/login", async (HttpContext context) =>
{
    await context.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme);
});

// 登出端点
app.MapPost("/logout", async (HttpContext context) =>
{
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    await context.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
});

app.Run();
```

**API保护：**
```csharp
// API Controller
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var userId = User.FindFirst("sub")?.Value;
        var username = User.FindFirst("preferred_username")?.Value;
        var email = User.FindFirst("email")?.Value;
        
        return Ok(new { UserId = userId, Username = username, Email = email });
    }
}
```

#### **Java Spring Boot 集成**

**依赖配置：**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
```

**配置文件：**
```yaml
# application.yml
spring:
  security:
    oauth2:
      client:
        registration:
          keycloak:
            client-id: webapp-client
            client-secret: your-client-secret
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope: openid,profile,email
        provider:
          keycloak:
            issuer-uri: http://localhost:8080/realms/company-sso
            user-name-attribute: preferred_username
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/company-sso
```

**安全配置：**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/", "/login").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
            );
        
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter authoritiesConverter = 
            new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthorityPrefix("ROLE_");
        authoritiesConverter.setAuthoritiesClaimName("realm_access.roles");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
        return converter;
    }
}
```

#### **Node.js Express 集成**

**安装依赖：**
```bash
npm install passport passport-openidconnect express-session
```

**配置代码：**
```javascript
const express = require('express');
const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
const session = require('express-session');

const app = express();

// Session配置
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // 生产环境设为true
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport配置
passport.use(new OpenIDConnectStrategy({
  issuer: 'http://localhost:8080/realms/company-sso',
  clientID: 'webapp-client',
  clientSecret: 'your-client-secret',
  authorizationURL: 'http://localhost:8080/realms/company-sso/protocol/openid-connect/auth',
  tokenURL: 'http://localhost:8080/realms/company-sso/protocol/openid-connect/token',
  userInfoURL: 'http://localhost:8080/realms/company-sso/protocol/openid-connect/userinfo',
  callbackURL: 'http://localhost:3000/auth/callback',
  scope: 'openid profile email'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// 路由
app.get('/login', passport.authenticate('openidconnect'));

app.get('/auth/callback',
  passport.authenticate('openidconnect', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:8080/realms/company-sso/protocol/openid-connect/logout?redirect_uri=http://localhost:3000');
});

// 受保护的路由
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

#### **Python Flask 集成**

**安装依赖：**
```bash
pip install flask authlib requests
```

**配置代码：**
```python
from flask import Flask, session, request, redirect, url_for, jsonify
from authlib.integrations.flask_client import OAuth
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# OAuth配置
oauth = OAuth(app)
keycloak = oauth.register(
    name='keycloak',
    client_id='webapp-client',
    client_secret='your-client-secret',
    server_metadata_url='http://localhost:8080/realms/company-sso/.well-known/openid_configuration',
    client_kwargs={
        'scope': 'openid profile email'
    }
)

@app.route('/')
def index():
    return '<a href="/login">Login</a>'

@app.route('/login')
def login():
    redirect_uri = url_for('callback', _external=True)
    return keycloak.authorize_redirect(redirect_uri)

@app.route('/auth/callback')
def callback():
    token = keycloak.authorize_access_token()
    user_info = keycloak.parse_id_token(token)
    session['user'] = user_info
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    user = session.get('user')
    if not user:
        return redirect('/login')
    return jsonify(user)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('http://localhost:8080/realms/company-sso/protocol/openid-connect/logout?redirect_uri=http://localhost:5000')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 4. **高级配置**

#### **用户角色和权限映射**
```json
{
  "roles": {
    "realm": [
      {
        "name": "admin",
        "description": "Administrator role"
      },
      {
        "name": "user",
        "description": "Regular user role"
      }
    ]
  },
  "groups": [
    {
      "name": "Administrators",
      "path": "/Administrators",
      "realmRoles": ["admin"]
    },
    {
      "name": "Users",
      "path": "/Users", 
      "realmRoles": ["user"]
    }
  ]
}
```

#### **自定义主题和品牌**
```css
/* themes/custom/login/resources/css/login.css */
.login-pf body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-pf {
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.login-pf-header h1 {
    color: #333;
    font-weight: 300;
}
```

#### **事件监听和日志**
```json
{
  "eventsEnabled": true,
  "eventsListeners": ["jboss-logging"],
  "enabledEventTypes": [
    "LOGIN",
    "LOGIN_ERROR", 
    "LOGOUT",
    "REGISTER",
    "UPDATE_PASSWORD"
  ],
  "adminEventsEnabled": true,
  "adminEventsDetailsEnabled": true
}
```

### 5. **生产环境部署考虑**

#### **高可用部署**
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  keycloak-1:
    image: quay.io/keycloak/keycloak:23.0.0
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_HOSTNAME: sso.company.com
      KC_PROXY: edge
      JGROUPS_DISCOVERY_PROTOCOL: JDBC_PING
    
  keycloak-2:
    image: quay.io/keycloak/keycloak:23.0.0
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_HOSTNAME: sso.company.com
      KC_PROXY: edge
      JGROUPS_DISCOVERY_PROTOCOL: JDBC_PING

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
```

#### **SSL/TLS 配置**
```nginx
# nginx.conf
upstream keycloak {
    server keycloak-1:8080;
    server keycloak-2:8080;
}

server {
    listen 443 ssl http2;
    server_name sso.company.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    location / {
        proxy_pass http://keycloak;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. **监控和维护**

#### **健康检查**
```bash
#!/bin/bash
# health-check.sh
curl -f http://localhost:8080/health/ready || exit 1
```

#### **备份策略**
```bash
#!/bin/bash
# backup.sh
docker exec keycloak-db pg_dump -U keycloak keycloak > backup_$(date +%Y%m%d_%H%M%S).sql
```

这个完整的方案提供了：
- 统一的身份认证入口
- 多语言客户端支持
- 生产级别的高可用部署
- 完整的安全配置
- 监控和维护方案
