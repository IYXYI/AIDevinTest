#!/bin/bash

# Simple deployment script for the Countdown Clock App
# This script can be used to deploy to any web server

echo "🚀 Deploying Countdown Clock App..."

# Create deployment directory
DEPLOY_DIR="dist"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy files to deployment directory
echo "📁 Copying files..."
cp index.html $DEPLOY_DIR/
cp style.css $DEPLOY_DIR/
cp script.js $DEPLOY_DIR/
cp README.md $DEPLOY_DIR/

# Optional: Minify files for production (requires uglify-js and clean-css-cli)
if command -v uglifyjs &> /dev/null && command -v cleancss &> /dev/null; then
    echo "🗜️ Minifying files..."
    uglifyjs script.js -o $DEPLOY_DIR/script.min.js -c -m
    cleancss style.css -o $DEPLOY_DIR/style.min.css
    
    # Update HTML to use minified files
    sed -i 's/script.js/script.min.js/g' $DEPLOY_DIR/index.html
    sed -i 's/style.css/style.min.css/g' $DEPLOY_DIR/index.html
    
    # Remove original files
    rm $DEPLOY_DIR/script.js $DEPLOY_DIR/style.css
    
    echo "✅ Files minified successfully"
else
    echo "ℹ️ Skipping minification (install uglify-js and clean-css-cli for minification)"
fi

echo "✅ Deployment files ready in $DEPLOY_DIR/"
echo ""
echo "📋 Next steps:"
echo "1. Upload the contents of $DEPLOY_DIR/ to your web server"
echo "2. Or serve locally: cd $DEPLOY_DIR && python3 -m http.server 8000"
echo "3. Or use with GitHub Pages: Enable Pages in repository settings"
echo ""
echo "🌐 Files included:"
ls -la $DEPLOY_DIR/