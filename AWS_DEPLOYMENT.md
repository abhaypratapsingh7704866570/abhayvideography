# AWS Deployment Guide - Abhay Videography

This guide will help you deploy your application to AWS EC2 with Nginx as a reverse proxy.

## Prerequisites

1. **AWS Account** - Sign up at https://aws.amazon.com
2. **Docker Hub Images** - Already pushed ✅
   - Backend: `abhaypratapsingh7704866570/abhayvideography-backend:latest`
   - Frontend: `abhaypratapsingh7704866570/abhayvideography-frontend:latest`

## Step 1: Launch EC2 Instance

1. **Go to AWS Console** → EC2 Dashboard → Launch Instance

2. **Configure Instance:**
   - **Name:** abhay-videography-server
   - **OS:** Ubuntu Server 22.04 LTS (Free Tier eligible)
   - **Instance Type:** t2.micro (1 vCPU, 1 GB RAM) or t2.small (2 vCPU, 2 GB RAM)
   - **Key Pair:** Create new or select existing (download .pem file)
   - **Network Settings:**
     - ✅ Allow HTTP traffic (port 80)
     - ✅ Allow HTTPS traffic (port 443)
     - ✅ Allow SSH traffic (port 22)
   - **Storage:** 8 GB minimum (or 20 GB recommended)

3. **Click "Launch Instance"**

## Step 2: Connect to EC2 Instance

### Option A: Using SSH (Terminal/Mac/Linux)

```bash
# Make key file private
chmod 400 your-key.pem

# Connect to EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

### Option B: Using EC2 Instance Connect (Browser)

1. Go to EC2 Dashboard → Instances
2. Select your instance
3. Click "Connect" → "EC2 Instance Connect" → "Connect"

## Step 3: Deploy Application

Once connected to your EC2 instance, run:

```bash
# Download the deployment script
curl -O https://raw.githubusercontent.com/yourusername/abhayvideography/main/deploy-aws.sh

# Or create it manually (if not in GitHub)
nano deploy-aws.sh
# Paste the contents from deploy-aws.sh file, then Ctrl+X, Y, Enter

# Make it executable
chmod +x deploy-aws.sh

# Run the deployment
./deploy-aws.sh
```

## Step 4: Verify Deployment

After deployment completes, access your application:

- **Frontend:** `http://YOUR_EC2_PUBLIC_IP`
- **Backend API:** `http://YOUR_EC2_PUBLIC_IP/api/data`

To find your public IP:
```bash
curl http://169.254.169.254/latest/meta-data/public-ipv4
```

Or check in AWS Console → EC2 → Instances → Your Instance → Public IPv4 address

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Update system
sudo apt-get update -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir ~/abhayvideography
cd ~/abhayvideography

# Create docker-compose.yml (copy from docker-compose.prod.yml)
# Create nginx.conf (copy from nginx/nginx.conf)

# Start the application
docker-compose up -d
```

## Application Management

### View Logs
```bash
cd ~/abhayvideography
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

### Restart Application
```bash
docker-compose restart
```

### Update to Latest Version
```bash
docker-compose pull
docker-compose up -d
```

### Check Container Status
```bash
docker-compose ps
docker ps
```

## Architecture

```
Internet
    ↓
AWS EC2 (Port 80)
    ↓
Nginx Reverse Proxy
    ├─→ /api/* → Backend Container (Port 3000)
    └─→ /*     → Frontend Container (Port 80)
```

## Setting Up Domain Name (Optional)

1. **Register a domain** (e.g., GoDaddy, Namecheap)
2. **Add A Record:**
   - Host: @ or your domain
   - Value: Your EC2 Public IP
   - TTL: 600
3. **Update nginx.conf:**
   - Change `server_name _;` to `server_name yourdomain.com www.yourdomain.com;`
4. **Restart nginx:**
   ```bash
   docker-compose restart nginx
   ```

## SSL/HTTPS Setup (Optional but Recommended)

Install Let's Encrypt SSL certificate:

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

## Troubleshooting

### Check if containers are running
```bash
docker ps
```

### View logs for specific service
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### Restart a specific service
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart nginx
```

### Pull latest images
```bash
docker-compose pull
docker-compose up -d
```

### Free up space
```bash
docker system prune -a
```

## Security Best Practices

1. **Update Security Group:**
   - Only allow SSH from your IP
   - Keep ports 80 and 443 open to all

2. **Update System Regularly:**
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```

3. **Enable Firewall:**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

4. **Use Strong Passwords** and keep your .pem key file secure

## Cost Estimation

- **EC2 t2.micro:** ~$8-10/month (Free Tier: 750 hours/month for 12 months)
- **Bandwidth:** First 1 GB out/month free, then $0.09/GB
- **Storage:** $0.10 per GB-month

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`
- Contact AWS Support for infrastructure issues
