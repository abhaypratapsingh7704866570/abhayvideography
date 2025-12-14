# Troubleshooting GitHub Actions Deployment

## ❌ Current Error

```
ssh.ParsePrivateKey: ssh: no key found
ssh: handshake failed: ssh: unable to authenticate
```

## 🔧 Fix: Configure GitHub Secrets Correctly

### Step 1: Get Your SSH Key Content

**Option A: Using the helper script**
```bash
chmod +x format-ssh-key.sh
./format-ssh-key.sh path/to/your-key.pem
```

**Option B: Manual method**
```bash
cat path/to/your-key.pem
```

Copy the ENTIRE output including:
- `-----BEGIN RSA PRIVATE KEY-----`
- All the key content
- `-----END RSA PRIVATE KEY-----`

### Step 2: Add Secrets to GitHub

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

#### Required Secrets:

| Secret Name | How to Get Value | Example |
|------------|------------------|---------|
| `DOCKER_USERNAME` | Your Docker Hub username | `abhaypratapsingh7704866570` |
| `DOCKER_PASSWORD` | Docker Hub → Account Settings → Security → New Access Token | `dckr_pat_xxxxx...` |
| `EC2_HOST` | AWS EC2 → Instances → Your Instance → Public IPv4 address | `54.123.45.67` |
| `EC2_USERNAME` | Usually `ubuntu` for Ubuntu or `ec2-user` for Amazon Linux | `ubuntu` |
| `EC2_SSH_KEY` | Full content of your .pem file (see Step 1) | `-----BEGIN RSA PRIVATE KEY-----`<br>`MIIEpAIB...`<br>`-----END RSA PRIVATE KEY-----` |

### Step 3: Verify EC2_SSH_KEY Format

Your `EC2_SSH_KEY` secret should look like this:

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAy8Dbv8prpJ/0kKhlGeJfvgxIJO...
...multiple lines of encoded key...
...
8h2xUxXRdTrV6N2v3wZqHJxRvFKAZKAZQZQvWW3d3d
-----END RSA PRIVATE KEY-----
```

**Important:**
- ✅ Include the BEGIN and END lines
- ✅ Include ALL lines of the key
- ✅ No extra spaces or newlines at start/end
- ❌ Don't add quotes around it
- ❌ Don't remove any newlines

### Step 4: Get Your Docker Hub Access Token

1. Go to [Docker Hub](https://hub.docker.com/)
2. Click your avatar → **Account Settings**
3. Go to **Security** tab
4. Click **New Access Token**
5. Give it a name: `github-actions`
6. Permissions: **Read & Write**
7. Generate and **copy the token immediately** (you won't see it again!)
8. Use this token as `DOCKER_PASSWORD` secret

### Step 5: Test SSH Connection Manually

Before running the GitHub Action, test if you can SSH into your EC2:

```bash
# Replace with your actual key and IP
ssh -i path/to/your-key.pem ubuntu@YOUR_EC2_IP
```

If this works, the GitHub Action should work too.

### Step 6: Re-run GitHub Actions Workflow

1. Go to: **GitHub Repository → Actions**
2. Find the failed workflow
3. Click **Re-run jobs** → **Re-run all jobs**

## 🔍 Common Issues

### Issue 1: "Permission denied (publickey)"
**Solution:** Make sure EC2 Security Group allows SSH (port 22) from anywhere or GitHub's IP ranges

### Issue 2: "Host key verification failed"
**Solution:** The workflow handles this automatically, but if issues persist, add this to deploy workflow:

```yaml
- name: Add SSH known hosts
  run: |
    mkdir -p ~/.ssh
    ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts
```

### Issue 3: "docker-compose: command not found" on EC2
**Solution:** SSH into EC2 and run the deploy script first:

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
chmod +x deploy-aws.sh
./deploy-aws.sh
```

### Issue 4: Key format is OpenSSH instead of RSA
If your key starts with `-----BEGIN OPENSSH PRIVATE KEY-----`, convert it:

```bash
# Convert OpenSSH to RSA format
ssh-keygen -p -f your-key.pem -m pem -P "" -N ""
```

## ✅ Verification Checklist

Before running GitHub Actions:

- [ ] Can SSH into EC2 manually
- [ ] Docker and Docker Compose installed on EC2
- [ ] docker-compose.yml exists in ~/abhayvideography on EC2
- [ ] All 5 secrets added to GitHub
- [ ] EC2_SSH_KEY includes BEGIN/END lines
- [ ] DOCKER_PASSWORD is an access token (not your password)
- [ ] EC2 Security Group allows SSH (port 22)
- [ ] EC2 Security Group allows HTTP (port 80)

## 📝 Quick Setup Commands for EC2

SSH into your EC2 and run:

```bash
# Create app directory
mkdir -p ~/abhayvideography
cd ~/abhayvideography

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
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

# Create nginx.conf
cat > nginx.conf << 'EOF'
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

# Pull and start containers
docker-compose pull
docker-compose up -d
docker-compose ps
```

## 🎯 After Fixing

Once all secrets are properly configured:

1. Commit and push any changes
2. GitHub Actions will automatically trigger
3. Your app will deploy to EC2
4. Access at: `http://YOUR_EC2_IP`

Need help? Check the Actions tab for detailed error logs.
