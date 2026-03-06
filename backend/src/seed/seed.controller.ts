import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private prisma: PrismaService) {}

  @Post('run')
  @ApiOperation({ summary: 'Run database seed' })
  async runSeed() {
    try {
      console.log('🌱 Starting seed...');

      // Create reseller with token
      const resellerToken = 'test-reseller-token-12345';
      const tokenHash = await bcrypt.hash(resellerToken, 10);

      const reseller = await this.prisma.reseller.upsert({
        where: { id: '00000000-0000-0000-0000-000000000001' },
        update: {},
        create: {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Test Reseller',
          tokenHash: tokenHash,
        },
      });

      console.log('✅ Created reseller:', reseller.name);

      // Create diverse coupon products
      const products = [
        {
          name: 'Amazon Gift Card $50',
          description: 'Perfect for online shopping on Amazon.com',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400',
          costPrice: 45.00,
          marginPercentage: 10,
          valueType: 'STRING' as const,
          value: 'AMZ-{random}',
        },
        {
          name: 'Spotify Premium 6 Months',
          description: 'Enjoy ad-free music streaming for half a year',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
          costPrice: 54.00,
          marginPercentage: 15,
          valueType: 'STRING' as const,
          value: 'SPOT-{random}',
        },
        {
          name: 'Netflix Premium 3 Months',
          description: 'Stream unlimited movies and TV shows',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400',
          costPrice: 40.00,
          marginPercentage: 12,
          valueType: 'STRING' as const,
          value: 'NETF-{random}',
        },
        {
          name: 'PlayStation Store $25',
          description: 'Buy games, add-ons, and more on PS Store',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
          costPrice: 22.50,
          marginPercentage: 8,
          valueType: 'STRING' as const,
          value: 'PS-{random}',
        },
        {
          name: 'Uber Eats $30 Credit',
          description: 'Order food from your favorite restaurants',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
          costPrice: 27.00,
          marginPercentage: 10,
          valueType: 'STRING' as const,
          value: 'UBER-{random}',
        },
        {
          name: 'Google Play $10',
          description: 'Apps, games, movies & more on Google Play',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400',
          costPrice: 9.00,
          marginPercentage: 10,
          valueType: 'STRING' as const,
          value: 'GPLAY-{random}',
        },
        {
          name: 'Steam Wallet $20',
          description: 'Add funds to your Steam wallet for games',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
          costPrice: 18.50,
          marginPercentage: 7,
          valueType: 'STRING' as const,
          value: 'STEAM-{random}',
        },
        {
          name: 'Xbox Game Pass 1 Month',
          description: 'Access to 100+ high-quality games',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400',
          costPrice: 13.00,
          marginPercentage: 15,
          valueType: 'STRING' as const,
          value: 'XBOX-{random}',
        },
        {
          name: 'Airbnb $75 Credit',
          description: 'Book unique homes and experiences',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
          costPrice: 70.00,
          marginPercentage: 5,
          valueType: 'STRING' as const,
          value: 'AIRBNB-{random}',
        },
        {
          name: 'Nike Store $40',
          description: 'Shop the latest Nike shoes and apparel',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          costPrice: 36.00,
          marginPercentage: 10,
          valueType: 'STRING' as const,
          value: 'NIKE-{random}',
        },
        {
          name: 'Starbucks $15',
          description: 'Enjoy your favorite coffee and treats',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
          costPrice: 13.50,
          marginPercentage: 10,
          valueType: 'STRING' as const,
          value: 'SBUX-{random}',
        },
        {
          name: 'Apple iTunes $25',
          description: 'Music, movies, apps, and more',
          type: 'COUPON' as const,
          imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400',
          costPrice: 23.00,
          marginPercentage: 8,
          valueType: 'STRING' as const,
          value: 'ITUNES-{random}',
        },
      ];

      let createdCount = 0;
      const results = [];

      for (const product of products) {
        try {
          const created = await this.prisma.product.create({
            data: {
              name: product.name,
              description: product.description,
              type: product.type,
              imageUrl: product.imageUrl,
              coupon: {
                create: {
                  costPrice: product.costPrice,
                  marginPercentage: product.marginPercentage,
                  valueType: product.valueType,
                  value: product.value,
                },
              },
            },
            include: {
              coupon: true,
            },
          });
          createdCount++;
          results.push({ status: 'created', product: created.name });
          console.log(`✅ Created product: ${product.name}`);
        } catch (error) {
          results.push({ status: 'exists', product: product.name });
          console.log(`⚠️  Product already exists: ${product.name}`);
        }
      }

      console.log(`\n🎉 Seed completed! Created ${createdCount} new products.`);

      return {
        success: true,
        message: `Seed completed! Created ${createdCount} new products.`,
        reseller: {
          name: reseller.name,
          token: resellerToken,
        },
        products: results,
      };
    } catch (error) {
      console.error('❌ Error during seed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
