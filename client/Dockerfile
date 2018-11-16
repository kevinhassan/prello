# build environment
FROM node:latest
RUN mkdir /home/prello-app
WORKDIR /home/prello-app
COPY package.json .
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]