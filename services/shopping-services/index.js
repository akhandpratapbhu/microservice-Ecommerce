const express = require('express');
const cors = require('cors');

const app = express();
const stripe = require("stripe")('sk_test_51RO0bOIkMm1UrW60iay9WwiH2D4WqbUntGjl7eVs3ie0nkuD83cHSH8QJVronDdI0h2QvCgoRxWglirvvJ1aWPhx00NShk16ru');//STRIPE_SECRET
// Middleware
app.use(cors());
app.use(express.json()); 
// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images:[product.image]
            },
            unit_amount:product.price * 100,
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

    res.json({id:session.id})
 
})
// Start Server
app.listen(3003, () => console.log('Product Service running on port 3003'));
