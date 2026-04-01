const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, min: 0 },
  costPrice: { type: Number, default: 0, min: 0 },
  stock: {
    available: { type: Number, default: 0, min: 0 },
    reserved: { type: Number, default: 0, min: 0 },
    damaged: { type: Number, default: 0, min: 0 },
    lastRestockDate: { type: Date }
  },
  sku: { type: String, unique: true, sparse: true },
  image: { type: String },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Virtual for total stock
productSchema.virtual('totalStock').get(function() {
  return this.stock.available + this.stock.reserved + this.stock.damaged;
});

// Virtual for margin percentage
productSchema.virtual('marginPercentage').get(function() {
  if (this.costPrice <= 0) return 0;
  return ((this.price - this.costPrice) / this.costPrice * 100).toFixed(2);
});

module.exports = mongoose.model('Product', productSchema);
