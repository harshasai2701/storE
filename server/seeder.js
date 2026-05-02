import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    // Pre-hash passwords since insertMany bypasses the pre('save') hook
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@example.com', password: hashedPassword, isAdmin: true },
      { name: 'John Doe', email: 'john@example.com', password: hashedPassword }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      {
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
        description: 'High quality wireless headphones with noise cancellation.',
        brand: 'AudioTech',
        category: 'Electronics',
        price: 299.99,
        countInStock: 10,
        user: adminUser,
      },
      {
        name: 'Minimalist Wrist Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60',
        description: 'Clean, modern wrist watch with leather strap.',
        brand: 'Classic',
        category: 'Accessories',
        price: 129.99,
        countInStock: 5,
        user: adminUser,
      },
      {
        name: 'Smart Home Speaker',
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500&q=60',
        description: 'Voice-controlled smart speaker with rich sound.',
        brand: 'SoundHub',
        category: 'Electronics',
        price: 99.99,
        countInStock: 15,
        user: adminUser,
      },
      {
        name: 'Professional DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60',
        description: 'Capture stunning photos and 4K videos with this professional-grade DLSR.',
        brand: 'CamPro',
        category: 'Electronics',
        price: 899.99,
        countInStock: 3,
        user: adminUser,
      },
      {
        name: 'Designer Sunglasses',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60',
        description: 'Stylish sunglasses with UV protection.',
        brand: 'SunWear',
        category: 'Accessories',
        price: 49.99,
        countInStock: 20,
        user: adminUser,
      },
      {
        name: 'Mechanical Gaming Keyboard',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60',
        description: 'RGB backlit mechanical keyboard for fast typing and gaming.',
        brand: 'KeyMaster',
        category: 'Electronics',
        price: 109.99,
        countInStock: 8,
        user: adminUser,
      },
      {
        name: 'Wireless Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&w=500&q=60',
        description: 'Ultra-lightweight wireless gaming mouse with 10k DPI sensor.',
        brand: 'GamerGear',
        category: 'Electronics',
        price: 59.99,
        countInStock: 12,
        user: adminUser,
      },
      {
        name: 'Stainless Steel Water Bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=60',
        description: 'Insulated water bottle keeping drinks cold for 24 hours.',
        brand: 'HydroLife',
        category: 'Lifestyle',
        price: 24.99,
        countInStock: 30,
        user: adminUser,
      },
      {
        name: 'Classic Leather Wallet',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60',
        description: 'Genuine leather slim bifold wallet.',
        brand: 'Classic',
        category: 'Accessories',
        price: 35.00,
        countInStock: 15,
        user: adminUser,
      },
      {
        name: 'Noise-Isolating Earbuds',
        image: 'https://images.unsplash.com/photo-1572569438068-fdb50204d1f0?auto=format&fit=crop&w=500&q=60',
        description: 'Compact earbuds with deep bass and clear treble.',
        brand: 'AudioTech',
        category: 'Electronics',
        price: 79.99,
        countInStock: 25,
        user: adminUser,
      },
      {
        name: 'Portable Power Bank',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=500&q=60',
        description: '20,000mAh external battery charger for phones and tablets.',
        brand: 'VoltCharge',
        category: 'Electronics',
        price: 39.99,
        countInStock: 18,
        user: adminUser,
      },
      {
        name: 'Organic Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
        description: 'Super soft, 100% organic cotton basic tee.',
        brand: 'EcoWear',
        category: 'Apparel',
        price: 19.99,
        countInStock: 50,
        user: adminUser,
      },
      {
        name: 'Vintage Film Camera',
        image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=500&q=60',
        description: 'Refurbished 35mm film camera for analog enthusiasts.',
        brand: 'RetroLens',
        category: 'Electronics',
        price: 149.99,
        countInStock: 2,
        user: adminUser,
      },
      {
        name: 'Acupressure Yoga Mat',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=60',
        description: 'High-density foam mat for yoga and workouts.',
        brand: 'ZenFit',
        category: 'Fitness',
        price: 29.99,
        countInStock: 14,
        user: adminUser,
      },
      {
        name: 'Coffee Maker Machine',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=500&q=60',
        description: 'Programmable drip coffee maker for the perfect morning brew.',
        brand: 'MorningBrew',
        category: 'Home Appliances',
        price: 89.99,
        countInStock: 6,
        user: adminUser,
      },
      {
        name: 'Ceramic Coffee Mug',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=60',
        description: 'Handcrafted ceramic mug suitable for hot and cold drinks.',
        brand: 'Artisan',
        category: 'Home & Kitchen',
        price: 14.99,
        countInStock: 22,
        user: adminUser,
      },
      {
        name: 'Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60',
        description: 'Lightweight road running shoes with maximum cushioning.',
        brand: 'SprintStep',
        category: 'Apparel',
        price: 119.99,
        countInStock: 11,
        user: adminUser,
      },
      {
        name: 'Smart Watch Series X',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60',
        description: 'Track workouts, receive notifications, and measure heart rate.',
        brand: 'TechWear',
        category: 'Electronics',
        price: 249.99,
        countInStock: 7,
        user: adminUser,
      },
      {
        name: 'Leather Messenger Bag',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60',
        description: 'Spacious laptop bag made of premium genuine leather.',
        brand: 'Classic',
        category: 'Accessories',
        price: 159.99,
        countInStock: 4,
        user: adminUser,
      },
      {
        name: 'Wireless Charging Pad',
        image: 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&w=500&q=60',
        description: 'Fast wireless charger pad compatible with Qi-enabled devices.',
        brand: 'VoltCharge',
        category: 'Electronics',
        price: 29.99,
        countInStock: 20,
        user: adminUser,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('20 Products Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
