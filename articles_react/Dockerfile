FROM node:14

WORKDIR /app/articles_react

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]