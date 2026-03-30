# 🍛 End-to-End DevOps CI/CD Pipeline — Full Stack Food Delivery App

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2%20Deployed-FF9900?style=flat&logo=amazonaws)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=flat&logo=terraform)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5?style=flat&logo=kubernetes)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?style=flat&logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800?style=flat&logo=grafana)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat&logo=githubactions)

> A production-ready full-stack food ordering web application, built as a **DevOps practice project** to implement real-world containerization, CI/CD pipelines, cloud deployment, Kubernetes orchestration, and monitoring workflows.

---

## 🌐 Live Demo
> ✅ Deployed on AWS EC2 (t3.small) via Terraform — fully automated
> ✅ Also deployed on AWS EKS (Kubernetes) with Load Balancer
> 💡 Instances stopped when not in use to avoid AWS charges
> 🐳 Run locally instantly using Docker — see setup below

---

## 📌 What is Tasty Hub?

Tasty Hub is an end-to-end food ordering platform where customers can browse the menu, place orders, and track delivery status. Restaurant admins can manage all incoming orders through a secure dashboard.

The application is intentionally built to mirror a **real-world production system** — making it a perfect base for practising DevOps workflows including Docker, GitHub Actions CI/CD, AWS deployment, Terraform IaC, Kubernetes orchestration, and Prometheus + Grafana monitoring.

---

## 🏆 Key Achievements

- 🐳 Containerized 3-service app using **Docker multi-stage builds**, reducing image size by ~60%
- 🔄 Built **GitHub Actions CI/CD pipeline** that auto-builds, pushes to Docker Hub, and deploys to AWS EC2 on every push
- ☁️ Automated infrastructure provisioning with **Terraform** — reducing EC2 setup time from 30 minutes to 3 minutes
- ☸️ Deployed on **AWS EKS** with 5 pods, automatic Load Balancer provisioning, and health checks
- 📊 Implemented **Prometheus + Grafana monitoring** tracking 3 custom metrics across 3 scrape targets
- 🔐 Secured with bcrypt password hashing, session middleware, and parameterized SQL queries

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

         Monitoring Stack
         ┌─────────────┐     ┌─────────────┐
         │  Prometheus │────▶│   Grafana   │
         │  (Port 9090)│     │  (Port 3001)│
         └─────────────┘     └─────────────┘
               │
         ┌─────▼──────┐
         │Node Exporter│
         │ (Port 9100) │
         └────────────┘
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
| GitHub Actions | ✅ Complete | CI/CD Pipeline (build + deploy) |
| Nginx | ✅ Complete | Reverse Proxy & Static File Serving |
| AWS EC2 | ✅ Complete | Cloud Deployment (t3.small) |
| Terraform | ✅ Complete | Infrastructure as Code |
| Kubernetes (EKS) | ✅ Complete | Container Orchestration |
| Prometheus + Grafana | ✅ Complete | Monitoring & Observability |

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
├── .env.example                  # Environment variables template
├── backend/                      # Node.js Express API
│   ├── server.js                 # Entry point + Prometheus metrics
│   ├── config/db.js              # MySQL connection
│   ├── middleware/auth.js        # Session auth middleware
│   └── routes/
│       ├── bookings.js           # Order CRUD + metrics
│       └── admin.js              # Admin auth & stats
├── frontend/                     # React Application
│   └── src/pages/                # Home, Menu, BookOrder, Admin etc.
├── docker/                       # Docker configuration
│   ├── docker-compose.yml        # All 6 services
│   ├── backend/Dockerfile        # Multi-stage Node.js build
│   └── frontend/
│       ├── Dockerfile            # Multi-stage React + Nginx build
│       └── nginx.conf            # Reverse proxy config
├── .github/workflows/
│   ├── build-push.yml            # Build & push Docker images
│   └── deploy.yml                # Deploy to EC2 via SSH
├── k8s/                          # Kubernetes manifests
│   ├── namespace.yml
│   ├── secret.yml
│   ├── mysql-init-configmap.yml  # DB auto-seed
│   ├── mysql-deployment.yml
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yml
│   └── ingress.yml
├── monitoring/
│   └── prometheus.yml            # Scrape config
└── terraform/                    # Infrastructure as Code
    ├── main.tf
    ├── ec2.tf                    # EC2 + user_data automation
    ├── variables.tf
    ├── outputs.tf
    └── security-groups.tf
```

---

## 🚀 Option 1 — Run with Docker (Local)

### Prerequisites
- Docker Desktop installed

```bash
git clone https://github.com/Chandangadewar/Tasty-hub-app.git
cd Tasty-hub-app/docker
cp .env.example .env        # fill in your values
docker-compose up -d
```

Visit **http://localhost** ✅

**What starts:**
- Frontend → http://localhost
- Backend → http://localhost:5000
- Prometheus → http://localhost:9090
- Grafana → http://localhost:3001

---

## ☁️ Option 2 — Run with Terraform (AWS EC2)

### Prerequisites
- Terraform installed
- AWS CLI configured (`aws configure`)
- Key pair named `pem` in AWS ap-south-1

```bash
cd terraform
terraform apply -var="key_name=pem"
```

✅ Automatically installs Docker, clones repo, starts all 6 containers!
Wait ~3 minutes → app runs at the output IP.

```bash
# Destroy when done (saves AWS costs)
terraform destroy -var="key_name=pem"
```

---

## ☸️ Option 3 — Run with Kubernetes (AWS EKS)

### Prerequisites
- kubectl + eksctl installed
- AWS CLI configured

```bash
# Step 1: Create cluster (15-20 mins)
eksctl create cluster \
  --name tastyhub-cluster \
  --region ap-south-1 \
  --nodegroup-name tastyhub-nodes \
  --node-type c7i-flex.large \
  --nodes 1 \
  --managed

