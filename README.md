# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace# 🎟️ Digital Coupon Marketplace



> Full-stack marketplace for digital coupons with dual sales channels



[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)> Full-stack marketplace for digital coupons with **dual sales channels**: Customer Shop & Reseller API



---



## 🚀 Quick Start[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)> Full-stack marketplace for digital coupons with **dual sales channels**: Customer Shop & Reseller API



```bash

git clone https://github.com/KobiSaada/digital-coupon-marketplace.git

cd digital-coupon-marketplace---

docker-compose up -d

```



**Access:**## 🚀 Quick Start[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)> Full-stack marketplace for digital coupons with **dual channels**: Customer Shop & Reseller API

- 🛍️ Shop: http://localhost:3001

- 🔧 Admin: http://localhost:3001/admin (admin/admin123)

- 📡 API Docs: http://localhost:3000/api

```bash

---

git clone https://github.com/KobiSaada/digital-coupon-marketplace.git

## 📖 About

cd digital-coupon-marketplace---

Professional marketplace with **two sales channels**:

- **Customer Shop** - Direct web purchasesdocker-compose up -d

- **Reseller API** - REST API for external businesses

```

**Tech Stack:** NestJS • Next.js • PostgreSQL • Docker • Prisma



---

**Access:**## 🚀 Quick Start![Next.js](https://img.shields.io/badge/Next.js-14-black) ![NestJS](https://img.shields.io/badge/NestJS-10-red) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)> Full-stack marketplace for digital coupons with **dual channels**: Customer Shop & Reseller API> Full-stack marketplace for digital coupons with **dual channels**: Customer Shop & Reseller API

## 🏗️ Architecture

- 🛍️ Shop: http://localhost:3001

![Architecture](screenshots/architecture.png)

- 🔧 Admin: http://localhost:3001/admin (admin/admin123)

---

- 📡 API: http://localhost:3000/api

## 📸 Screenshots

```bash

### Customer Shop

![Customer Shop](screenshots/customer-shop.png)---



### Purchase Successgit clone https://github.com/KobiSaada/digital-coupon-marketplace.git

![Purchase Success](screenshots/purchase-success.png)

## 📖 About

### Admin Panel

![Admin Panel](screenshots/admin-panel.png)cd digital-coupon-marketplace---



### Admin LoginProfessional marketplace with **two channels**:

![Admin Login](screenshots/admin-login.png)

- **Customer Shop** - Direct purchasesdocker-compose up -d

### My Coupons

![My Coupons](screenshots/my-coupons.png)- **Reseller API** - External business integration



### API Documentation```

![API Docs](screenshots/api-docs.png)

**Stack:** NestJS • Next.js • PostgreSQL • Docker • Prisma

---



## 📡 API Examples

---

**Login:**

```bash**Access:**## 🚀 Quick Start[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

curl -X POST http://localhost:3000/auth/admin/login \

  -d '{"username":"admin","password":"admin123"}'## 🏗️ Architecture

```

- 🛍️ Shop: http://localhost:3001

**Purchase (Reseller):**

```bash![Architecture Diagram](screenshots/architecture.png)

curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \

  -H "Authorization: Bearer TOKEN" \- 🔧 Admin: http://localhost:3001/admin (admin/admin123)

  -d '{"reseller_price": 120.00}'

```---



---- 📡 API: http://localhost:3000/api



## 💼 Business Logic## 📸 Screenshots



- **Pricing:** `min_price = cost × (1 + margin/100)````bash

- **Random Codes:** `NETFLIX-{random}` → `NETFLIX-K7X9M2P4`

- **Atomic Sales:** Database locking prevents duplicates### 🛍️ Customer Shop



---![Customer Shop](screenshots/customer-shop.png)---



## 🧪 Testing



```bash### 🎉 Purchase Successgit clone https://github.com/KobiSaada/digital-coupon-marketplace.git

cd tests && npm test              # 52+ tests

./test-reseller-api.sh            # API validation![Purchase Success](screenshots/purchase-success.png)

```

## 📖 About

---

### 🔧 Admin Panel

## 🐳 Docker

![Admin Panel](screenshots/admin-panel.png)cd digital-coupon-marketplace------

```bash

docker-compose up -d              # Start

docker-compose logs -f            # Logs

docker-compose down -v            # Reset### 🔐 Admin LoginProfessional marketplace with **two channels**:

```

![Admin Login](screenshots/admin-login.png)

---

- **Customer Shop** - Direct purchasesdocker-compose up -d

## 📁 Structure

### 📦 My Coupons

```

├── backend/          # NestJS API![My Coupons](screenshots/my-coupons.png)- **Reseller API** - External business integration

│   ├── src/         # Source code

│   └── prisma/      # Database

├── frontend/         # Next.js

└── tests/            # Jest (52+)### 📡 API Documentation```

```

![API Docs](screenshots/api-docs.png)

---

**Stack:** NestJS • Next.js • PostgreSQL • Docker • Prisma

## 🔧 Troubleshooting

---

| Issue | Solution |

|-------|----------|

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB failed | `docker-compose restart db` |## 📡 API Examples

| Reset all | `docker-compose down -v && docker-compose up -d` |

---

---

**Get Token:**

## 🎯 Features

```bash**Access:**## 🚀 Quick Start## 🚀 Quick Start

✅ Dual channels • ✅ JWT auth • ✅ Smart pricing  

✅ Atomic operations • ✅ Admin panel • ✅ 52+ tests  curl -X POST http://localhost:3000/auth/admin/login \

✅ Swagger docs • ✅ Docker ready

  -d '{"username":"admin","password":"admin123"}'## 🏗️ Architecture

---

```

## 📞 Links

- 🛍️ Shop: http://localhost:3001

- **GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace

- **API Docs:** http://localhost:3000/api**Purchase (Reseller):**

- **Frontend:** http://localhost:3001

```bash```

---

curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \

<div align="center">

  -H "Authorization: Bearer TOKEN" \Customer Shop ──┐- 🔧 Admin: http://localhost:3001/admin (admin/admin123)

**Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**

  -d '{"reseller_price": 120.00}'

</div>

```Admin Panel ────┼──→ NestJS API ──→ PostgreSQL



**Docs:** http://localhost:3000/apiReseller API ───┘        ↓- 📡 API: http://localhost:3000/api



---                    Prisma ORM



## 💼 Business Logic``````bash



**Pricing:** `min_price = cost × (1 + margin/100)`  

**Random Codes:** `NETFLIX-{random}` → `NETFLIX-K7X9M2P4`  

**Atomic Sales:** Database-level locking prevents duplicates------



---



## 🧪 Testing## 📸 Screenshots# Clone & navigate



```bash

cd tests && npm test              # 52+ tests

./test-reseller-api.sh            # Quick validation| Customer Shop | Purchase Success | Admin Panel | My Coupons |## 📖 About

```

|---------------|------------------|-------------|------------|

---

| ![Shop](screenshots/customer-products.png) | ![Success](screenshots/purchase-success.png) | ![Admin](screenshots/admin-table.png) | ![Coupons](screenshots/my-coupons-badge.png) |git clone https://github.com/KobiSaada/digital-coupon-marketplace.git```bash

## 🐳 Docker



```bash

docker-compose up -d              # Start---Professional marketplace with **two channels**:

docker-compose logs -f            # Logs

docker-compose down -v            # Reset

```

## 📡 API Examples- **Customer Shop** - Direct purchasescd digital-coupon-marketplace# Clone & navigate

---



## 📁 Structure

**Get Token:**- **Reseller API** - External business integration

```

├── backend/          # NestJS API```bash

│   ├── src/

│   │   ├── admin/   # CRUDcurl -X POST http://localhost:3000/auth/admin/login \git clone https://github.com/KobiSaada/digital-coupon-marketplace.git

│   │   ├── auth/    # JWT

│   │   ├── customer/  -d '{"username":"admin","password":"admin123"}'

│   │   └── reseller/

│   └── prisma/```**Stack:** NestJS • Next.js • PostgreSQL • Docker • Prisma

├── frontend/         # Next.js

└── tests/            # Jest (52+)

```

**Purchase (Reseller):**# Start everything (Docker required)cd digital-coupon-marketplace

---

