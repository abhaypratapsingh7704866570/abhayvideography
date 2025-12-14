# GitHub Actions CI/CD Setup Guide

This guide explains how to set up automated CI/CD for your Abhay Videography application using GitHub Actions.

## 📋 Overview

Your repository now includes three automated workflows:

1. **CI (Continuous Integration)** - `.github/workflows/ci.yml`
   - Runs on every push and pull request
   - Tests backend and frontend
   - Validates code syntax and builds

2. **Docker Build & Push** - `.github/workflows/docker-build.yml`
   - Builds Docker images for backend, frontend, and nginx
   - Pushes images to Docker Hub
   - Runs on pushes to main/master branch

3. **AWS Deployment** - `.github/workflows/deploy-aws.yml`
   - Automatically deploys to AWS EC2 after successful build
   - Can also be triggered manually

## 🔐 Required GitHub Secrets

You need to configure these secrets in your GitHub repository:

### Navigate to: Repository → Settings → Secrets and variables → Actions → New repository secret

### Docker Hub Secrets:
1. **`DOCKER_USERNAME`**
   - Value: `abhaypratapsingh7704866570`
   
2. **`DOCKER_PASSWORD`**
   - Value: Your Docker Hub password or access token
   - How to get: Docker Hub → Account Settings → Security → New Access Token

### AWS EC2 Secrets:
3. **`EC2_HOST`**
   - Value: Your EC2 public IP address or domain
   - Example: `54.123.45.67` or `app.yourdomain.com`
   
4. **`EC2_USERNAME`**
   - Value: `ubuntu` (for Ubuntu) or `ec2-user` (for Amazon Linux)
   
5. **`EC2_SSH_KEY`**
   - Value: Your EC2 private key (.pem file content)
   - How to get: Copy entire content of your .pem file
   ```bash
   cat your-key.pem
   ```
   - Paste the entire content including:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   [key content]
   -----END RSA PRIVATE KEY-----
   ```

## 📝 Step-by-Step Setup

### Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed above

### Step 2: Initialize Git Repository (if not already done)

```bash
cd /Users/thakurabhay/Desktop/abhayvideography

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Add Docker and CI/CD configuration"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `abhayvideography`
3. Don't initialize with README (you already have files)

### Step 4: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/abhayvideography.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 5: Prepare EC2 for Deployment

SSH into your EC2 instance and ensure docker-compose.yml exists:

```bash
ssh -i "your-key.pem" ubuntu@YOUR_EC2_IP

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

# Create nginx.conf (copy from your nginx/nginx.conf file)
```

## 🚀 How CI/CD Works

### Workflow Sequence:

```
Push to GitHub (main/master)
    ↓
1. CI Tests Run
   - Backend tests
   - Frontend build
   - Syntax validation
    ↓
2. Docker Build & Push
   - Build backend image
   - Build frontend image
   - Build nginx image
   - Push to Docker Hub
    ↓
3. Deploy to AWS
   - SSH into EC2
   - Pull latest images
   - Restart containers
   - Verify deployment
```

### Automatic Deployment:
- Every push to `main` or `master` branch triggers the full pipeline
- Docker images are automatically built and pushed
- AWS deployment runs after successful Docker build

### Manual Deployment:
- Go to: Actions → Deploy to AWS EC2 → Run workflow
- Select branch and click "Run workflow"

## 🎯 Testing the CI/CD Pipeline

1. **Make a change to your code:**
   ```bash
   cd /Users/thakurabhay/Desktop/abhayvideography
   echo "// Updated" >> backend/server.js
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

3. **Watch the workflows:**
   - Go to GitHub → Your Repository → Actions
   - You'll see workflows running in real-time
   - Click on any workflow to see detailed logs

## 📊 Monitoring Deployments

### View Workflow Status:
- Go to: Repository → Actions
- See all workflow runs with status (✅ success, ❌ failed, 🟡 in progress)

### Check Logs:
- Click on any workflow run
- Click on job name (e.g., "Build Backend")
- View detailed logs for each step

### Email Notifications:
- GitHub automatically emails you on workflow failures
- Configure in: Settings → Notifications

## 🔧 Troubleshooting

### Build Failures:

**Docker build fails:**
- Check Dockerfile syntax
- Ensure all dependencies are listed in package.json
- View logs in Actions tab

**Push to Docker Hub fails:**
- Verify DOCKER_USERNAME and DOCKER_PASSWORD secrets
- Check Docker Hub account is active

### Deployment Failures:

**SSH connection fails:**
- Verify EC2_HOST is correct (public IP)
- Check EC2_USERNAME (usually "ubuntu")
- Ensure EC2_SSH_KEY contains complete .pem file content
- Verify EC2 security group allows SSH (port 22)

**Container startup fails:**
- SSH into EC2 and check: `docker-compose logs`
- Ensure docker-compose.yml exists in ~/abhayvideography
- Check if ports 80/3000 are available

### Manual Deployment:
If automated deployment fails, you can deploy manually:

```bash
ssh -i "your-key.pem" ubuntu@YOUR_EC2_IP
cd ~/abhayvideography
docker-compose pull
docker-compose down
docker-compose up -d
```

## 🔄 Workflow Customization

### Change Branch for Deployment:
Edit `.github/workflows/docker-build.yml` and `.github/workflows/deploy-aws.yml`:
```yaml
on:
  push:
    branches: [ production ]  # Change this
```

### Add Environment Variables:
Edit `.github/workflows/deploy-aws.yml`:
```yaml
environment:
  - MY_VAR=${{ secrets.MY_VAR }}
```

### Skip Deployment:
Add `[skip ci]` to commit message:
```bash
git commit -m "Update README [skip ci]"
```

## 📈 Best Practices

1. **Always test locally first:**
   ```bash
   docker-compose build
   docker-compose up
   ```

2. **Use feature branches:**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git push origin feature/new-feature
   # Create Pull Request
   ```

3. **Review Actions before merging:**
   - CI runs on all PRs
   - Only merge if tests pass

4. **Monitor deployments:**
   - Check Actions tab after each push
   - Verify app is working: `http://YOUR_EC2_IP`

5. **Keep secrets secure:**
   - Never commit .pem files
   - Never expose secrets in logs
   - Rotate keys regularly

## 🔒 Security Notes

- GitHub Secrets are encrypted and never exposed in logs
- SSH keys should be kept secure and rotated periodically
- Use specific Docker Hub access tokens instead of passwords
- Restrict EC2 security groups to only necessary ports

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)
- [AWS EC2 Key Pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

## 🎉 Success Metrics

After setup, you should see:
- ✅ All three workflows appear in Actions tab
- ✅ Workflows run automatically on push
- ✅ Docker images update in Docker Hub
- ✅ Application deploys to AWS automatically
- ✅ Changes are live within 5-10 minutes of push

---

**Need Help?** Check the Actions tab for detailed logs, or run workflows manually to debug issues.
