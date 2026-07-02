#!/bin/bash

# Script to organize shadcn components into folders with index.tsx
# Usage: ./scripts/organize-component.sh <component-name>

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: ./scripts/organize-component.sh <component-name>"
  exit 1
fi

UI_DIR="src/components/ui"
COMPONENT_FILE="$UI_DIR/$COMPONENT_NAME.tsx"
COMPONENT_DIR="$UI_DIR/$COMPONENT_NAME"

# Check if the component file exists
if [ ! -f "$COMPONENT_FILE" ]; then
  echo "Error: Component file $COMPONENT_FILE not found"
  exit 1
fi

# Create component directory
mkdir -p "$COMPONENT_DIR"

# Move component file to index.tsx
mv "$COMPONENT_FILE" "$COMPONENT_DIR/index.tsx"

echo "✅ Component '$COMPONENT_NAME' organized into folder structure"
echo "   $COMPONENT_DIR/index.tsx"

