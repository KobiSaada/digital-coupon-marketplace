# 🎟️ Digital Coupon Marketplace

A **backend-focused full-stack system** for selling digital coupon products through two channels:

- **Direct customers** via the platform UI
- **External resellers** via a secure REST API

The system enforces **strict pricing rules**, supports **admin product management**, and exposes a **secure reseller API** while maintaining clear business logic boundaries.

The project is fully **Dockerized**, includes a minimal **admin interface**, and persists data using **PostgreSQL**.

---

# 📑 Table of Contents

- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Pricing Rules](#-pricing-rules)
- [API Examples](#-api-examples)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Docker](#-docker)
- [Project Structure](#-project-structure)
- [Notes](#-notes)
- [Author](#-author)
- [Links](#-links)

---

# 🧱 Architecture

The backend follows a **layered architecture**:

```text
Controller
   ↓
Service Layer
   ↓
Business Logic
   ↓
Repository / Prisma
   ↓
Database
````

**Key principles:**

* Separation of concerns
* Business logic isolated from controllers
* Pricing rules enforced centrally
* DTO validation

### Architecture Diagram

<p align="center">
  <img src="screenshots/architecture.png" width="600">
</p>

---

# ⚡ Quick Start

### Clone the repository

```bash
git clone https://github.com/KobiSaada/digital-coupon-marketplace.git
cd digital-coupon-marketplace
```

### Run the system using Docker

```bash
docker-compose up --build
```

### Services will start

| Service     | Port | URL                                            |
| ----------- | ---- | ---------------------------------------------- |
| Backend API | 3000 | [http://localhost:3000](http://localhost:3000) |
| Frontend    | 3001 | [http://localhost:3001](http://localhost:3001) |
| PostgreSQL  | 5432 | localhost:5432                                 |

### Swagger Documentation

```text
http://localhost:3000/api
```

### Admin Panel

```text
http://localhost:3001/admin
```

**Credentials:** `admin / admin123`

---

# 🚀 Features

* Dual sales channels (Customer UI + Reseller API)
* Admin product management (CRUD)
* Secure reseller API
* Pricing validation engine
* Atomic database operations
* JWT authentication
* Random coupon code generation
* Dockerized environment
* PostgreSQL persistence
* Swagger API documentation
* 52+ automated tests

---

# 🛠️ Tech Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL

### Frontend

* Next.js
* React
* Tailwind CSS

### Infrastructure

* Docker
* Docker Compose

### API

* REST
* Swagger

---

# 💰 Pricing Rules

The system enforces strict pricing validation.

### Formula

```text
minimum_sell_price = cost_price × (1 + margin_percentage / 100)
```

**Example:**

* Cost: $80
* Margin: 25%
* Minimum Price: $100

### Admin Pricing

Admin defines:

* `cost_price`
* `margin_percentage`

### Reseller Pricing

Resellers must follow rules:

* ✅ Can set `reseller_price` ≥ `minimum_sell_price`
* ❌ Cannot sell below minimum price
* ❌ Cannot manipulate coupon values

### Customer Pricing

Customers always pay **exactly the minimum sell price**.

All validations occur in the **pricing engine layer**.

---

# 📡 API Examples

### Authentication

```bash
curl -X POST http://localhost:3000/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Reseller Purchase

```http
POST /api/v1/products/{id}/purchase
```

**Request:**

```json
{
  "reseller_price": 120.00
}
```

**Response:**

```json
{
  "product_id": "uuid",
  "final_price": 120.00,
  "value": "NETFLIX-K7X9M2P4"
}
```

### Customer Purchase

```http
POST /customer/products/{id}/purchase
```

No authentication required. Customer pays the minimum sell price.

---

# 📸 Screenshots

<p align="center">

<img src="screenshots/admin-login.png" width="300"/>
<img src="screenshots/admin-panel.png" width="300"/>
<img src="screenshots/products-list.png" width="300"/>
<img src="screenshots/purchase-success.png" width="300"/>
<img src="screenshots/my-coupons.png" width="300"/>
<img src="screenshots/api-docs.png" width="300"/>

</p>

---

# 🧪 Testing

Tests include:

* Business logic validation
* Pricing rule enforcement
* API endpoint behavior
* Atomic operations
* Authentication flows

### Run all tests

```bash
cd tests
npm install
npm test
```

### Quick API validation

```bash
./test-reseller-api.sh
```

**Test Coverage:** `52+ automated tests`

---

# 🐳 Docker

The project runs fully inside containers.

### Services

* `backend` – NestJS API
* `frontend` – Next.js UI
* `postgres` – PostgreSQL database

### Start everything

```bash
docker-compose up --build
```

### View logs

```bash
docker-compose logs -f
```

### Stop services

```bash
docker-compose down
```

### Reset database

```bash
docker-compose down -v
docker-compose up -d
```

---

# 📁 Project Structure

```text
├── backend/                # NestJS API
│   ├── src/
│   │   ├── admin/         # Admin CRUD module
│   │   ├── auth/          # JWT authentication
│   │   ├── customer/      # Customer endpoints
│   │   ├── reseller/      # Reseller API
│   │   ├── common/        # Shared utilities
│   │   └── prisma/        # Database service
│   └── prisma/
│       ├── schema.prisma  # Database schema
│       └── seed.ts        # Seed data
│
├── frontend/              # Next.js UI
│   ├── app/
│   │   ├── page.tsx       # Customer shop
│   │   └── admin/         # Admin panel
│   └── lib/api.ts         # API client
│
├── tests/                 # Automated tests (52+)
│   ├── reseller.test.js
│   ├── admin.test.js
│   └── customer.test.js
│
├── screenshots/           # Project screenshots
├── docker-compose.yml     # Docker configuration
└── README.md
```

---

# 📌 Notes

This project was created as a backend engineering exercise focusing on:

* Backend architecture
* Business rule enforcement
* API design
* Dockerized environments
* Production-like project structure

---

# 👨‍💻 Author

**Koby Saada**
Full-Stack Engineer

---

# 📞 Links

* **GitHub:** [https://github.com/KobiSaada/digital-coupon-marketplace](https://github.com/KobiSaada/digital-coupon-marketplace)
* **API Docs:** [http://localhost:3000/api](http://localhost:3000/api)
* **Frontend:** [http://localhost:3001](http://localhost:3001)

---

<div align="center">

**Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**

</div>

