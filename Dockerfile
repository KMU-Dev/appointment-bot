# Build Container
FROM node:14.17-alpine AS builder

WORKDIR /app

# Copy dependency specification file
COPY package.json yarn.lock tsconfig.json /app/

# Install dependincies
RUN yarn --version && yarn

# Copy application file
COPY src/ /app/src/

# Build App
RUN yarn build


# Production Container
FROM node:14.17-alpine

LABEL maintainer="Chao Tzu-Hsien"

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
COPY --from=builder --chown=bot /app/dist /app

# Expose app running port
EXPOSE 5000

# Start app
ENTRYPOINT ["yarn", "start"]
