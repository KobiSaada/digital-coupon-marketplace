# JWT Security Implementation Guide

## 🔐 Security Features Implemented

### 1. JWT-Based Authentication
- **Access Tokens**: Valid for 24 hours
- **Refresh Tokens**: Valid for 7 days
- **HS256 Algorithm**: Industry-standard signing
- **Secure Storage**: Tokens stored in memory, not cookies

### 2. Security Middleware
- **Helmet**: Adds 13 security-related HTTP headers
- **Rate Limiting**: 10 requests per 60 seconds per IP
- **CORS**: Enabled for frontend communication
- **Validation Pipes**: Automatic input validation and sanitization

### 3. Password Security
- **bcrypt**: Passwords hashed with bcrypt (salt rounds: 10)
- **Minimum Length**: 6 characters enforced
- **Environment Variables**: Credentials stored in .env

### 4. Double-Purchase Prevention
- **Atomic Updates**: `UPDATE ... WHERE is_sold=false`
- **Database-Level**: Race condition handled by PostgreSQL
- **Transactional**: Prevents concurrent purchases

---

## 🚀 Quick Start

### 1. Admin Login
```bash
curl -X POST http://localhost:3000/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

### 2. Use JWT Token for Protected Routes
```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:3000/admin/products \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Refresh Access Token
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "your_refresh_token_here"
  }'
```

### 4. Generate Reseller JWT Token
```bash
curl -X POST http://localhost:3000/auth/reseller/token \
  -H "Content-Type: application/json" \
  -d '{
    "resellerId": "your_reseller_id"
  }'
```

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/admin/login` | Admin login with username/password | No |
| POST | `/auth/reseller/token` | Generate JWT for reseller | No |
| POST | `/auth/refresh` | Refresh access token | No |

### Admin Endpoints (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/products/coupons` | Create new coupon |
| GET | `/admin/products` | Get all products |
| GET | `/admin/products/:id` | Get product by ID |
| PATCH | `/admin/products/:id` | Update product |
| DELETE | `/admin/products/:id` | Delete product |

### Reseller Endpoints (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | Get available products |
| GET | `/api/v1/products/:id` | Get product by ID |
| POST | `/api/v1/products/:id/purchase` | Purchase product |

### Customer Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customer/products` | Get available products |
| POST | `/customer/products/:id/purchase` | Purchase product |

---

## 🔒 Security Best Practices

### Environment Variables (.env)
```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars-long
JWT_EXPIRATION=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars-long
JWT_REFRESH_EXPIRATION=7d

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/coupon_marketplace
```

### Token Storage
- **Frontend**: Store tokens in memory (React state) or HttpOnly cookies
- **Mobile**: Use secure storage (Keychain/Keystore)
- **Never**: Store in localStorage (XSS vulnerable)

### Token Expiration Handling
```typescript
// Example: Refresh token before expiry
const refreshToken = async () => {
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const { access_token } = await response.json();
  return access_token;
};
```

---

## 🛡️ Rate Limiting

- **Global Limit**: 10 requests per 60 seconds
- **Per Route**: Can be overridden with `@Throttle()`
- **Response Headers**:
  - `X-RateLimit-Limit`: Total allowed requests
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time until limit resets

### Disable Rate Limiting for Specific Routes
```typescript
@SkipThrottle()
@Get('public-data')
getPublicData() {
  // No rate limiting applied
}
```

---

## 🔐 Helmet Security Headers

Automatically adds these headers:

| Header | Purpose |
|--------|---------|
| `Content-Security-Policy` | Prevents XSS attacks |
| `X-DNS-Prefetch-Control` | Controls DNS prefetching |
| `X-Frame-Options` | Prevents clickjacking |
| `X-Content-Type-Options` | Prevents MIME sniffing |
| `Strict-Transport-Security` | Enforces HTTPS |
| `X-Download-Options` | Prevents download attacks |
| `X-Permitted-Cross-Domain-Policies` | Controls cross-domain requests |

---

## 🧪 Testing Scripts

### Run All JWT Tests
```bash
cd backend
./test-jwt.sh
```

### Manual Tests

**1. Test Rate Limiting:**
```bash
# Send 15 requests rapidly
for i in {1..15}; do
  echo "Request $i"
  curl http://localhost:3000/customer/products
  sleep 0.1
done
```

**2. Test Invalid Token:**
```bash
curl -X GET http://localhost:3000/admin/products \
  -H "Authorization: Bearer invalid_token"
```

**3. Test Expired Token:**
```bash
# Use a token that's expired (wait 24+ hours or manually create one)
curl -X GET http://localhost:3000/admin/products \
  -H "Authorization: Bearer expired_token"
```

---

## 📊 JWT Token Structure

### Access Token Payload
```json
{
  "sub": "admin",
  "role": "admin",
  "name": "Administrator",
  "iat": 1772722563,
  "exp": 1772808963
}
```

### Claims Explained
- `sub`: Subject (user ID or identifier)
- `role`: User role (admin/reseller)
- `name`: Display name
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

---

## 🐛 Troubleshooting

### 401 Unauthorized
**Cause**: Invalid or expired JWT token  
**Solution**: Login again to get a fresh token

### 429 Too Many Requests
**Cause**: Rate limit exceeded  
**Solution**: Wait 60 seconds or adjust rate limit in `app.module.ts`

### Validation Errors
**Cause**: Missing or invalid request fields  
**Solution**: Check API documentation for required fields

### Database Errors
**Cause**: Prisma client not generated  
**Solution**: Run `npx prisma generate`

---

## 📖 Additional Resources

- **NestJS JWT**: https://docs.nestjs.com/security/authentication
- **Passport JWT**: https://www.passportjs.org/packages/passport-jwt/
- **Helmet**: https://helmetjs.github.io/
- **JWT.io**: https://jwt.io/ (decode and verify tokens)

---

## 🎯 Production Checklist

- [ ] Change `JWT_SECRET` to a strong random string (min 32 chars)
- [ ] Change `JWT_REFRESH_SECRET` to a different strong random string
- [ ] Update admin password to a strong password
- [ ] Enable HTTPS in production
- [ ] Configure CORS to allow only your frontend domain
- [ ] Set up proper logging and monitoring
- [ ] Enable database connection pooling
- [ ] Configure proper error messages (don't expose internals)
- [ ] Set up rate limiting per user (not just per IP)
- [ ] Enable helmet CSP with proper directives
- [ ] Set up JWT token blacklisting for logout
- [ ] Configure refresh token rotation

---

**Last Updated**: March 5, 2026  
**Security Version**: 2.0 (JWT-Based)
