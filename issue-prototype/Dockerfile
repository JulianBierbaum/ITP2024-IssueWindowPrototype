# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy the package.json and package-lock.json from the issue-prototype directory
COPY ./package*.json ./

# Install all the dependencies listed in package.json and package-lock.json
RUN npm install

# Copy the rest of the application code from issue-prototype to /app in the container
COPY . .

# Expose the port (if applicable, e.g., for a development server)
EXPOSE 3000

CMD ["npm", "start"]
