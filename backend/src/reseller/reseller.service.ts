import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiError, ErrorCode } from '../common/errors/api-error';
import { ProductResponseDto, PurchaseResponseDto } from './dto/reseller.dto';

@Injectable()
export class ResellerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calculate minimum sell price
   */
  private calculateMinimumSellPrice(costPrice: number, marginPercentage: number): number {
    return costPrice * (1 + marginPercentage / 100);
  }

  /**
   * Get all available (unsold) products
   */
  async getAvailableProducts(): Promise<ProductResponseDto[]> {
    const products = await this.prisma.product.findMany({
      where: {
        isSold: false,
      },
      include: {
        coupon: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products.map(p => this.formatProductForReseller(p));
  }

  /**
   * Get product by ID (must be unsold)
   */
  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        coupon: true,
      },
    });

    if (!product) {
      throw new ApiError(ErrorCode.PRODUCT_NOT_FOUND, 'Product not found', 404);
    }

    return this.formatProductForReseller(product);
  }

  /**
   * Generate random alphanumeric string for coupon codes
   */
  private generateRandomCode(length: number = 8): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar looking chars
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Replace {random} placeholder with actual random code
   */
  private generateCouponValue(template: string): string {
    if (template.includes('{random}')) {
      return template.replace('{random}', this.generateRandomCode());
    }
    return template;
  }

  /**
   * Purchase a product (atomic operation)
   */
  async purchaseProduct(
    productId: string,
    resellerPrice: number,
  ): Promise<PurchaseResponseDto> {
    // First, get the product with coupon details
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        coupon: true,
      },
    });

    if (!product) {
      throw new ApiError(ErrorCode.PRODUCT_NOT_FOUND, 'Product not found', 404);
    }

    if (product.isSold) {
      throw new ApiError(
        ErrorCode.PRODUCT_ALREADY_SOLD,
        'Product has already been sold',
        409,
      );
    }

    // Calculate minimum sell price
    const minimumSellPrice = this.calculateMinimumSellPrice(
      Number(product.coupon.costPrice),
      Number(product.coupon.marginPercentage),
    );

    // Validate reseller price
    if (resellerPrice < minimumSellPrice) {
      throw new ApiError(
        ErrorCode.RESELLER_PRICE_TOO_LOW,
        `Reseller price must be at least ${minimumSellPrice.toFixed(2)}`,
        400,
      );
    }

    // Atomic update: mark as sold only if not already sold
    // This prevents race conditions
    const updated = await this.prisma.product.updateMany({
      where: {
        id: productId,
        isSold: false, // Only update if not sold
      },
      data: {
        isSold: true,
        soldAt: new Date(),
      },
    });

    // If no rows were updated, product was sold by another request
    if (updated.count === 0) {
      throw new ApiError(
        ErrorCode.PRODUCT_ALREADY_SOLD,
        'Product was just sold by another request',
        409,
      );
    }

    // Generate unique coupon code by replacing {random} placeholder
    const finalCouponValue = this.generateCouponValue(product.coupon.value);

    // Return coupon value with generated code
    return {
      product_id: productId,
      final_price: resellerPrice,
      value_type: product.coupon.valueType,
      value: finalCouponValue,
    };
  }

  /**
   * Format product for reseller (hide internal pricing)
   */
  private formatProductForReseller(product: any): ProductResponseDto {
    const minimumSellPrice = this.calculateMinimumSellPrice(
      Number(product.coupon.costPrice),
      Number(product.coupon.marginPercentage),
    );

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.imageUrl,
      price: parseFloat(minimumSellPrice.toFixed(2)),
    };
  }
}
