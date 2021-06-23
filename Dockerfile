# Build Container
FROM node:14.17.1-alpine AS builder

WORKDIR /app

# Copy dependency specification file
COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json /app/

# Install dependincies
RUN yarn --version && yarn

# Copy application file
COPY src/ /app/src/

# Build App
RUN yarn build


# Production Container
FROM node:14.17.1-alpine

LABEL maintainer="Chao Tzu-Hsien"

LABEL org.opencontainers.image.source https://github.com/KMU-Dev/appointment-bot

WORKDIR /app

# Create a group and user
RUN addgroup -S bot && adduser -S bot -G bot

# Change /app owner
RUN chown -R bot:bot /app

# Change user for security
USER bot:bot

# Copy dependency specification file
COPY --chown=bot package.json yarn.lock /app/

# Yarn install only dependencies
RUN yarn --version && yarn --prod

# Copy built Javascript from build container
COPY --from=builder --chown=bot /app/dist /app/dist

# Expose app running port
EXPOSE 3000

# Start app
ENTRYPOINT ["yarn", "start:prod"]
