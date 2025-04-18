#!/bin/bash

# Создание необходимых директорий
mkdir -p frontend backend nginx/conf.d scripts

echo "Структура директорий создана."

# Проверка наличия исходного кода
if [ ! -f "frontend/package.json" ]; then
  echo "ВНИМАНИЕ: Исходный код фронтенда не найден в директории frontend/"
  echo "Вам нужно скопировать исходный код фронтенда в директорию frontend/"
fi

if [ ! -f "backend/Cargo.toml" ]; then
  echo "ВНИМАНИЕ: Исходный код бэкенда не найден в директории backend/"
  echo "Вам нужно скопировать исходный код бэкенда в директорию backend/"
fi

echo "Настройка завершена. Теперь вы можете запустить приложение с помощью команды:"
echo "docker-compose up -d"