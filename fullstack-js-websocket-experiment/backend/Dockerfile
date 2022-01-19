FROM node:17-alpine AS development
ENV NODE_ENV development

# Add a work directory
WORKDIR /app

#Cache and install dependencies
COPY package.json ./
COPY package-lock.json ./

#Copy app files
COPY ./ ./

RUN npm i

# Expose port
EXPOSE 8080

#start the frontend app
CMD ["npm", "start"]