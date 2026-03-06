#!/bin/bash

echo "=== Testing JWT Authentication ==="
echo ""

echo "1. Admin Login"
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}')
echo "$ADMIN_RESPONSE" | jq '.'

# Extract access token
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.access_token')
echo ""
echo "Admin Access Token: $ADMIN_TOKEN"
echo ""

if [ "$ADMIN_TOKEN" != "null" ] && [ -n "$ADMIN_TOKEN" ]; then
  echo "2. Testing Admin Protected Route with JWT"
  curl -s -X GET http://localhost:3000/admin/products \
    -H "Authorization: Bearer $ADMIN_TOKEN" | jq '.' | head -30
  echo ""
else
  echo "Failed to get admin token"
fi

echo ""
echo "3. Testing Customer Route (no auth required)"
curl -s -X GET http://localhost:3000/customer/products | jq '.' | head -30
