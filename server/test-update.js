require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function testUpdate() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grosproducts';
    console.log('Connecting to:', mongoUri);

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Test updating one category
    const result = await Category.updateOne(
      { name: 'Huiles et graisses' },
      { image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop' }
    );

    console.log('Update result:', result);

    // Check the category
    const category = await Category.findOne({ name: 'Huiles et graisses' });
    console.log('Category after update:', category);

    await mongoose.connection.close();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testUpdate();