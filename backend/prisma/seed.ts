import { PrismaClient, ProductType, CouponValueType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create a reseller with a known token
  const resellerToken = 'test-reseller-token-12345';
  const tokenHash = await bcrypt.hash(resellerToken, 10);

  const reseller = await prisma.reseller.upsert({
    where: { tokenHash },
    update: {},
    create: {
      name: 'Test Reseller',
      tokenHash,
      isActive: true,
    },
  });

  console.log(`✅ Created reseller: ${reseller.name}`);
  console.log(`🔑 Reseller Token: ${resellerToken}`);
  console.log(`   Use this token in Authorization header: Bearer ${resellerToken}`);

  // Create sample coupons
  const coupons = [
    {
      name: 'Amazon $100 Gift Card',
      description: 'Redeemable on Amazon.com for any products, games, electronics, and more',
      imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop',
      costPrice: 80,
      marginPercentage: 25,
      valueType: CouponValueType.STRING,
      value: 'AMZN-1234-5678-ABCD',
    },
    {
      name: 'Spotify Premium 6 Months',
      description: '6 months of ad-free music streaming with unlimited skips and offline listening',
      imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop',
      costPrice: 35,
      marginPercentage: 43,
      valueType: CouponValueType.STRING,
      value: 'SPOT-PREM-9876-XYZ',
    },
    {
      name: 'Netflix Premium $50 Gift Card',
      description: 'Watch unlimited movies, series and documentaries in 4K Ultra HD',
      imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop',
      costPrice: 40,
      marginPercentage: 25,
      valueType: CouponValueType.STRING,
      value: 'NFLX-5050-GIFT-CODE',
    },
    {
      name: 'Starbucks $25 eGift Card',
      description: 'Get your favorite coffee, pastries, and treats at any Starbucks location',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop',
      costPrice: 20,
      marginPercentage: 20,
      valueType: CouponValueType.STRING,
      value: 'SBUX-2525-CAFE-1234',
    },
    {
      name: 'iTunes $100 Digital Card',
      description: 'For apps, games, music, movies, TV shows, and iCloud storage',
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=400&h=300&fit=crop',
      costPrice: 85,
      marginPercentage: 15,
      valueType: CouponValueType.STRING,
      value: 'ITUN-1000-MEDIA-ABCD',
    },
    {
      name: 'PlayStation Store $75',
      description: 'Buy the latest games, add-ons, and PlayStation Plus subscriptions',
      imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
      costPrice: 60,
      marginPercentage: 25,
      valueType: CouponValueType.STRING,
      value: 'PSN-7500-GAME-WXYZ',
    },
    {
      name: 'Uber Eats $50 Voucher',
      description: 'Order food delivery from your favorite restaurants with free delivery',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      costPrice: 42,
      marginPercentage: 19,
      valueType: CouponValueType.STRING,
      value: 'UBER-EATS-5000-DEL',
    },
    {
      name: 'Google Play $100 Gift Code',
      description: 'For apps, games, movies, books, and in-app purchases on Android',
      imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop',
      costPrice: 85,
      marginPercentage: 18,
      valueType: CouponValueType.STRING,
      value: 'GPLY-1000-ANDR-CODE',
    },
    {
      name: 'Steam Wallet $60',
      description: 'Buy PC games, downloadable content, and in-game items on Steam',
      imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
      costPrice: 50,
      marginPercentage: 20,
      valueType: CouponValueType.STRING,
      value: 'STEAM-6000-GAME-KEY',
    },
    {
      name: 'Xbox Live Gold $40',
      description: 'Online multiplayer gaming and exclusive member discounts for 6 months',
      imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&h=300&fit=crop',
      costPrice: 32,
      marginPercentage: 25,
      valueType: CouponValueType.STRING,
      value: 'XBOX-GOLD-4000-LIVE',
    },
    {
      name: 'Airbnb $100 Travel Credit',
      description: 'Book unique homes and experiences around the world with this credit',
      imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
      costPrice: 85,
      marginPercentage: 18,
      valueType: CouponValueType.STRING,
      value: 'ABNB-1000-TRVL-CRED',
    },
    {
      name: 'Nike Store $75 Gift Card',
      description: 'Shop the latest sneakers, apparel, and sports equipment',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      costPrice: 62,
      marginPercentage: 21,
      valueType: CouponValueType.STRING,
      value: 'NIKE-7500-SHOP-GIFT',
    },
  ];

  for (const couponData of coupons) {
    const { costPrice, marginPercentage, valueType, value, ...productData } = couponData;

    const product = await prisma.product.create({
      data: {
        ...productData,
        type: ProductType.COUPON,
        coupon: {
          create: {
            costPrice,
            marginPercentage,
            valueType,
            value,
          },
        },
      },
      include: {
        coupon: true,
      },
    });

    const minSellPrice = Number(costPrice) * (1 + Number(marginPercentage) / 100);
    console.log(`✅ Created: ${product.name} (min price: $${minSellPrice.toFixed(2)})`);
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
