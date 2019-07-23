#!/bin/sh

set -eu

if [ -z ${WEBSITE_DIR+x} ] || [ ! -d "$WEBSITE_DIR" ]; then
  echo "WEBSITE_DIR is not set correctly."
  echo "WEBSITE_DIR must point to the \"website\" directory of the Docusuarus project."
  echo "WEBSITE_DIR is currently set to \"$WEBSITE_DIR\""
  exit 1
fi

git config --global user.email "$GITHUB_ACTOR@users.noreply.github.com"
git config --global user.name "$GITHUB_ACTOR"

echo "machine github.com login $GITHUB_ACTOR password $DOCS_DEPLOY_TOKEN" > ~/.netrc

cd "$WEBSITE_DIR"

yarn install

GIT_USER=$GITHUB_ACTOR \
  yarn run publish-gh-pages
