# Базовый образ Node.js
FROM node:18-alpine AS base

ARG GOOGLE_SHEETS_API_KEY
ARG SHEET_ID
ARG RANGE

# 2) Переводим их в ENV, чтобы в процессе сборки и в runtime они были доступны через process.env
ENV GOOGLE_SHEETS_API_KEY=$GOOGLE_SHEETS_API_KEY \
    SHEET_ID=$SHEET_ID \
    RANGE=$RANGE
    
# Установка зависимостей для сборки
FROM base AS deps
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package.json package-lock.json* ./

# Установка зависимостей
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Обновляем next.config.ts для работы с Nginx
RUN sed -i 's|/api/clients|/api/students|g' next.config.ts

# Сборка приложения без проверки линтера
RUN npm run build -- --no-lint

# Запуск приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Создание пользователя nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование необходимых файлов
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключение на пользователя nextjs
USER nextjs

# Открытие порта 3000
EXPOSE 3000

# Установка переменных окружения в правильном формате
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запуск приложения
CMD ["node", "server.js"]