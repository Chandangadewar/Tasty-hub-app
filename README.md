# 🍛 Tasty Hub — Full Stack Food Delivery App

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2%20Deployed-FF9900?style=flat&logo=amazonaws)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=flat&logo=terraform)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5?style=flat&logo=kubernetes)

> A production-ready full-stack food ordering web application, built as a **DevOps practice project** to implement real-world containerization, CI/CD pipelines, cloud deployment, Kubernetes orchestration, and monitoring workflows.

---

## 🌐 Live Demo
> ✅ Deployed on AWS EC2 (t2.micro)
> 💡 EC2 instance stopped when not in use to avoid AWS charges
> 🐳 Run locally instantly using Docker — see setup below

---

## 📌 What is Tasty Hub?

Tasty Hub is an end-to-end food ordering platform where customers can browse the menu, place orders, and track delivery status. Restaurant admins can manage all incoming orders through a secure dashboard.

The application is intentionally built to mirror a **real-world production system** — making it a perfect base for practising DevOps workflows including Docker, GitHub Actions CI/CD, AWS deployment, Terraform IaC, Kubernetes orchestration, and Prometheus + Grafana monitoring.

---

## 🏗️ System Architecture

```
                    ┌─────────────────┐
                    │   User Browser  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  React Frontend │  (Port 80)
                    │  (Nginx)        │
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

### DevOps
| Tool | Status | Purpose |
|---|---|---|
| Docker + Docker Compose | ✅ Complete | Containerization & Multi-container Setup |
| GitHub Actions | ✅ Complete | CI/CD Pipeline |
| Nginx | ✅ Complete | Reverse Proxy |
| AWS EC2 | ✅ Complete | Cloud Deployment |
| Terraform | ✅ Complete | Infrastructure as Code |
| Kubernetes (EKS) | ✅ Complete | Container Orchestration |
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
├── database.sql
├── README.md
├── .env.example
├── backend/
├── frontend/
├── docker/
│   ├── docker-compose.yml
│   ├── backend/Dockerfile
│   └── frontend/
│       ├── Dockerfile
│       └── nginx.conf
├── .github/workflows/
│   ├── build-push.yml
│   └── deploy.yml
├── k8s/
│   ├── namespace.yml
│   ├── secret.yml
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yml
│   ├── mysql-deployment.yml
│   └── ingress.yml
├── nginx/
│   └── nginx.conf
└── terraform/
    ├── main.tf
    ├── ec2.tf
    ├── variables.tf
    ├── outputs.tf
    └── security-groups.tf
```

---

## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- Docker Desktop installed

### Run Locally
```bash
git clone https://github.com/Chandangadewar/Tasty-hub-app.git
cd Tasty-hub-app/docker
cp .env.example .env        # fill in your values
docker-compose up -d
```

Visit **http://localhost** ✅

### Admin Access
| Field | Value |
|---|---|
| URL | http://localhost/admin/login |
| Username | admin |
| Password | admin123 |

---

## 🖥️ Manual Local Setup

### Prerequisites
- Node.js v18+
- MySQL 8.0
- npm

```bash
# 1. Clone
git clone https://github.com/Chandangadewar/Tasty-hub-app.git
cd Tasty-hub-app

# 2. Setup Database
mysql -u root -p < database.sql

# 3. Backend
cd backend
npm install
# Create .env with DB credentials
npm start        # http://localhost:5000

# 4. Frontend
cd ../frontend
npm install
npm start        # http://localhost:3000
```

---

## 🗺️ DevOps Implementation Roadmap

### ✅ Phase 0 — Application Development
- [x] Built full-stack React + Node.js + MySQL application
- [x] Implemented REST API with CRUD operations
- [x] Admin authentication with bcrypt + sessions
- [x] Form validation on frontend and backend
- [x] Pushed to GitHub with proper project structure

### ✅ Phase 1 — Containerization
- [x] Dockerfile for React frontend (multi-stage with Nginx)
- [x] Dockerfile for Node.js backend
- [x] MySQL container with auto-seed via init scripts
- [x] docker-compose.yml for full stack
- [x] Tested multi-container setup locally
- [x] Docker images pushed to Docker Hub

### ✅ Phase 2 — CI/CD Pipeline
- [x] GitHub Actions workflow (build-push.yml)
- [x] Auto build & push Docker images on push to main
- [x] Auto deploy to EC2 on successful build (deploy.yml)

### ✅ Phase 3 — Cloud Deployment (AWS EC2)
- [x] Launched AWS EC2 instance (t2.micro)
- [x] Installed Docker on EC2
- [x] Pulled images from Docker Hub
- [x] App deployed and running on AWS EC2
- [ ] SSL/HTTPS with Let's Encrypt
- [ ] Custom domain

### ✅ Phase 4 — Infrastructure as Code (Terraform)
- [x] EC2 instance via Terraform
- [x] VPC, Security Groups via Terraform
- [x] Variables and outputs configured

### 📋 Phase 5 — Monitoring & Observability
- [ ] Setup Prometheus metrics in Node.js backend
- [ ] Configure Prometheus scraping
- [ ] Setup Grafana dashboards
- [ ] Configure alerts

### ✅ Phase 6 — Kubernetes Orchestration
- [x] Kubernetes deployment manifests
- [x] Services and Ingress configured
- [x] Namespace and secrets configured
- [x] Ready for AWS EKS deployment

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
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Admin routes protected by **session middleware**
- Session cookies are **httpOnly** (not accessible via JS)
- SQL injection prevention via **parameterized queries**
- Input validation on both **frontend and backend**

---

## 👨‍💻 Author

**Chandan Gadewar** — Aspiring DevOps Engineer

- 📧 chandangadewar24@gmail.com
- 💼 [linkedin.com/in/chandan-gadewar-066194258](https://www.linkedin.com/in/chandan-gadewar-066194258)
- 🐙 [github.com/Chandangadewar](https://github.com/Chandangadewar)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you find this project helpful, please give it a star!
