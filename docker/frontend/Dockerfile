# Stage 1 - Build React App
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN ./node_modules/.bin/react-scripts --version
COPY . .
ENV CI=false
ENV PATH /app/node_modules/.bin:$PATH
RUN react-scripts build

# Stage 2 - Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]