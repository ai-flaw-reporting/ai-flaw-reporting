FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p public/uploads

RUN node node_modules/@strapi/strapi/bin/strapi.js build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app ./

RUN chown -R node:node /app
USER node

EXPOSE 1337

CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]