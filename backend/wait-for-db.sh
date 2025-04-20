#!/bin/sh
# Wait for PostgreSQL to become available
until pg_isready -h db -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "Waiting for database..."
  sleep 2
done

# Run SQLx migrations
 echo "Running migrations..."
 export DATABASE_URL
 sqlx migrate run --source /app/migrations

# Execute the application
exec "$@"