```bash

## 🔧 Troubleshooting

curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \---

| Issue | Fix |

|-------|-----|  -H "Authorization: Bearer TOKEN" \

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB failed | `docker-compose restart db` |  -d '{"reseller_price": 120.00}'docker-compose up -d

| Reset | `docker-compose down -v && docker-compose up -d` |

```

---

## 🏗️ Architecture

## 🎯 Features

**Docs:** http://localhost:3000/api

✅ Dual channels • ✅ JWT auth • ✅ Smart pricing  

✅ Atomic ops • ✅ Admin panel • ✅ 52+ tests  ```# Start everything (Docker required)

✅ Swagger docs • ✅ Docker ready

---

---

```

## 📞 Links

## 💼 Business Logic

**GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace  

**API:** http://localhost:3000/api  Customer Shop ──┐docker-compose up -d

**Frontend:** http://localhost:3001

**Pricing:** `min_price = cost × (1 + margin/100)`  

---

**Random Codes:** `NETFLIX-{random}` → `NETFLIX-K7X9M2P4`  Admin Panel ────┼──→ NestJS API ──→ PostgreSQL

<div align="center">

Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**Atomic Sales:** Database-level locking prevents duplicates

</div>

Reseller API ───┘        ↓**Access:**```

---

                    Prisma ORM

## 🧪 Testing

```- 🛍️ Customer Shop: http://localhost:3001

```bash

cd tests && npm test              # 52+ tests

./test-reseller-api.sh            # Quick validation

```---- 🔧 Admin Panel: http://localhost:3001/admin (admin / admin123)**Access:**



---



## 🐳 Docker## 📸 Screenshots- 📡 API Docs: http://localhost:3000/api- 🛍️ Customer Shop: http://localhost:3001



```bash

docker-compose up -d              # Start

docker-compose logs -f            # Logs| Shop | Success | Admin | Coupons |- 🔧 Admin Panel: http://localhost:3001/admin (admin / admin123)

docker-compose down -v            # Reset

```|------|---------|-------|---------|



---| ![](screenshots/customer-products.png) | ![](screenshots/purchase-success.png) | ![](screenshots/admin-table.png) | ![](screenshots/my-coupons-badge.png) |---- 📡 API Docs: http://localhost:3000/api



## 📁 Structure



```---

├── backend/          # NestJS API

│   ├── src/

│   │   ├── admin/   # CRUD

│   │   ├── auth/    # JWT## 📡 API Examples## 📖 About---

│   │   ├── customer/

│   │   └── reseller/

│   └── prisma/

├── frontend/         # Next.js**Get Token:**

└── tests/            # Jest (52+)

``````bash



---curl -X POST http://localhost:3000/auth/admin/login \Professional marketplace with **two sales channels**:## 📖 About



## 🔧 Troubleshooting  -d '{"username":"admin","password":"admin123"}'



| Issue | Fix |```- **Customer Shop** - Web UI for end customers

|-------|-----|

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB failed | `docker-compose restart db` |

| Reset | `docker-compose down -v && docker-compose up -d` |**Purchase (Reseller):**- **Reseller API** - REST API for external businessesProfessional marketplace with **two sales channels**:



---```bash



## 🎯 Featurescurl -X POST http://localhost:3000/api/v1/products/{id}/purchase \- **Customer Shop** - Web UI for end customers



✅ Dual channels • ✅ JWT auth • ✅ Smart pricing    -H "Authorization: Bearer TOKEN" \

✅ Atomic ops • ✅ Admin panel • ✅ 52+ tests  

✅ Swagger docs • ✅ Docker ready  -d '{"reseller_price": 120.00}'**Features:** JWT Auth • Smart Pricing • Dynamic Codes • Atomic Operations • 52+ Tests- **Reseller API** - REST API for external businesses



---```



## 📞 Links



**GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace  **Docs:** http://localhost:3000/api

**API:** http://localhost:3000/api  

**Frontend:** http://localhost:3001---**Features:** JWT Auth • Smart Pricing • Dynamic Codes • Atomic Operations • 52+ Tests



------



<div align="center">

Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker

</div>## 💼 Business Logic


## 🏗️ Architecture---

**Pricing:** `min_price = cost × (1 + margin/100)`  

**Random Codes:** `NETFLIX-{random}` → `NETFLIX-K7X9M2P4`  

**Atomic Sales:** Database-level locking prevents duplicates

```## 🏗️ Architecture

---

Customer Shop ──┐

## 🧪 Testing

Admin Panel ────┼──→ NestJS API ──→ PostgreSQL

```bash

cd tests && npm test              # 52+ testsReseller API ───┘        ↓

./test-reseller-api.sh            # Quick validation

```                    Prisma ORM```



---```Customer Shop ──┐



## 🐳 DockerAdmin Panel ────┼──→ NestJS API ──→ PostgreSQL



```bash**Stack:** NestJS 10 • Next.js 14 • PostgreSQL 15 • DockerReseller API ───┘        ↓

docker-compose up -d              # Start

docker-compose logs -f            # Logs                    Prisma ORM

docker-compose down -v            # Reset

```---```



---



## 📁 Structure## 📸 Screenshots**Stack:** NestJS 10 • Next.js 14 • PostgreSQL 15 • Docker



```

├── backend/          # NestJS API

│   ├── src/| Customer Shop | Purchase Success |---

│   │   ├── admin/   # CRUD

│   │   ├── auth/    # JWT|---------------|------------------|

│   │   ├── customer/

│   │   └── reseller/| ![Shop](screenshots/customer-products.png) | ![Success](screenshots/purchase-success.png) |##  Screenshots

│   └── prisma/

├── frontend/         # Next.js

└── tests/            # Jest (52+)

```| Admin Panel | My Coupons || Customer Shop | Purchase Success |



---|-------------|------------||---------------|------------------|



## 🔧 Troubleshooting| ![Admin](screenshots/admin-table.png) | ![Coupons](screenshots/my-coupons-badge.png) || ![Shop](screenshots/customer-products.png) | ![Success](screenshots/purchase-success.png) |



| Issue | Fix |

|-------|-----|

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |---| Admin Panel | My Coupons |

| DB failed | `docker-compose restart db` |

| Reset | `docker-compose down -v && docker-compose up -d` ||-------------|------------|



---## 📡 API Examples| ![Admin](screenshots/admin-table.png) | ![Coupons](screenshots/my-coupons-badge.png) |



## 🎯 Features



✅ Dual channels • ✅ JWT auth • ✅ Smart pricing  ### Get Token---

✅ Atomic ops • ✅ Admin panel • ✅ 52+ tests  

✅ Swagger docs • ✅ Docker ready```bash



---curl -X POST http://localhost:3000/auth/admin/login \## 📡 API Examples



## 📞 Links  -H "Content-Type: application/json" \



**GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace    -d '{"username":"admin","password":"admin123"}'### Get Token

**API:** http://localhost:3000/api  

**Frontend:** http://localhost:3001``````bash



---curl -X POST http://localhost:3000/auth/admin/login \



<div align="center">### Purchase (Reseller)  -H "Content-Type: application/json" \

Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker

</div>```bash  -d '{"username":"admin","password":"admin123"}'


curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \```

  -H "Authorization: Bearer TOKEN" \

  -d '{"reseller_price": 120.00}'### Purchase (Reseller)

``````bash

curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \

**Response:**  -H "Authorization: Bearer TOKEN" \

```json  -d '{"reseller_price": 120.00}'

