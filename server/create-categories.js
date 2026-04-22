const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');

const categoriesData = [
  {
    name: 'Huiles et graisses',
    description: 'Huiles alimentaires : olive, arachide, tournesol, coco, palme. Graisses et beurres.'
  },
  {
    name: 'Thés et infusions',
    description: 'Thés noirs, verts, oolong, rouibos, tisanes et infusions naturelles.'
  },
  {
    name: 'Café et cacao',
    description: 'Café moulu, grains, capsules. Cacao en poudre et chocolat de cuisson.'
  },
  {
    name: 'Épices et condiments',
    description: 'Épices variées : cummin, curcuma, paprika, poivre, ail, oignon. Sauces et marinades.'
  },
  {
    name: 'Farines et féculents',
    description: 'Farines de blé, riz, maïs, soja. Tapioca, amidon et autres féculents.'
  },
  {
    name: 'Riz et céréales',
    description: 'Riz blanc, complet, basmati. Blé, orge, avoine, millet et autres céréales.'
  },
  {
    name: 'Sucre et édulcorants',
    description: 'Sucre blanc, roux, cassonade. Miel, sirop d\'agave et édulcorants naturels.'
  },
  {
    name: 'Sel et minéraux',
    description: 'Sel fin, de mer, gemme. Levure, poudre à lever et agents levants.'
  },
  {
    name: 'Conserves et légumes',
    description: 'Tomates en conserve, concentré. Légumes séchés, déshydratés et en poudre.'
  },
  {
    name: 'Fruits secs et noix',
    description: 'Raisins, dattes, abricots secs. Noix, amandes, cacahuètes, noisettes.'
  },
  {
    name: 'Produits laitiers',
    description: 'Lait en poudre, fromage, beurre, yaourt, crème fraîche.'
  },
  {
    name: 'Viandes et poissons',
    description: 'Viandes séchées, saucisses. Poissons fumés et conserves de poisson.'
  },
  {
    name: 'Pâtes et produits de boulangerie',
    description: 'Pâtes sèches, riz pâtes. Pain, farine de boulangerie, levain.'
  },
  {
    name: 'Boissons et jus',
    description: 'Jus de fruits concentrés, sirop. Boissons gazeuses, eau minérale, lait.'
  },
  {
    name: 'Produits biologiques',
    description: 'Aliments certifiés biologiques : farines, céréales, fruits secs en vrac.'
  },
  {
    name: 'Ingrédients de pâtisserie',
    description: 'Levure, vanille, extrait d\'amande. Colorants, essences et arômes culinaires.'
  },
  {
    name: 'Snacks et grignotage',
    description: 'Chips, biscuits, crackers, pop-corn, fruits secs : tout pour grignoter.'
  },
  {
    name: 'Alcools et vinaigres',
    description: 'Vinaigre blanc, balsamique, cidre. Alcools culinaires : vin, rhum, cognac.'
  },
  {
    name: 'Emballages et fournitures',
    description: 'Contenants, emballages, papier alimentaire pour la vente en gros.'
  },
  {
    name: 'Promotions spéciales',
    description: 'Lots, packs promos et offres spéciales pour grossistes et revendeurs.'
  }
];

async function addCategories() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grosproducts';
    console.log('Connecting to:', mongoUri, '\n');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    // Check for existing categories
    const existing = await Category.find({});
    console.log(`Found ${existing.length} existing categories:`);
    existing.forEach(cat => console.log(`  - ${cat.name}`));
    console.log();

    // Insert new categories, handling duplicates gracefully
    let createdCount = 0;
    for (const catData of categoriesData) {
      try {
        const exists = await Category.findOne({ name: new RegExp(`^${catData.name}$`, 'i') });
        if (!exists) {
          await Category.create({
            ...catData,
            active: true
          });
          createdCount++;
          console.log(`✅ Created: ${catData.name}`);
        } else {
          console.log(`⏭️  Skipped: ${catData.name} (already exists)`);
        }
      } catch (err) {
        console.log(`❌ Error creating ${catData.name}: ${err.message}`);
      }
    }

    console.log(`\n✅ Process complete: ${createdCount} new categories created`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

addCategories();
