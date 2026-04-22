const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');

// New simplified category names
const nameUpdates = {
  'Types de céréales': 'Types Céréales',
  'Types de produits de nettoyage': 'Types Produits de nettoyage',
  'Types de thés': 'Types Thés',
  'Types d\'huiles': 'Types Huiles',
  'Types de farines': 'Types Farines',
  'Types de boissons': 'Types Boissons',
  'Types de shampoings': 'Types Shampoings',
  'Types de Bimo': 'Types Bimo',
  'Types d\'épices': 'Types Épices',
  'Types de beurres': 'Types Beurres'
};

async function updateCategoryNames() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfe_gros';
    console.log('Connecting to:', mongoUri, '\n');

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    let updatedCount = 0;

    for (const [oldName, newName] of Object.entries(nameUpdates)) {
      try {
        const result = await Category.updateOne(
          { name: oldName },
          { name: newName }
        );

        if (result.modifiedCount > 0) {
          updatedCount++;
          console.log(`✅ Updated: "${oldName}" → "${newName}"`);
        } else {
          console.log(`⏭️  No change: "${oldName}" (not found or already updated)`);
        }
      } catch (err) {
        console.log(`❌ Error updating "${oldName}": ${err.message}`);
      }
    }

    console.log(`\n🎉 Process complete: ${updatedCount} categories updated with simplified names`);

    // Show final state
    const allCategories = await Category.find({}, 'name').sort({ name: 1 });
    console.log('\n📋 Final category names:');
    allCategories.forEach(cat => {
      console.log(`  ${cat.name}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

updateCategoryNames();