{```

  "product_id": "uuid",

  "final_price": 120.00,**Response:**

  "value": "NETFLIX-K7X9M2P4"```json

}{

```  "product_id": "uuid",

  "final_price": 120.00,

**Full Docs:** http://localhost:3000/api  "value": "NETFLIX-K7X9M2P4"

}

---```



## 💼 Business Logic**Full Docs:** http://localhost:3000/api



**Pricing:**---

```typescript

min_price = cost × (1 + margin/100)## 💼 Business Logic

// Example: $80 × 1.25 = $100

```**Pricing:**

```typescript

**Random Codes:**min_price = cost × (1 + margin/100)

```// Example: $80 × 1.25 = $100

Template: "NETFLIX-{random}"```

Generated: "NETFLIX-K7X9M2P4"

```**Random Codes:**

```

**Atomic Sales:** Database-level locking prevents duplicate salesTemplate: "NETFLIX-{random}"

Generated: "NETFLIX-K7X9M2P4"

---```



## 🧪 Testing**Atomic Sales:** Database-level locking prevents duplicate sales



```bash---

# 52+ automated tests

cd tests && npm install && npm test## 🧪 Testing



# Quick API validation```bash

./test-reseller-api.sh# 52+ automated tests

```cd tests && npm install && npm test



---# Quick API validation

./test-reseller-api.sh

## 🐳 Docker```



```bash---

docker-compose up -d          # Start

docker-compose logs -f         # Logs## 🐳 Docker

docker-compose down -v         # Reset

``````bash

docker-compose up -d          # Start

---docker-compose logs -f         # Logs

docker-compose down -v         # Reset

## 📁 Structure```



```---

├── backend/           # NestJS API

│   ├── src/## 📁 Structure

│   │   ├── admin/    # CRUD

│   │   ├── auth/     # JWT```

│   │   ├── customer/ # Shop├── backend/           # NestJS API

│   │   └── reseller/ # API│   ├── src/

│   └── prisma/       # Schema│   │   ├── admin/    # CRUD

├── frontend/          # Next.js│   │   ├── auth/     # JWT

│   ├── app/│   │   ├── customer/ # Shop

│   │   ├── page.tsx       # Shop│   │   └── reseller/ # API

│   │   └── admin/         # Panel│   └── prisma/       # Schema

│   └── lib/api.ts├── frontend/          # Next.js

└── tests/             # Jest (52+)│   ├── app/

```│   │   ├── page.tsx       # Shop

│   │   └── admin/         # Panel

---│   └── lib/api.ts

└── tests/             # Jest (52+)

## 🔧 Troubleshooting```



| Issue | Fix |---

|-------|-----|

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |## 🔧 Troubleshooting

| DB failed | `docker-compose restart db` |

| Reset all | `docker-compose down -v && docker-compose up -d` || Issue | Fix |

|-------|-----|

---| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB failed | `docker-compose restart db` |

## 🎯 Features| Reset all | `docker-compose down -v && docker-compose up -d` |



✅ Dual channels (Customer + Reseller)  ---

✅ JWT authentication  

✅ Server-side pricing  ## 🎯 Features

✅ Atomic operations  

✅ Admin CRUD panel  ✅ Dual channels (Customer + Reseller)  

✅ 52+ automated tests  ✅ JWT authentication  

✅ Swagger docs  ✅ Server-side pricing  

✅ Docker ready  ✅ Atomic operations  

✅ Admin CRUD panel  

---✅ 52+ automated tests  

✅ Swagger docs  

## 📞 Links✅ Docker ready  



**GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace  ---

**API Docs:** http://localhost:3000/api  

**Frontend:** http://localhost:3001## 📞 Links



---**GitHub:** https://github.com/KobiSaada/digital-coupon-marketplace  

**API Docs:** http://localhost:3000/api  

<div align="center">**Frontend:** http://localhost:3001



Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker---



</div><div align="center">


Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker

</div>

## 📸 Screenshots        │ Prisma ORM + PostgreSQL   ││   │   ├── common/             # Error handling, filters



<table>        │  ┌─────────┐ ┌─────────┐  │

<tr>

<td width="50%">        │  │Products │ │ Coupons │  │---│   │   └── prisma/             # Database service



### 🛍️ Customer Shop        │  └─────────┘ └─────────┘  │

![Customer Shop](screenshots/customer-products.png)

*Browse & purchase coupons*        └───────────────────────────┘│   ├── prisma/



</td>```

<td width="50%">

## ✨ Features│   │   ├── schema.prisma       # Database schema

### 🎉 Purchase Success

![Purchase Modal](screenshots/purchase-success.png)**Tech Stack:**

*Instant coupon delivery*

- **Backend**: NestJS 10 + TypeScript + Prisma│   │   └── seed.ts             # Initial data seeding

</td>

</tr>- **Frontend**: Next.js 14 + React + Tailwind CSS

<tr>

<td width="50%">- **Database**: PostgreSQL 15### 🛍️ **Dual Selling Channels**│   └── Dockerfile



### 🔧 Admin Panel- **DevOps**: Docker + Docker Compose

![Admin Panel](screenshots/admin-table.png)

*Full CRUD management*- **Direct Customer Portal**: Beautiful web interface for end customers├── frontend/



</td>---

<td width="50%">

- **Reseller API**: RESTful API for external businesses to integrate and resell│   ├── app/

### 📦 My Coupons

![My Coupons](screenshots/my-coupons-badge.png)## 🚀 Quick Start

*Personal collection*

│   │   ├── page.tsx            # Customer shop

</td>

</tr>### Prerequisites

</table>

- Docker 20.10+### 🔐 **Secure Authentication**│   │   └── admin/page.tsx      # Admin panel

---

- Docker Compose 2.0+

## 📡 API Reference

- JWT-based authentication with Bearer tokens│   ├── lib/api.ts              # API client

### Authentication

```bash> No need to install Node.js or PostgreSQL! Everything runs in containers.

# Get JWT token

curl -X POST http://localhost:3000/auth/admin/login \- Admin panel with secure access control│   └── Dockerfile

  -H "Content-Type: application/json" \

  -d '{"username":"admin","password":"admin123"}'### 1️⃣ Clone

```

```bash- Token refresh mechanism (24h access, 7d refresh)├── tests/                      # 🧪 Automated Jest tests (52+ tests)

### Reseller Endpoints

git clone https://github.com/KobiSaada/digital-coupon-marketplace.git

| Method | Endpoint | Description |

|--------|----------|-------------|cd digital-coupon-marketplace│   ├── reseller.test.js        # Reseller API tests

| `GET` | `/api/v1/products` | List available products |

| `GET` | `/api/v1/products/{id}` | Get product details |```

| `POST` | `/api/v1/products/{id}/purchase` | Purchase at reseller price |

### 💰 **Smart Pricing System**│   ├── admin.test.js           # Admin API tests

**Purchase Example:**

```bash### 2️⃣ Start

curl -X POST http://localhost:3000/api/v1/products/{id}/purchase \

  -H "Authorization: Bearer YOUR_TOKEN" \```bash- **Server-side pricing calculation**: `minimum_sell_price = cost_price × (1 + margin_percentage / 100)`│   ├── customer.test.js        # Customer API tests

  -H "Content-Type: application/json" \

  -d '{"reseller_price": 120.00}'docker-compose up -d

```

```- **Reseller flexibility**: Can set their own markup (≥ minimum price)│   ├── helpers.js              # Test utilities

**Response:**

```json*Builds, migrates, and seeds database (~30 seconds)*

{

  "product_id": "uuid",- **Customer fixed pricing**: Always at minimum sell price│   └── README.md               # Testing documentation

  "final_price": 120.00,

  "value_type": "STRING",### 3️⃣ Access

  "value": "NETFLIX-K7X9M2P4"

}├── test-reseller-api.sh        # Quick API validation script

```

| Service | URL | Credentials |

### Admin Endpoints

|---------|-----|-------------|### 🎫 **Dynamic Coupon Codes**└── docker-compose.yml

| Method | Endpoint | Description |

|--------|----------|-------------|| 🛍️ **Customer Shop** | http://localhost:3001 | - |

| `POST` | `/admin/products/coupons` | Create coupon |

| `GET` | `/admin/products` | List all products || 🔧 **Admin Panel** | http://localhost:3001/admin | admin / admin123 |- Automatic random code generation: `NETFLIX-{random}` → `NETFLIX-K7X9M2P4````

| `PATCH` | `/admin/products/{id}` | Update product |

| `DELETE` | `/admin/products/{id}` | Delete product || 📡 **API Docs** | http://localhost:3000/api | - |



**Full Documentation**: http://localhost:3000/api| 🔌 **Reseller API** | http://localhost:3000/api/v1 | reseller1 / reseller123 |- Support for STRING and IMAGE value types



---



## 💼 Business Logic---- Unique codes for each purchase## 🚀 Quick Start



### Pricing Formula

```typescript

minimum_sell_price = cost_price × (1 + margin_percentage / 100)## 📸 Screenshots

```



**Example:**

```<div align="center">### 🔒 **Atomic Operations**### Prerequisites

Cost: $80 | Margin: 25%

→ Min Price: $100



Reseller sells at $120 → Profit: $20### 🛍️ Customer Shop- Race condition prevention with database-level locking- Docker & Docker Compose

Customer always pays: $100 (minimum)

```![Customer Shop](screenshots/customer-products.png)



### Random Code Generation*Browse & purchase coupons*- Concurrent request handling- (Optional) Node.js 18+ for local development

```typescript

Template: "NETFLIX-{random}"

Generated: "NETFLIX-K7X9M2P4"  // 8 unique chars (A-Z, 2-9)

```### 🎉 Purchase Success- Product sold status management



### Atomic Operations![Purchase Modal](screenshots/purchase-success.png)

Prevents duplicate sales with database-level locking:

```typescript*Instant coupon code delivery*### 1. Clone and Setup

await prisma.product.updateMany({

  where: { id, isSold: false },  // Only if NOT sold

  data: { isSold: true }

});### 🔧 Admin Panel### 🎨 **Modern UI/UX**```bash

// Returns count=0 if already sold → 409 error

```![Admin Panel](screenshots/admin-table.png)



---*Full CRUD management*- Responsive design with Tailwind CSS# Clone the repository



## 🧪 Testing



### Automated Tests (52+)### 📦 My Coupons- Real-time coupon managementgit clone <your-repo-url>

```bash

cd tests![My Coupons](screenshots/my-coupons-badge.png)

npm install

npm test*Personal collection*- Copy-to-clipboard functionalitycd "Backend Exercise – Digital Coupon Marketplace"

```



**Coverage:**

- ✅ Authentication & JWT</div>- Professional color scheme

- ✅ Pricing calculations

- ✅ Race condition handling

- ✅ Error scenarios

---- Support for both URL and Data URI images# Copy environment variables

### Manual API Test

```bash

./test-reseller-api.sh

```## 📡 API Quick Referencecp backend/.env.example backend/.env



---



## 🐳 Docker Commands### Authentication---cp frontend/.env.example frontend/.env



```bash```bash

# Start services

docker-compose up -dcurl -X POST http://localhost:3000/auth/admin/login \```



# View logs  -H "Content-Type: application/json" \

docker-compose logs -f

  -d '{"username":"admin","password":"admin123"}'## 🏗️ Architecture

# Rebuild after changes

docker-compose up --build -d```



# Stop services### 2. Run with Docker

docker-compose down

### Reseller Endpoints

# Reset database (deletes data!)

docker-compose down -v && docker-compose up -d``````bash

```

| Method | Endpoint | Description |

---

|--------|----------|-------------|┌─────────────────────────────────────────────────────────────┐# Build and start all services

## 📁 Project Structure

| `GET` | `/api/v1/products` | List available products |

```

├── backend/              # NestJS API| `GET` | `/api/v1/products/{id}` | Get product details |│                      Client Layer                           │docker-compose up --build

│   ├── src/

│   │   ├── admin/       # Admin CRUD| `POST` | `/api/v1/products/{id}/purchase` | Purchase at reseller price |

│   │   ├── auth/        # JWT authentication

│   │   ├── customer/    # Customer endpoints├─────────────────────┬───────────────────────────────────────┤

│   │   ├── reseller/    # Reseller API

│   │   └── common/      # Validators & errors**Purchase Example:**

│   └── prisma/          # Database schema

├── frontend/            # Next.js UI```bash│   Customer Shop     │    Admin Panel    │  Reseller API    │# The application will be available at:

│   ├── app/

│   │   ├── page.tsx    # Customer shopcurl -X POST http://localhost:3000/api/v1/products/{id}/purchase \

│   │   └── admin/      # Admin panel

│   └── lib/api.ts      # API client  -H "Authorization: Bearer YOUR_TOKEN" \│   (Next.js)         │    (Next.js)      │  (External)      │# - Backend API: http://localhost:3000

├── tests/              # Jest tests (52+)

└── docker-compose.yml  # Container orchestration  -H "Content-Type: application/json" \

```

  -d '{"reseller_price": 20.00}'└─────────────────────┴───────────────────┴──────────────────┘# - API Documentation: http://localhost:3000/api/docs

---

```

## 🔧 Troubleshooting

                            │# - Frontend: http://localhost:3001

| Problem | Solution |

|---------|----------|**Response:**

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB connection failed | `docker-compose restart db` |```json                            ▼# - Database: localhost:5432

| Frontend won't load | `docker-compose logs frontend` |

| Auth 401 error | Get fresh token from `/auth/admin/login` |{



**Nuclear Reset:**  "product_id": "uuid",┌─────────────────────────────────────────────────────────────┐```

```bash

docker-compose down -v  "final_price": 20.00,

docker-compose up --build -d

```  "value_type": "STRING",│                   Application Layer                         │



---  "value": "NETFLIX-K7X9M2P4"



## 🎯 Features}│  ┌─────────────────────────────────────────────────────┐   │### 3. Initial Setup



- ✅ Dual sales channels (Customer + Reseller)```

- ✅ JWT authentication (24h access, 7d refresh)

- ✅ Server-side pricing validation│  │              NestJS Backend                         │   │The database is automatically:

- ✅ Atomic database operations

- ✅ Dynamic code generation### Admin Endpoints

- ✅ Admin CRUD panel

- ✅ Swagger API documentation│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │- Migrated with the schema

- ✅ Docker containerization

- ✅ 52+ automated tests| Method | Endpoint | Description |

- ✅ TypeScript type safety

- ✅ Responsive UI design|--------|----------|-------------|│  │  │ Customer │  │  Admin   │  │ Reseller │          │   │- Seeded with sample data



---| `POST` | `/admin/products/coupons` | Create coupon |



## 📞 Links| `GET` | `/admin/products` | List all products |│  │  │ Module   │  │  Module  │  │  Module  │          │   │



- **GitHub**: https://github.com/KobiSaada/digital-coupon-marketplace| `PATCH` | `/admin/products/{id}` | Update product |

- **API Docs**: http://localhost:3000/api

- **Frontend**: http://localhost:3001| `DELETE` | `/admin/products/{id}` | Delete product |│  │  └──────────┘  └──────────┘  └──────────┘          │   │**Default Credentials:**



---



<div align="center">**Full Docs**: http://localhost:3000/api (Swagger UI)│  │                                                     │   │- **Admin**: username: `admin`, password: `admin123`



**Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**



</div>---│  │  ┌──────────────────────────────────────────┐      │   │- **Reseller Token**: `test-reseller-token-12345`




## 💼 Business Logic│  │  │         Authentication Layer            │      │   │



### Pricing Formula│  │  │  • JWT Strategy                         │      │   │---

```typescript

minimum_sell_price = cost_price × (1 + margin_percentage / 100)│  │  │  • Admin Guard                          │      │   │

```

│  │  │  • Bearer Token Validation              │      │   │## 🧪 Testing

**Example:**

```│  │  └──────────────────────────────────────────┘      │   │

Cost: $80 | Margin: 25% → Min Price: $100

Reseller sells at $120 → Profit: $20│  │                                                     │   │### Quick API Validation

Customer always pays: $100 (minimum)

```│  │  ┌──────────────────────────────────────────┐      │   │



### Random Codes│  │  │         Business Logic Layer            │      │   │Run the automated test script:

```typescript

Template: "NETFLIX-{random}"│  │  │  • Pricing Calculation                  │      │   │

Generated: "NETFLIX-K7X9M2P4"  // 8 unique chars

```│  │  │  • Random Code Generation               │      │   │```bash



### Atomic Operations│  │  │  • Validation Rules                     │      │   │./test-reseller-api.sh

```typescript

// Prevents duplicate sales with database-level locking│  │  └──────────────────────────────────────────┘      │   │```

await prisma.product.updateMany({

  where: { id, isSold: false },  // Only if NOT sold│  └─────────────────────────────────────────────────────┘   │

  data: { isSold: true }

});└─────────────────────────────────────────────────────────────┘This tests:

// Returns count=0 if already sold → 409 error

```                            │- ✅ JWT Authentication



---                            ▼- ✅ GET products (list & single)



## 🧪 Testing┌─────────────────────────────────────────────────────────────┐- ✅ POST purchase (valid, low price, already sold)



### Automated Tests (52+)│                    Data Access Layer                        │- ✅ Unauthorized access

```bash

cd tests│  ┌─────────────────────────────────────────────────────┐   │

npm install

npm test│  │              Prisma ORM                             │   │### Automated Tests (Jest)

```

│  │  • Type-safe database queries                       │   │

### Manual API Test

```bash│  │  • Automatic migrations                             │   │**52+ automated tests** covering all APIs:

./test-reseller-api.sh

```│  │  • Relationship management                          │   │



**Coverage:**│  └─────────────────────────────────────────────────────┘   │```bash

- ✅ Authentication & JWT

- ✅ Pricing calculations└─────────────────────────────────────────────────────────────┘cd tests

- ✅ Race condition handling

- ✅ Error scenarios                            │



---                            ▼# Install dependencies (first time)



## 🐳 Docker Commands┌─────────────────────────────────────────────────────────────┐npm install



```bash│                    Database Layer                           │

# Start

docker-compose up -d│  ┌─────────────────────────────────────────────────────┐   │# Run all tests



# Logs│  │           PostgreSQL 15                             │   │npm test

docker-compose logs -f

│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │

# Rebuild

docker-compose up --build -d│  │  │ Products │  │ Coupons  │  │Resellers │          │   │# Run specific test suites



# Stop│  │  │  Table   │  │  Table   │  │  Table   │          │   │npm run test:reseller    # Reseller API (25+ tests)

docker-compose down

│  │  └──────────┘  └──────────┘  └──────────┘          │   │npm run test:admin       # Admin API (15+ tests)

# Reset (deletes data!)

docker-compose down -v && docker-compose up -d│  └─────────────────────────────────────────────────────┘   │npm run test:customer    # Customer API (12+ tests)

```

└─────────────────────────────────────────────────────────────┘

---

```# Run with coverage report

## 📁 Project Structure

npm run test:coverage

```

├── backend/              # NestJS API### **Data Flow Example: Purchase Process**```

│   ├── src/

│   │   ├── admin/       # Admin CRUD

│   │   ├── auth/        # JWT authentication

│   │   ├── customer/    # Customer endpoints```**Test Coverage:**

│   │   ├── reseller/    # Reseller API

│   │   └── common/      # Validators & errorsCustomer Clicks "Buy" - Reseller API: Authentication, product listing, purchase flow, pricing validation, error handling

│   └── prisma/          # Database schema

├── frontend/            # Next.js UI    ↓- Admin API: CRUD operations, authentication, pricing calculations

│   ├── app/

│   │   ├── page.tsx    # Customer shopFrontend sends POST to /customer/products/{id}/purchase- Customer API: Public endpoints, purchase flow, error scenarios

│   │   └── admin/      # Admin panel

│   └── lib/api.ts      # API client    ↓

├── tests/              # Jest tests (52+)

└── docker-compose.yml  # Container setupCustomer Controller receives requestSee `tests/README.md` for detailed testing documentation.

```

    ↓

---

Customer Service:---

## 🔧 Troubleshooting

    1. Fetch product from database

| Problem | Solution |

|---------|----------|    2. Validate product exists & not sold## 📊 Database Schema

| Port in use | `lsof -i :3000` → `kill -9 <PID>` |

| DB connection failed | `docker-compose restart db` |    3. Calculate minimum_sell_price

| Frontend won't load | `docker-compose logs frontend` |

| Auth 401 | Get fresh token from `/auth/admin/login` |    4. Atomic update (mark as sold)### Products Table



**Nuclear Reset:**    5. Generate random code (replace {random})Stores base product information (extensible for future product types).

```bash

docker-compose down -v    ↓

docker-compose up --build -d

```Return coupon code to customer### Coupons Table



---    ↓Extends products with:



## 🎯 FeaturesFrontend displays success + coupon code- `cost_price`: Internal cost



- ✅ Dual sales channels (Customer + Reseller)```- `margin_percentage`: Profit margin

- ✅ JWT authentication (24h access, 7d refresh)

- ✅ Server-side pricing validation- `value_type`: STRING or IMAGE

- ✅ Atomic database operations

- ✅ Dynamic code generation---- `value`: The actual coupon code/asset

- ✅ Admin CRUD panel

- ✅ Swagger documentation

- ✅ Docker containerization

- ✅ 52+ automated tests## 🛠️ Tech Stack### Resellers Table

- ✅ TypeScript type safety

- ✅ Responsive UIStores reseller authentication tokens (hashed with bcrypt).



---### **Backend**



## 📞 Links- **Framework**: NestJS 10.0.0## 🔐 Security & Business Logic



- **GitHub**: https://github.com/KobiSaada/digital-coupon-marketplace- **Language**: TypeScript 5.9

- **API Docs**: http://localhost:3000/api

- **Frontend**: http://localhost:3001- **ORM**: Prisma 5.22.0### Pricing Rules



---- **Database**: PostgreSQL 15 (Alpine)1. **Server-side calculation**: `minimum_sell_price = cost_price × (1 + margin_percentage / 100)`



<div align="center">- **Validation**: class-validator2. **No client input**: Clients cannot set `cost_price` or `margin_percentage`



**Made with ❤️ using NestJS + Next.js + PostgreSQL + Docker**- **Authentication**: JWT (jsonwebtoken)3. **Reseller validation**: `reseller_price >= minimum_sell_price`



</div>- **API Docs**: Swagger/OpenAPI


### Atomic Purchase

### **Frontend**Prevents double-selling using PostgreSQL's atomic update:

- **Framework**: Next.js 14.0.4```sql

- **Language**: TypeScriptUPDATE products 

- **Styling**: Tailwind CSS 3.3.0SET is_sold=true, sold_at=NOW() 

- **UI Components**: Custom React componentsWHERE id=$1 AND is_sold=false 

RETURNING id;

### **DevOps**```

- **Containerization**: Docker + Docker ComposeIf no rows updated → product already sold → return 409 error.

- **Database Client**: Prisma Studio

- **Testing**: Jest 29.7.0### Authentication

- **Admin**: Simple Bearer token (environment variable)

---- **Reseller**: Bearer token compared against hashed tokens in DB

- **Customer**: No authentication required

## 📁 Project Structure

## 📡 API Documentation

```

Digital-Coupon-Marketplace/### Reseller API (External Integration)

│

├── backend/                        # NestJS Backend ApplicationAll endpoints require: `Authorization: Bearer <token>`

│   ├── prisma/

│   │   ├── migrations/            # Database migrations#### 1. Get Available Products

│   │   ├── schema.prisma          # Database schema definition```bash

│   │   └── seed.ts                # Database seeding scriptGET /api/v1/products

│   │

│   ├── src/curl -H "Authorization: Bearer test-reseller-token-12345" \

│   │   ├── admin/                 # Admin module (CRUD operations)  http://localhost:3000/api/v1/products

│   │   │   ├── admin.controller.ts```

│   │   │   ├── admin.service.ts

│   │   │   └── dto/               # Data Transfer Objects**Response:**

│   │   │```json

│   │   ├── auth/                  # Authentication module[

│   │   │   ├── auth.controller.ts  {

│   │   │   ├── auth.service.ts    "id": "uuid",

│   │   │   ├── jwt.strategy.ts    "name": "Amazon $100 Gift Card",

│   │   │   └── admin-auth.guard.ts    "description": "Redeemable on Amazon.com",

│   │   │    "image_url": "https://...",

│   │   ├── customer/              # Customer module (public API)    "price": 100.00

│   │   │   ├── customer.controller.ts  }

│   │   │   └── customer.service.ts]

