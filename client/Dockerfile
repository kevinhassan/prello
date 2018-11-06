FROM node:latest
RUN mkdir /home/prello-app
WORKDIR /home/prello-app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

RUN npm start

