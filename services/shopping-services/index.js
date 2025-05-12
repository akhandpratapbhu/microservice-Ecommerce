const express = require('express');

const cors = require('cors');
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

let cart = [];

app.post('/cart', (req, res) => {
  cart.push(req.body);
  res.json({ message: 'Item added to cart', cart });
});

app.get('/cart', (req, res) => {
  res.json(cart);
});
// Create Connected Account (Recipient)
app.post("/create-connected-account", async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      capabilities: { transfers: { requested: true } },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/reauth",
      return_url: "http://localhost:3000/success",
      type: "account_onboarding",
    });

    res.send({ url: accountLink.url, accountId: account.id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Create PaymentIntent (Sender pays)
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

// Transfer money to connected account
app.post("/transfer-money", async (req, res) => {
  const { amount, connectedAccountId } = req.body;

  try {
    const transfer = await stripe.transfers.create({
      amount,
      currency: "usd",
      destination: connectedAccountId,
    });

    res.send({ transfer });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3003, () => console.log('Shopping Service running on port 3003'));
