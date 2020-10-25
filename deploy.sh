#! /usr/bin/env bash

git checkout master

npm run build

GIT_STATUS=$(cd dist && git status --porcelain 2>/dev/null .)
MODIFIED_FILES=$(echo "$GIT_STATUS" | grep "^ M" | wc -l)
if [ $MODIFIED_FILES -eq 0 ]; then
    tput bold
    echo -e "\nThere is nothing to deploy."
    tput sgr0
    
    exit;
fi

git add dist/*
git commit -m "chore: new build"

git push
git subtree push --prefix dist origin gh-pages
