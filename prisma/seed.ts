import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  console.log('👥 Creating users...');
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: hashedPassword,
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: hashedPassword,
      },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@example.com' },
      update: {},
      create: {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: hashedPassword,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  console.log('📦 Creating products...');
  
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'product-1' },
      update: {},
      create: {
        id: 'product-1',
        name: 'Wireless Bluetooth Headphones',
        description: 'These headphones are pretty great! I got them last month and the sound quality is really good. The noise canceling actually works - I can wear them on the subway and barely hear anything. Battery lasts forever too, like seriously I forget to charge them sometimes.',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        price: 9999,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-2' },
      update: {},
      create: {
        id: 'product-2',
        name: 'Smart Fitness Watch',
        description: "Honestly didn't think I'd use a smartwatch this much but here we are. Tracks my runs, shows texts, and the heart rate thing is kind of addictive to check. It's waterproof which is nice because I definitely forgot to take it off in the shower a few times.",
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        price: 24999,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-3' },
      update: {},
      create: {
        id: 'product-3',
        name: 'Portable Coffee Maker',
        description: 'Look, I know it sounds weird but this thing makes surprisingly decent coffee. Perfect for camping or when your regular coffee maker breaks (again). Super lightweight and the battery lasts a few cups. Not gonna lie, bought it as a joke but now I actually use it.',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        price: 7999,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-4' },
      update: {},
      create: {
        id: 'product-4',
        name: 'Mechanical Gaming Keyboard',
        description: 'My old keyboard was getting gross and some keys were sticking. This one feels amazing to type on - like every keystroke is satisfying. The RGB lights are a bit much but you can turn them off. Worth it just for how nice it feels when coding.',
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
        price: 12999,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-5' },
      update: {},
      create: {
        id: 'product-5',
        name: 'Wireless Phone Charger',
        description: "Got tired of plugging and unplugging my phone all the time. Just drop it on this pad and it charges. It's not super fast but whatever, I usually charge it overnight anyway. The LED light is subtle which I appreciate - doesn't light up the whole room.",
        imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
        price: 3999,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-6' },
      update: {},
      create: {
        id: 'product-6',
        name: 'Premium Laptop Backpack',
        description: 'Finally found a backpack that fits my 15" laptop properly and has room for all my random stuff. The padding is really good - dropped it once and my laptop was fine. Lots of pockets for organizing cables and chargers. Looks professional enough for work too.',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        price: 8999,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  console.log('⭐ Creating sample reviews...');
  
  const reviews = await Promise.all([
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[0].id,
          productId: 'product-1'
        }
      },
      update: {},
      create: {
        rating: 5,
        comment: "Love these! I wear them every day for work calls and music. The noise canceling is legit - I can't hear my roommate's TV anymore lol. Battery life is insane, I charge them maybe once a week?",
        userId: users[0].id,
        productId: 'product-1',
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[1].id,
          productId: 'product-2'
        }
      },
      update: {},
      create: {
        rating: 4,
        comment: "Pretty good watch. Heart rate seems accurate compared to the gym machines. App is easy to use. Only complaint is the battery could last longer - I have to charge it every few days. But overall happy with it.",
        userId: users[1].id,
        productId: 'product-2',
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[2].id,
          productId: 'product-3'
        }
      },
      update: {},
      create: {
        rating: 5,
        comment: "This is perfect for camping! Made coffee on a 3-day hiking trip and it worked great. Coffee actually tastes good too, not like camping coffee usually does. Super portable and easy to clean.",
        userId: users[2].id,
        productId: 'product-3',
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[0].id,
          productId: 'product-4'
        }
      },
      update: {},
      create: {
        rating: 4,
        comment: "Really nice to type on. Keys have a satisfying click without being too loud for the office. Build quality feels solid. The RGB is a bit extra but hey, why not? A bit pricey but I use it 8+ hours a day so worth it.",
        userId: users[0].id,
        productId: 'product-4',
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[1].id,
          productId: 'product-5'
        }
      },
      update: {},
      create: {
        rating: 3,
        comment: "Does what it says - charges wirelessly. It's slower than plugging in but convenient. Sometimes have to adjust my phone to get it positioned right. Works fine, nothing fancy but gets the job done.",
        userId: users[1].id,
        productId: 'product-5',
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} sample reviews`);

  console.log('📊 Updating product ratings...');
  
  for (const product of products) {
    const productReviews = await prisma.review.findMany({
      where: { productId: product.id },
    });

    if (productReviews.length > 0) {
      const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
      
      await prisma.product.update({
        where: { id: product.id },
        data: {
          averageRating: averageRating,
          numReviews: productReviews.length,
        },
      });
    }
  }

  console.log('✅ Updated product ratings');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📝 Test Users Created:');
  console.log('   Email: alice@example.com   | Password: password123');
  console.log('   Email: bob@example.com     | Password: password123');
  console.log('   Email: charlie@example.com | Password: password123');
  console.log('');
  console.log('🛍️ Products Created: 6 products with images and descriptions');
  console.log('⭐ Sample Reviews: 5 reviews showing the rating system');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 