# Instructions
# Use Node.js 22 as the base image for the application
FROM node:22

# Identify
# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) from the host to the container
COPY package*.json ./

# Install project dependencies using npm
RUN npm install

# Copy the entire application source code from the host to the container
COPY . .

# Build the Next.js application for production
RUN npm run build

# Set the PORT environment variable to 5002
ENV PORT=5002

# Expose port 5002 to allow external connections (must match ENV PORT)
EXPOSE 5002

# Run the application using npm start command as the default container entry point
CMD ["npm", "start"]