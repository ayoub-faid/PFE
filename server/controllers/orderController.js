const Order = require('../models/Order');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const INVOICE_DIR = path.join(__dirname, '..', 'invoices');

if (!fs.existsSync(INVOICE_DIR)) {
  fs.mkdirSync(INVOICE_DIR, { recursive: true });
}

const createOrder = async (req, res) => {
  try {
    const { items, total, phone, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Les articles sont requis.' });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Le total est requis.' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      phone: phone || req.user.phone || '',
      paymentMethod: paymentMethod || 'Paiement à la livraison'
    });

    const populated = await Order.findById(order._id).populate('user', 'name email phone');

    return res.status(201).json({ message: 'Commande créée avec succès', order: populated });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    if (req.user.role === 'client') {
      filter.user = req.user._id;
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    return res.json({ data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Erreur lors du chargement des commandes', error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    if (req.user.role === 'client' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    return res.json({ data: order });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'invoiced', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email phone');

    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    return res.json({ message: 'Statut mis à jour', data: order });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur', error: error.message });
  }
};

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const fileName = `facture-${order._id}-${Date.now()}.pdf`;
    const filePath = path.join(INVOICE_DIR, fileName);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    const primary = '#622B14';
    const accent = '#995F2F';

    // Header
    doc.fontSize(28).font('Helvetica-Bold').fillColor(primary).text('Gros Products', { align: 'left' });
    doc.fontSize(10).font('Helvetica').fillColor('#666')
      .text('Grossiste alimentaire Maroc', { align: 'left' })
      .text('www.grosproducts.ma', { align: 'left' });

    // Invoice title
    doc.moveDown(1.5);
    doc.fontSize(22).font('Helvetica-Bold').fillColor(primary).text('FACTURE', { align: 'right' });
    doc.moveDown(0.3);
    doc.fontSize(10).font('Helvetica').fillColor('#666')
      .text(`N°: ${order._id.toString().slice(-8).toUpperCase()}`, { align: 'right' })
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`, { align: 'right' })
      .text(`Statut: ${order.status}`, { align: 'right' });

    // Separator
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke();
    doc.moveDown(0.5);

    // Client info
    doc.fontSize(12).font('Helvetica-Bold').fillColor(primary).text('CLIENT');
    doc.moveDown(0.3);
    doc.fontSize(10).font('Helvetica').fillColor('#333')
      .text(`Nom: ${order.user?.name || 'N/A'}`)
      .text(`Email: ${order.user?.email || 'N/A'}`)
      .text(`Téléphone: ${order.phone || order.user?.phone || 'N/A'}`);

    // Separator
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke();
    doc.moveDown(0.5);

    // Table header
    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold').fillColor(primary);
    doc.text('Article', 50, tableTop, { width: 200 });
    doc.text('Qté', 270, tableTop, { width: 60, align: 'center' });
    doc.text('Prix unit.', 330, tableTop, { width: 90, align: 'right' });
    doc.text('Total', 440, tableTop, { width: 100, align: 'right' });

    doc.moveDown(0.3);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke();
    doc.moveDown(0.3);

    // Table rows
    let y = doc.y;
    doc.fontSize(9).font('Helvetica').fillColor('#333');

    for (const item of order.items) {
      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      const lineTotal = (item.price * item.quantity).toFixed(2);
      doc.text(item.name || 'Article', 50, y, { width: 200 });
      doc.text(String(item.quantity), 270, y, { width: 60, align: 'center' });
      doc.text(`${Number(item.price).toFixed(2)} MAD`, 330, y, { width: 90, align: 'right' });
      doc.text(`${lineTotal} MAD`, 440, y, { width: 100, align: 'right' });
      y += 22;
    }

    // Total
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke();
    doc.moveDown(0.5);
    doc.fontSize(14).font('Helvetica-Bold').fillColor(primary);
    doc.text(`Total: ${Number(order.total).toFixed(2)} MAD`, { align: 'right' });

    doc.moveDown(0.3);
    doc.fontSize(9).font('Helvetica').fillColor('#666')
      .text(`Mode de paiement: ${order.paymentMethod}`, { align: 'right' });

    // Footer
    doc.moveDown(3);
    doc.fontSize(8).fillColor('#999').text('Gros Products - Grossiste alimentaire Maroc', 50, null, { align: 'center' });
    doc.text('Merci de votre confiance !', { align: 'center' });

    doc.end();

    stream.on('finish', async () => {
      order.invoicePath = fileName;
      order.status = 'invoiced';
      await order.save();
      return res.json({ message: 'Facture générée', invoicePath: fileName, order });
    });

    stream.on('error', (err) => {
      console.error('PDF stream error:', err);
      return res.status(500).json({ message: 'Erreur lors de la génération de la facture' });
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return res.status(500).json({ message: 'Erreur', error: error.message });
  }
};

const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.invoicePath) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }
    const filePath = path.join(INVOICE_DIR, order.invoicePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Fichier introuvable' });
    }
    res.download(filePath, `facture-${order._id.toString().slice(-8).toUpperCase()}.pdf`);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  generateInvoice,
  downloadInvoice
};
