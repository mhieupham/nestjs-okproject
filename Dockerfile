FROM node:20.9.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tất cả mã nguồn của ứng dụng vào image
COPY . .

RUN npm run build
COPY entrypoint.sh /entrypoint.sh
# Expose cổng 3000 để truy cập ứng dụng
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
