const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  costPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  image: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  stock: {
    available: {
      type: Number,
      default: 0,
      min: 0
    },
    reserved: {
      type: Number,
      default: 0,
      min: 0
    },
    damaged: {
      type: Number,
      default: 0,
      min: 0
    },
    lastRestockDate: {
      type: Date
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for total stock
productSchema.virtual('totalStock').get(function() {
  return this.stock.available + this.stock.reserved + this.stock.damaged;
});

// Virtual for stock value
productSchema.virtual('stockValue').get(function() {
  return this.price * this.stock.available;
});

module.exports = mongoose.model('Product', productSchema);
