FROM node:20-alpine as builder

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent

COPY . .

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app .

RUN chown -R node:node /app

USER node
CMD ["node", "server.js"]
