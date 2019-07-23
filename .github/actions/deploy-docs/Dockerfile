FROM node:10.16.0-alpine

LABEL version="0.0.0"
LABEL "com.github.actions.name"="Deploy Docs"
LABEL "com.github.actions.description"="Deploy Create Nom App documentation to GitHub Pages."
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/MaximDevoir/create-nom-app"
LABEL "homepage"="https://github.com/MaximDevoir/create-nom-app/tree/master/.github/actions/"
LABEL "maintainer"="Maxim Devoir <maximdevoir@gmail.com>"

# Packages required by Git
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    bash git openssh

# Packages required by Docusaurus
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    autoconf \
    build-base

COPY LICENSE README.md /

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
