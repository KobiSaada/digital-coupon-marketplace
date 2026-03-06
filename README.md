# 🎟️ Digital Coupon Marketplace

A full-stack backend-focused system for selling digital coupon products through two channels:

- **Direct customers** via the platform UI
- **External resellers** via a secure REST API

The system enforces strict pricing rules, supports product management, and exposes reseller APIs while maintaining clear business logic boundaries.

The project is fully **Dockerized**, includes a minimal **admin interface**, and persists data in **PostgreSQL**.

---

# 🧠 System Overview

The system is composed of:

- **Admin Panel** – manage products and pricing
- **Customer Storefront** – purchase coupons directly
- **Reseller API** – external partners can purchase coupons programmatically
- **Pricing Engine** – enforces pricing rules and prevents invalid reseller pricing
- **Database** – stores products, coupons, and transactions

---

# 🛠️ Tech Stack

Backend
- **NestJS**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

Frontend
- **Next.js**
- **React**
- **Tailwind**

Infrastructure
- **Docker**
- **Docker Compose**

API
- **REST**
- **Swagger Documentation**

---

# 📦 Quick Start

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/coupon-marketplace
cd coupon-marketplace
Run the system using Docker:
docker-compose up --build
```
Swagger documentation:

http://localhost:3000/api

Frontend:

http://localhost:3001
