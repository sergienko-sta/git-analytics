#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${YELLOW}🔍 Checking branch protection...${NC}"

# Защищённые ветки
PROTECTED_BRANCHES="main develop"
CURRENT_BRANCH=$(git branch --show-current)

for BRANCH in $PROTECTED_BRANCHES; do
  if [ "$CURRENT_BRANCH" = "$BRANCH" ]; then
    echo ""
    echo "${RED}❌ Push to '$CURRENT_BRANCH' branch is not allowed!${NC}"
    echo "${YELLOW}Please create a feature branch and use Pull Requests.${NC}"
    echo ""
    exit 1
  fi
done

echo "${GREEN}✅ Branch check passed${NC}"
exit 0