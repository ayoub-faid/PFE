const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

// New categories and their products
const newCategoriesData = [
  {
    name: 'Types de céréales',
    description: 'Différents types de céréales pour l\'alimentation',
    products: [
      { name: 'Blé tendre', description: 'Blé tendre de qualité supérieure pour la panification', price: 25.00, costPrice: 18.00, stock: 500, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
      { name: 'Blé dur', description: 'Blé dur idéal pour les pâtes et le couscous', price: 28.00, costPrice: 20.00, stock: 450, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
      { name: 'Maïs grain', description: 'Maïs grain jaune pour l\'alimentation animale et humaine', price: 18.00, costPrice: 12.00, stock: 600, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
      { name: 'Orge perlé', description: 'Orge perlé pour soupes et plats mijotés', price: 22.00, costPrice: 15.00, stock: 400, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
      { name: 'Avoine complète', description: 'Avoine complète riche en fibres et nutriments', price: 24.00, costPrice: 17.00, stock: 350, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de produits de nettoyage',
    description: 'Produits de nettoyage pour usage domestique et professionnel',
    products: [
      { name: 'Détergent lessive liquide', description: 'Détergent liquide concentré pour machine à laver', price: 8.50, costPrice: 5.50, stock: 200, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
      { name: 'Nettoyant multi-surfaces', description: 'Nettoyant universel pour toutes les surfaces', price: 6.00, costPrice: 4.00, stock: 150, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
      { name: 'Désinfectant sol', description: 'Désinfectant concentré pour sols et surfaces', price: 7.50, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
      { name: 'Nettoyant vitres', description: 'Nettoyant spécial vitres sans traces', price: 5.50, costPrice: 3.50, stock: 180, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
      { name: 'Désodorisant frais', description: 'Désodorisant en spray pour intérieur', price: 4.50, costPrice: 3.00, stock: 250, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de thés',
    description: 'Sélection de thés de différentes origines',
    products: [
      { name: 'Thé vert Gunpowder', description: 'Thé vert chinois traditionnel en perles', price: 12.00, costPrice: 8.00, stock: 100, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' },
      { name: 'Thé noir Assam', description: 'Thé noir indien robuste et corsé', price: 15.00, costPrice: 10.00, stock: 120, image: 'https://images.unsplash.com/photo-1576092762793-c0e14b9cc680?w=400&h=300&fit=crop' },
      { name: 'Thé blanc Pai Mu Tan', description: 'Thé blanc chinois délicat et raffiné', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop' },
      { name: 'Thé oolong Tie Guan Yin', description: 'Thé oolong semi-fermenté de Taiwan', price: 20.00, costPrice: 14.00, stock: 70, image: 'https://images.unsplash.com/photo-1571934811353-2d32a683e7ac?w=400&h=300&fit=crop' },
      { name: 'Thé à la menthe', description: 'Thé traditionnel marocain à la menthe fraîche', price: 10.00, costPrice: 7.00, stock: 150, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types d\'huiles',
    description: 'Huiles végétales et essentielles de différentes origines',
    products: [
      { name: 'Huile d\'olive extra vierge', description: 'Huile d\'olive de qualité supérieure, fruitée', price: 18.00, costPrice: 12.00, stock: 200, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop' },
      { name: 'Huile de tournesol', description: 'Huile végétale polyvalente pour la cuisine', price: 8.00, costPrice: 5.00, stock: 300, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
      { name: 'Huile d\'arachide', description: 'Huile idéale pour la friture et les sauces', price: 12.00, costPrice: 8.00, stock: 180, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop' },
      { name: 'Huile de coco vierge', description: 'Huile de coco bio pour cuisine et soins', price: 15.00, costPrice: 10.00, stock: 120, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
      { name: 'Huile de sésame torréfiée', description: 'Huile de sésame asiatique parfumée', price: 14.00, costPrice: 9.00, stock: 90, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de farines',
    description: 'Farines de différentes céréales et utilisations',
    products: [
      { name: 'Farine de blé T55', description: 'Farine de blé tendre pour pain et pâtisserie', price: 6.00, costPrice: 4.00, stock: 400, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
      { name: 'Farine de blé T65', description: 'Farine légèrement complète pour pains spéciaux', price: 7.00, costPrice: 5.00, stock: 350, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
      { name: 'Farine de blé complet', description: 'Farine complète riche en fibres', price: 8.00, costPrice: 5.50, stock: 300, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
      { name: 'Farine de maïs', description: 'Farine de maïs pour polenta et pâtisserie', price: 5.50, costPrice: 3.50, stock: 250, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
      { name: 'Farine de riz', description: 'Farine de riz pour cuisine asiatique', price: 9.00, costPrice: 6.00, stock: 200, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de boissons',
    description: 'Boissons rafraîchissantes et énergisantes',
    products: [
      { name: 'Jus d\'orange concentré', description: 'Concentré de jus d\'orange 100% pur', price: 8.00, costPrice: 5.00, stock: 150, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Café froid ready-to-drink', description: 'Café glacé prêt à boire en canette', price: 2.50, costPrice: 1.50, stock: 300, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Thé glacé pêche', description: 'Thé glacé aromatisé à la pêche', price: 2.00, costPrice: 1.20, stock: 250, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Eau minérale plate', description: 'Eau minérale naturelle pétillante', price: 1.50, costPrice: 0.80, stock: 500, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Jus de pomme bio', description: 'Jus de pomme français 100% bio', price: 3.50, costPrice: 2.00, stock: 200, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de shampoings',
    description: 'Shampoings pour différents types de cheveux',
    products: [
      { name: 'Shampooing doux bébé', description: 'Shampooing extra-doux pour cheveux fins', price: 6.50, costPrice: 4.00, stock: 120, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop' },
      { name: 'Shampooing anti-pelliculaire', description: 'Shampooing traitant contre les pellicules', price: 7.00, costPrice: 4.50, stock: 100, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop' },
      { name: 'Shampooing cheveux secs', description: 'Shampooing nourrissant pour cheveux secs', price: 8.00, costPrice: 5.00, stock: 90, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop' },
      { name: 'Shampooing cheveux gras', description: 'Shampooing purifiant pour cheveux gras', price: 7.50, costPrice: 4.80, stock: 110, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop' },
      { name: 'Shampooing coloré', description: 'Shampooing protecteur pour cheveux colorés', price: 9.00, costPrice: 6.00, stock: 80, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de Bimo',
    description: 'Boisson traditionnelle Bimo et ses variantes',
    products: [
      { name: 'Bimo original', description: 'Boisson traditionnelle Bimo nature', price: 3.00, costPrice: 2.00, stock: 200, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Bimo à la menthe', description: 'Bimo aromatisé à la menthe fraîche', price: 3.50, costPrice: 2.20, stock: 180, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Bimo citron', description: 'Bimo au citron pour une touche acidulée', price: 3.50, costPrice: 2.20, stock: 170, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Bimo pêche', description: 'Bimo aromatisé à la pêche', price: 3.50, costPrice: 2.20, stock: 160, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Bimo concentré', description: 'Concentré de Bimo pour préparation maison', price: 8.00, costPrice: 5.00, stock: 100, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types d\'épices',
    description: 'Épices et aromates de différentes origines',
    products: [
      { name: 'Ras el hanout', description: 'Mélange d\'épices marocain traditionnel', price: 12.00, costPrice: 8.00, stock: 80, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
      { name: 'Curcuma en poudre', description: 'Épice anti-inflammatoire, riche en curcumine', price: 8.00, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf09ae?w=400&h=300&fit=crop' },
      { name: 'Paprika doux', description: 'Paprika espagnol légèrement piquant', price: 6.50, costPrice: 4.00, stock: 100, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
      { name: 'Cannelle en bâtons', description: 'Cannelle de Ceylan en bâtons authentiques', price: 9.00, costPrice: 6.00, stock: 70, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
      { name: 'Cumin moulu', description: 'Cumin indien moulu pour currys', price: 7.00, costPrice: 4.50, stock: 90, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' }
    ]
  },
  {
    name: 'Types de beurres',
    description: 'Beurres et matières grasses de différentes origines',
    products: [
      { name: 'Beurre doux AOP', description: 'Beurre français AOP Charentes-Poitou', price: 5.50, costPrice: 3.50, stock: 150, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' },
      { name: 'Beurre demi-sel', description: 'Beurre légèrement salé traditionnel', price: 5.80, costPrice: 3.70, stock: 140, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' },
      { name: 'Beurre clarifié', description: 'Ghee traditionnel, beurre clarifié', price: 8.00, costPrice: 5.00, stock: 100, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' },
      { name: 'Beurre de cacahuète', description: 'Beurre de cacahuète crémeux 100% arachides', price: 4.50, costPrice: 3.00, stock: 200, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' },
      { name: 'Margarine végétale', description: 'Margarine végétale légère et onctueuse', price: 3.50, costPrice: 2.20, stock: 180, image: 'https://images.unsplash.com/photo-1589985270826-4a7bb135bc9d?w=400&h=300&fit=crop' }
    ]
  }
];

async function replaceAllCategoriesAndProducts() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfe_gros';
    console.log('Connecting to:', mongoUri, '\n');

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('❌ No admin user found. Please create an admin user first.');
      process.exit(1);
    }
    console.log('✅ Found admin user:', adminUser.name, '\n');

    // Delete all existing categories and products
    console.log('🗑️  Deleting existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ All existing categories and products deleted\n');

    let totalProductsCreated = 0;

    // Create new categories and their products
    for (const categoryData of newCategoriesData) {
      console.log(`🔄 Creating category: ${categoryData.name}`);

      // Create category
      const category = await Category.create({
        name: categoryData.name,
        description: categoryData.description,
        image: categoryData.products[0].image, // Use first product image as category image
        active: true,
        createdBy: adminUser._id
      });

      console.log(`✅ Created category: ${category.name}`);

      // Create products for this category
      let categoryProductsCreated = 0;
      for (const productData of categoryData.products) {
        const sku = `PRD-${categoryData.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        await Product.create({
          name: productData.name,
          description: productData.description,
          category: category._id,
          price: productData.price,
          costPrice: productData.costPrice,
          sku: sku,
          image: productData.image,
          stock: {
            available: productData.stock,
            reserved: 0,
            damaged: 0,
            lastRestockDate: new Date()
          },
          createdBy: adminUser._id,
          active: true
        });

        categoryProductsCreated++;
        console.log(`  ✅ Created: ${productData.name} (SKU: ${sku})`);
      }

      console.log(`✅ ${categoryData.name}: ${categoryProductsCreated} products created\n`);
      totalProductsCreated += categoryProductsCreated;
    }

    console.log(`\n🎉 Process complete! Created ${newCategoriesData.length} categories and ${totalProductsCreated} products`);

    // Show final summary
    const allCategories = await Category.find({}, 'name');
    const summary = [];

    for (const cat of allCategories) {
      const productCount = await Product.countDocuments({ category: cat._id });
      summary.push(`${cat.name}: ${productCount} products`);
    }

    console.log('\n📊 Final Summary:');
    summary.forEach(line => console.log(`  ${line}`));

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

replaceAllCategoriesAndProducts();
