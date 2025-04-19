FROM nginx:1.25-alpine

# Устанавливаем необходимые инструменты для отладки
RUN apk add --no-cache curl iputils bash

# Удаляем стандартную конфигурацию
RUN rm -f /etc/nginx/conf.d/default.conf

# Создаем директории для логов
RUN mkdir -p /var/log/nginx

# Создаем тестовую страницу
RUN echo "Nginx is working!" > /usr/share/nginx/html/index.html

# Копируем нашу конфигурацию
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]