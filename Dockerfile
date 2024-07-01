ARG api_url

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build --env PUBLIC_API_URL=$api_URL
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
ENV PUBLIC_API_URL=$api_url
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
