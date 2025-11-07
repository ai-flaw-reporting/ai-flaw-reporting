FROM node:20-alpine AS builder

# Install system dependencies for sharp
RUN apk add --no-cache \
    vips-dev \
    fftw-dev \
    build-base \
    gcc \
    g++ \
    make \
    libc6-compat \
    python3

WORKDIR /app

COPY package*.json ./

# Force reinstall sharp for the correct platform
RUN npm install && \
    rm -rf node_modules/sharp node_modules/@img && \
    npm install --os=linux --libc=musl --cpu=x64 sharp && \
    npm rebuild sharp

COPY . .

RUN mkdir -p public/uploads

RUN node node_modules/@strapi/strapi/bin/strapi.js build

FROM node:20-alpine AS runner

# Install runtime dependencies for sharp
RUN apk add --no-cache vips

WORKDIR /app

COPY package*.json ./
RUN npm install --production && \
    rm -rf node_modules/sharp node_modules/@img && \
    npm install --os=linux --libc=musl --cpu=x64 sharp

COPY --from=builder /app ./

RUN chown -R node:node /app
USER node

EXPOSE 1337

CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]