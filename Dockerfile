FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]
RUN yarn --pure-lockfile

COPY . .

EXPOSE 3000
CMD yarn start