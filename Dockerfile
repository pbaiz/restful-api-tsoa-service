FROM node:lts

# Copy files
COPY . /
WORKDIR /

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
