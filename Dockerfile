# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install express express-graphql graphql cors

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the server will run on
EXPOSE 4000

# Start the Node.js server
CMD ["node", "server.js"]
