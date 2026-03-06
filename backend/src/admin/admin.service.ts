import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/coupon.dto';
import { ProductType } from '@prisma/client';
import { ApiError, ErrorCode } from '../common/errors/api-error';

@Injectable()
export class AdminService {
  // Default coupon images for random selection
  private readonly DEFAULT_COUPON_IMAGES = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400', // Gift cards
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400', // Voucher
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', // Gift box
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', // Shopping
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=400', // Ticket
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', // Products
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', // Shopping bag
    'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400', // Gift card
  ];

  constructor(private prisma: PrismaService) {}

  /**
   * Get random default image for coupon
   */
  private getRandomCouponImage(): string {
    const randomIndex = Math.floor(Math.random() * this.DEFAULT_COUPON_IMAGES.length);
    return this.DEFAULT_COUPON_IMAGES[randomIndex];
  }

  /**
   * Calculate minimum sell price based on cost and margin
   */
  private calculateMinimumSellPrice(costPrice: number, marginPercentage: number): number {
    return costPrice * (1 + marginPercentage / 100);
  }

  /**
   * Create a new coupon product
   */
  async createCoupon(dto: CreateCouponDto) {
    // imageUrl is required, use it directly
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        type: ProductType.COUPON,
        imageUrl: dto.imageUrl,
        coupon: {
          create: {
            costPrice: dto.costPrice,
            marginPercentage: dto.marginPercentage,
            valueType: dto.valueType,
            value: dto.value,
          },
        },
      },
      include: {
        coupon: true,
      },
    });

    return this.formatProductWithPricing(product);
  }

  /**
   * Get all products (including sold ones and internal pricing)
   */
  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      include: {
        coupon: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products.map(p => this.formatProductWithPricing(p));
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        coupon: true,
      },
    });

    if (!product) {
      throw new ApiError(ErrorCode.PRODUCT_NOT_FOUND, 'Product not found', 404);
    }

    return this.formatProductWithPricing(product);
  }

  /**
   * Update a coupon product
   */
  async updateCoupon(id: string, dto: UpdateCouponDto) {
    // Check if product exists
    const existing = await this.prisma.product.findUnique({
      where: { id },
      include: { coupon: true },
    });

    if (!existing) {
      throw new ApiError(ErrorCode.PRODUCT_NOT_FOUND, 'Product not found', 404);
    }

    // Update product and coupon
    const updateData: any = {};
    if (dto.name) updateData.name = dto.name;
    if (dto.description) updateData.description = dto.description;
    if (dto.imageUrl) updateData.imageUrl = dto.imageUrl;

    const couponUpdateData: any = {};
    if (dto.costPrice !== undefined) couponUpdateData.costPrice = dto.costPrice;
    if (dto.marginPercentage !== undefined) couponUpdateData.marginPercentage = dto.marginPercentage;
    if (dto.valueType) couponUpdateData.valueType = dto.valueType;
    if (dto.value) couponUpdateData.value = dto.value;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        ...(Object.keys(couponUpdateData).length > 0 && {
          coupon: {
            update: couponUpdateData,
          },
        }),
      },
      include: {
        coupon: true,
      },
    });

    return this.formatProductWithPricing(product);
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string) {
    const existing = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ApiError(ErrorCode.PRODUCT_NOT_FOUND, 'Product not found', 404);
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }

  /**
   * Format product with calculated pricing (for admin view)
   */
  private formatProductWithPricing(product: any) {
    const minimumSellPrice = product.coupon
      ? this.calculateMinimumSellPrice(
          Number(product.coupon.costPrice),
          Number(product.coupon.marginPercentage),
        )
      : null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      type: product.type,
      imageUrl: product.imageUrl,
      isSold: product.isSold,
      soldAt: product.soldAt,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      coupon: product.coupon
        ? {
            costPrice: Number(product.coupon.costPrice),
            marginPercentage: Number(product.coupon.marginPercentage),
            minimumSellPrice,
            valueType: product.coupon.valueType,
            value: product.coupon.value,
          }
        : null,
    };
  }
}