# Step 2: Deploy everything in one command
kubectl apply -f k8s/

# Step 3: Get Load Balancer URL
kubectl get services -n tastyhub

# Step 4: Destroy when done
eksctl delete cluster --region=ap-south-1 --name=tastyhub-cluster
```

---

### Admin Access
| Field | Value |
|---|---|
| URL | http://\<ip\>/admin/login |
| Username | admin |
| Password | admin123 |

---

## 📊 Monitoring (Prometheus + Grafana)

After deploying with Docker/Terraform, monitoring is included automatically!

| Service | URL | Credentials |
|---|---|---|
| App | http://\<ip\> | - |
| Grafana | http://\<ip\>:3001 | admin/admin123 |
| Prometheus | http://\<ip\>:9090 | - |
| Backend Metrics | http://\<ip\>:5000/metrics | - |

**Custom Metrics tracked:**
- `http_requests_total` — API requests by route, method, status
- `http_request_duration_seconds` — Response time histogram
- `active_orders_total` — Real-time active order count

**Grafana Setup:**
1. Add Prometheus datasource → URL: `http://prometheus:9090`
2. Import dashboard ID `1860` → Node Exporter (EC2 metrics)
3. Create custom dashboard with above metrics

---

## 🗺️ DevOps Implementation Roadmap

### ✅ Phase 0 — Application Development
- [x] Built full-stack React + Node.js + MySQL application
- [x] Implemented REST API with CRUD operations
- [x] Admin authentication with bcrypt + sessions
- [x] Form validation on frontend and backend
- [x] Pushed to GitHub with proper project structure

### ✅ Phase 1 — Containerization
- [x] Multi-stage Dockerfile for React frontend (Node build → Nginx serve)
- [x] Dockerfile for Node.js backend
- [x] MySQL container with auto-seed via init scripts
- [x] docker-compose.yml for all 6 services
- [x] Tested multi-container setup locally
- [x] Docker images pushed to Docker Hub

### ✅ Phase 2 — CI/CD Pipeline
- [x] `build-push.yml` — auto build & push Docker images on push to main
- [x] `deploy.yml` — auto deploy to EC2 after successful build
- [x] GitHub Secrets for Docker Hub and EC2 credentials
- [x] Zero-downtime deployment with docker-compose pull + up

### ✅ Phase 3 — Cloud Deployment (AWS EC2)
- [x] AWS EC2 t3.small Ubuntu instance
- [x] Docker + Docker Compose V2 installed
- [x] All 6 containers running via Docker Compose
- [x] Security Groups configured for all required ports

### ✅ Phase 4 — Infrastructure as Code (Terraform)
- [x] EC2 instance provisioned via Terraform
- [x] Security Groups (ports 22, 80, 443, 5000, 9090, 3001, 9100)
- [x] Fully automated setup via user_data script
- [x] Reduces manual setup from 30 mins to 3 mins

### ✅ Phase 5 — Monitoring & Observability
- [x] prom-client integrated in Node.js backend
- [x] Custom metrics: HTTP counter, duration histogram, active orders gauge
- [x] Node Exporter for EC2 system metrics
- [x] Prometheus scraping 3 targets every 15 seconds
- [x] Grafana dashboards for real-time visualization

### ✅ Phase 6 — Kubernetes Orchestration
- [x] Kubernetes manifests for all services
- [x] MySQL auto-seeded via ConfigMap + initdb
- [x] ReadinessProbes for all deployments
- [x] Secrets for sensitive configuration
- [x] LoadBalancer service for public access
- [x] Deployed on AWS EKS with c7i-flex.large nodes

---

## 🔌 API Reference

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/bookings` | Create new order |
| GET | `/metrics` | Prometheus metrics |

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
- Sensitive data stored in **environment variables & GitHub Secrets**

---

## 🐛 Challenges & Solutions

| Challenge | Solution |
|---|---|
| EC2 user_data script failing silently | Removed indentation from heredoc — bash requires no leading spaces |
| Private repo failing to clone in user_data | Made repo public — user_data runs as root with no GitHub credentials |
| docker-compose v1.29 ContainerConfig error | Upgraded to Docker Compose V2 |
| Prometheus active_orders always 0 | Switched from custom registry to default `client.register` |
| Kubernetes session issue with 2 replicas | Scaled to 1 replica (production fix: Redis shared session store) |
| EKS node group creation timeout | Changed from t3.medium to c7i-flex.large instance type |
| Large Terraform provider binary in GitHub | Added `.terraform/` to `.gitignore`, removed from history with `git filter-branch` |

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

> ⭐ If you find this project helpful, please give it a star! It helps others discover it.
