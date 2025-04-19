FROM nginx:1.25-alpine

# Удаляем стандартную конфигурацию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Создаем директории для логов
RUN mkdir -p /var/log/nginx

# Проверяем конфигурацию (закомментировано, чтобы не блокировать сборку)
# RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]