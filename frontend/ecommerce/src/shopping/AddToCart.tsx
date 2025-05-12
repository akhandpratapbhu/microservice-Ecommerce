import { useNavigate } from 'react-router-dom';
import { useCart } from '../shopping/CartContext';
import {loadStripe} from '@stripe/stripe-js';

const AddToCart = () => {
    const { cart } = useCart();
    console.log("cart", cart);
    const navigate = useNavigate();

   // payment integration
    const makePayment = async()=>{
        const stripe = await loadStripe("pk_test_51RO0bOIkMm1UrW60QwzbLTs9PvVvMmw8CZhqg6kp1rxQmY62YQZiAaqcLprLLrbVgHT1zSQFa3OqJaHNkwxhQpO000rS6La0X1");//ENTER YOUR PUBLISHABLE KEY
        const body = {
            products:cart
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:3003/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>🛒 Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                cart.map((item: { name: string; price: number, image: string }, index) => (
                    <>
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ddd',
                                padding: '10px 0',
                            }}
                        >
                            <div>
                                <strong>{item.name}</strong> — ${item.price}
                            </div>
                            <img
                                src={`http://localhost:3001/uploads/${item.image}`}
                                alt={item.name}
                                style={{
                                    width: '80px',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    marginLeft: '20px',
                                }}
                            />
                        </div>

                    </>

                ))

            )
            }

            {cart.length !== 0 && (
                <button style={{ backgroundColor: 'green' }}onClick={makePayment}>Proceed to Buy</button>
            )}

        </div>
    );
};

export default AddToCart;
