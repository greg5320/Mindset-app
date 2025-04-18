#!/bin/bash

# Проверка наличия docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo "Ошибка: docker-compose не установлен"
    exit 1
fi

# Остановка и удаление существующих контейнеров
echo "Останавливаем существующие контейнеры..."
docker-compose down

# Сборка и запуск новых контейнеров
echo "Собираем и запускаем новые контейнеры..."
docker-compose up -d --build

# Проверка статуса контейнеров
echo "Проверяем статус контейнеров..."
docker-compose ps

echo "Деплой завершен успешно!"