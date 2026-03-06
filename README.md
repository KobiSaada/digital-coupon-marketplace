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
- [Tech Stack](#️-tech-stack)
- [Design Decisions](#-design-decisions)
- [Pricing Rules](#-pricing-rules)
- [API Examples](#-api-examples)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Notes](#-notes)
- [Author](#-author)


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

### Prerequisites

- **Docker & Docker Compose** (recommended)
- **OR** Node.js 18+, PostgreSQL 14+

### Environment Setup

1. **Clone the repository:**

```bash
git clone https://github.com/KobiSaada/digital-coupon-marketplace.git
cd digital-coupon-marketplace
```

2. **Configure environment variables:**

**Backend** (`backend/.env`):
```bash
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/coupon_marketplace?schema=public"
ADMIN_TOKEN="admin-secret-token"
```

**Frontend** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> 💡 **Note:** `.env.example` files are provided in both directories. Copy them to `.env` / `.env.local` and adjust if needed.

### Option 1: Run with Docker (Recommended)

```bash
docker-compose up --build
```

All services start automatically with correct configuration.

### Option 2: Run Locally (Without Docker)

**1. Start PostgreSQL:**
```bash
# Make sure PostgreSQL is running on localhost:5432
# Create database: coupon_marketplace
```

**2. Backend:**
```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

**3. Frontend (in new terminal):**
```bash
cd frontend
npm install
npm run dev
```

### Access the Application

| Service     | Port | URL                                            |
| ----------- | ---- | ---------------------------------------------- |
| Backend API | 3000 | [http://localhost:3000](http://localhost:3000) |
| Frontend    | 3001 | [http://localhost:3001](http://localhost:3001) |
| PostgreSQL  | 5432 | localhost:5432                                 |
| Swagger API | 3000 | [http://localhost:3000/api](http://localhost:3000/api) |

### Admin Credentials

```
Username: admin
Password: admin123
```

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
- **NestJS** – Modular Node.js framework with dependency injection
- **TypeScript** – Type safety and modern JavaScript features
- **Prisma ORM** – Type-safe database client with migrations
- **PostgreSQL** – Relational database with ACID compliance

### Frontend
- **Next.js 14** – React framework with App Router
- **React** – UI component library
- **Tailwind CSS** – Utility-first CSS framework

### Infrastructure
- **Docker** – Containerization
- **Docker Compose** – Multi-container orchestration

### API & Documentation
- **REST** – Pragmatic API design
- **Swagger/OpenAPI** – Interactive API documentation
- **JWT** – Stateless authentication

---

# 🧠 Design Decisions

### 1. **Dual Sales Channel Architecture**
Separated customer and reseller flows at the controller level to ensure:
- Different pricing logic per channel
- Independent authentication strategies
- Clear business boundaries

### 2. **Pricing Engine as Core Business Logic**
Centralized pricing validation in a dedicated service layer:
- Single source of truth for price calculations
- Prevents manipulation by any sales channel
- Easy to test and modify pricing rules

### 3. **Atomic Coupon Generation**
Used database transactions (`$transaction`) to ensure:
- Coupon codes are unique
- Product inventory is accurate
- No partial purchases (all-or-nothing)

### 4. **Reseller API as First-Class Citizen**
Designed the reseller API with:
- JWT authentication for security
- Flexible pricing (within margin rules)
- RESTful endpoints for integration

### 5. **Admin Panel for Non-Technical Users**
Built a minimal but functional admin UI:
- CRUD operations without API knowledge
- Real-time product management
- Simple authentication (username/password)

### 6. **Docker-First Development**
Chose Docker Compose for consistency:
- No "works on my machine" issues
- Simplified onboarding for reviewers
- Production-like environment locally

### 7. **Prisma Over Raw SQL**
Selected Prisma ORM for:
- Type-safe queries (catches errors at compile time)
- Automated migrations
- Cleaner codebase vs raw SQL

### 8. **Stateless Architecture**
Used JWT tokens instead of sessions:
- Scalable (no server-side session storage)
- Works well with microservices
- Easier to test

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

**Test Coverage:** `52+ automated tests`

---

#  Project Structure

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



