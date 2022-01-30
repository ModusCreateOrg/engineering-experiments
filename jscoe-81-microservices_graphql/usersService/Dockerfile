FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]