# Build Stage
FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80