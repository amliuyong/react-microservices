# dockerfile
# the first image use node image as the builder because it has git program
FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install --only=prod
COPY . .

## compile typescript
# RUN npm run build

# ===============
# the second image use node:slim image as the runtime
FROM node:slim as runtime

WORKDIR /app
ENV NODE_ENV=production

## Copy the necessary files form builder
COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["npm", "run", "start:prod"]