# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace



A full-stack backend-focused system for selling digital coupon products through two channels:A full-stack backend-focused system for selling digital coupon products through two channels:



- **Direct customers** via the platform UI- **Direct customers** via the platform UI

- **External resellers** via a secure REST API- **External resellers** via a secure REST API



The system enforces strict pricing rules, supports product management, and exposes reseller APIs while maintaining clear business logic boundaries.The system enforces strict pricing rules, supports product management, and exposes reseller APIs while maintaining clear business logic boundaries.



The project is fully **Dockerized**, includes a minimal **admin interface**, and persists data in **PostgreSQL**.The project is fully **Dockerized**, includes a minimal **admin interface**, and persists data in **PostgreSQL**.



------



## 📑 Table of Contents# 🧠 System Overview



- [Architecture](#-architecture)The system is composed of:

- [Quick Start](#-quick-start)

- [Features](#-features)- **Admin Panel** – manage products and pricing

- [Tech Stack](#️-tech-stack)- **Customer Storefront** – purchase coupons directly

- [API Examples](#-api-examples)- **Reseller API** – external partners can purchase coupons programmatically

- [Pricing Rules](#-pricing-rules)- **Pricing Engine** – enforces pricing rules and prevents invalid reseller pricing

- [Screenshots](#-screenshots)- **Database** – stores products, coupons, and transactions

- [Testing](#-testing)

- [Docker](#-docker)---

- [Project Structure](#-project-structure)

- [Notes](#-notes)# 🛠️ Tech Stack



---Backend

- **NestJS**

## 🧱 Architecture- **TypeScript**

- **Prisma ORM**

![Architecture Diagram](screenshots/architecture.png)- **PostgreSQL**



The backend follows a layered architecture:Frontend

- **Next.js**

```- **React**

Controller- **Tailwind**

   ↓

Service LayerInfrastructure

   ↓- **Docker**

Business Logic- **Docker Compose**

   ↓

Repository / PrismaAPI

   ↓- **REST**

Database- **Swagger Documentation**

```

---

**Key principles:**

- Separation of concerns# 📦 Quick Start

- Business logic isolated from controllers

- Pricing rules enforced centrallyClone the repository:

- DTO validation

```bash

**System Components:**git clone https://github.com/YOUR_USERNAME/coupon-marketplace

- **Admin Panel** – manage products and pricingcd coupon-marketplace

- **Customer Storefront** – purchase coupons directlyRun the system using Docker:

- **Reseller API** – external partners can purchase coupons programmaticallydocker-compose up --build

- **Pricing Engine** – enforces pricing rules and prevents invalid reseller pricing```

- **Database** – stores products, coupons, and transactionsSwagger documentation:



---http://localhost:3000/api



## 📦 Quick StartFrontend:



Clone the repository:http://localhost:3001



```bash🧩 Domain Model

git clone https://github.com/KobiSaada/digital-coupon-marketplaceProduct

cd digital-coupon-marketplace

```Represents a sellable item.



Run the system using Docker:Fields:



```bashid – UUID

docker-compose up --build

```name



Services will start:description



| Service | Port | URL |type

|---------|------|-----|

| Backend API | 3000 | http://localhost:3000 |image_url

| Frontend | 3001 | http://localhost:3001 |

| PostgreSQL | 5432 | localhost:5432 |created_at



**Swagger Documentation:**updated_at



```Coupon Product

http://localhost:3000/api

```A product that contains multiple coupons.



**Admin Panel:**Additional fields:



```coupon_code

http://localhost:3001/admin

```expiration_date



Credentials: `admin` / `admin123`price



---status



## 🚀 Features💰 Pricing Rules



- **Dual Sales Channels** – Customer UI + Reseller APIThe system enforces strict pricing logic:

- **Admin Product Management** – Full CRUD operations

- **Reseller API** – Secure REST API for external partnersAdmin Pricing

- **Pricing Validation Engine** – Server-side pricing rules enforcement

- **Atomic Operations** – Database-level locking prevents race conditionsAdmin defines the base product price.

- **JWT Authentication** – Secure token-based auth

- **Random Coupon Codes** – Dynamic code generation (e.g., `NETFLIX-K7X9M2P4`)Reseller Pricing

- **Dockerized Environment** – Full containerization

- **PostgreSQL Persistence** – Reliable data storageResellers must follow rules:

- **Swagger API Documentation** – Interactive API docs

- **52+ Automated Tests** – Comprehensive test coverageCannot sell below minimum allowed price



---Cannot manipulate internal coupon values



## 🛠️ Tech StackAll pricing is validated by backend services



### BackendValidation occurs in the pricing engine layer.

- **NestJS** – Progressive Node.js framework

- **TypeScript** – Type-safe development🔌 Reseller API

- **Prisma ORM** – Type-safe database access

- **PostgreSQL** – Relational databaseExternal partners can purchase coupons via REST API.



### FrontendExample request:

- **Next.js 14** – React framework

- **React** – UI libraryPOST /api/resellers/purchase

- **Tailwind CSS** – Utility-first CSS

Body:

### Infrastructure

- **Docker** – Containerization{

- **Docker Compose** – Multi-container orchestration  "productId": "123",

  "quantity": 5

### API}

- **REST** – RESTful architecture

- **Swagger** – API documentationResponse:



---{

  "coupons": [

## 📡 API Examples    "COUPON-AB123",

    "COUPON-XF912"

### Authentication  ]

}

```bash

curl -X POST http://localhost:3000/auth/admin/login \Security is handled through API tokens.

  -H "Content-Type: application/json" \

  -d '{"username":"admin","password":"admin123"}'🧱 Architecture

```

The backend follows a layered architecture:

### Reseller Purchase

Controller

```bash   ↓

POST /api/v1/products/{id}/purchaseService Layer

```   ↓

Business Logic

**Request:**   ↓

Repository / Prisma

```json   ↓

{Database

  "reseller_price": 120.00

}Key principles:

```

Separation of concerns

**Response:**

Business logic isolated from controllers

```json

{Pricing rules enforced centrally

  "product_id": "uuid",

  "final_price": 120.00,DTO validation

  "value_type": "STRING",

  "value": "NETFLIX-K7X9M2P4"📸 Screenshots

}Admin Panel

```

Manage products, pricing, and coupons.

### Customer Purchase

Product Management

```bash

POST /customer/products/{id}/purchaseAdmins can create and edit coupon products.

```

Storefront

No authentication required. Customer pays the minimum sell price.

Users can browse and purchase available coupons.

---

🧪 Testing

## 💰 Pricing Rules

Tests include:

The system enforces strict pricing logic:

Business logic validation

### Formula

Pricing rule enforcement

```typescript

minimum_sell_price = cost_price × (1 + margin_percentage / 100)API endpoint behavior

```

Run tests:

**Example:**

- Cost: $80npm run test

- Margin: 25%🐳 Docker

- Minimum Price: $100

The project runs fully inside containers.

### Admin Pricing

Services:

Admin defines:

- `cost_price` – Internal costbackend

- `margin_percentage` – Profit margin

frontend

### Reseller Pricing

postgres

Resellers must follow rules:

- ✅ Can set `reseller_price` ≥ `minimum_sell_price`Start everything:

- ✅ Keep the difference as profit

- ❌ Cannot sell below minimum (returns error)docker-compose up --build

- ❌ Cannot manipulate internal coupon values📁 Project Structure

backend

### Customer Pricing ├── src

 │   ├── controllers

- 🔒 Always charged **exactly** `minimum_sell_price` │   ├── services

- 📱 No price negotiation │   ├── pricing

- ⚡ One-click purchase │   ├── repositories

 │   └── modules

**Validation occurs in the pricing engine layer.** │

frontend

--- ├── pages

 ├── components

## 📸 Screenshots └── services



### Admin Logindocker-compose.yml

README.md

![Admin Login](screenshots/admin-login.png)🚀 Features



### Admin PanelCoupon marketplace backend



Manage products, pricing, and coupons.Admin product management



![Admin Panel](screenshots/admin-panel.png)Reseller API



### Product ManagementPricing validation engine



![Products List](screenshots/products-list.png)Secure token authentication



### Customer StorefrontDockerized environment



Users can browse and purchase available coupons.PostgreSQL persistence



![Customer Shop](screenshots/customer-shop.png)Swagger API docs



### Purchase Success📌 Notes



![Purchase Success](screenshots/purchase-success.png)This project was created as a backend engineering exercise focusing on:



### My Couponsbackend architecture



![My Coupons](screenshots/my-coupons.png)business rule enforcement



### API DocumentationAPI design



![API Docs](screenshots/api-docs.png)Dockerized environments



---production-like structure


## 🧪 Testing

Tests include:
- Business logic validation
- Pricing rule enforcement
- API endpoint behavior
- Atomic operations
- Authentication flows

Run all tests:

```bash
cd tests
npm install
npm test
```

Quick API validation:

```bash
./test-reseller-api.sh
```

**Test Coverage: 52+ automated tests**

---

## 🐳 Docker

The project runs fully inside containers.

**Services:**
- `backend` – NestJS API
- `frontend` – Next.js UI
- `postgres` – PostgreSQL database

Start everything:

```bash
docker-compose up --build
```

View logs:

```bash
docker-compose logs -f
```

Stop services:

```bash
docker-compose down
```

Reset database:

```bash
docker-compose down -v
docker-compose up -d
```

---

## 📁 Project Structure

```
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
│   │   ├── page.tsx      # Customer shop
│   │   └── admin/        # Admin panel
│   └── lib/api.ts        # API client
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

## 📌 Notes

This project was created as a backend engineering exercise focusing on:

- **Backend Architecture** – Clean layered structure
- **Business Rule Enforcement** – Server-side validation
- **API Design** – RESTful best practices
- **Dockerized Environments** – Production-ready containers
- **Production-like Structure** – Professional codebase organization

---

## 👨‍💻 Author

**Koby Saada**  
Full-Stack Engineer

---

## 📞 Links

- **GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace
- **API Docs:** http://localhost:3000/api
- **Frontend:** http://localhost:3001

---

<div align="center">

**Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**

</div>
