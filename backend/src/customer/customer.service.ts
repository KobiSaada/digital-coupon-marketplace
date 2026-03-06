import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiError, ErrorCode } from '../common/errors/api-error';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

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
   * Calculate minimum sell price
   */
  private calculateMinimumSellPrice(costPrice: number, marginPercentage: number): number {
    return costPrice * (1 + marginPercentage / 100);
  }

  /**
   * Get all available products for customers
   */
  async getAvailableProducts() {
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

    return products.map(p => {
      const price = this.calculateMinimumSellPrice(
        Number(p.coupon.costPrice),
        Number(p.coupon.marginPercentage),
      );

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        price: parseFloat(price.toFixed(2)),
      };
    });
  }

  /**
   * Purchase product (customer buys at minimum sell price)
   */
  async purchaseProduct(productId: string) {
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

    // Calculate final price (minimum sell price for customers)
    const finalPrice = this.calculateMinimumSellPrice(
      Number(product.coupon.costPrice),
      Number(product.coupon.marginPercentage),
    );

    // Atomic update
    const updated = await this.prisma.product.updateMany({
      where: {
        id: productId,
        isSold: false,
      },
      data: {
        isSold: true,
        soldAt: new Date(),
      },
    });

    if (updated.count === 0) {
      throw new ApiError(
        ErrorCode.PRODUCT_ALREADY_SOLD,
        'Product was just sold by another request',
        409,
      );
    }

    // Generate unique coupon code by replacing {random} placeholder
    const finalCouponValue = this.generateCouponValue(product.coupon.value);

    return {
      productId,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      valueType: product.coupon.valueType,
      value: finalCouponValue,
    };
  }
}
