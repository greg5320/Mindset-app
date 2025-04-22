#!/usr/bin/env bash
set -euo pipefail

# Куда сохранять дампы
BACKUP_DIR=/root/Mindset-app/db_backups
mkdir -p "$BACKUP_DIR"

# Имя вашего docker-compose сервиса для БД:
DB_CONTAINER="mindset-app_db_1"

# Учётка и БД внутри контейнера
PG_USER=postgres
DB_NAME=mindset_db

# Формируем имя файла
TIMESTAMP=$(date +'%Y%m%d%H%M%S')
DUMP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"

echo "[$(date)] Starting backup of $DB_NAME to $DUMP_FILE"

# 1) Дампим базу наружу
docker exec -i "$DB_CONTAINER" \
  pg_dump -U "$PG_USER" "$DB_NAME" > "$DUMP_FILE"

# 2) Удаляем и создаём БД заново
docker exec "$DB_CONTAINER" \
  psql -U "$PG_USER" -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker exec "$DB_CONTAINER" \
  psql -U "$PG_USER" -c "CREATE DATABASE $DB_NAME;"

# 3) Восстанавливаем из дампа
docker exec -i "$DB_CONTAINER" \
  psql -U "$PG_USER" "$DB_NAME" < "$DUMP_FILE"

echo "[$(date)] Restore complete. Removing dump file $DUMP_FILE"

# 4) Удаляем только что созданный дамп
rm -f "$DUMP_FILE"
