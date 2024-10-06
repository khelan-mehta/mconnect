# Installs the basic node js configuration and copies the source file.

FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app/

EXPOSE 3000 443
CMD [ "npm", "run", "dev" ]