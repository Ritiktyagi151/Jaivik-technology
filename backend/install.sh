#!/bin/bash

# Backend Installation Script
echo "🚀 Starting Backend Installation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version is compatible: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads
mkdir -p logs
mkdir -p dist

echo "✅ Directories created"

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build TypeScript"
    exit 1
fi

echo "✅ TypeScript built successfully"

echo ""
echo "🎉 Backend installation completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Run 'npm start' to start the production server"
echo ""
echo "📚 Check the README.md and COMPLETE_API_DOCUMENTATION.md for more information"
