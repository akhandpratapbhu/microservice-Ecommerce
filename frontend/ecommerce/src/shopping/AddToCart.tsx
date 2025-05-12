import { useNavigate } from 'react-router-dom';
import { useCart } from '../shopping/CartContext';

const AddToCart = () => {
    const { cart } = useCart();
    console.log("cart", cart);
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/stripePayment'); // your desired route
    };
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
                <button style={{ backgroundColor: 'green' }}onClick={handleClick}>Proceed to Buy</button>
            )}

        </div>
    );
};

export default AddToCart;
