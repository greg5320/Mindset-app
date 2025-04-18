if ! command -v ufw &> /dev/null; then
    echo "UFW не установлен. Устанавливаем..."
    apt-get update
    apt-get install -y ufw
fi

echo "Настраиваем брандмауэр..."

ufw allow ssh

ufw allow 80/tcp

ufw allow 443/tcp

echo "y" | ufw enable

ufw status

echo "Настройка брандмауэра завершена."