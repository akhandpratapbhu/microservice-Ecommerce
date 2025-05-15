// models/StripeSession.js
const mongoose = require("mongoose");

const StripeSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  amountTotal: Number,
  currency: String,
  paymentStatus: String,
  status: String,
  paymentMethodTypes: [String],
  created: Number,
  expiresAt: Number,
  successUrl: String,
  cancelUrl: String,
  checkoutUrl: String,
  paymentId:String,
  products: [Object], // Save original cart products if needed
}, { timestamps: true });

module.exports = mongoose.model("StripeSession", StripeSessionSchema);
