#!/usr/bin/env sh

branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
  echo "❌ Direct pushes to $branch are not allowed. Use pull requests."
  exit 1
fi