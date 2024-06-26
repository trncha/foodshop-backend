FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/uploads

RUN chmod 755 /usr/src/app/uploads

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 8080

CMD ["node", "dist/main"]
