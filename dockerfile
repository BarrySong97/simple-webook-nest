FROM gplane/pnpm:latest AS builder

# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN pnpm install
COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["/bin/sh", "-c", "npm run start:prod"]