│   │   │```

│   │   ├── reseller/              # Reseller module (REST API)

│   │   │   ├── reseller.controller.ts#### 2. Get Product by ID

│   │   │   ├── reseller.service.ts```bash

│   │   │   └── dto/GET /api/v1/products/:productId

│   │   │

│   │   ├── common/                # Shared utilitiescurl -H "Authorization: Bearer test-reseller-token-12345" \

│   │   │   ├── errors/            # Custom error classes  http://localhost:3000/api/v1/products/<product-id>

│   │   │   ├── filters/           # Exception filters```

│   │   │   └── validators/        # Custom validators

│   │   │#### 3. Purchase Product

│   │   └── main.ts                # Application entry point```bash

│   │POST /api/v1/products/:productId/purchase

│   ├── Dockerfile                 # Backend Docker configurationContent-Type: application/json

│   └── package.json               # Backend dependencies

│{

├── frontend/                      # Next.js Frontend Application  "resellerPrice": 120.00

│   ├── app/}

│   │   ├── page.tsx              # Customer shop page```

│   │   ├── admin/

│   │   │   └── page.tsx          # Admin panel page**Example:**

│   │   ├── layout.tsx            # Root layout```bash

│   │   └── globals.css           # Global stylescurl -X POST \

│   │  -H "Authorization: Bearer test-reseller-token-12345" \

