import toast from 'react-hot-toast';
import { useCart, type Product } from '../context-provider/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useTheme } from '../context-provider/themecontext';

export interface cartData {
  customer_id: number;
  products: [];
  totalprice: number;
  totalquantity: number;
}
const AddToCart = () => {
    const { darkMode } = useTheme();
    const { cart, addToCart, removeFromCart, removeSingleItem, emptyCart } = useCart();
   // const [cartData, setCartData] = useState<cartData[]>([]);
const [cartData, setCartData] = useState<cartData>({
  customer_id: 0,
  products: [],
  totalprice: 0,
  totalquantity: 0,
});

    const handleIncrement = (product: Product) => {
        addToCart(product);
    };

    const handleDecrement = (product: Product) => {
        removeFromCart(product);
        toast.success("Item Remove From Your Cart")
    };

    const handleSingleDecrement = (product: Product) => {
        removeSingleItem(product);
    };

    const emptycart = () => {
        emptyCart();
    };


    useEffect(() => {
        const FetchCart = async () => {

            try {
                let customerId = 1
                const response = await fetch(`http://localhost:4242/api/fetchInCart/${customerId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();
                console.log("Cart saved:", result.existingCart,cartData.products.length );
                setCartData((result.existingCart));

            } catch (err) {
                console.error("Error saving to cart:", err);
            }
        }


        FetchCart(); // Call the async function
    }, [cart]);
    console.log("products", cartData, typeof (setCartData));
    // payment integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51RO0bOIkMm1UrW60QwzbLTs9PvVvMmw8CZhqg6kp1rxQmY62YQZiAaqcLprLLrbVgHT1zSQFa3OqJaHNkwxhQpO000rS6La0X1");//ENTER YOUR PUBLISHABLE KEY
        const body = {
            products: cartData.products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        console.log("sessionbefore",);

        const response = await fetch("http://localhost:4242/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        console.log("session", session);

        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

    return (

        <>
            <div
                className={` fluied-container row justify-content-center m-0  min-vh-100 ${darkMode ? 'text-white' : 'text-dark'}`}
                style={{
                    backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                }}
            >
                <div className="col-md-8 mt-5 mb-5 cardsdetails">
                    <div
                        className={`card ${darkMode ? 'text-white' : 'text-dark'}`}
                        style={{
                            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                        }}
                    >
                        {/* Card Header */}
                        <div
                            className={`card-header p-3 ${darkMode ? 'text-white' : 'text-dark'}`}
                            style={{
                                backgroundColor: darkMode ? '#2c2c2c' : '#f0f0f0',
                            }}
                        >
                            <div className="card-header-flex d-flex justify-content-between align-items-center">
                                <h5 className="m-0">Cart Calculation {cart.length > 0 ? `(${cart.length})` : ""}</h5>
                                {cart.length > 0 && (
                                    <button className="btn btn-danger btn-sm" onClick={emptycart}>
                                        <i className="fa fa-trash-alt mr-2"></i>Empty Cart
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div
                            className={`card-body p-0 ${darkMode ? 'text-white' : 'text-dark'}`}
                            style={{
                                backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                            }}
                        >
                            {cartData == null ? (
                                <table className="table cart-table mb-0">
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="cart-empty text-center py-4">
                                                    <i className="fa fa-shopping-cart fa-2x mb-2"></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table cart-table mb-0 table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th className="text-right">Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {cartData.products.map((data: Product) => (
                                            <tr key={data._id}>
                                                <td>
                                                    <button className="prdct-delete" onClick={() => handleDecrement(data)}>
                                                        <i className="fa fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="product-img">
                                                        <img
                                                            src={`http://localhost:3001/uploads/${data.image}`}
                                                            alt={data.name}
                                                            style={{
                                                                width: '60px',
                                                                height: 'auto',
                                                                borderRadius: '8px',
                                                                marginLeft: '20px',
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{data.name}</td>
                                                <td>₹ {data.price}</td>
                                                <td>
                                                    <div className="prdct-qty-container">
                                                        <button
                                                            className="prdct-qty-btn"
                                                            onClick={
                                                                Number(data.qnty) <= 1
                                                                    ? () => handleDecrement(data)
                                                                    : () => handleSingleDecrement(data)
                                                            }
                                                        >
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="qty-input-box"
                                                            value={data.qnty}
                                                            disabled
                                                        />
                                                        <button
                                                            className="prdct-qty-btn"
                                                            onClick={() => handleIncrement(data)}
                                                        >
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-right">₹ {Number(data.qnty) * data.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th colSpan={2}>&nbsp;</th>
                                            <th>
                                                Items In Cart <span className="text-danger">{cartData.totalquantity}</span>
                                            </th>
                                            <th className="text-right">
                                                Total Price <span className="text-danger">₹ {cartData.totalprice}</span>
                                            </th>
                                            <th className="text-right">
                                                <button className="btn btn-success" onClick={makePayment}>
                                                    Checkout
                                                </button>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default AddToCart;

