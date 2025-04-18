FROM nginx:1.25-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/nginx

RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]