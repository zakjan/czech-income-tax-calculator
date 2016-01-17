#!/usr/bin/env bash

set -eu

case "$1" in

  dependencies)
    npm prune
    npm install
    ;;

  release)
    npm run release
    ;;

  deploy)
    sed -i -e "/dist/d" .gitignore
    git config user.name "CircleCI"
    git config user.email "zj@zakjan.cz"
    git add -A
    git commit -m "Release"
    git push -f "git@heroku.com:${CIRCLE_PROJECT_REPONAME}.git" "${CIRCLE_BRANCH}:master"
    ;;

esac
