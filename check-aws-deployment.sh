#!/bin/bash

# AWS EC2 Deployment Check and Fix Script

echo "=========================================="
echo "AWS EC2 Deployment Diagnostics"
echo "=========================================="
echo ""

# Check if EC2 details are provided
if [ -z "$1" ]; then
    echo "Usage: ./check-aws-deployment.sh <EC2_IP_ADDRESS> <path-to-key.pem>"
    echo ""
    echo "Example: ./check-aws-deployment.sh 54.123.45.67 ~/Desktop/abhayvideography/abhayvideography.pem"
    exit 1
fi

EC2_HOST="$1"
KEY_FILE="${2:-~/Desktop/abhayvideography/abhayvideography.pem}"

echo "🔍 Checking EC2: $EC2_HOST"
echo "🔑 Using key: $KEY_FILE"
echo ""

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

# Set correct permissions
chmod 400 "$KEY_FILE"

echo "1. Testing SSH Connection..."
if ssh -i "$KEY_FILE" -o ConnectTimeout=10 -o StrictHostKeyChecking=no ubuntu@$EC2_HOST "echo '✅ SSH connection successful'"; then
    echo ""
else
    echo "❌ Cannot connect to EC2. Check:"
    echo "   - Security Group allows SSH (port 22)"
    echo "   - EC2 instance is running"
    echo "   - Correct IP address"
    exit 1
fi

echo "2. Checking Docker installation..."
ssh -i "$KEY_FILE" ubuntu@$EC2_HOST << 'ENDSSH'
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed: $(docker --version)"
else
    echo "❌ Docker is NOT installed"
fi

if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose is installed: $(docker-compose --version)"
else
    echo "❌ Docker Compose is NOT installed"
fi
ENDSSH

echo ""
echo "3. Checking running containers..."
ssh -i "$KEY_FILE" ubuntu@$EC2_HOST << 'ENDSSH'
CONTAINER_COUNT=$(docker ps -q 2>/dev/null | wc -l)
if [ $CONTAINER_COUNT -gt 0 ]; then
    echo "✅ $CONTAINER_COUNT container(s) running:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo "❌ No containers are running"
    echo ""
    echo "Checking if docker-compose.yml exists..."
    if [ -f ~/abhayvideography/docker-compose.yml ]; then
        echo "✅ docker-compose.yml found"
        cd ~/abhayvideography
        echo ""
        echo "📋 Recent container logs:"
        docker-compose logs --tail=30 2>&1 || echo "No logs available"
    else
        echo "❌ docker-compose.yml NOT found in ~/abhayvideography/"
    fi
fi
ENDSSH

echo ""
echo "4. Testing website availability..."
if curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST | grep -q "200"; then
    echo "✅ Website is accessible at http://$EC2_HOST"
else
    echo "❌ Website is NOT accessible"
    echo ""
    echo "Testing if port 80 is open..."
    if nc -zv -w 5 $EC2_HOST 80 2>&1 | grep -q "succeeded"; then
        echo "✅ Port 80 is open"
    else
        echo "❌ Port 80 is closed. Check Security Group settings!"
    fi
fi

echo ""
echo "5. Testing backend API..."
if curl -s http://$EC2_HOST/api/health | grep -q "healthy"; then
    echo "✅ Backend API is working"
else
    echo "❌ Backend API is not responding"
fi

echo ""
echo "=========================================="
echo "Quick Fix Commands:"
echo "=========================================="
echo ""
echo "To manually deploy, SSH into your EC2 and run:"
echo ""
echo "ssh -i $KEY_FILE ubuntu@$EC2_HOST"
echo ""
echo "Then run these commands on EC2:"
echo ""
cat << 'EOF'
# Install Docker if needed
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir -p ~/abhayvideography
cd ~/abhayvideography

# Pull and start containers
docker pull abhaypratapsingh7704866570/abhayvideography-backend:latest
docker pull abhaypratapsingh7704866570/abhayvideography-frontend:latest

# Use the deploy-aws.sh script or manually start containers
EOF

echo ""
echo "=========================================="
echo "Or trigger GitHub Actions deployment:"
echo "=========================================="
echo "Go to: https://github.com/abhaypratapsingh7704866570/abhayvideography/actions"
echo "Click 'Deploy to AWS EC2' → 'Run workflow'"
echo ""
