#!/bin/sh
# Ждём, пока Postgres запустится
until pg_isready -h db -U "$POSTGRES_USER"; do
  echo "Waiting for database server..."
  sleep 2
done

# Если базы mindset_db нет — создаём её
exist=$(psql -h db -U "$POSTGRES_USER" -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_DB'")
if [ "$exist" != "1" ]; then
  echo "Database $POSTGRES_DB not found, creating..."
  psql -h db -U "$POSTGRES_USER" -c "CREATE DATABASE \"$POSTGRES_DB\";"
fi

# Запускаем миграции
echo "Running migrations..."
export DATABASE_URL
sqlx migrate run --source /app/migrations

# И только потом запускаем ваше приложение
exec "$@"