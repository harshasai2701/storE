import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/UserModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists and delete it
    await User.deleteOne({ email: 'admin@example.com' });

    // Hash password manually since we are using insertMany-style creation
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('  Email   : admin@example.com');
    console.log('  Password: admin123');
    console.log('  isAdmin : true');
    console.log('-----------------------------------');
    process.exit();
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
