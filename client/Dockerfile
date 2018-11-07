# build environment
FROM node:latest as builder
RUN mkdir /home/prello-app
WORKDIR /home/prello-app
ENV PATH /home/prello-app/node_modules/.bin:$PATH
COPY package.json /home/prello-app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /home/prello-app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /home/prello-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]