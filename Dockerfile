FROM node:14.15.4-alpine

LABEL maintainer="Chao Tzu-Hsien"

WORKDIR /app

# Create a group and user
RUN addgroup -S bot && adduser -S bot -G bot

# Change /app owner
RUN chown -R bot:bot /app

# Change user for security
USER bot:bot

# Copy dependency specification file
COPY --chown=bot:bot package.json yarn.lock /app/

# Install dependincies
RUN yarn --version && yarn

# Copy application file
COPY --chown=bot:bot src/ /app/

# Expose app running port
EXPOSE 5000

# Start app
ENTRYPOINT ["yarn", "start"]
