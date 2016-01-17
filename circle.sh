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
    git config user.name "$(git --no-pager show -s --format="%aN" HEAD)"
    git config user.email "$(git --no-pager show -s --format="%aE" HEAD)"
    git add -A
    git commit -m "Release"
    git push -f "git@heroku.com:${CIRCLE_PROJECT_REPONAME}.git" "${CIRCLE_BRANCH}:master"
    ;;

esac
