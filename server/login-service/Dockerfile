FROM node

# Create a new post-service directory
WORKDIR /login-service

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001
CMD [ "node", "index.js"]