FROM node:16-alpine

RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Bind your app to port 8080
EXPOSE 8080

# CMD [ "node", "server.js" ]
CMD [ "node", "server.js" ]