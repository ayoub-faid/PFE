const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: Number,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'invoiced', 'completed', 'cancelled'],
    default: 'pending'
  },
  invoicePath: { type: String, default: null },
  paymentMethod: { type: String, default: 'Paiement à la livraison' },
  phone: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
