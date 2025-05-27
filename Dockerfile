FROM node:alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run docs