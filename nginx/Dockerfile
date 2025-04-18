FROM nginx:1.25-alpine
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf


RUN echo '--- Копия /etc/nginx/nginx.conf (первые 5 строк) ---' \
    && sed -n '1,5p' /etc/nginx/nginx.conf

RUN mkdir -p /var/log/nginx
RUN nginx -t


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
