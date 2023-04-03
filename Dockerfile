FROM node:16 as builder 
WORKDIR /usr/src/app
COPY package.json . 
RUN npm install 
COPY . . 
RUN npm run build 


FROM nginx:latest as runner 
COPY --from=builder /usr/src/app/builder /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 
ENTRYPOINT [ "nginx", "-g", "daemon off;"]