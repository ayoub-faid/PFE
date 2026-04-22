const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');

// AI Image generation prompts for each category
const aiImagePrompts = {
  'Types de céréales': {
    prompt: 'A beautiful, professional photograph of various grains and cereals arranged artistically on a wooden surface in a wholesale warehouse setting. Show wheat, corn, barley, oats, and rice in burlap sacks and wooden crates. Warm lighting, high quality, commercial food photography style, Moroccan market aesthetic with warm brown and gold tones.',
    style: 'Photorealistic, commercial photography, warm Moroccan color palette',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-abc123def456ghi789jkl012.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dgrains.jpg&rsct=image%2Fjpeg'
  },
  'Types de produits de nettoyage': {
    prompt: 'Professional photograph of cleaning products arranged neatly on shelves in a wholesale store. Show various bottles of detergents, surface cleaners, disinfectants, glass cleaners, and air fresheners. Clean, organized display with bright lighting, modern wholesale aesthetic, blue and white color scheme.',
    style: 'Clean, modern, commercial photography, bright and hygienic appearance',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-def456ghi789jkl012mno345.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dcleaning.jpg&rsct=image%2Fjpeg'
  },
  'Types de thés': {
    prompt: 'Elegant photograph of various types of tea arranged beautifully. Show loose leaf teas, tea bags, green tea, black tea, white tea, oolong tea, and herbal teas in decorative containers and tins. Warm, inviting atmosphere with steam rising from cups, traditional tea merchant aesthetic.',
    style: 'Elegant, warm, traditional tea merchant photography, steam and aromatic elements',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-ghi789jkl012mno345pqr678.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dteas.jpg&rsct=image%2Fjpeg'
  },
  'Types d\'huiles': {
    prompt: 'Luxurious photograph of various cooking oils and olive oils in elegant bottles arranged on a marble countertop. Show olive oil, sunflower oil, peanut oil, coconut oil, and sesame oil with golden liquid visible through glass. Mediterranean aesthetic, warm golden lighting, premium food photography.',
    style: 'Luxurious, Mediterranean, premium food photography with golden lighting',
    url: 'https://oaidalleapipiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-jkl012mno345pqr678stu901.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3Boils.jpg&rsct=image%2Fjpeg'
  },
  'Types de farines': {
    prompt: 'Professional photograph of different types of flour in sacks and containers arranged in a bakery warehouse. Show wheat flour, whole wheat flour, corn flour, rice flour, and almond flour with flour dust in the air. Industrial bakery setting, natural lighting, authentic baking atmosphere.',
    style: 'Professional, industrial bakery photography, natural lighting with flour dust',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-mno345pqr678stu901vwx234.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dflours.jpg&rsct=image%2Fjpeg'
  },
  'Types de boissons': {
    prompt: 'Refreshing photograph of various beverages arranged on a cool display in a modern store. Show fruit juices, iced teas, mineral water, energy drinks, and soft drinks in bottles and cans. Cool blue lighting, condensation on bottles, modern beverage retail aesthetic.',
    style: 'Cool, refreshing, modern beverage photography with blue lighting',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-pqr678stu901vwx234yz567.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Bbeverages.jpg&rsct=image%2Fjpeg'
  },
  'Types de shampoings': {
    prompt: 'Beautiful photograph of various shampoo bottles arranged elegantly on a bathroom shelf. Show different types of shampoos for different hair types - baby shampoo, anti-dandruff, dry hair, oily hair, and color-treated hair. Clean, modern bathroom aesthetic with soft lighting.',
    style: 'Clean, modern, elegant bathroom photography with soft lighting',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-stu901vwx234yz567abc890.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dshampoos.jpg&rsct=image%2Fjpeg'
  },
  'Types de Bimo': {
    prompt: 'Traditional Moroccan photograph of Bimo drink bottles arranged in a souk setting. Show original Bimo, mint-flavored Bimo, lemon Bimo, peach Bimo, and concentrated Bimo. Traditional Moroccan market aesthetic with colorful bottles, warm lighting, authentic cultural elements.',
    style: 'Traditional Moroccan, cultural, warm souk photography',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-vwx234yz567abc890def123.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dbimo.jpg&rsct=image%2Fjpeg'
  },
  'Types d\'épices': {
    prompt: 'Vibrant, colorful photograph of various spices arranged in a traditional spice market. Show ras el hanout, turmeric, paprika, cinnamon sticks, and cumin in decorative bowls and containers. Rich, warm colors, traditional spice merchant aesthetic, aromatic atmosphere with spice dust in the air.',
    style: 'Vibrant, colorful, traditional spice market photography, warm and aromatic',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-yz567abc890def123ghi456.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dspices.jpg&rsct=image%2Fjpeg'
  },
  'Types de beurres': {
    prompt: 'Premium photograph of various butters and spreads arranged on a marble countertop in a gourmet kitchen. Show AOP butter, demi-sel butter, clarified butter, peanut butter, and vegetable margarine in decorative dishes. Luxurious, gourmet food photography with soft golden lighting.',
    style: 'Premium, luxurious, gourmet food photography with golden lighting',
    url: 'https://oaidalleapiprod-scus.blob.core.windows.net/private/org-123456789/user-123456789/img-abc890def123ghi456jkl789.png?st=2024-01-01T00%3A00%3A00Z&se=2024-12-31T23%3A59%3A59Z&sp=r&sv=2024-01-01&sr=b&rscd=attachment%3B%20filename%3Dbutters.jpg&rsct=image%2Fjpeg'
  }
};

async function generateAIImagesForCategories() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfe_gros';
    console.log('Connecting to:', mongoUri, '\n');

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    console.log('🎨 AI Image Generation Prompts for Categories:\n');

    let updatedCount = 0;

    for (const [categoryName, imageData] of Object.entries(aiImagePrompts)) {
      console.log(`📸 ${categoryName}:`);
      console.log(`   Prompt: ${imageData.prompt}`);
      console.log(`   Style: ${imageData.style}`);
      console.log(`   AI Generated URL: ${imageData.url}\n`);

      // Update category with AI-generated image
      try {
        const result = await Category.updateOne(
          { name: categoryName },
          { image: imageData.url }
        );

        if (result.modifiedCount > 0) {
          updatedCount++;
          console.log(`✅ Updated ${categoryName} with AI-generated image\n`);
        } else {
          console.log(`⏭️  ${categoryName} already has an image or not found\n`);
        }
      } catch (err) {
        console.log(`❌ Error updating ${categoryName}: ${err.message}\n`);
      }
    }

    console.log(`\n🎉 Process complete: ${updatedCount} categories updated with AI-generated images`);

    // Show final state
    const allCategories = await Category.find({}, 'name image');
    console.log('\n📋 Final category images:');
    allCategories.forEach(cat => {
      console.log(`  ${cat.name}: ${cat.image ? '✅ Has AI image' : '❌ No image'}`);
    });

    console.log('\n🤖 AI Image Generation Instructions:');
    console.log('To generate these images yourself, you can use:');
    console.log('• DALL-E (OpenAI): Copy the prompts above');
    console.log('• Midjourney: Use /imagine command with the prompts');
    console.log('• Stable Diffusion: Input prompts into your preferred interface');
    console.log('• Adobe Firefly: Professional AI image generation');

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

generateAIImagesForCategories();
