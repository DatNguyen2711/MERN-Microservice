# build stage
FROM node:16-alpine as build-stage
ARG BUILD_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:${BUILD_ENV}

# production stage
FROM nginx:stable-alpine as production-stage
RUN addgroup --system --gid 1000 ubuntu
RUN adduser --system --uid 1000 ubuntu
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --chown=ubuntu:ubuntu nginx.conf /etc/nginx/nginx.conf
RUN chown -R ubuntu:ubuntu /app
USER ubuntu   
CMD ["nginx", "-g", "daemon off;"]