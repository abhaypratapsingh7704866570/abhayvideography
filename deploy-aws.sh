#!/bin/bash

# AWS EC2 Deployment Script for Abhay Videography App
# Run this script on your AWS EC2 instance

set -e

echo "=========================================="
echo "Abhay Videography - AWS Deployment"
echo "=========================================="

# Update system
echo "📦 Updating system packages..."
sudo apt-get update -y

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    sudo systemctl start docker
    sudo systemctl enable docker
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker is already installed"
fi

# Install Docker Compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose is already installed"
fi

# Add current user to docker group
echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

# Create application directory
APP_DIR="/home/$USER/abhayvideography"
echo "📁 Creating application directory: $APP_DIR"
mkdir -p $APP_DIR
cd $APP_DIR

# Download docker-compose file
echo "⬇️ Downloading docker-compose configuration..."
cat > docker-compose.yml <<'EOF'
version: '3.8'

services:
  backend:
    image: abhaypratapsingh7704866570/abhayvideography-backend:latest
    container_name: abhayvideography-backend
    environment:
      - NODE_ENV=production
    networks:
      - app-network
    restart: unless-stopped
    expose:
      - "3000"

  frontend:
    image: abhaypratapsingh7704866570/abhayvideography-frontend:latest
    container_name: abhayvideography-frontend
    networks:
      - app-network
    restart: unless-stopped
    expose:
      - "80"

  nginx:
    image: nginx:alpine
    container_name: abhayvideography-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - frontend
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge
EOF

# Download nginx configuration
echo "⬇️ Downloading nginx configuration..."
cat > nginx.conf <<'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    upstream backend {
        server backend:3000;
    }

    upstream frontend {
        server frontend:80;
    }

    server {
        listen 80;
        server_name _;

        location /api {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
EOF

# Pull Docker images
echo "🐳 Pulling Docker images from Docker Hub..."
docker-compose pull

# Stop and remove existing containers
echo "🛑 Stopping existing containers (if any)..."
docker-compose down 2>/dev/null || true

# Start the application
echo "🚀 Starting the application..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check container status
echo ""
echo "=========================================="
echo "📊 Container Status:"
echo "=========================================="
docker-compose ps

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your application is now running on AWS!"
echo ""
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Backend API: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/api"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop app: docker-compose down"
echo "  - Restart: docker-compose restart"
echo "  - Update: docker-compose pull && docker-compose up -d"
echo ""
