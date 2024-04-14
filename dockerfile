FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=build /usr/src/app/uploads /usr/src/app/uploads

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

RUN mkdir -p ./uploads

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 8080

CMD ["node", "dist/main"]