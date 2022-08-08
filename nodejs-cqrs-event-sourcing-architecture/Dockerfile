# Base Image
FROM node:16.15.0

# Set the Working Directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard ensures both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm clean-install

# Install app
COPY ./src ./src
COPY .env .

# Docker environment variables
ENV PORT=4000

# Expose app port
EXPOSE ${PORT}

# Specify the command to run the application
CMD ["node", "src/index.js"]