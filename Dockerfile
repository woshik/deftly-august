FROM node:16-alpine3.16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]