│   ├── lib/  -H "Content-Type: application/json" \

│   │   └── api.ts                # API client wrapper  -d '{"resellerPrice": 120.00}' \

│   │  http://localhost:3000/api/v1/products/<product-id>/purchase

│   ├── Dockerfile                # Frontend Docker configuration```

│   └── package.json              # Frontend dependencies

│**Success Response (200):**

├── tests/                        # Automated test suite```json

│   ├── reseller.test.js         # Reseller API tests (25+ tests){

│   ├── admin.test.js            # Admin API tests (15+ tests)  "product_id": "uuid",

│   ├── customer.test.js         # Customer API tests (12+ tests)  "final_price": 120.00,

│   ├── helpers.js               # Test utilities  "value_type": "STRING",

│   └── README.md                # Testing documentation  "value": "ABCD-1234-5678-EFGH"

│}

├── docker-compose.yml           # Multi-container orchestration```

├── test-reseller-api.sh        # Manual API testing script

└── README.md                   # This file**Error Responses:**

```- `400` - RESELLER_PRICE_TOO_LOW

- `401` - UNAUTHORIZED

---- `404` - PRODUCT_NOT_FOUND

- `409` - PRODUCT_ALREADY_SOLD

## 🚀 Getting Started

### Admin API

### **Prerequisites**

Requires: `Authorization: Bearer admin-secret-token-change-in-production`

- **Docker**: Version 20.10 or higher

- **Docker Compose**: Version 2.0 or higher#### Create Coupon

- **Git**: For cloning the repository```bash

