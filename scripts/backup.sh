#!/bin/bash

# Настройки
BACKUP_DIR="./backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
POSTGRES_CONTAINER="mindset-app_db_1"
DB_NAME="mindset_db"
DB_USER="postgres"

# Создаем директорию для резервных копий, если она не существует
mkdir -p $BACKUP_DIR

# Резервное копирование базы данных
echo "Создаем резервную копию базы данных..."
docker exec $POSTGRES_CONTAINER pg_dump -U $DB_USER $DB_NAME > "$BACKUP_DIR/db_backup_$DATE.sql"

# Сжимаем резервную копию
gzip "$BACKUP_DIR/db_backup_$DATE.sql"

echo "Резервное копирование завершено: $BACKUP_DIR/db_backup_$DATE.sql.gz"

# Удаляем старые резервные копии (оставляем только последние 7)
echo "Удаляем старые резервные копии..."
ls -tp $BACKUP_DIR/db_backup_*.sql.gz | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}

echo "Готово!"