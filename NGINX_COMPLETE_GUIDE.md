# 🚀 Complete Nginx Guide - From Zero to Master

> **Your simple, no-effort guide to understanding Nginx**

---

## 📚 Table of Contents

1. [What is Nginx?](#what-is-nginx)
2. [Why Use Nginx?](#why-use-nginx)
3. [How Nginx Works](#how-nginx-works)
4. [Your Project's Nginx Files Explained](#your-projects-nginx-files-explained)
5. [Main Nginx Config - Line by Line](#1-main-reverse-proxy---nginxnginxconf)
6. [Frontend Nginx Config - Line by Line](#2-frontend-nginx---frontendnginxconf)
7. [Essential Nginx Concepts](#essential-nginx-concepts)
8. [Common Nginx Directives](#common-nginx-directives)
9. [Nginx Location Block Patterns](#nginx-location-block-patterns)
10. [Proxy Configuration Explained](#proxy-configuration-explained)
11. [SSL/HTTPS Configuration](#sslhttps-configuration)
12. [Performance Optimization](#performance-optimization)
13. [Common Use Cases](#common-use-cases)
14. [Debugging & Troubleshooting](#debugging--troubleshooting)
15. [Useful Commands](#useful-commands)

---

## What is Nginx?

```
Think of Nginx as a TRAFFIC POLICE OFFICER for your website.

When someone visits your website:
   
   User → Nginx → Your Application
   
Nginx decides WHERE to send each request.
```

### Simple Definition:
**Nginx** (pronounced "Engine-X") is a **web server** that can:

| Role | What It Does | Example |
|------|--------------|---------|
| **Web Server** | Serves static files (HTML, CSS, JS, images) | Serving your frontend |
| **Reverse Proxy** | Forwards requests to other servers | Sending `/api` to backend |
| **Load Balancer** | Distributes traffic across multiple servers | 3 backend servers |
| **SSL Terminator** | Handles HTTPS encryption | Converting HTTPS → HTTP |

---

## Why Use Nginx?

### ⚡ Speed
- Handles **10,000+ connections** simultaneously
- Uses very little memory
- Serves static files extremely fast

### 🔒 Security
- Hides your backend servers from the internet
- Handles SSL/HTTPS
- Can block bad requests

### 🎯 Flexibility
- Route different URLs to different services
- One entry point for multiple applications
- Easy to configure

---

## How Nginx Works

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
│                           │                                  │
│                           ▼                                  │
│                    ┌─────────────┐                           │
│                    │   NGINX     │  ← Single Entry Point     │
│                    │  Port 80    │                           │
│                    └─────────────┘                           │
│                           │                                  │
│          ┌────────────────┼────────────────┐                 │
│          ▼                ▼                ▼                 │
│    ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│    │ Frontend │    │ Backend  │    │  Other   │             │
│    │ :80      │    │ :3000    │    │ Service  │             │
│    └──────────┘    └──────────┘    └──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### The Flow:
1. **User** types `yourwebsite.com` in browser
2. **Nginx** receives the request on port 80
3. **Nginx** looks at the URL path:
   - `/api/*` → Send to Backend (port 3000)
   - `/*` → Send to Frontend (port 80)
4. **Backend/Frontend** processes and returns response
5. **Nginx** sends response back to user

---

## Your Project's Nginx Files Explained

You have **2 Nginx configuration files**:

```
abhayvideography/
├── nginx/
│   └── nginx.conf          ← MAIN: Reverse Proxy (Traffic Cop)
│
└── frontend/
    └── nginx.conf          ← FRONTEND: Static File Server
```

### Why Two Files?

| File | Container | Purpose |
|------|-----------|---------|
| `nginx/nginx.conf` | nginx container | Routes ALL traffic to correct service |
| `frontend/nginx.conf` | frontend container | Serves static files + SPA routing |

---

# 1. Main Reverse Proxy - `nginx/nginx.conf`

This is your **main traffic controller**. Let's break it down line by line:

```nginx
# ============================================
# SECTION 1: GLOBAL SETTINGS
# ============================================

user nginx;
```
**📝 Explanation:** 
- Tells Nginx which Linux user to run as
- `nginx` is a special user with limited permissions (security!)
- Think: "Run as the 'nginx' user, not root"

---

```nginx
worker_processes auto;
```
**📝 Explanation:**
- How many worker processes to create
- `auto` = Same as number of CPU cores
- More workers = Handle more requests simultaneously
- Think: "Hire as many workers as I have CPUs"

```
Example:
- 1 CPU  → 1 worker process
- 4 CPUs → 4 worker processes
- 8 CPUs → 8 worker processes
```

---

```nginx
error_log /var/log/nginx/error.log warn;
```
**📝 Explanation:**
- Where to save error messages
- `warn` = Log warnings and errors (not debug messages)
- Levels: `debug` → `info` → `notice` → `warn` → `error` → `crit`
- Think: "Write problems to this file"

---

```nginx
pid /var/run/nginx.pid;
```
**📝 Explanation:**
- Where to store Nginx's process ID
- Used to stop/restart Nginx
- Think: "Remember your employee ID number here"

---

```nginx
# ============================================
# SECTION 2: EVENTS (Connection Handling)
# ============================================

events {
    worker_connections 1024;
}
```
**📝 Explanation:**
- How many connections EACH worker can handle
- Total capacity = `worker_processes × worker_connections`
- Example: 4 workers × 1024 = 4096 simultaneous connections
- Think: "Each worker can juggle 1024 balls"

```
Calculation:
┌──────────────────────────────────────────┐
│  4 CPU cores (worker_processes auto)     │
│  × 1024 connections each                 │
│  ────────────────────────────────────    │
│  = 4,096 total simultaneous connections  │
└──────────────────────────────────────────┘
```

---

```nginx
# ============================================
# SECTION 3: HTTP (Main Configuration)
# ============================================

http {
    include /etc/nginx/mime.types;
```
**📝 Explanation:**
- `http { }` = All HTTP-related settings go inside here
- `include` = Load another config file
- `mime.types` = Tells browser what type each file is

```
MIME Types Examples:
.html → text/html       (Browser renders as webpage)
.css  → text/css        (Browser applies as styles)
.js   → application/javascript
.png  → image/png
.json → application/json
```

---

```nginx
    default_type application/octet-stream;
```
**📝 Explanation:**
- If file type is unknown, use this default
- `application/octet-stream` = "generic binary file, just download it"
- Think: "If I don't know what it is, treat it as a download"

---

```nginx
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
```
**📝 Explanation:**
- Defines HOW to format log entries
- Uses variables (start with `$`)

```
Variable Breakdown:
$remote_addr          → User's IP address (192.168.1.1)
$remote_user          → Username if authenticated (-)
$time_local           → When request happened (19/Dec/2025:10:30:00)
$request              → What they requested (GET /api/data HTTP/1.1)
$status               → Response code (200, 404, 500)
$body_bytes_sent      → Response size (1234)
$http_referer         → Previous page (https://google.com)
$http_user_agent      → Browser info (Chrome/120.0)
$http_x_forwarded_for → Original IP if behind proxy

Example Log Entry:
192.168.1.1 - - [19/Dec/2025:10:30:00] "GET /api/data HTTP/1.1" 200 1234 "https://google.com" "Chrome/120.0" "-"
```

---

```nginx
    access_log /var/log/nginx/access.log main;
```
**📝 Explanation:**
- Where to save access logs
- Uses the `main` format we defined above
- Every request gets logged here
- Think: "Keep a diary of all visitors"

---

```nginx
    sendfile on;
```
**📝 Explanation:**
- Use efficient file sending (kernel-level)
- Much faster than reading file → sending to network
- Think: "Use the fast file delivery method"

```
Without sendfile:
File → Read to Memory → Copy to Network Buffer → Send

With sendfile:
File → Directly to Network (skips memory copy!)
```

---

```nginx
    tcp_nopush on;
```
**📝 Explanation:**
- Send complete packets, not small pieces
- Works with `sendfile`
- More efficient network usage
- Think: "Wait until you have a full truckload before shipping"

---

```nginx
    tcp_nodelay on;
```
**📝 Explanation:**
- Don't delay small packets
- Good for real-time applications
- Think: "Send urgent messages immediately"

---

```nginx
    keepalive_timeout 65;
```
**📝 Explanation:**
- Keep connection open for 65 seconds
- Reuse connection for multiple requests
- Saves time (no need to reconnect each time)
- Think: "Stay on the phone for 65 seconds in case they have more questions"

```
Without keepalive:
Request 1: Connect → Request → Response → Disconnect
Request 2: Connect → Request → Response → Disconnect
Request 3: Connect → Request → Response → Disconnect

With keepalive:
Connect → Request 1 → Response 1 → Request 2 → Response 2 → Request 3 → Response 3 → Disconnect
```

---

```nginx
    types_hash_max_size 2048;
```
**📝 Explanation:**
- Size of hash table for MIME types
- Larger = faster lookups for many file types
- Technical optimization, rarely changed

---

```nginx
    client_max_body_size 20M;
```
**📝 Explanation:**
- Maximum upload file size: 20 megabytes
- Larger files get rejected with `413 Request Entity Too Large`
- Think: "Don't accept packages bigger than 20MB"

```
Common Values:
1M   → Small forms only
10M  → Profile pictures
20M  → Your setting
100M → Large file uploads
0    → Unlimited (dangerous!)
```

---

```nginx
    # ============================================
    # GZIP COMPRESSION
    # ============================================
    
    gzip on;
```
**📝 Explanation:**
- Enable compression for responses
- Makes files smaller = faster downloads
- Think: "Zip files before sending"

---

```nginx
    gzip_vary on;
```
**📝 Explanation:**
- Tell browsers "I might send compressed or uncompressed"
- Helps with caching
- Always use with `gzip on`

---

```nginx
    gzip_min_length 1024;
```
**📝 Explanation:**
- Only compress files larger than 1024 bytes (1KB)
- Small files aren't worth compressing
- Think: "Don't bother zipping tiny files"

---

```nginx
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss application/json;
```
**📝 Explanation:**
- Which file types to compress
- Text-based files compress well (50-80% smaller!)
- Images/videos already compressed, skip them

```
Compression Results:
┌─────────────────┬────────────┬────────────┬──────────┐
│ File Type       │ Original   │ Compressed │ Savings  │
├─────────────────┼────────────┼────────────┼──────────┤
│ JavaScript      │ 500 KB     │ 100 KB     │ 80%      │
│ CSS             │ 200 KB     │ 40 KB      │ 80%      │
│ JSON            │ 100 KB     │ 20 KB      │ 80%      │
│ HTML            │ 50 KB      │ 15 KB      │ 70%      │
└─────────────────┴────────────┴────────────┴──────────┘
```

---

```nginx
    # ============================================
    # UPSTREAM SERVERS (Backend Services)
    # ============================================

    upstream backend {
        server backend:3000;
    }
```
**📝 Explanation:**
- Define a group of servers called "backend"
- `backend:3000` = Docker container name + port
- Can add multiple servers for load balancing

```
Single Server:
upstream backend {
    server backend:3000;
}

Load Balancing (Multiple Servers):
upstream backend {
    server backend1:3000;
    server backend2:3000;
    server backend3:3000;
}
```

---

```nginx
    upstream frontend {
        server frontend:80;
    }
```
**📝 Explanation:**
- Define a group called "frontend"
- Points to frontend container on port 80
- Same concept as backend upstream

---

```nginx
    # ============================================
    # SERVER BLOCK (Virtual Host)
    # ============================================

    server {
        listen 80;
```
**📝 Explanation:**
- `server { }` = A virtual host (website configuration)
- `listen 80` = Accept connections on port 80 (HTTP)
- Think: "Open for business on door number 80"

```
Common Ports:
80   → HTTP (regular web traffic)
443  → HTTPS (secure/encrypted)
8080 → Alternative HTTP
3000 → Common for Node.js apps
```

---

```nginx
        server_name _;
```
**📝 Explanation:**
- Which domain names this server responds to
- `_` = Catch-all, accept ANY domain name
- Think: "Answer to any name someone calls me"

```
Examples:
server_name _;                         → Any domain
server_name example.com;               → Only example.com
server_name example.com www.example.com; → Both with/without www
server_name *.example.com;             → All subdomains
```

---

```nginx
        # ============================================
        # LOCATION: /api (Backend Routes)
        # ============================================

        location /api {
```
**📝 Explanation:**
- `location` = Rules for specific URL paths
- `/api` = Apply these rules when URL starts with "/api"
- Think: "If someone asks for /api/..., do this:"

```
URL Matching:
location /api matches:
  ✅ /api
  ✅ /api/data
  ✅ /api/users/123
  ❌ /about
  ❌ /contact
```

---

```nginx
            proxy_pass http://backend;
```
**📝 Explanation:**
- Forward this request to the "backend" upstream
- The MOST important proxy directive
- Think: "Send this request to the backend server"

```
What happens:
User requests: https://yoursite.com/api/data
                         ↓
Nginx forwards: http://backend:3000/api/data
                         ↓
Backend responds → Nginx → User
```

---

```nginx
            proxy_http_version 1.1;
```
**📝 Explanation:**
- Use HTTP/1.1 for proxy connections
- Required for WebSockets and keepalive
- Think: "Speak HTTP version 1.1 to the backend"

---

```nginx
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
```
**📝 Explanation:**
- Enable WebSocket support
- WebSockets need special headers to work
- Without these, real-time features break
- Think: "Pass along the 'upgrade to WebSocket' request"

```
WebSocket Connection:
1. Client: "I want to upgrade to WebSocket"
2. Nginx: Passes the upgrade request to backend
3. Backend: "OK, upgraded!"
4. Now: Two-way real-time communication
```

---

```nginx
            proxy_set_header Host $host;
```
**📝 Explanation:**
- Pass the original domain name to backend
- Backend knows which site the request was for
- Think: "Tell backend the original website name"

```
Example:
User visits: https://abhayvideography.com/api/data
$host = abhayvideography.com

Backend receives Host header: abhayvideography.com
```

---

```nginx
            proxy_set_header X-Real-IP $remote_addr;
```
**📝 Explanation:**
- Pass user's real IP address to backend
- Without this, backend sees Nginx's IP instead
- Think: "Tell backend who's really calling"

```
Without X-Real-IP:
Backend sees: 172.17.0.1 (Nginx container IP)

With X-Real-IP:
Backend sees: 203.0.113.50 (User's actual IP)
```

---

```nginx
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```
**📝 Explanation:**
- Chain of all proxy IPs the request passed through
- Useful for debugging and security
- Think: "List everyone who handled this request"

```
Example Chain:
User (1.1.1.1) → Cloudflare (2.2.2.2) → Nginx → Backend

X-Forwarded-For: 1.1.1.1, 2.2.2.2
```

---

```nginx
            proxy_set_header X-Forwarded-Proto $scheme;
```
**📝 Explanation:**
- Tell backend if request was HTTP or HTTPS
- Backend might need to generate correct URLs
- `$scheme` = "http" or "https"

```
User visits: https://yoursite.com/api/data
X-Forwarded-Proto: https

Backend knows: "User is on HTTPS, generate secure URLs"
```

---

```nginx
            proxy_cache_bypass $http_upgrade;
```
**📝 Explanation:**
- Don't cache WebSocket connections
- WebSockets need real-time, not cached responses
- Think: "Skip cache for live connections"

---

```nginx
        }

        # ============================================
        # LOCATION: / (Everything Else → Frontend)
        # ============================================

        location / {
            proxy_pass http://frontend;
```
**📝 Explanation:**
- Match all other URLs (not /api)
- Forward to frontend container
- Same proxy settings as backend

```
Routing Summary:
┌────────────────────┬─────────────────────┐
│ URL                │ Goes To             │
├────────────────────┼─────────────────────┤
│ /api/data          │ backend:3000        │
│ /api/users         │ backend:3000        │
│ /                  │ frontend:80         │
│ /about             │ frontend:80         │
│ /contact           │ frontend:80         │
│ /images/logo.png   │ frontend:80         │
└────────────────────┴─────────────────────┘
```

---

# 2. Frontend Nginx - `frontend/nginx.conf`

This runs **inside the frontend container** and serves your built files.

```nginx
server {
    listen 80;
```
**📝 Explanation:**
- Listen on port 80 inside the container
- The main Nginx connects to this port
- Think: "Open for business on port 80"

---

```nginx
    server_name localhost;
```
**📝 Explanation:**
- Respond to "localhost" requests
- Inside Docker, containers talk via container names
- Think: "I am localhost inside this container"

---

```nginx
    root /usr/share/nginx/html;
```
**📝 Explanation:**
- Where your website files are stored
- This is where Docker copies your `dist/` folder
- Think: "My files are in this folder"

```
Your Dockerfile:
COPY --from=build /app/dist /usr/share/nginx/html

Result:
/usr/share/nginx/html/
├── index.html
├── assets/
│   ├── main.abc123.js
│   └── style.def456.css
└── vite.svg
```

---

```nginx
    index index.html;
```
**📝 Explanation:**
- Default file to serve when visiting a directory
- If someone visits `/`, serve `index.html`
- Think: "If they don't ask for a specific file, give them index.html"

---

```nginx
    location / {
        try_files $uri $uri/ /index.html;
    }
```
**📝 Explanation:**
- **THE MOST IMPORTANT LINE FOR SPA (Single Page Applications)**
- `try_files` = Try these options in order:

```
Step-by-step:

1. $uri          → Try to find exact file
2. $uri/         → Try to find directory with index
3. /index.html   → If nothing found, serve index.html

Example: User visits /about

Step 1: Does /usr/share/nginx/html/about exist?
        → NO (it's not a real file)
        
Step 2: Does /usr/share/nginx/html/about/ exist?
        → NO (it's not a directory)
        
Step 3: Serve /usr/share/nginx/html/index.html
        → YES! React/Vue/vanilla JS router handles /about
```

**Why This Matters:**
```
Without try_files:
/about → 404 NOT FOUND ❌

With try_files:
/about → index.html → JavaScript router → Shows About page ✅
```

---

```nginx
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
```
**📝 Explanation:**
- `~*` = Case-insensitive regex match
- `\.` = Literal dot (escaped)
- `(js|css|png|...)` = Match these extensions
- `$` = End of string

```
Matches:
✅ /assets/main.js
✅ /images/logo.PNG (case-insensitive)
✅ /favicon.ico

Doesn't Match:
❌ /about
❌ /api/data
❌ /script.js.backup
```

---

```nginx
        expires 1y;
```
**📝 Explanation:**
- Tell browser to cache this file for 1 year
- Browser won't re-download until cache expires
- Think: "Keep this file for a year, don't ask again"

```
Cache Duration Options:
expires 1h;    → 1 hour
expires 1d;    → 1 day
expires 7d;    → 1 week
expires 30d;   → 1 month
expires 1y;    → 1 year
expires max;   → Forever (10 years)
expires off;   → No caching
```

---

```nginx
        add_header Cache-Control "public, immutable";
```
**📝 Explanation:**
- `public` = Any cache can store this (browser, CDN, proxy)
- `immutable` = This file will NEVER change

```
Why "immutable" is safe:
Your files have hashes in names:
  main.abc123.js
  style.def456.css

If code changes, filename changes:
  main.xyz789.js (new hash!)

So the old cached file is never wrong!
```

---

```nginx
    }
}
```
**📝 Explanation:**
- Close the location block and server block
- That's the complete frontend config!

---

# Essential Nginx Concepts

## 1. Contexts (Blocks)

Nginx config is organized in nested blocks:

```nginx
# Main context (global)
user nginx;
worker_processes auto;

events {
    # Events context
    worker_connections 1024;
}

http {
    # HTTP context
    
    server {
        # Server context (virtual host)
        
        location /api {
            # Location context
        }
    }
}
```

```
Hierarchy:
main
├── events
└── http
    └── server
        └── location
```

## 2. Inheritance

Settings are inherited from parent to child:

```nginx
http {
    gzip on;  # Applies to ALL servers
    
    server {
        # Inherits gzip on
        
        location /api {
            # Also inherits gzip on
        }
    }
}
```

## 3. Directive Types

| Type | Example | Description |
|------|---------|-------------|
| Simple | `listen 80;` | Single line with value |
| Block | `server { }` | Contains other directives |
| Array | `gzip_types text/css text/js;` | Multiple values |

---

# Common Nginx Directives

## Server Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `listen` | Port to listen on | `listen 80;` |
| `server_name` | Domain names | `server_name example.com;` |
| `root` | Document root folder | `root /var/www/html;` |
| `index` | Default file | `index index.html;` |

## Location Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `try_files` | Try files in order | `try_files $uri /index.html;` |
| `proxy_pass` | Forward to backend | `proxy_pass http://backend;` |
| `return` | Return response | `return 301 https://$host$request_uri;` |
| `rewrite` | Rewrite URL | `rewrite ^/old$ /new permanent;` |

## Header Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `add_header` | Add response header | `add_header X-Frame-Options DENY;` |
| `proxy_set_header` | Set proxy header | `proxy_set_header Host $host;` |
| `expires` | Set cache expiry | `expires 1d;` |

---

# Nginx Location Block Patterns

## Matching Priority (High → Low)

```nginx
# 1. EXACT match (highest priority)
location = /favicon.ico {
    # Only matches: /favicon.ico
    # NOT: /favicon.ico/extra
}

# 2. PREFERENTIAL PREFIX (stops searching)
location ^~ /static/ {
    # Matches: /static/anything
    # Stops searching for regex matches
}

# 3. REGEX match (case-sensitive)
location ~ \.php$ {
    # Matches: /index.php, /admin.php
    # NOT: /index.PHP (case matters)
}

# 4. REGEX match (case-insensitive)
location ~* \.(jpg|png|gif)$ {
    # Matches: /image.jpg, /image.JPG, /image.Jpg
}

# 5. PREFIX match (lowest priority)
location /api {
    # Matches: /api, /api/data, /api/users/123
}

# 6. CATCH-ALL
location / {
    # Matches everything else
}
```

## Quick Reference

| Pattern | Type | Example Match |
|---------|------|---------------|
| `= /path` | Exact | Only `/path` |
| `^~ /path` | Preferential prefix | `/path`, `/path/sub` |
| `~ regex` | Case-sensitive regex | Based on pattern |
| `~* regex` | Case-insensitive regex | Based on pattern |
| `/path` | Prefix | `/path`, `/path/sub` |
| `/` | Catch-all | Everything |

---

# Proxy Configuration Explained

## Complete Proxy Setup

```nginx
location /api {
    # Where to forward requests
    proxy_pass http://backend:3000;
    
    # Use HTTP/1.1 (required for keepalive & WebSocket)
    proxy_http_version 1.1;
    
    # WebSocket support
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    
    # Pass original info to backend
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    
    # Buffer settings
    proxy_buffering on;
    proxy_buffer_size 4k;
    proxy_buffers 8 4k;
}
```

## Proxy Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `$host` | example.com | Domain from request |
| `$remote_addr` | 1.2.3.4 | Client IP |
| `$scheme` | https | Protocol |
| `$request_uri` | /api/data?id=1 | Full URI with query |
| `$uri` | /api/data | Path without query |

---

# SSL/HTTPS Configuration

## Basic HTTPS Setup

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL Certificate files
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    # Modern SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    
    # SSL session caching (performance)
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    location / {
        # Your config here
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## Let's Encrypt with Certbot

```bash
# Install certificate
sudo certbot --nginx -d example.com -d www.example.com

# Auto-renewal (add to crontab)
0 0 * * * certbot renew --quiet
```

---

# Performance Optimization

## Caching Static Files

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;  # Don't log static file requests
}
```

## Gzip Compression

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;  # 1-9, higher = more compression
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml
    application/xml+rss
    image/svg+xml;
```

## Connection Optimization

```nginx
# Keep connections open
keepalive_timeout 65;
keepalive_requests 100;

# Efficient file serving
sendfile on;
tcp_nopush on;
tcp_nodelay on;

# Buffer sizes
client_body_buffer_size 10K;
client_header_buffer_size 1k;
client_max_body_size 20M;
```

---

# Common Use Cases

## 1. Redirect www to non-www

```nginx
server {
    listen 80;
    server_name www.example.com;
    return 301 $scheme://example.com$request_uri;
}
```

## 2. Force HTTPS

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## 3. Custom Error Pages

```nginx
server {
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    location = /404.html {
        root /var/www/errors;
        internal;
    }
}
```

## 4. Rate Limiting

```nginx
# Define limit zone
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    location /api {
        # Apply limit: 10 requests/second, burst up to 20
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://backend;
    }
}
```

## 5. Basic Authentication

```nginx
location /admin {
    auth_basic "Admin Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
}

# Create password file:
# htpasswd -c /etc/nginx/.htpasswd admin
```

## 6. CORS Headers

```nginx
location /api {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    proxy_pass http://backend;
}
```

---

# Debugging & Troubleshooting

## Check Configuration Syntax

```bash
nginx -t
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## View Error Logs

```bash
# Real-time log viewing
tail -f /var/log/nginx/error.log

# Last 100 lines
tail -100 /var/log/nginx/access.log

# Search for errors
grep "error" /var/log/nginx/error.log
```

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `502 Bad Gateway` | Backend not responding | Check if backend is running |
| `504 Gateway Timeout` | Backend too slow | Increase `proxy_read_timeout` |
| `413 Entity Too Large` | Upload too big | Increase `client_max_body_size` |
| `403 Forbidden` | Permission denied | Check file permissions |
| `404 Not Found` | File doesn't exist | Check `root` path and file location |

## Debug Mode

```nginx
# In nginx.conf
error_log /var/log/nginx/error.log debug;

# Or for specific location
location /api {
    error_log /var/log/nginx/api-debug.log debug;
}
```

---

# Useful Commands

## Nginx Service Control

```bash
# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Restart Nginx (drops connections)
sudo systemctl restart nginx

# Reload config (graceful, no dropped connections)
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

## Configuration Testing

```bash
# Test configuration syntax
sudo nginx -t

# Test and show config file location
sudo nginx -T

# Show version
nginx -v

# Show version + compile options
nginx -V
```

## Docker Commands

```bash
# View Nginx logs in Docker
docker logs abhayvideography-nginx

# Enter Nginx container
docker exec -it abhayvideography-nginx /bin/sh

# Test config inside container
docker exec abhayvideography-nginx nginx -t

# Reload Nginx in container
docker exec abhayvideography-nginx nginx -s reload
```

---

# Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                     NGINX QUICK REFERENCE                        │
├─────────────────────────────────────────────────────────────────┤
│ COMMON COMMANDS                                                  │
│   nginx -t              Test configuration                       │
│   nginx -s reload       Reload configuration                     │
│   nginx -s stop         Stop server                              │
├─────────────────────────────────────────────────────────────────┤
│ LOCATION PRIORITY                                                │
│   1. = /exact           Exact match                              │
│   2. ^~ /prefix         Preferential prefix                      │
│   3. ~ regex            Case-sensitive regex                     │
│   4. ~* regex           Case-insensitive regex                   │
│   5. /prefix            Regular prefix                           │
│   6. /                  Catch-all                                │
├─────────────────────────────────────────────────────────────────┤
│ COMMON VARIABLES                                                 │
│   $host                 Domain name                              │
│   $uri                  Request path                             │
│   $request_uri          Full URI with query string               │
│   $remote_addr          Client IP                                │
│   $scheme               http or https                            │
│   $args                 Query string                             │
├─────────────────────────────────────────────────────────────────┤
│ COMMON DIRECTIVES                                                │
│   listen 80;            Listen on port                           │
│   server_name _;        Domain to respond to                     │
│   root /path;           Document root                            │
│   proxy_pass URL;       Forward to backend                       │
│   try_files A B C;      Try files in order                       │
│   return 301 URL;       Redirect                                 │
│   expires 1d;           Cache duration                           │
├─────────────────────────────────────────────────────────────────┤
│ LOG LOCATIONS                                                    │
│   /var/log/nginx/access.log                                      │
│   /var/log/nginx/error.log                                       │
├─────────────────────────────────────────────────────────────────┤
│ CONFIG LOCATIONS                                                 │
│   /etc/nginx/nginx.conf       Main config                        │
│   /etc/nginx/conf.d/*.conf    Additional configs                 │
│   /etc/nginx/sites-available/ Available sites                    │
│   /etc/nginx/sites-enabled/   Enabled sites                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎉 Congratulations!

You now understand:
- ✅ What Nginx is and why it's used
- ✅ How your project's Nginx files work
- ✅ Every line of your configuration
- ✅ Common directives and patterns
- ✅ How to debug issues
- ✅ Performance optimization
- ✅ SSL/HTTPS setup

**Next Steps:**
1. Experiment with changes in development
2. Use `nginx -t` to test before deploying
3. Check logs when something breaks
4. Gradually add new features (SSL, rate limiting, etc.)

---

*Created for the abhayvideography project - December 2025*
