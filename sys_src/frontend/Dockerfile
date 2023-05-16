FROM alpine:latest

# Install Nginx
RUN apk update && apk add nginx

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

WORKDIR /usr/app
COPY package.json /usr/app

# Copy your application code
COPY ./public/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN npm install kafkajs

# Expose the appropriate port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

