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

🧩 Domain Model
Product

Represents a sellable item.

Fields:

id – UUID

name

description

type

image_url

created_at

updated_at

Coupon Product

A product that contains multiple coupons.

Additional fields:

coupon_code

expiration_date

price

status

💰 Pricing Rules

The system enforces strict pricing logic:

Admin Pricing

Admin defines the base product price.

Reseller Pricing

Resellers must follow rules:

Cannot sell below minimum allowed price

Cannot manipulate internal coupon values

All pricing is validated by backend services

Validation occurs in the pricing engine layer.

🔌 Reseller API

External partners can purchase coupons via REST API.

Example request:

POST /api/resellers/purchase

Body:

{
  "productId": "123",
  "quantity": 5
}

Response:

{
  "coupons": [
    "COUPON-AB123",
    "COUPON-XF912"
  ]
}

Security is handled through API tokens.

🧱 Architecture

The backend follows a layered architecture:

Controller
   ↓
Service Layer
   ↓
Business Logic
   ↓
Repository / Prisma
   ↓
Database

Key principles:

Separation of concerns

Business logic isolated from controllers

Pricing rules enforced centrally

DTO validation

📸 Screenshots
Admin Panel

Manage products, pricing, and coupons.

Product Management

Admins can create and edit coupon products.

Storefront

Users can browse and purchase available coupons.

🧪 Testing

Tests include:

Business logic validation

Pricing rule enforcement

API endpoint behavior

Run tests:

npm run test
🐳 Docker

The project runs fully inside containers.

Services:

backend

frontend

postgres

Start everything:

docker-compose up --build
📁 Project Structure
backend
 ├── src
 │   ├── controllers
 │   ├── services
 │   ├── pricing
 │   ├── repositories
 │   └── modules
 │
frontend
 ├── pages
 ├── components
 └── services

docker-compose.yml
README.md
🚀 Features

Coupon marketplace backend

Admin product management

Reseller API

Pricing validation engine

Secure token authentication

Dockerized environment

PostgreSQL persistence

Swagger API docs

📌 Notes

This project was created as a backend engineering exercise focusing on:

backend architecture

business rule enforcement

API design

Dockerized environments

production-like structure
