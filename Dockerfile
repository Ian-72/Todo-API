FROM node:17-alpine

RUN npm install pnpm -g

USER node

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3030

CMD [ "npm", "run", "start" ]
