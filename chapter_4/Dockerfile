# This file is basically the instruction sheet on how to create an environment that has everything we need to run the backend (server and database)

# Use an official node.js runtime as a parent image (image is a snapshot of a separate instruction sheet)
# When we build our container, we create a snapshot of that environment and then whenever we run the container, we can just run that snapshot and get us right to where we were.
# We can build off pre-existing images, which in this case is node.js official image
# It takes a snapshot of the node environment we specify and add it to our new environment that we created via this Dockerfile
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files from our local project to this new environment
# the . at the end means current working directory (/app)
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code
# first . is the source (chapter_4), second . is the destination (/app)
COPY . .

# We separate the copying of the package.json and package-lock.json files from the application code because the Docker image builds from top to bottom (from any files that changed), so if we only change the application code, we don't need to re-install the packages (Docker caches the build information)

# Open the port that the app runs on to incoming requests
EXPOSE 5000

# Define the command to run the application
CMD ["node", "./src/server.js"]