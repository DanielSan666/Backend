# Dockerfile

FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY src/ ./src
EXPOSE 5000 
CMD [ "npm", "start"]
