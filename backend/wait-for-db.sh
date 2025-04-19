#!/bin/sh
# Wait for PostgreSQL to be ready
until pg_isready -h db -U "$POSTGRES_USER"; do
  echo "Waiting for database..."
  sleep 2
done

# Run SQLx migrations
echo "Running database migrations..."
export DATABASE_URL
sqlx migrate run --source /app/migrations

# Start the application
exec "$@"