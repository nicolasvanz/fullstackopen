FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 19006

ENTRYPOINT [ "npm", "start", "--", "--web" ]