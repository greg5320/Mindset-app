FROM nginx:1.25-alpine

# Remove default site
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Prepare logs directory
RUN mkdir -p /var/log/nginx

# Expose HTTP port and run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]