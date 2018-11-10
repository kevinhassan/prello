# build environment
FROM node:latest
RUN mkdir /home/prello-app
WORKDIR /home/prello-app
COPY package.json .
RUN npm install --silent
RUN npm install react-scripts@1.1.1 yarn@1.12.3 -g --silent
COPY . .
RUN npm run build 
RUN yarn global add serve
EXPOSE 3000
CMD [ "npm", "run", "now-start" ]