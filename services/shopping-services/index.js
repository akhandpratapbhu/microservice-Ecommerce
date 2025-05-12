const express = require('express');

const cors = require('cors');
const Stripe = require("stripe");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripe = require("stripe")('sk_test_51RO0bOIkMm1UrW60iay9WwiH2D4WqbUntGjl7eVs3ie0nkuD83cHSH8QJVronDdI0h2QvCgoRxWglirvvJ1aWPhx00NShk16ru');
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

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
console.log("products",products);


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                images:[product.image]
            },
            unit_amount:product.price * 100,
        },
        quantity:1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",
    });

    res.json({id:session.id})
 
})


app.listen(3003, () => console.log('Shopping Service running on port 3003'));