POST /admin/products/coupons

> ⚠️ **No need to install Node.js, PostgreSQL, or any other dependencies!** Everything runs in Docker containers.Content-Type: application/json



### **Quick Start (3 Steps)**{

  "name": "Amazon $100 Gift Card",

#### **1️⃣ Clone the Repository**  "description": "Redeemable on Amazon.com",

  "imageUrl": "https://via.placeholder.com/300",

```bash  "costPrice": 80,

git clone <repository-url>  "marginPercentage": 25,

cd "Backend Exercise – Digital Coupon Marketplace"  "valueType": "STRING",

```  "value": "AMZN-1234-ABCD"

}

#### **2️⃣ Start All Services**```



```bash#### Get All Products

docker-compose up -d```bash

```GET /admin/products

```

This single command will:

- ✅ Build the backend (NestJS)#### Update Product

- ✅ Build the frontend (Next.js)```bash

- ✅ Start PostgreSQL databasePATCH /admin/products/:id

- ✅ Run database migrations```

- ✅ Seed initial data

- ✅ Start all services#### Delete Product

```bash

#### **3️⃣ Access the Application**DELETE /admin/products/:id

```

Wait ~30 seconds for services to initialize, then open:

### Customer API

| Service | URL | Description |

|---------|-----|-------------|No authentication required.

| **Customer Shop** | http://localhost:3001 | Public storefront |

| **Admin Panel** | http://localhost:3001 → Click "Admin Panel" | Management interface |#### Get Available Products

| **API Docs** | http://localhost:3000/api | Swagger documentation |```bash

| **Backend API** | http://localhost:3000 | REST API endpoints |GET /customer/products

```

### **Default Credentials**

#### Purchase Product

#### **Admin Access**```bash

- **Username**: `admin`POST /customer/products/:id/purchase

- **Password**: `admin123````



#### **Reseller API**## 🎨 Frontend

- **Username**: `reseller1`

- **Password**: `reseller123`### Customer Shop (`/`)

- View available coupons

### **Verify Installation**- Purchase at minimum price

- Receive coupon code immediately

```bash

# Check all containers are running### Admin Panel (`/admin`)

docker ps- Login with admin token

- Create new coupons

# Should show 3 containers:- View all products (including sold status and internal pricing)

# - coupon_marketplace_frontend- Delete products

# - coupon_marketplace_api

# - coupon_marketplace_db## 🧪 Testing



# Check backend health### Manual Testing Steps

curl http://localhost:3000/api

1. **Test Customer Purchase:**

# Check frontend```bash

curl http://localhost:3001# Get available products

```curl http://localhost:3000/customer/products



---# Purchase a product

curl -X POST http://localhost:3000/customer/products/<product-id>/purchase

## 📡 API Documentation```



### **Base URL**2. **Test Reseller API:**

``````bash

http://localhost:3000# Get products

```curl -H "Authorization: Bearer test-reseller-token-12345" \

  http://localhost:3000/api/v1/products

### **Interactive API Documentation**

# Try purchasing below minimum price (should fail)

Visit **http://localhost:3000/api** for full Swagger/OpenAPI documentation with:curl -X POST \

- All endpoints listed  -H "Authorization: Bearer test-reseller-token-12345" \

- Request/response schemas  -H "Content-Type: application/json" \

- Try-it-out functionality  -d '{"resellerPrice": 50.00}' \

- Authentication flow  http://localhost:3000/api/v1/products/<product-id>/purchase



### **Authentication**# Purchase at valid price

curl -X POST \

All reseller and admin endpoints require Bearer token authentication:  -H "Authorization: Bearer test-reseller-token-12345" \

  -H "Content-Type: application/json" \

```bash  -d '{"resellerPrice": 120.00}' \

# Get Admin Token  http://localhost:3000/api/v1/products/<product-id>/purchase

curl -X POST http://localhost:3000/auth/admin/login \```

  -H "Content-Type: application/json" \

  -d '{"username": "admin", "password": "admin123"}'3. **Test Admin API:**

```bash

# Response:# Create coupon

{curl -X POST \

  "access_token": "eyJhbGciOiJIUzI1NiIs...",  -H "Authorization: Bearer admin-secret-token-change-in-production" \

  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",  -H "Content-Type: application/json" \

  "expires_in": 86400,  -d '{

  "token_type": "Bearer"    "name": "Test Coupon",

}    "description": "Test",

    "imageUrl": "https://via.placeholder.com/300",

# Use the token in subsequent requests    "costPrice": 50,

curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \    "marginPercentage": 20,

  http://localhost:3000/api/v1/products    "valueType": "STRING",

```    "value": "TEST-CODE"

  }' \

### **Reseller API Endpoints**  http://localhost:3000/admin/products/coupons

```

#### **GET /api/v1/products**

Get all available (unsold) products.## 🔧 Development



```bash### Run Backend Locally

curl -H "Authorization: Bearer <token>" \```bash

  http://localhost:3000/api/v1/productscd backend

```

# Install dependencies

**Response:**npm install

```json

[# Copy .env

  {cp .env.example .env

    "id": "e1018e4c-984d-4911-923e-db69cc86cb1a",

    "name": "Netflix Premium 1 Month",# Start PostgreSQL (or use Docker)

    "description": "Stream unlimited movies and shows",# Update DATABASE_URL in .env

    "image_url": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",

    "price": 13.80# Run migrations

  }npx prisma migrate dev

]

```# Generate Prisma Client

npx prisma generate

#### **GET /api/v1/products/{id}**

Get specific product details.# Seed database

npx prisma db seed

#### **POST /api/v1/products/{id}/purchase**

Purchase a product at your specified price (must be ≥ minimum_sell_price).# Start development server

npm run start:dev

```bash```

curl -X POST \

  -H "Authorization: Bearer <token>" \### Run Frontend Locally

  -H "Content-Type: application/json" \```bash

  -d '{"reseller_price": 20.00}' \cd frontend

  http://localhost:3000/api/v1/products/{productId}/purchase

```# Install dependencies

