# Giai đoạn 1: Xây dựng ứng dụng
FROM node:20-alpine as builder

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent

COPY . .

# Giai đoạn 2: Tạo ảnh nhỏ hơn cho sản xuất
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app .

RUN chown -R node:node /app

USER node
CMD ["node", "server.js"]
