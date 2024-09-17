# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:22

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
# https://docs.npmjs.com/cli/ci.html
RUN npm ci

# Copy app files
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]