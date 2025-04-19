#!/bin/bash

SERVER_IP="89.169.1.129"
PORT=80

echo "=== Проверка доступности сервера $SERVER_IP:$PORT ==="

# Проверка с помощью curl
echo -e "\n=== Проверка с помощью curl ==="
curl -I http://$SERVER_IP:$PORT

# Проверка с помощью netstat
echo -e "\n=== Проверка открытых портов ==="
netstat -tulpn | grep :80 || ss -tulpn | grep :80

# Проверка брандмауэра
echo -e "\n=== Проверка брандмауэра ==="
if command -v ufw &> /dev/null; then
    ufw status
else
    echo "UFW не установлен"
fi

# Проверка логов Nginx
echo -e "\n=== Последние 10 строк логов Nginx ==="
docker-compose logs --tail=10 nginx