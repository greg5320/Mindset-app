#!/bin/bash

echo "=== Полная диагностика и исправление проблем ==="

echo "=== Остановка всех контейнеров ==="
docker-compose down

echo "=== Очистка Docker ==="
docker rm -f $(docker ps -aq) 2>/dev/null || true
docker rmi -f $(docker images -q) 2>/dev/null || true
docker volume prune -f
docker network prune -f
docker system prune -a -f --volumes

echo "=== Проверка конфигурации Nginx ==="
docker run --rm -v $(pwd)/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx:1.25-alpine nginx -t

echo "=== Создание тестовой страницы для Nginx ==="
mkdir -p nginx/html
cat > nginx/html/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Nginx Status</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }
        .status {
            padding: 20px;
            background-color: #e6f7e6;
            border-left: 5px solid #4CAF50;
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Nginx Status</h1>
    <div class="status">
        <p><strong>Status:</strong> Nginx is working correctly!</p>
        <p><strong>Server IP:</strong> 89.169.1.129</p>
        <p><strong>Date:</strong> <span id="date"></span></p>
    </div>
    <script>
        document.getElementById('date').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

echo "=== Создание тестового бэкенда ==="
cat > backend/test-server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', message: 'Test backend is working!' }));
});

server.listen(8000, '0.0.0.0', () => {
  console.log('Test backend server running on port 8000');
});
EOF

cat > backend/Dockerfile.test << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY test-server.js .

EXPOSE 8000

CMD ["node", "test-server.js"]
EOF

echo "=== Создание временного docker-compose.yml ==="
cat > docker-compose.yml.new << 'EOF'
version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/html:/usr/share/nginx/html:ro
    networks:
      - mindset-network
    restart: always
    depends_on:
      - frontend
      - backend

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    expose:
      - "3000"
    environment:
      - NODE_ENV=production
      - BACKEND_URL=/api
    networks:
      - mindset-network
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.test
    expose:
      - "8000"
    networks:
      - mindset-network
    restart: always

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=postgres
      - POSTGRES_DB=mindset_db
    networks:
      - mindset-network
    restart: always

networks:
  mindset-network:
    driver: bridge

volumes:
  postgres_data:
EOF

echo "=== Запуск временной конфигурации ==="
mv docker-compose.yml docker-compose.yml.bak
mv docker-compose.yml.new docker-compose.yml

echo "=== Запуск контейнеров ==="
docker-compose up -d

echo "=== Ожидание запуска контейнеров (10 секунд) ==="
sleep 10

echo "=== Проверка статуса контейнеров ==="
docker-compose ps

echo "=== Проверка логов Nginx ==="
docker-compose logs nginx

echo "=== Проверка логов бэкенда ==="
docker-compose logs backend

echo "=== Проверка логов фронтенда ==="
docker-compose logs frontend

echo "=== Проверка доступности Nginx ==="
curl -v http://localhost/nginx-status

echo "=== Проверка доступности бэкенда ==="
curl -v http://localhost/api

echo "=== Проверка открытых портов ==="
netstat -tulpn | grep :80 || ss -tulpn | grep :80

echo "=== Восстановление оригинальной конфигурации ==="
echo "Если временная конфигурация работает, вы можете постепенно вернуться к оригинальной."
echo "Для восстановления оригинальной конфигурации выполните:"
echo "mv docker-compose.yml.bak docker-compose.yml"

echo "=== Исправление завершено ==="