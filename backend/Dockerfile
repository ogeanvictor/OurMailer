FROM node:20.10.0

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@latest

RUN npm install

RUN npm install -g ts-node

COPY . .

EXPOSE 3007

CMD ["npm", "run", "dev"]
