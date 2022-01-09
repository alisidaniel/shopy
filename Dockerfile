FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm --verbose install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]