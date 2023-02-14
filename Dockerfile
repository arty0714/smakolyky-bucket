FROM node:latest
WORKDIR /app/bucket
COPY package.json .
RUN npm install