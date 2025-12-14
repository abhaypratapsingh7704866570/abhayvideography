#!/bin/bash

# Script to help format your SSH key for GitHub Secrets

echo "=========================================="
echo "GitHub Secrets SSH Key Formatter"
echo "=========================================="
echo ""
echo "This script will help you get your SSH key in the correct format for GitHub Secrets."
echo ""

# Check if .pem file is provided
if [ -z "$1" ]; then
    echo "Usage: ./format-ssh-key.sh path/to/your-key.pem"
    echo ""
    echo "Example: ./format-ssh-key.sh ~/Downloads/my-ec2-key.pem"
    exit 1
fi

KEY_FILE="$1"

# Check if file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Error: File not found: $KEY_FILE"
    exit 1
fi

echo "📄 Reading SSH key from: $KEY_FILE"
echo ""
echo "=========================================="
echo "COPY THIS ENTIRE CONTENT FOR EC2_SSH_KEY:"
echo "=========================================="
echo ""

# Display the key content
cat "$KEY_FILE"

echo ""
echo ""
echo "=========================================="
echo "✅ Instructions:"
echo "=========================================="
echo ""
echo "1. Copy EVERYTHING above (including BEGIN and END lines)"
echo "2. Go to GitHub: Repository → Settings → Secrets and variables → Actions"
echo "3. Click 'New repository secret'"
echo "4. Name: EC2_SSH_KEY"
echo "5. Value: Paste the entire content you just copied"
echo "6. Click 'Add secret'"
echo ""
echo "⚠️  IMPORTANT: Make sure to include:"
echo "   - The '-----BEGIN RSA PRIVATE KEY-----' line"
echo "   - All the key content"
echo "   - The '-----END RSA PRIVATE KEY-----' line"
echo ""
