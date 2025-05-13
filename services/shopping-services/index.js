const express = require('express');
const cors = require('cors');
const StripeSession = require("./models/stripsession");
const mongoose = require('mongoose');
const app = express();
const stripe = require("stripe")('sk_test_51RO0bOIkMm1UrW60iay9WwiH2D4WqbUntGjl7eVs3ie0nkuD83cHSH8QJVronDdI0h2QvCgoRxWglirvvJ1aWPhx00NShk16ru');//STRIPE_SECRET
// Middleware
app.use(cors());
app.use(express.json()); 
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
// Start Server
app.listen(3003, () => console.log('shopping Service running on port 3003'));
