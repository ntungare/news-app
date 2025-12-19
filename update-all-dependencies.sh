#!/usr/bin/env sh

echo "Updating pnpm via corepack"
corepack install -g pnpm@10
corepack use pnpm@10

echo "Updating dev dependencies"
echo "Found: $(jq -r '.devDependencies | keys | join(" ")' package.json)"

echo "Running update"
pnpm i -D $(jq -r '.devDependencies | keys | join("@latest ")' package.json)

echo "Updating dependencies"
echo "Found: $(jq -r '.dependencies | keys | join(" ")' package.json)"

echo "Running update"
pnpm i $(jq -r '.dependencies | keys | join("@latest ")' package.json)

echo "Running general update to recheck"
pnpm up
