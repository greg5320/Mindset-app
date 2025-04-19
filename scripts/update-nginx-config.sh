#!/bin/bash

# Запускаем контейнеры, если они не запущены
docker-compose up -d

# Получаем IP-адреса контейнеров
FRONTEND_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker-compose ps -q frontend))
BACKEND_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker-compose ps -q backend))

echo "Frontend IP: $FRONTEND_IP"
echo "Backend IP: $BACKEND_IP"

# Создаем временный файл конфигурации Nginx с IP-адресами
cat > nginx/nginx.conf.new << EOF
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                      '\$status \$body_bytes_sent "\$http_referer" '
                      '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    error_log   /var/log/nginx/error.log debug;

    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout  65;
    types_hash_max_size 2048;
    server_tokens off;

    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rss+xml
        application/vnd.geo+json
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/bmp
        image/svg+xml
        image/x-icon
        text/cache-manifest
        text/css
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        text/x-cross-domain-policy;

    server {
        listen 80 default_server;
        server_name 89.169.1.129 localhost;
        
        client_max_body_size 20M;

        # Добавляем страницу для проверки работы Nginx
        location = /nginx-status {
            return 200 "Nginx is working!";
            add_header Content-Type text/plain;
        }

        # Добавляем страницу для проверки работы бэкенда
        location = /backend-status {
            proxy_pass http://${BACKEND_IP}:8000;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            add_header Content-Type text/plain;
        }

        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)\$ {
            proxy_pass http://${FRONTEND_IP}:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
            
            expires 30d;
            add_header Cache-Control "public, max-age=2592000";
            access_log off;
        }

        location /api/ {
            proxy_pass http://${BACKEND_IP}:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
            
            add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
            expires off;
        }

        location / {
            proxy_pass http://${FRONTEND_IP}:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

# Заменяем конфигурацию Nginx
mv nginx/nginx.conf.new nginx/nginx.conf

# Перезапускаем Nginx
docker-compose restart nginx

echo "=== Nginx конфигурация обновлена с IP-адресами ==="
echo "Frontend IP: $FRONTEND_IP"
echo "Backend IP: $BACKEND_IP"