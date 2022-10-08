FROM node:14-slim

WORKDIR /user/src/react_app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

RUN npm install recharts

COPY . .

EXPOSE 3000

CMD ["npm","start"]