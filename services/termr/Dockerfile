FROM ubuntu:18.04

MAINTAINER Maxim Devoir <maximdevoir@gmail.com>

SHELL ["/bin/bash", "-c"]

ARG user=rterm
ARG group=rterm
ARG uid=1000
ARG gid=1000
ARG RTERM_HOME=/home/rterm

ENV RTERM_HOME $RTERM_HOME

RUN mkdir -p $RTERM_HOME \
  && chown ${uid}:${gid} $RTERM_HOME \
  && groupadd -g ${gid} ${group} \
  && useradd -d "$RTERM_HOME" -u ${uid} -g ${gid} -m -s /bin/bash ${user}

RUN apt-get update

# Prereqs for NVM
RUN apt-get install -y --no-install-recommends \
  apt-transport-https \
  build-essential \
  ca-certificates \
  curl \
  git \
  libssl-dev \
  python \
  wget \
  vim

# A list of packages required by Terminalizer or its dependencies (e.g.
# Electron).
RUN apt-get install -y --no-install-recommends \
  libgtk-3-0 \
  libx11-xcb1 \
  libxss1 \
  libgconf-2-4 \
  libnss3 \
  libasound2 \
  libxtst6 \
  xvfb

RUN rm -rf /v ar/lib/apt/lists/*

USER ${user}

WORKDIR $RTERM_HOME

ENV NVM_DIR ${RTERM_HOME}/.nvm
ENV NVM_VERSION v0.34.0
ENV NODE_VERSION 10.15.3

RUN mkdir .nvm
RUN mkdir .fonts

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash \
  && . ${NVM_DIR}/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

ENV NODE_PATH    $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH         $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install --global yarn node-gyp terminalizer

# Use Menlo for Powerline font.
RUN git clone https://github.com/abertsch/Menlo-for-Powerline.git menlo-fonts

# TODO: Add more by https://github.com/powerline/fonts via fonts-powerline
# debian package.
RUN cp "./menlo-fonts/Menlo for Powerline.ttf" ~/.fonts/

RUN fc-cache -vf ~/.fonts

COPY package*.json yarn.lock ./

RUN yarn install

COPY render.js .

# XVFB and render.js related environment variables
ENV RAW_TERM_DIR ${RTERM_HOME}/rawTerminalData
ENV OUTPUT_DIR ${RTERM_HOME}/output
ENV XVFB_SERVER_ARG -screen 0 1920x1080x24

CMD ["node", "render.js"]
