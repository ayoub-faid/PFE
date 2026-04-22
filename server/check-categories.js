require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function checkCategories() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grosproducts';
    await mongoose.connect(mongoUri);

    const categories = await Category.find({}, 'name image');
    console.log('Categories with images:');
    categories.forEach(cat => {
      console.log(`${cat.name}: ${cat.image ? 'Has image' : 'No image'}`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCategories();