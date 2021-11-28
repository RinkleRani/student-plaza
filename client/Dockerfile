From node
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
