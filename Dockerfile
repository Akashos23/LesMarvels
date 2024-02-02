FROM node:lts-bullseye-slim

LABEL authors="akash"

RUN mkdir -p /home/node/app/node_modules
RUN chown node /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
COPY ./.env ../
RUN npm install
COPY ./src ./src
COPY ./templates ../templates
EXPOSE 3000
CMD ["node", "src/server.js"]




