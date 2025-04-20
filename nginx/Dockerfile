FROM nginx:1.25-alpine

# Remove default site configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
# nginx.conf is in the build context (./nginx)
COPY nginx.conf /etc/nginx/nginx.conf

# Prepare logs directory
RUN mkdir -p /var/log/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]