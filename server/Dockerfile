FROM node:latest
RUN mkdir /home/prello-api
WORKDIR /home/prello-api
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9090
RUN npm start
