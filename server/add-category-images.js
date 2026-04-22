const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');

// Category images mapping - using placeholder images that represent each category
const categoryImages = {
  'Huiles et graisses': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
  'Thés et infusions': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
  'Café et cacao': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
  'Épices et condiments': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
  'Farines et féculents': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
  'Riz et céréales': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
  'Sucre et édulcorants': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
  'Sel et minéraux': 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop',
  'Conserves et légumes': 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop',
  'Fruits secs et noix': 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop',
  'Produits laitiers': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
  'Viandes et poissons': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',
  'Pâtes et produits de boulangerie': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  'Boissons et jus': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  'Produits biologiques': 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop',
  'Ingrédients de pâtisserie': 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop',
  'Snacks et grignotage': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop',
  'Alcools et vinaigres': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
  'Emballages et fournitures': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
  'Promotions spéciales': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
};

async function updateCategoryImages() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grosproducts';
    console.log('Connecting to:', mongoUri, '\n');

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    // Update each category with its image
    let updatedCount = 0;
    for (const [categoryName, imageUrl] of Object.entries(categoryImages)) {
      try {
        const result = await Category.updateOne(
          { name: categoryName },
          { image: imageUrl }
        );

        if (result.modifiedCount > 0) {
          updatedCount++;
          console.log(`✅ Updated: ${categoryName}`);
        } else {
          console.log(`⏭️  No change: ${categoryName} (already has image or not found)`);
        }
      } catch (err) {
        console.log(`❌ Error updating ${categoryName}: ${err.message}`);
      }
    }

    console.log(`\n✅ Process complete: ${updatedCount} categories updated with images`);

    // Show final state
    const allCategories = await Category.find({}, 'name image');
    console.log('\n📋 Final category images:');
    allCategories.forEach(cat => {
      console.log(`  ${cat.name}: ${cat.image ? '✅ Has image' : '❌ No image'}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

updateCategoryImages();
