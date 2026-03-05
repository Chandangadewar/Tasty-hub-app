# 🍛 Tasty Hub — Full Stack Food Delivery App

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![AWS](https://img.shields.io/badge/AWS-Planned-FF9900?style=flat&logo=amazonaws)

> A production-ready full-stack food ordering web application, built as a **DevOps practice project** to implement real-world containerization, CI/CD pipelines, and cloud deployment workflows.

---

## 🌐 Live Demo
> 🚧 Deployment in progress — will be hosted on AWS EC2

---

## 📌 What is Tasty Hub?

Tasty Hub is an end-to-end food ordering platform where customers can browse the menu, place orders, and track delivery status. Restaurant admins can manage all incoming orders through a secure dashboard.

The application is intentionally built to mirror a **real-world production system** — making it a perfect base for practising DevOps workflows including Docker, GitHub Actions CI/CD, AWS deployment, and Kubernetes orchestration.

---

## 🏗️ System Architecture

```
                    ┌─────────────────┐
                    │   User Browser  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  React Frontend │  (Port 3000)
                    │  (Nginx/CDN)    │
                    └────────┬────────┘
                             │ REST API
                    ┌────────▼────────┐
                    │ Node.js Backend │  (Port 5000)
                    │ Express.js API  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   MySQL 8.0     │  (Port 3306)
                    │   Database      │
                    └─────────────────┘
```

---

## 🛠️ Tech Stack

### Application
| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18, React Router v6 | UI & Client Routing |
| Backend | Node.js, Express.js | REST API Server |
| Database | MySQL 8.0 | Data Persistence |
| Auth | Express-Session + bcrypt | Admin Authentication |
| HTTP Client | Axios | API Communication |

### DevOps (Implemented / Planned)
| Tool | Status | Purpose |
|---|---|---|
| Docker | ✅ Files Ready | Containerization |
| Docker Compose | ✅ Files Ready | Multi-container Setup |
| GitHub Actions | ✅ Files Ready | CI/CD Pipeline |
| Nginx | ✅ Files Ready | Reverse Proxy |
| Terraform | ✅ Files Ready | Infrastructure as Code |
| AWS EKS | ✅ Files Ready | Kubernetes Orchestration |
| Prometheus + Grafana | 📋 Planned | Monitoring & Observability |
---

## ✨ Application Features

### Customer Side
- 🏠 Landing page with featured dishes and restaurant info
- 📖 About page with team and story
- 🍛 Full menu with 20+ items across 5 categories (Main Course, Biryani, Breads, Beverages)
- 📝 Order booking form with real-time validation
- 💰 Live order total calculation with free delivery threshold
- ✅ Order confirmation with booking ID
- 📞 Contact page

### Admin Panel
- 🔐 Secure session-based login
- 📊 Dashboard with live stats (Total Orders, Pending, Completed, Revenue)
- 📋 Orders table with status filtering
- ✏️ Update order status: Pending → Confirmed → Preparing → Completed
- 🗑️ Delete orders
- 🚪 Secure logout

---

## 📁 Project Structure

```
tasty-hub/
├── database.sql                  # MySQL schema & seed data
├── README.md
├── backend/                      # Node.js API Server
│   ├── server.js                 # Express app entry point
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── middleware/
│   │   └── auth.js               # Session auth middleware
│   └── routes/
│       ├── bookings.js           # Order CRUD routes
│       └── admin.js              # Admin auth & stats routes
└── frontend/                     # React Application
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js                # Root component & routes
        ├── index.js
        ├── context/
        │   └── AdminContext.js   # Global admin auth state
        ├── components/
        │   ├── Navbar.js
        │   └── Footer.js
        └── pages/
            ├── Home.js
            ├── About.js
            ├── Services.js
            ├── BookOrder.js
            ├── Success.js
            ├── Contact.js
            ├── AdminLogin.js
            └── AdminDashboard.js
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js v18+
- MySQL 8.0
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/Chandangadewar/tasty-hub.git
cd tasty-hub
```

### 2. Setup Database
```sql
-- Run in MySQL Workbench or CLI
SOURCE database.sql;
```

### 3. Configure Backend
```bash
cd backend
npm install
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
SESSION_SECRET=your_secret_key
PORT=5000
```

### 4. Run Backend
```bash
npm start
# Server running on http://localhost:5000
```

### 5. Run Frontend
```bash
cd ../frontend
npm install
npm start
# App running on http://localhost:3000
```

### Admin Access
| Field | Value |
|---|---|
| URL | http://localhost:3000/admin/login |
| Username | admin |
| Password | admin123 |

---

## 🗺️ DevOps Implementation Roadmap

### ✅ Phase 0 — Application Development (Complete)
- [x] Built full-stack React + Node.js + MySQL application
- [x] Implemented REST API with CRUD operations
- [x] Admin authentication with bcrypt + sessions
- [x] Form validation on frontend and backend
- [x] Pushed to GitHub with proper project structure

### ✅ Phase 1 — Containerization (Complete)
- [x] Write `Dockerfile` for React frontend
- [x] Write `Dockerfile` for Node.js backend
- [x] Configure MySQL container with init scripts
- [x] Write `docker-compose.yml` for full stack
- [x] Test multi-container setup locally
- [x] Push Docker images to Docker Hub
### ✅ Phase 2 — CI/CD Pipeline (Complete)
- [x] Setup GitHub Actions workflow
- [x] Auto build Docker images on push
- [x] Push images to Docker Hub

### 📋 Phase 3 — Cloud Deployment (AWS)
- [ ] Launch AWS EC2 instance
- [ ] Install Docker on EC2
- [ ] Setup Nginx as reverse proxy
- [ ] Configure environment variables securely
- [ ] Setup SSL/HTTPS with Let's Encrypt
- [ ] Point custom domain

### 📋 Phase 4 — Kubernetes Orchestration
- [ ] Write Kubernetes deployment manifests
- [ ] Configure Services and Ingress
- [ ] Deploy to AWS EKS cluster
- [ ] Setup Horizontal Pod Autoscaler

### 📋 Phase 5 — Monitoring & Observability
- [ ] Setup Prometheus metrics in Node.js backend
- [ ] Configure Prometheus scraping
- [ ] Setup Grafana dashboards
- [ ] Configure alerts
- [ ] Setup log aggregation

### 📋 Phase 6 — Infrastructure as Code
- [ ] Write Terraform scripts for AWS infrastructure
- [ ] EC2, VPC, Security Groups, RDS via Terraform
- [ ] Remote state management with S3
- [ ] Implement Blue-Green deployment strategy

---

## 🔌 API Reference

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/bookings` | Create new order |

### Admin Endpoints (Auth Required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/check-auth` | Verify session |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/bookings` | Get all orders |
| PUT | `/api/bookings/:id/status` | Update order status |
| DELETE | `/api/bookings/:id` | Delete order |

---

## 🔒 Security Implementation
- Passwords hashed with **bcrypt** (10 salt rounds)
- Admin routes protected by **session middleware**
- Session cookies are **httpOnly** (not accessible via JS)
- SQL injection prevention via **parameterized queries**
- Input validation on both **frontend and backend**

---

## 👨‍💻 Author

**Chandan Gadewar** — Aspiring DevOps Engineer

- 📧 chandangadewar24@gmail.com
- 💼 www.linkedin.com/in/chandan-gadewar-066194258
- 🐙 https://github.com/Chandangadewar

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you find this project helpful, please give it a star! It helps others discover it.





