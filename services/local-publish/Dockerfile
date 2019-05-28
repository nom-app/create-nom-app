FROM node:12.3.1-alpine as create-nom-app-local-publish

RUN apk add bash

RUN apk add curl

WORKDIR /usr/app

RUN npm set registry http://172.30.20.18:4873/

RUN yarn config set registry http://172.30.20.18:4873/

COPY ./packages ./packages

COPY ./tasks .

CMD ["echo", "no command set"]
