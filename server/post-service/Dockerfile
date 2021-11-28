FROM node

# Create a new post-service directory
WORKDIR /post-service

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start"]

