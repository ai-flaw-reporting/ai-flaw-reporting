#!/bin/bash

# Script to add a shadcn component and organize it into folder structure
# Usage: yarn add-component <component-name>

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "❌ Error: Component name is required"
  echo "Usage: yarn add-component <component-name>"
  echo "Example: yarn add-component badge"
  exit 1
fi

echo "📦 Installing shadcn component: $COMPONENT_NAME"
echo ""

# Install the component using shadcn
npx shadcn@latest add "$COMPONENT_NAME" --yes

# Check if installation was successful
if [ $? -ne 0 ]; then
  echo "❌ Failed to install component"
  exit 1
fi

UI_DIR="src/components/ui"
COMPONENT_FILE="$UI_DIR/$COMPONENT_NAME.tsx"
COMPONENT_DIR="$UI_DIR/$COMPONENT_NAME"

# Check if the component file exists
if [ ! -f "$COMPONENT_FILE" ]; then
  echo "⚠️  Component file not found at $COMPONENT_FILE"
  echo "   Component might already be organized or have a different structure"
  exit 0
fi

echo ""
echo "📁 Organizing component into folder structure..."

# Create component directory
mkdir -p "$COMPONENT_DIR"

# Move component file to index.tsx
mv "$COMPONENT_FILE" "$COMPONENT_DIR/index.tsx"

echo ""
echo "✅ Component '$COMPONENT_NAME' successfully added and organized!"
echo ""
echo "📂 Component location:"
echo "   $COMPONENT_DIR/index.tsx"
echo ""
echo "📝 Next steps:"
echo "   1. Create a Storybook story: touch $COMPONENT_DIR/$COMPONENT_NAME.stories.tsx"
echo "   2. Import the component: import { ${COMPONENT_NAME^} } from '~/components/ui/$COMPONENT_NAME'"
echo ""

