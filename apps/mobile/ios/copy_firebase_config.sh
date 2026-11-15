#!/bin/bash

# This script is meant to be run as a VS Code preLaunchTask.
# It takes the flavor name (e.g. "sandbox" or "live") as the first argument.

FLAVOR=$1

if [ -z "$FLAVOR" ]; then
  echo "Error: No flavor provided. Usage: ./copy_firebase_config.sh <flavor>"
  exit 1
fi

echo "Copying Firebase config for flavor: $FLAVOR"

# Define paths (relative to the ios directory)
# VS Code tasks run with cwd set to ${workspaceFolder}/ios

CONFIG_PATH="./config/${FLAVOR}/GoogleService-Info.plist"
DESTINATION_PATH="./Runner/GoogleService-Info.plist"

if [ ! -f "$CONFIG_PATH" ]; then
  echo "Error: Config file not found at $CONFIG_PATH"
  exit 1
fi

mkdir -p ./Runner
cp "$CONFIG_PATH" "$DESTINATION_PATH"
echo "Successfully copied $CONFIG_PATH to $DESTINATION_PATH"