npm install

**Success Response (200):**

```json# Copy .env

{cp .env.example .env

  "product_id": "e1018e4c-984d-4911-923e-db69cc86cb1a",

  "final_price": 20.00,# Start development server

  "value_type": "STRING",npm run dev

  "value": "NETFLIX-K7X9M2P4"```

}

```## 🛡️ Key Design Decisions



**Error Responses:**### 1. **Atomic Purchases**

Using `UPDATE ... WHERE is_sold=false` ensures no race conditions. Only one request can mark a product as sold.

| Status | Error Code | Message |

|--------|-----------|---------|### 2. **Server-side Pricing**

| 400 | RESELLER_PRICE_TOO_LOW | Reseller price must be at least {minimum} |All pricing calculations happen on the server. Clients only see the final `minimum_sell_price`.

| 401 | UNAUTHORIZED | Unauthorized |

| 404 | PRODUCT_NOT_FOUND | Product not found |### 3. **Token Security**

| 409 | PRODUCT_ALREADY_SOLD | Product has already been sold |- Reseller tokens are stored as bcrypt hashes

- Admin token is environment-based (can be replaced with proper auth)

### **Admin API Endpoints**

### 4. **Layered Architecture**

#### **POST /admin/products/coupons**Clear separation: Controllers → Services → Database

Create a new coupon.- Controllers: HTTP layer only

- Services: Business logic

```bash- Prisma: Data access

curl -X POST \

  -H "Authorization: Bearer <admin-token>" \### 5. **Error Handling**

  -H "Content-Type: application/json" \Centralized error filter returns consistent format:

  -d '{```json

    "name": "Amazon $100",{

    "description": "Perfect for shopping",  "error_code": "ERROR_NAME",

    "imageUrl": "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400",  "message": "Human readable message"

    "costPrice": 80,}

    "marginPercentage": 25,```

    "valueType": "STRING",

    "value": "AMAZON-{random}"### 6. **Extensibility**

  }' \- `ProductType` enum allows future product types

  http://localhost:3000/admin/products/coupons- Coupon extends Product via one-to-one relationship

```- Clean module structure for adding features



> 💡 **Tip**: `imageUrl` accepts both regular URLs and Data URI (base64 encoded images)## 📝 Environment Variables



#### **GET /admin/products**### Backend (`backend/.env`)

Get all products (including sold ones with internal pricing).```env

PORT=3000

#### **GET /admin/products/{id}**NODE_ENV=development

Get single product details.DATABASE_URL="postgresql://postgres:postgres@localhost:5432/coupon_marketplace?schema=public"

ADMIN_TOKEN="admin-secret-token-change-in-production"

#### **PATCH /admin/products/{id}**```

Update product details.

### Frontend (`frontend/.env`)

#### **DELETE /admin/products/{id}**```env

Delete a product permanently.NEXT_PUBLIC_API_URL=http://localhost:3000

```

### **Customer API Endpoints**

## 🐳 Docker Commands

#### **GET /customer/products**

Get available products for purchase (no authentication required).```bash

# Start all services

```bashdocker-compose up

curl http://localhost:3000/customer/products

```# Rebuild and start

docker-compose up --build

#### **POST /customer/products/{id}/purchase**

Purchase at fixed minimum price (no authentication required).# Stop all services

docker-compose down

```bash

curl -X POST http://localhost:3000/customer/products/{id}/purchase# Stop and remove volumes (clears database)

```docker-compose down -v



---# View logs

docker-compose logs -f api

## 🧪 Testingdocker-compose logs -f db

docker-compose logs -f frontend

### **Automated Tests (Jest)**

# Access database

Run comprehensive test suite with 52+ tests:docker exec -it coupon_marketplace_db psql -U postgres -d coupon_marketplace

```

```bash

# Navigate to tests directory## 🔍 Swagger Documentation

cd tests

Interactive API documentation is available at:

# Install dependencies (first time only)```

npm installhttp://localhost:3000/api/docs

```

# Run all tests

npm test## ⚠️ Security Notes



# Run specific test suite1. **Change default tokens in production!**

npm run test:reseller    # 25+ Reseller API tests2. Reseller tokens are hashed (bcrypt)

npm run test:admin       # 15+ Admin API tests3. No sensitive data in API responses (cost_price, margin hidden from resellers)

npm run test:customer    # 12+ Customer API tests4. Coupon value only returned after successful purchase

5. Environment variables used for configuration

# Run with coverage report

npm run test:coverage## 📈 Scaling Considerations

```

1. **Database**: PostgreSQL supports high concurrency

**Test Coverage:**2. **Atomic Updates**: Prevents race conditions at scale

- ✅ Authentication & JWT validation3. **Stateless API**: Can be horizontally scaled

- ✅ Business logic (pricing, validation)4. **Connection Pooling**: Prisma handles DB connections efficiently

- ✅ Error handling & edge cases

- ✅ Atomic operations## 🎯 Exercise Requirements Checklist

- ✅ Random code generation

- ✅ **Product Management**: Full CRUD for admin

### **Manual API Testing**- ✅ **Pricing Rules**: Server-side calculation, validation

- ✅ **Reseller API**: Secure Bearer token auth, proper endpoints

Quick validation script for Reseller API:- ✅ **Customer Channel**: Direct purchase at minimum price

- ✅ **Atomic Purchases**: Race condition prevention

```bash- ✅ **Frontend**: Admin panel + Customer shop

# From project root- ✅ **Docker**: Fully containerized with docker-compose

./test-reseller-api.sh- ✅ **Database**: PostgreSQL with Prisma ORM

```- ✅ **Clean Architecture**: Layered structure

- ✅ **Error Handling**: Consistent error format

**Tests Performed:**- ✅ **Documentation**: Comprehensive README + Swagger

1. ✅ JWT Token generation

2. ✅ Product listing## 📞 Support

3. ✅ Single product retrieval

4. ✅ Valid purchase flowFor questions or issues, please check:

5. ✅ Price validation (too low rejection)1. API documentation at `/api/docs`

6. ✅ Already sold validation2. Application logs: `docker-compose logs`

7. ✅ Authentication errors3. Database state: Connect to PostgreSQL and inspect tables



**Expected Output:**---

```

🎯 Testing Reseller API...**Built with ❤️ using NestJS, Prisma, PostgreSQL, and Next.js**


1️⃣ JWT Token: ✅ PASS
2️⃣ GET /api/v1/products: ✅ PASS (5 products)
3️⃣ GET /api/v1/products/{id}: ✅ PASS
4️⃣ POST purchase (valid): ✅ PASS (received coupon code)
5️⃣ POST purchase (low price): ✅ PASS (rejected)
6️⃣ POST purchase (already sold): ✅ PASS
7️⃣ GET without auth: ✅ PASS (401 error)

✨ All tests passed!
```

---

## 📸 Screenshots

### 🛍️ **Customer Shop**
Beautiful, responsive storefront displaying available coupons.

![Customer Shop - Empty State](screenshots/customer-empty.png)
*Empty state with professional messaging*

![Customer Shop - With Products](screenshots/customer-products.png)
*Grid layout showing available coupons with prices*

### 🎉 **Purchase Success**
Instant coupon delivery with copy-to-clipboard functionality.

![Purchase Success Modal](screenshots/purchase-success.png)
*Customer receives unique coupon code: NETFLIX-CCGTKTPA*

### 📦 **My Coupons**
Personal collection of purchased coupons.

![My Coupons View](screenshots/my-coupons-badge.png)
*Badge indicator showing number of purchased coupons*

### 🔧 **Admin Panel**
Comprehensive management dashboard with full CRUD operations.

![Admin Panel - Empty](screenshots/admin-empty.png)
*Clean interface ready for product management*

![Admin Panel - Products Table](screenshots/admin-table.png)
*Detailed table showing cost, margin, minimum price, status, and actions*

### 🔐 **Admin Authentication**
Secure access control with JWT tokens.

![Admin Login](screenshots/admin-login.png)
*Password or JWT token authentication*

---

## 💼 Business Logic

### **1. Pricing Calculation**

The system enforces strict server-side pricing rules:

