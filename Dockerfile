FROM node:alpine

WORKDIR /home/api

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 3333

CMD yarn dev
