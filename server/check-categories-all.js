const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/grosproducts');
    console.log('Connected to MongoDB\n');

    const allCats = await Category.find({});
    console.log(`Total categories in DB: ${allCats.length}\n`);
    
    allCats.forEach(cat => {
      console.log(`- ${cat.name} (active: ${cat.active})`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCategories();
