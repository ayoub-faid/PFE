const twilio = require('twilio');

const ORDER_PHONE = process.env.ORDER_NOTIFICATION_PHONE || '0696630684';

const formatOrderMessage = (cartItems, total, phone) => {
  const lines = [
    'New order received!',
    `Phone: ${phone}`,
    `Total: $${Number(total).toFixed(2)}`,
    'Items:'
  ];

  cartItems.forEach((item, index) => {
    const name = item.name || 'Unknown product';
    const qty = item.quantity || 0;
    const price = item.price != null ? Number(item.price).toFixed(2) : '0.00';
    lines.push(`${index + 1}. ${name} x${qty} ($${price})`);
  });

  return lines.join('\n');
};

const checkoutOrder = async (req, res) => {
  try {
    const { cartItems, total, phone } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required.' });
    }

    if (total === undefined || total === null) {
      return res.status(400).json({ message: 'Order total is required.' });
    }

    const targetPhone = phone || ORDER_PHONE;
    const messageBody = formatOrderMessage(cartItems, total, targetPhone);

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.log('Order checkout received but Twilio is not configured.');
      console.log('Order target phone:', targetPhone);
      console.log('Order details:\n', messageBody);
      return res.status(200).json({
        message: 'Order received. SMS was not sent because Twilio is not configured.',
        phone: targetPhone
      });
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: targetPhone
    });

    return res.status(200).json({
      message: 'Order received and SMS sent successfully.',
      phone: targetPhone
    });
  } catch (error) {
    console.error('Error sending order SMS:', error);
    return res.status(500).json({
      message: 'Error processing order checkout.',
      error: error.message
    });
  }
};

module.exports = {
  checkoutOrder
};
