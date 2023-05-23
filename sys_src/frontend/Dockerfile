FROM alpine:latest

# Install Nginx
RUN apk update && apk add nginx

WORKDIR /usr/app

# Copy your application code
COPY ./NauticalNonsense/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the appropriate port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

