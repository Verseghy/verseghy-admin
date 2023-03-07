FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY --from=node /app/dist/verseghy-admin /usr/share/nginx/html
