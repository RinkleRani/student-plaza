FROM node

# Create a new post-service directory
WORKDIR /post-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "src/app.js"]

