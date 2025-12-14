# Abhay Videography - Full Stack Application

[![CI](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/ci.yml)
[![Docker Build](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/docker-build.yml/badge.svg)](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/docker-build.yml)
[![Deploy to AWS](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/deploy-aws.yml/badge.svg)](https://github.com/YOUR_USERNAME/abhayvideography/actions/workflows/deploy-aws.yml)

A modern full-stack web application with Vite + Tailwind CSS (frontend) and Node.js/Express (backend), featuring automated CI/CD deployment to AWS.

## 📁 Project Structure

```
abhayvideography/
├── frontend/          # Vite + Tailwind CSS app
│   ├── src/
│   │   ├── main.js   # Main app with menubar navigation
│   │   ├── style.css # Tailwind styles
│   │   └── index.html
│   └── package.json
├── backend/          # Node.js/Express server
│   ├── server.js     # API server
│   └── package.json
└── README.md
```

## 🚀 How to Run

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

The backend will run at `http://localhost:3000`

**Available Endpoints:**
- `GET /` - Welcome message with available endpoints
- `GET /api/data` - Returns sample JSON data
- `GET /api/health` - Health check endpoint

### Terminal 2: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

The frontend will run at `http://localhost:5173`

## 📱 Frontend Features

### Menubar Navigation
Two main sections accessible from the top navigation bar:

#### 1. Frontend Tab
- Simple form with text input
- Submit button to display entered text
- Shows status indicator that frontend is working

#### 2. Backend Tab
- "Fetch API Data" button
- Calls the backend API at `/api/data`
- Displays JSON response in a formatted code block
- Shows loading state while fetching
- Displays error messages if API call fails

## 🔌 API Integration

The frontend fetches data from the backend using the Fetch API:

```javascript
fetch('http://localhost:3000/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Sample Response:**
```json
{
  "status": "success",
  "message": "Backend is working!",
  "timestamp": "2025-12-14T10:30:00.000Z",
  "data": [
    { "id": 1, "name": "Item 1", "description": "This is the first item" },
    { "id": 2, "name": "Item 2", "description": "This is the second item" },
    { "id": 3, "name": "Item 3", "description": "This is the third item" }
  ],
  "serverInfo": {
    "version": "1.0.0",
    "environment": "development",
    "apiEndpoint": "/api/data"
  }
}
```

## 🛠️ Technologies Used

- **Frontend:** Vite, Tailwind CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js, CORS
- **No external databases** - Uses in-memory data

## 🐳 Docker Deployment

### Available Docker Images
- Backend: `abhaypratapsingh7704866570/abhayvideography-backend:latest`
- Frontend: `abhaypratapsingh7704866570/abhayvideography-frontend:latest`

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 AWS Deployment

Deploy to AWS EC2 with automated script:

```bash
chmod +x deploy-aws.sh
./deploy-aws.sh
```

For detailed AWS deployment instructions, see [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)

## 🔄 CI/CD with GitHub Actions

Automated workflows run on every push to `main`:
1. ✅ Run tests and linting
2. 🐳 Build and push Docker images
3. 🚀 Deploy to AWS EC2

**Setup Instructions:** See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)

### Required GitHub Secrets:
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password/token
- `EC2_HOST` - AWS EC2 public IP
- `EC2_USERNAME` - SSH username (ubuntu)
- `EC2_SSH_KEY` - Private key (.pem) content

## 🏗️ Architecture

```
Internet → Nginx Reverse Proxy → Backend API (/api/*)
                               → Frontend (/)
```

## ✅ Testing Checklist

1. Start both servers
2. Open frontend at `http://localhost:5173`
3. Test **Frontend Tab:**
   - Enter text in input field
   - Click Submit
   - Verify text appears in output
4. Test **Backend Tab:**
   - Click "Fetch API Data"
   - Verify JSON data displays
   - Check all fields are present
5. Verify no errors in browser console or terminal

## 📚 Documentation

- [AWS Deployment Guide](AWS_DEPLOYMENT.md)
- [GitHub Actions CI/CD Setup](GITHUB_ACTIONS_SETUP.md)

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, CORS  
**Frontend:** Vite, Tailwind CSS 4, Vanilla JS  
**DevOps:** Docker, Docker Compose, GitHub Actions, AWS EC2, Nginx

## 👤 Author

Abhay Pratap Singh  
Docker Hub: [@abhaypratapsingh7704866570](https://hub.docker.com/u/abhaypratapsingh7704866570)

---

**Made with ❤️ by Abhay Pratap Singh**

Enjoy building! 🎉
# abhayvideography
