# Use the official Node.js image as a base
FROM node:16
# Set the working directory in the container
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install
# Copy project files
COPY . .
# Build the React app
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
# Command to start the app
CMD ["npm", "start"]