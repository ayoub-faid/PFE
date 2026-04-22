// AI Image Generation Guide for Categories
// Copy and paste these prompts into your preferred AI image generator

const aiImagePrompts = {
  'Types de céréales': `A beautiful, professional photograph of various grains and cereals arranged artistically on a wooden surface in a wholesale warehouse setting. Show wheat, corn, barley, oats, and rice in burlap sacks and wooden crates. Warm lighting, high quality, commercial food photography style, Moroccan market aesthetic with warm brown and gold tones.`,

  'Types de produits de nettoyage': `Professional photograph of cleaning products arranged neatly on shelves in a wholesale store. Show various bottles of detergents, surface cleaners, disinfectants, glass cleaners, and air fresheners. Clean, organized display with bright lighting, modern wholesale aesthetic, blue and white color scheme.`,

  'Types de thés': `Elegant photograph of various types of tea arranged beautifully. Show loose leaf teas, tea bags, green tea, black tea, white tea, oolong tea, and herbal teas in decorative containers and tins. Warm, inviting atmosphere with steam rising from cups, traditional tea merchant aesthetic.`,

  'Types d\'huiles': `Luxurious photograph of various cooking oils and olive oils in elegant bottles arranged on a marble countertop. Show olive oil, sunflower oil, peanut oil, coconut oil, and sesame oil with golden liquid visible through glass. Mediterranean aesthetic, warm golden lighting, premium food photography.`,

  'Types de farines': `Professional photograph of different types of flour in sacks and containers arranged in a bakery warehouse. Show wheat flour, whole wheat flour, corn flour, rice flour, and almond flour with flour dust in the air. Industrial bakery setting, natural lighting, authentic baking atmosphere.`,

  'Types de boissons': `Refreshing photograph of various beverages arranged on a cool display in a modern store. Show fruit juices, iced teas, mineral water, energy drinks, and soft drinks in bottles and cans. Cool blue lighting, condensation on bottles, modern beverage retail aesthetic.`,

  'Types de shampoings': `Beautiful photograph of various shampoo bottles arranged elegantly on a bathroom shelf. Show different types of shampoos for different hair types - baby shampoo, anti-dandruff, dry hair, oily hair, and color-treated hair. Clean, modern bathroom aesthetic with soft lighting.`,

  'Types de Bimo': `Traditional Moroccan photograph of Bimo drink bottles arranged in a souk setting. Show original Bimo, mint-flavored Bimo, lemon Bimo, peach Bimo, and concentrated Bimo. Traditional Moroccan market aesthetic with colorful bottles, warm lighting, authentic cultural elements.`,

  'Types d\'épices': `Vibrant, colorful photograph of various spices arranged in a traditional spice market. Show ras el hanout, turmeric, paprika, cinnamon sticks, and cumin in decorative bowls and containers. Rich, warm colors, traditional spice merchant aesthetic, aromatic atmosphere with spice dust in the air.`,

  'Types de beurres': `Premium photograph of various butters and spreads arranged on a marble countertop in a gourmet kitchen. Show AOP butter, demi-sel butter, clarified butter, peanut butter, and vegetable margarine in decorative dishes. Luxurious, gourmet food photography with soft golden lighting.`
};

// Instructions for generating images
console.log('🎨 AI IMAGE GENERATION GUIDE FOR CATEGORIES\n');
console.log('Choose your preferred AI image generation tool:\n');

console.log('1️⃣ DALL-E (OpenAI ChatGPT or API):');
console.log('   - Go to ChatGPT with DALL-E access');
console.log('   - Use command: /imagine [paste prompt here]');
console.log('   - Or use: Create an image of [paste prompt here]\n');

console.log('2️⃣ Midjourney (Discord):');
console.log('   - Join Midjourney Discord server');
console.log('   - Use command: /imagine prompt: [paste prompt here] --ar 16:9 --q 2 --v 5\n');

console.log('3️⃣ Stable Diffusion (Web UI or Automatic1111):');
console.log('   - Paste prompt into the prompt field');
console.log('   - Set dimensions: 1024x576 (16:9 aspect ratio)');
console.log('   - Use model: Realistic Vision or similar photorealistic model\n');

console.log('4️⃣ Adobe Firefly:');
console.log('   - Use Adobe Express or Firefly web interface');
console.log('   - Paste prompt and select "Photography" style\n');

console.log('5️⃣ Bing Image Creator (DALL-E based):');
console.log('   - Go to bing.com/images/create');
console.log('   - Paste prompt and generate\n');

console.log('📋 PROMPTS BY CATEGORY:\n');
Object.entries(aiImagePrompts).forEach(([category, prompt]) => {
  console.log(`🍽️  ${category}:`);
  console.log(`   ${prompt}\n`);
});

console.log('💡 TIPS FOR BEST RESULTS:');
console.log('• Use high quality prompts with specific details');
console.log('• Specify aspect ratio 16:9 for category cards');
console.log('• Request photorealistic or commercial photography style');
console.log('• Include lighting and color palette preferences');
console.log('• Generate multiple variations and choose the best one');

module.exports = aiImagePrompts;