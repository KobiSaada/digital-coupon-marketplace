-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('COUPON');

-- CreateEnum
CREATE TYPE "CouponValueType" AS ENUM ('STRING', 'IMAGE');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_sold" BOOLEAN NOT NULL DEFAULT false,
    "sold_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "product_id" TEXT NOT NULL,
    "cost_price" DECIMAL(10,2) NOT NULL,
    "margin_percentage" DECIMAL(5,2) NOT NULL,
    "value_type" "CouponValueType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "resellers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resellers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resellers_token_hash_key" ON "resellers"("token_hash");

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
