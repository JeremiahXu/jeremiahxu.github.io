# 第一阶段：构建 Jekyll 静态站点
FROM jekyll/jekyll:4.2.2 AS builder

WORKDIR /srv/jekyll
COPY . .
RUN bundle install
RUN JEKYLL_ENV=production bundle exec jekyll build

# 第二阶段：用 Nginx 发布静态站点
FROM nginx:alpine
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
EXPOSE 80