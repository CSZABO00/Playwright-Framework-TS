# Get the base image of Node version 18
FROM node:18

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal
 
# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image

COPY tests/ /app/tests/
COPY src/ /app/src
COPY helpers/ /app/helpers/
COPY tsconfig.json /app/
COPY config.toml /app/
COPY playwright.config.ts /app/
COPY package.json /app/

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm install