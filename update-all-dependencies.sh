#!/usr/bin/env sh

echo "Updating pnpm via corepack"
corepack install -g pnpm@latest
corepack use pnpm@latest

echo "Updating dev dependencies"
echo "Found: $(jq -r '.devDependencies | keys | join(" ")' package.json)"

echo "Running update"
pnpm i -D $(jq -r '.devDependencies | keys | join("@latest ")' package.json)
pnpm i -D @types/node@26
pnpm i -D typescript@5

echo "Updating dependencies"
echo "Found: $(jq -r '.dependencies | keys | join(" ")' package.json)"

echo "Running update"
pnpm i $(jq -r '.dependencies | keys | join("@latest ")' package.json)

echo "Running general update to recheck"
pnpm up
