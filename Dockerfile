FROM mirror.gcr.io/library/node:20.11-alpine3.18 AS build
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build

CMD ["yarn", "start"]