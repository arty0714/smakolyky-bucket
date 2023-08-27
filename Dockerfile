FROM node:latest
WORKDIR /app/bucket
RUN mkdir chapters projects
COPY package.json .
RUN npm install