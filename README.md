# 🍛 Tasty Hub — Full Stack Food Delivery App

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2%20Deployed-FF9900?style=flat&logo=amazonaws)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=flat&logo=terraform)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5?style=flat&logo=kubernetes)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?style=flat&logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800?style=flat&logo=grafana)

> A production-ready full-stack food ordering web application, built as a **DevOps practice project** to implement real-world containerization, CI/CD pipelines, cloud deployment, Kubernetes orchestration, and monitoring workflows.

---

## 🌐 Live Demo
> ✅ Deployed on AWS EC2 (t3.small) via Terraform
> ✅ Also deployed on AWS EKS (Kubernetes)
> 💡 Instances stopped when not in use to avoid AWS charges
> 🐳 Run locally instantly using Docker — see setup below

---

## 📌 What is Tasty Hub?

Tasty Hub is an end-to-end food ordering platform where customers can browse the menu, place orders, and track delivery status. Restaurant admins can manage all incoming orders through a secure dashboard.

The application is intentionally built to mirror a **real-world production system** — making it a perfect base for practising DevOps workflows including Docker, GitHub Actions CI/CD, AWS deployment, Terraform IaC, Kubernetes orchestration, and Prometheus + Grafana monitoring.

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
| Prometheus + Grafana | ✅ Complete | Monitoring & Observability |

---

## 🚀 Option 1 — Run with Docker (Local)

### Prerequisites
- Docker Desktop installed

```bash
git clone https://github.com/Chandangadewar/Tasty-hub-app.git
cd Tasty-hub-app/docker
cp .env.example .env
docker-compose up -d
```

Visit **http://localhost** ✅

---

## ☁️ Option 2 — Run with Terraform (AWS EC2)

### Prerequisites
- Terraform installed
- AWS CLI configured
- Key pair named `pem` in AWS

```bash
cd terraform
terraform apply -var="key_name=pem"
# Destroy when done
terraform destroy -var="key_name=pem"
```

Wait ~3 minutes → app runs automatically at the output IP!

---

## ☸️ Option 3 — Run with Kubernetes (AWS EKS)

### Prerequisites
- kubectl + eksctl installed
- AWS CLI configured

```bash
# Create cluster (15-20 mins)
eksctl create cluster \
  --name tastyhub-cluster \
  --region ap-south-1 \
  --nodegroup-name tastyhub-nodes \
  --node-type c7i-flex.large \
  --nodes 1 \
  --managed

# Deploy everything
kubectl apply -f k8s/

# Get Load Balancer URL
kubectl get services -n tastyhub

# Destroy when done
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

| Service | URL | Credentials |
|---|---|---|
| App | http://\<ip\> | - |
| Grafana | http://\<ip\>:3001 | admin/admin123 |
| Prometheus | http://\<ip\>:9090 | - |
| Metrics | http://\<ip\>:5000/metrics | - |

---

## 🗺️ DevOps Implementation Roadmap

### ✅ Phase 0 — Application Development
- [x] Built full-stack React + Node.js + MySQL application
- [x] Implemented REST API with CRUD operations
- [x] Admin authentication with bcrypt + sessions
- [x] Form validation on frontend and backend

### ✅ Phase 1 — Containerization
- [x] Dockerfile for React frontend (multi-stage with Nginx)
- [x] Dockerfile for Node.js backend
- [x] MySQL container with auto-seed via init scripts
- [x] docker-compose.yml for full stack
- [x] Docker images pushed to Docker Hub

### ✅ Phase 2 — CI/CD Pipeline
- [x] GitHub Actions workflow (build-push.yml)
- [x] Auto build & push Docker images on push to main
- [x] Auto deploy to EC2 on successful build (deploy.yml)

### ✅ Phase 3 — Cloud Deployment (AWS EC2)
- [x] Launched AWS EC2 instance (t3.small)
- [x] Installed Docker on EC2
- [x] App deployed and running on AWS EC2

### ✅ Phase 4 — Infrastructure as Code (Terraform)
- [x] EC2 instance via Terraform
- [x] Security Groups via Terraform
- [x] Fully automated setup via user_data script

### ✅ Phase 5 — Monitoring & Observability
- [x] Prometheus metrics in Node.js backend (prom-client)
- [x] HTTP requests counter and duration histogram
- [x] Active orders gauge (real-time)
- [x] Node Exporter for EC2 system metrics
- [x] Grafana dashboards for visualization

### ✅ Phase 6 — Kubernetes Orchestration
- [x] Kubernetes deployment manifests
- [x] Services and Ingress configured
- [x] MySQL auto-seeded via ConfigMap
- [x] Deployed on AWS EKS cluster
- [x] App accessible via AWS Load Balancer

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
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/bookings` | Get all orders |
| PUT | `/api/bookings/:id/status` | Update order status |
| DELETE | `/api/bookings/:id` | Delete order |

---

## 🔒 Security Implementation
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Admin routes protected by **session middleware**
- Session cookies are **httpOnly**
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