```typescript
minimum_sell_price = cost_price × (1 + margin_percentage / 100)
```

**Example Scenarios:**

| Cost Price | Margin % | Minimum Sell Price | Calculation |
|------------|----------|-------------------|-------------|
| $80 | 25% | **$100.00** | $80 × 1.25 |
| $12 | 15% | **$13.80** | $12 × 1.15 |
| $45 | 10% | **$49.50** | $45 × 1.10 |

### **2. Reseller vs Customer Pricing**

#### **Reseller Pricing Rules** 🏪
- ✅ Can set `reseller_price` ≥ `minimum_sell_price`
- ✅ Keep the difference as profit
- ❌ Cannot sell below minimum (returns error)

**Example:**
```
Minimum Price: $100
Reseller Sets: $120
Profit: $20
```

#### **Customer Pricing** 👥
- 🔒 Always charged **exactly** `minimum_sell_price`
- 📱 No price negotiation
- ⚡ One-click purchase

### **3. Random Code Generation**

Transform coupon templates into unique codes:

```typescript
// Template in database
value: "NETFLIX-{random}"

// Generated on purchase (8 alphanumeric chars)
value: "NETFLIX-K7X9M2P4"

// Character set (excludes similar: I,1,O,0)
chars: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
```

**Examples:**
- `AMAZON-{random}` → `AMAZON-W6R4T9Y2`
- `SPOTIFY-{random}` → `SPOTIFY-A3B8Z1Q5`
- `UBER-{random}` → `UBER-M2P4K7X9`

### **4. Atomic Operations**

Prevent race conditions with database-level atomic updates:

```typescript
// Scenario: Two resellers try to buy same product simultaneously

// ❌ Without atomicity:
1. Reseller A checks: product.isSold = false ✓
2. Reseller B checks: product.isSold = false ✓
3. Reseller A updates: SET isSold = true ✓
4. Reseller B updates: SET isSold = true ✓
// Result: Product sold twice! 💥

// ✅ With atomicity:
await prisma.product.updateMany({
  where: {
    id: productId,
    isSold: false  // ← Only update if STILL not sold
  },
  data: { isSold: true }
});

// If updateMany returns count = 0:
// → Product was already sold → Return 409 error
```

### **5. Value Types**

Support for different coupon formats:

| Value Type | Description | Example |
|------------|-------------|---------|
| **STRING** | Alphanumeric code | `NETFLIX-K7X9M2P4` |
| **IMAGE** | QR code / Barcode URL | `https://example.com/qr.png` |

### **6. Image Support**

Flexible image handling:

```typescript
// Regular URL
imageUrl: "https://images.unsplash.com/photo-123.jpg"

// Data URI (Base64)
imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
```

Both formats are validated and accepted.

---

## 🔧 Environment Variables

### **Backend (.env)**
Create in `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@db:5432/coupon_marketplace"

# JWT Secret (CHANGE IN PRODUCTION!)
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="24h"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3001"
```

### **Frontend (.env.local)**
Create in `frontend/` directory:

```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Admin Credentials (for quick access)
NEXT_PUBLIC_ADMIN_TOKEN=""
```

> ⚠️ **Security Note**: Never commit `.env` files to version control. Use `.env.example` as template.

---

## 🐳 Docker Commands

### **Basic Operations**

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f db

# Check running containers
docker ps

# Restart specific service
docker-compose restart api
```

### **Development Workflow**

```bash
# Rebuild after code changes
docker-compose up --build -d

# Rebuild specific service
docker-compose up --build -d api
docker-compose up --build -d frontend

# Force rebuild (no cache)
docker-compose build --no-cache api
docker-compose up -d api
```

### **Database Operations**

```bash
# Run migrations
docker-compose exec api npx prisma migrate dev

# Seed database
docker-compose exec api npm run seed

# Open Prisma Studio (database GUI)
docker-compose exec api npx prisma studio
# Access at: http://localhost:5555

# Direct PostgreSQL access
docker-compose exec db psql -U postgres -d coupon_marketplace

# Backup database
docker-compose exec db pg_dump -U postgres coupon_marketplace > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T db psql -U postgres -d coupon_marketplace
```

### **Advanced Commands**

```bash
# Execute command in container
docker-compose exec api sh
docker-compose exec frontend sh

# View container resource usage
docker stats

# Clean up everything
docker-compose down -v  # Remove volumes too
docker system prune -a  # Remove unused images/containers
```

---

## 🐛 Troubleshooting

### **1. Port Already in Use**

**Problem**: `Error: bind: address already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3000  # Backend
lsof -i :3001  # Frontend
lsof -i :5432  # Database

# Kill process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### **2. Database Connection Failed**

**Problem**: `Error: Can't reach database server`

**Solution:**
```bash
# Check database status
docker-compose ps db

# View database logs
docker-compose logs db

# Restart database
docker-compose restart db

# Full reset (WARNING: Deletes data!)
docker-compose down -v
docker-compose up -d
```

### **3. Frontend Shows 404 or Won't Load**

**Problem**: Frontend not accessible or showing errors

**Solution:**
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build -d frontend

# Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

# Check if service is running
docker ps | grep frontend
```

### **4. API Returns 401 Unauthorized**

**Problem**: API requests fail with authentication error

**Solution:**
```bash
# Get fresh token
curl -X POST http://localhost:3000/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Verify token format in header
Authorization: Bearer <token>

# Check token expiration (tokens expire after 24h)
```

### **5. "Migration Failed" Error**

**Problem**: Database schema out of sync

**Solution:**
```bash
# Reset database and re-run migrations
docker-compose down -v
docker-compose up -d db
docker-compose exec api npx prisma migrate dev
docker-compose up -d
```

### **6. Tests Failing**

**Problem**: Jest tests return errors

**Solution:**
```bash
# Ensure services are running
docker-compose ps

# Re-seed database
docker-compose exec api npm run seed

# Run tests with verbose output
cd tests
npm test -- --verbose

# Check test configuration
cat tests/package.json
```

### **7. Clean Slate (Nuclear Option)**

When nothing else works:

```bash
# Stop everything
docker-compose down -v

# Remove all project containers and images
docker rmi $(docker images | grep 'coupon' | awk '{print $3}')

# Remove all volumes
docker volume prune

# Rebuild from scratch
docker-compose up --build -d

# Verify all containers running
docker ps
```

---

## 📚 Additional Resources

### **Documentation**
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### **Testing**
- Run `./test-reseller-api.sh` for quick API validation
- Run `cd tests && npm test` for comprehensive test suite
- Visit http://localhost:3000/api for interactive API docs

### **Project Files**
- `REQUIREMENTS_CHECKLIST.md`: Detailed requirements compliance
- `FIXES_SUMMARY.md`: All bug fixes and improvements
- `RESELLER_API_TESTING.md`: Manual testing guide
- `tests/README.md`: Testing documentation

---

## 🎯 Key Features Highlights

- ✅ **100% Requirements Compliance**: Implements all specified requirements
- ✅ **Production-Ready**: Docker containerized with health checks
- ✅ **Type-Safe**: Full TypeScript implementation
- ✅ **Tested**: 52+ automated tests with Jest
- ✅ **Documented**: Comprehensive Swagger API documentation
- ✅ **Secure**: JWT authentication with proper validation
- ✅ **Scalable**: Modular architecture with clean separation
- ✅ **Professional**: Modern UI/UX with Tailwind CSS
- ✅ **Robust**: Global exception handling and validation
- ✅ **Atomic**: Race condition prevention
- ✅ **Flexible**: Supports both URL and Data URI images
- ✅ **User-Friendly**: Clear error messages and loading states

---

## 📄 License

This project is part of a backend exercise demonstration.

---

## 👤 Contact

For questions or issues, please refer to the troubleshooting section or check the logs:

```bash
docker-compose logs -f
```

---

## 🔗 Quick Access Links

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3001 | N/A |
| **Admin Panel** | http://localhost:3001 (click Admin Panel) | admin / admin123 |
| **Backend API** | http://localhost:3000 | N/A |
| **API Docs** | http://localhost:3000/api | N/A |
| **Prisma Studio** | Run `docker-compose exec api npx prisma studio` | N/A |

---

**Made with ❤️ using modern web technologies**

**Happy Coding! 🚀**
