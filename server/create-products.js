const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

// Product data for each category
const productsData = {
  'Huiles et graisses': [
    { name: 'Huile d\'olive extra vierge 5L', description: 'Huile d\'olive de qualité supérieure, parfaite pour la cuisine et les vinaigrettes', price: 45.00, costPrice: 35.00, stock: 150, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop' },
    { name: 'Huile de tournesol 10L', description: 'Huile végétale polyvalente pour toutes vos préparations culinaires', price: 25.00, costPrice: 18.00, stock: 200, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
    { name: 'Huile d\'arachide 5L', description: 'Huile idéale pour la friture et les préparations asiatiques', price: 30.00, costPrice: 22.00, stock: 120, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop' },
    { name: 'Beurre clarifié 1kg', description: 'Ghee traditionnel, parfait pour la cuisine indienne et moyen-orientale', price: 15.00, costPrice: 10.00, stock: 80, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop' },
    { name: 'Huile de coco vierge 2L', description: 'Huile de coco bio pour la cuisine et les soins corporels', price: 20.00, costPrice: 15.00, stock: 90, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' }
  ],
  'Thés et infusions': [
    { name: 'Thé vert Gunpowder 500g', description: 'Thé vert chinois traditionnel en perles, riche en antioxydants', price: 12.00, costPrice: 8.00, stock: 100, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' },
    { name: 'Thé noir Assam 1kg', description: 'Thé noir indien robuste, idéal pour le petit-déjeuner', price: 18.00, costPrice: 12.00, stock: 120, image: 'https://images.unsplash.com/photo-1576092762793-c0e14b9cc680?w=400&h=300&fit=crop' },
    { name: 'Infusion camomille 250g', description: 'Tisane apaisante à la camomille bio, parfaite pour la détente', price: 8.00, costPrice: 5.00, stock: 80, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop' },
    { name: 'Thé à la menthe 500g', description: 'Thé traditionnel marocain à la menthe fraîche', price: 10.00, costPrice: 7.00, stock: 150, image: 'https://images.unsplash.com/photo-1571934811353-2d32a683e7ac?w=400&h=300&fit=crop' },
    { name: 'Mélange infusion détox 300g', description: 'Mélange de plantes bio pour une cure détoxifiante', price: 15.00, costPrice: 10.00, stock: 60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop' }
  ],
  'Café et cacao': [
    { name: 'Café Arabica moulu 1kg', description: 'Café de qualité supérieure, torréfié artisanalement', price: 22.00, costPrice: 16.00, stock: 180, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop' },
    { name: 'Café Robusta en grains 2kg', description: 'Café robuste idéal pour les espressos et cafés serrés', price: 35.00, costPrice: 25.00, stock: 120, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop' },
    { name: 'Cacao en poudre 500g', description: 'Poudre de cacao pur pour pâtisserie et boissons', price: 14.00, costPrice: 9.00, stock: 90, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop' },
    { name: 'Café soluble instantané 200g', description: 'Café soluble de qualité professionnelle', price: 8.00, costPrice: 5.00, stock: 200, image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop' },
    { name: 'Mélange café-cacao 750g', description: 'Mélange unique de café et cacao pour un goût riche', price: 28.00, costPrice: 20.00, stock: 70, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' }
  ],
  'Épices et condiments': [
    { name: 'Ras el hanout 500g', description: 'Mélange d\'épices marocain traditionnel', price: 16.00, costPrice: 11.00, stock: 100, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
    { name: 'Curcuma en poudre 1kg', description: 'Épice anti-inflammatoire, parfaite pour le curcuma latte', price: 12.00, costPrice: 8.00, stock: 150, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf09ae?w=400&h=300&fit=crop' },
    { name: 'Paprika doux 500g', description: 'Paprika espagnol de qualité supérieure', price: 9.00, costPrice: 6.00, stock: 120, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
    { name: 'Cannelle en bâtons 200g', description: 'Cannelle de Ceylan en bâtons pour infusions', price: 11.00, costPrice: 7.00, stock: 80, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
    { name: 'Mélange quatre épices 300g', description: 'Mélange traditionnel pour les plats mijotés', price: 13.00, costPrice: 9.00, stock: 90, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' }
  ],
  'Farines et féculents': [
    { name: 'Farine de blé T55 5kg', description: 'Farine de blé tendre pour toutes vos préparations', price: 8.00, costPrice: 5.00, stock: 200, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
    { name: 'Farine de semoule fine 2kg', description: 'Semoule de blé dur pour couscous et pâtes', price: 6.00, costPrice: 4.00, stock: 150, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
    { name: 'Maïzena (fécule de maïs) 1kg', description: 'Fécule de maïs pour sauces et desserts', price: 5.00, costPrice: 3.00, stock: 120, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
    { name: 'Farine d\'amandes 500g', description: 'Farine d\'amandes bio pour pâtisserie', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
    { name: 'Farine complète 3kg', description: 'Farine de blé complet riche en fibres', price: 9.00, costPrice: 6.00, stock: 100, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' }
  ],
  'Riz et céréales': [
    { name: 'Riz basmati blanc 5kg', description: 'Riz basmati indien de qualité supérieure', price: 15.00, costPrice: 10.00, stock: 180, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
    { name: 'Riz complet 2kg', description: 'Riz complet riche en nutriments et fibres', price: 8.00, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
    { name: 'Quinoa bio 1kg', description: 'Quinoa péruvien bio, protéine végétale complète', price: 12.00, costPrice: 8.00, stock: 90, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
    { name: 'Bulgur fin 1kg', description: 'Bulgur de blé concassé pour taboulé et pilafs', price: 7.00, costPrice: 4.00, stock: 100, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
    { name: 'Avoine complète 2kg', description: 'Flocons d\'avoine pour petit-déjeuner et pâtisserie', price: 6.00, costPrice: 4.00, stock: 140, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' }
  ],
  'Sucre et édulcorants': [
    { name: 'Sucre blanc raffiné 5kg', description: 'Sucre cristallisé pour toutes vos préparations', price: 7.00, costPrice: 4.00, stock: 250, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop' },
    { name: 'Sucre roux de canne 2kg', description: 'Sucre roux non raffiné, riche en mélasse', price: 9.00, costPrice: 6.00, stock: 150, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop' },
    { name: 'Miel d\'acacia 1L', description: 'Miel liquide doux et fluide', price: 14.00, costPrice: 9.00, stock: 80, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop' },
    { name: 'Sirop d\'érable pur 500ml', description: 'Sirop d\'érable canadien authentique', price: 18.00, costPrice: 12.00, stock: 60, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop' },
    { name: 'Stévia en poudre 100g', description: 'Édulcorant naturel sans calories', price: 25.00, costPrice: 18.00, stock: 40, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop' }
  ],
  'Sel et minéraux': [
    { name: 'Sel de mer fin 1kg', description: 'Sel de mer non raffiné, riche en minéraux', price: 3.00, costPrice: 1.50, stock: 300, image: 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop' },
    { name: 'Sel rose de l\'Himalaya 500g', description: 'Sel rose himalayen en gros cristaux', price: 8.00, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop' },
    { name: 'Fleur de sel 250g', description: 'Fleur de sel de Guérande, sel de qualité supérieure', price: 12.00, costPrice: 8.00, stock: 80, image: 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop' },
    { name: 'Sel noir d\'Hawaï 200g', description: 'Sel volcanique noir unique en saveur', price: 15.00, costPrice: 10.00, stock: 50, image: 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop' },
    { name: 'Bicarbonate de soude 500g', description: 'Bicarbonate alimentaire pour pâtisserie et nettoyage', price: 4.00, costPrice: 2.00, stock: 150, image: 'https://images.unsplash.com/photo-1626196341954-56e7d4c6e9b8?w=400&h=300&fit=crop' }
  ],
  'Conserves et légumes': [
    { name: 'Tomates pelées 2.5kg', description: 'Tomates italiennes pelées en conserve', price: 6.00, costPrice: 4.00, stock: 200, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop' },
    { name: 'Haricots verts extra-fins 1kg', description: 'Haricots verts français de qualité supérieure', price: 12.00, costPrice: 8.00, stock: 120, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop' },
    { name: 'Maïs doux en conserve 3x400g', description: 'Maïs doux bio en conserve, prêt à l\'emploi', price: 8.00, costPrice: 5.00, stock: 150, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop' },
    { name: 'Petits pois extra-fins 800g', description: 'Petits pois français surgelés de qualité', price: 7.00, costPrice: 4.00, stock: 180, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop' },
    { name: 'Ratatouille provençale 1kg', description: 'Mélange de légumes cuisinés traditionnels', price: 9.00, costPrice: 6.00, stock: 100, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop' }
  ],
  'Fruits secs et noix': [
    { name: 'Amandes entières 1kg', description: 'Amandes californiennes de qualité supérieure', price: 22.00, costPrice: 16.00, stock: 120, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop' },
    { name: 'Noix du Brésil 500g', description: 'Noix riches en sélénium, origine Amazonie', price: 28.00, costPrice: 20.00, stock: 80, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop' },
    { name: 'Raisins secs sultanines 1kg', description: 'Raisins secs turcs de qualité premium', price: 10.00, costPrice: 7.00, stock: 150, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop' },
    { name: 'Abricots secs moelleux 500g', description: 'Abricots secs turcs naturellement sucrés', price: 14.00, costPrice: 9.00, stock: 100, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop' },
    { name: 'Noisettes décortiquées 750g', description: 'Noisettes turques grillées à sec', price: 16.00, costPrice: 11.00, stock: 90, image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop' }
  ],
  'Produits laitiers': [
    { name: 'Lait en poudre écrémé 1kg', description: 'Lait en poudre européen de qualité supérieure', price: 18.00, costPrice: 12.00, stock: 100, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' },
    { name: 'Fromage cheddar râpé 500g', description: 'Cheddar anglais affiné, prêt à l\'emploi', price: 12.00, costPrice: 8.00, stock: 80, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' },
    { name: 'Crème fraîche épaisse 500ml', description: 'Crème fraîche française authentique', price: 6.00, costPrice: 4.00, stock: 120, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' },
    { name: 'Beurre doux 250g x 4', description: 'Beurre AOP Charentes-Poitou en plaquettes', price: 15.00, costPrice: 10.00, stock: 90, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' },
    { name: 'Yaourt grec nature 1kg', description: 'Yaourt grec traditionnel, riche en protéines', price: 8.00, costPrice: 5.00, stock: 110, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop' }
  ],
  'Viandes et poissons': [
    { name: 'Thon albacore au naturel 3x800g', description: 'Thon albacore de qualité sushi, en conserve', price: 45.00, costPrice: 32.00, stock: 60, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' },
    { name: 'Sardines à l\'huile d\'olive 6x125g', description: 'Sardines portugaises de qualité supérieure', price: 18.00, costPrice: 12.00, stock: 100, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' },
    { name: 'Saumon fumé norvégien 500g', description: 'Saumon atlantique fumé au bois de hêtre', price: 35.00, costPrice: 25.00, stock: 40, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' },
    { name: 'Anchois marinés 500g', description: 'Anchois européens marinés à l\'huile d\'olive', price: 28.00, costPrice: 20.00, stock: 70, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' },
    { name: 'Maquereau au vin blanc 6x200g', description: 'Maquereau français au vin blanc traditionnel', price: 22.00, costPrice: 15.00, stock: 85, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' }
  ],
  'Pâtes et produits de boulangerie': [
    { name: 'Spaghetti italiens 5kg', description: 'Pâtes italiennes traditionnelles au blé dur', price: 12.00, costPrice: 8.00, stock: 150, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { name: 'Farine de boulangerie 10kg', description: 'Farine spéciale boulangerie T45', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { name: 'Levure de boulanger sèche 500g', description: 'Levure instantanée pour boulangers professionnels', price: 8.00, costPrice: 5.00, stock: 100, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { name: 'Pâtes penne rigate 3kg', description: 'Pâtes courtes italiennes pour sauces', price: 10.00, costPrice: 7.00, stock: 120, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { name: 'Pain de mie tranché 675g x 6', description: 'Pain de mie sans croûte pour restauration', price: 15.00, costPrice: 10.00, stock: 90, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' }
  ],
  'Boissons et jus': [
    { name: 'Jus d\'orange concentré 1L', description: 'Concentré de jus d\'orange 100% pur', price: 8.00, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
    { name: 'Café froid ready-to-drink 250ml x 12', description: 'Café glacé prêt à boire, format professionnel', price: 24.00, costPrice: 16.00, stock: 60, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
    { name: 'Thé glacé pêche 1L x 6', description: 'Thé glacé aromatisé à la pêche', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
    { name: 'Eau minérale plate 1.5L x 12', description: 'Eau minérale naturelle française', price: 12.00, costPrice: 8.00, stock: 100, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
    { name: 'Jus de pomme bio 1L', description: 'Jus de pomme français 100% bio', price: 6.00, costPrice: 4.00, stock: 90, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' }
  ],
  'Produits biologiques': [
    { name: 'Riz basmati bio 2kg', description: 'Riz basmati indien certifié bio', price: 16.00, costPrice: 11.00, stock: 100, image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' },
    { name: 'Quinoa bio en grains 1kg', description: 'Quinoa péruvien bio de qualité supérieure', price: 14.00, costPrice: 9.00, stock: 80, image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' },
    { name: 'Lentilles vertes bio 1kg', description: 'Lentilles françaises bio, riches en protéines', price: 8.00, costPrice: 5.00, stock: 120, image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' },
    { name: 'Miel de fleurs bio 500g', description: 'Miel français bio multifloral', price: 12.00, costPrice: 8.00, stock: 70, image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' },
    { name: 'Huile d\'olive bio 3L', description: 'Huile d\'olive vierge extra bio espagnole', price: 28.00, costPrice: 20.00, stock: 60, image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' }
  ],
  'Ingrédients de pâtisserie': [
    { name: 'Chocolat noir pâtissier 1kg', description: 'Chocolat noir 70% cacao pour pâtisserie professionnelle', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop' },
    { name: 'Sucre glace 1kg', description: 'Sucre glace pour glaçages et décorations', price: 6.00, costPrice: 4.00, stock: 120, image: 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop' },
    { name: 'Vanille en poudre 100g', description: 'Vanille bourbon en poudre de qualité supérieure', price: 45.00, costPrice: 32.00, stock: 40, image: 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop' },
    { name: 'Poudre à lever 500g', description: 'Poudre levante chimique pour pâtisserie', price: 5.00, costPrice: 3.00, stock: 100, image: 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop' },
    { name: 'Colorants alimentaires naturels 5x50ml', description: 'Colorants naturels pour pâtisserie et décoration', price: 25.00, costPrice: 18.00, stock: 60, image: 'https://images.unsplash.com/photo-1556909114-4c36e03f7b3a?w=400&h=300&fit=crop' }
  ],
  'Snacks et grignotage': [
    { name: 'Chips de pommes de terre nature 2kg', description: 'Chips artisanales nature, croustillantes', price: 15.00, costPrice: 10.00, stock: 90, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop' },
    { name: 'Noix de cajou grillées 1kg', description: 'Noix de cajou vietnamiennes grillées à sec', price: 24.00, costPrice: 17.00, stock: 70, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop' },
    { name: 'Barres énergétiques aux fruits 20x40g', description: 'Barres énergétiques bio aux fruits secs', price: 18.00, costPrice: 12.00, stock: 80, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop' },
    { name: 'Popcorn nature 500g', description: 'Maïs à popcorn bio pour préparation maison', price: 6.00, costPrice: 4.00, stock: 120, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop' },
    { name: 'Bretzels salés 1kg', description: 'Bretzels allemands traditionnels', price: 8.00, costPrice: 5.00, stock: 100, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop' }
  ],
  'Alcools et vinaigres': [
    { name: 'Vinaigre de vin rouge 5L', description: 'Vinaigre de vin français traditionnel', price: 12.00, costPrice: 8.00, stock: 80, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
    { name: 'Vinaigre balsamique de Modène 500ml', description: 'Vinaigre balsamique italien authentique', price: 18.00, costPrice: 12.00, stock: 60, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
    { name: 'Vinaigre de cidre bio 1L', description: 'Vinaigre de cidre français bio non filtré', price: 8.00, costPrice: 5.00, stock: 90, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
    { name: 'Vinaigre de riz 500ml', description: 'Vinaigre de riz japonais pour cuisine asiatique', price: 7.00, costPrice: 4.00, stock: 70, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
    { name: 'Vinaigre blanc cristal 2L', description: 'Vinaigre blanc distillé pour nettoyage et cuisine', price: 5.00, costPrice: 3.00, stock: 120, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' }
  ],
  'Emballages et fournitures': [
    { name: 'Sachets ziplock 100x200mm x 1000', description: 'Sachets de congélation avec fermeture ziplock', price: 25.00, costPrice: 18.00, stock: 50, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' },
    { name: 'Boîtes de conserve 500ml x 100', description: 'Boîtes de conserve standard pour produits alimentaires', price: 45.00, costPrice: 32.00, stock: 30, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' },
    { name: 'Étiquettes adhésives 50x30mm x 1000', description: 'Étiquettes adhésives pour produits alimentaires', price: 15.00, costPrice: 10.00, stock: 80, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' },
    { name: 'Bouteilles en verre 500ml x 50', description: 'Bouteilles en verre réutilisables pour liquides', price: 35.00, costPrice: 25.00, stock: 40, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' },
    { name: 'Films étirables alimentaires 30cm x 300m', description: 'Film alimentaire transparent pour conservation', price: 12.00, costPrice: 8.00, stock: 60, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' }
  ],
  'Promotions spéciales': [
    { name: 'Pack découverte épices orientales', description: 'Assortiment de 10 épices orientales authentiques', price: 35.00, costPrice: 25.00, stock: 40, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
    { name: 'Coffret thés du monde 500g', description: 'Sélection de 5 thés d\'origines différentes', price: 28.00, costPrice: 20.00, stock: 35, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
    { name: 'Panier fruits secs premium 2kg', description: 'Mélange de 8 fruits secs et noix de qualité', price: 45.00, costPrice: 32.00, stock: 25, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
    { name: 'Kit pâtisserie complète', description: 'Ensemble complet pour débuter la pâtisserie', price: 55.00, costPrice: 40.00, stock: 20, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
    { name: 'Assortiment huiles essentielles', description: '5 huiles végétales pour cuisine variée', price: 42.00, costPrice: 30.00, stock: 30, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' }
  ]
};

async function createProductsForCategories() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pfe_gros';
    console.log('Connecting to:', mongoUri, '\n');

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB\n');

    // Find admin user for createdBy field
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('❌ No admin user found. Please create an admin user first.');
      process.exit(1);
    }
    console.log('✅ Found admin user:', adminUser.name, '\n');

    let totalProductsCreated = 0;

    // Process each category
    for (const [categoryName, products] of Object.entries(productsData)) {
      console.log(`🔄 Processing category: ${categoryName}`);

      // Find the category
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        console.log(`❌ Category "${categoryName}" not found, skipping...`);
        continue;
      }

      let categoryProductsCreated = 0;

      // Create products for this category
      for (const productData of products) {
        try {
          // Generate SKU
          const sku = `PRD-${categoryName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

          const product = await Product.create({
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
          console.log(`  ✅ Created: ${product.name} (SKU: ${sku})`);

        } catch (err) {
          console.log(`  ❌ Error creating ${productData.name}: ${err.message}`);
        }
      }

      console.log(`✅ ${categoryName}: ${categoryProductsCreated} products created\n`);
      totalProductsCreated += categoryProductsCreated;
    }

    console.log(`\n🎉 Process complete! Created ${totalProductsCreated} products across all categories`);

    // Show summary
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
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

createProductsForCategories();
