#!/bin/bash

echo "=== Диагностика доступа к серверу по IP 89.169.1.129 ==="

echo -e "\n=== Проверка брандмауэра ==="
if command -v ufw &> /dev/null; then
    ufw status
else
    echo "UFW не установлен"
    if command -v iptables &> /dev/null; then
        iptables -L -n
    else
        echo "iptables не найден"
    fi
fi

echo -e "\n=== Проверка открытых портов ==="
if command -v netstat &> /dev/null; then
    netstat -tulpn | grep :80
elif command -v ss &> /dev/null; then
    ss -tulpn | grep :80
else
    echo "netstat/ss не найдены"
fi

echo -e "\n=== Проверка Docker контейнеров ==="
docker-compose ps

echo -e "\n=== Проверка логов Nginx ==="
docker-compose logs --tail=20 nginx

echo -e "\n=== Проверка конфигурации Nginx ==="
docker-compose exec nginx nginx -T

echo -e "\n=== Проверка доступности Nginx изнутри контейнера ==="
docker-compose exec nginx curl -I localhost

echo -e "\n=== Проверка доступности фронтенда из контейнера Nginx ==="
docker-compose exec nginx curl -I http://frontend:3000

echo -e "\n=== Проверка доступности бэкенда из контейнера Nginx ==="
docker-compose exec nginx curl -I http://backend:8000 || echo "Бэкенд не отвечает на HEAD запросы"

echo -e "\n=== Проверка сетевых интерфейсов ==="
ip addr show

echo -e "\n=== Проверка маршрутизации ==="
ip route

echo -e "\n=== Проверка DNS ==="
cat /etc/resolv.conf

echo -e "\n=== Проверка хостов ==="
cat /etc/hosts

echo -e "\n=== Проверка доступности с локального хоста ==="
curl -v http://localhost:80

echo -e "\n=== Проверка доступности по IP ==="
curl -v http://89.169.1.129:80

echo -e "\n=== Диагностика завершена ==="