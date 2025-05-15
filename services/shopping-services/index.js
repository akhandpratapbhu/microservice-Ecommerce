const express = require('express');
const cors = require('cors');
const StripeSession = require("./models/stripsession");
const mongoose = require('mongoose');
const app = express();
const stripe = require("stripe")('sk_test_51RO0bOIkMm1UrW60iay9WwiH2D4WqbUntGjl7eVs3ie0nkuD83cHSH8QJVronDdI0h2QvCgoRxWglirvvJ1aWPhx00NShk16ru');//STRIPE_SECRET
// Middleware
app.use(cors());
app.use('/api', express.json());


//DB Connection
mongoose.connect('mongodb://localhost:27017/payment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                //images:[`http://localhost:3001/uploads/${product.image}`]

            },
            unit_amount:product.price*100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",
    });
// Save session to MongoDB
    const savedSession = new StripeSession({
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      status: session.status,
      paymentMethodTypes: session.payment_method_types,
      created: session.created,
      expiresAt: session.expires_at,
      successUrl: session.success_url,
      cancelUrl: session.cancel_url,
      checkoutUrl: session.url,
      products, // Save original cart items
    });

    await savedSession.save();
    res.json({session:session})

 
})

const endpointSecret = 'whsec_b2b0fda86829b9644e1fbecc944418d12a53f3bb0db86354aa85529dfb34e689'; // ✅ Replace with your Stripe webhook secret

// ✅ Stripe webhook route with raw body
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(" Webhook verified:", event.type);
  } catch (err) {
    console.error(" Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve full session to get payment_intent
    stripe.checkout.sessions.retrieve(session.id, {
      expand: ['payment_intent']
    }).then(async (fullSession) => {
      const paymentIntent = fullSession.payment_intent;
      // Update DB with paymentId and status
      await StripeSession.updateOne(
        { sessionId: session.id },
        {
          paymentStatus: fullSession.payment_status,
          status: fullSession.status,
          paymentId: paymentIntent.id
        }
      );

      console.log(`Payment confirmed. Payment ID: ${paymentIntent.id}`);
    }).catch(err => {
      console.error('Error fetching session details', err);
    });
  }

  res.status(200).end();
});

// Start Server
app.listen(4242, () => console.log('shopping Service running on port 4242'));
