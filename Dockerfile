FROM node:alpine as base 

WORKDIR /usr/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build
