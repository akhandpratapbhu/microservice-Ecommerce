import toast from 'react-hot-toast';
import { useCart, type Product } from '../shopping/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const AddToCart = () => {

    const { cart, addToCart, removeFromCart, removeSingleItem, emptyCart } = useCart();
console.log("cart",cart);

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

    const [totalprice, setPrice] = useState(0);
    const [totalquantity, setTotalQuantity] = useState(0);


    // count total price
    const total = () => {
        let totalprice = 0
        cart.map((ele, ind) => {
            totalprice = ele.price * Number(ele.qnty) + totalprice
        });
        setPrice(totalprice)
    }


    // count total quantity
    const countquantity = () => {
        let totalquantity = 0
        cart.map((ele, ind) => {
            totalquantity = Number(ele.qnty) + totalquantity
        });
        setTotalQuantity(totalquantity)
    }

    useEffect(() => {
        total()
    }, [total])

    useEffect(() => {
        countquantity()
    }, [countquantity]);

    console.log("cart", cart);
    // payment integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51RO0bOIkMm1UrW60QwzbLTs9PvVvMmw8CZhqg6kp1rxQmY62YQZiAaqcLprLLrbVgHT1zSQFa3OqJaHNkwxhQpO000rS6La0X1");//ENTER YOUR PUBLISHABLE KEY
        const body = {
            products: cart
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:3003/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

    return (

        <>
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className="card">
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex d-flex justify-content-between align-items-center'>
                                <h5 className='text-white m-0'>Cart Calculation{cart.length > 0 ? `(${cart.length})` : ""}</h5>
                                {
                                    cart.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
                                        onClick={emptycart}
                                    ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                        : ""
                                }
                            </div>

                        </div>
                        <div className="card-body p-0">
                            {
                                cart.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((data, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <button className='prdct-delete'
                                                                        onClick={() => handleDecrement(data)}
                                                                    ><i className='fa fa-trash-alt'></i></button>
                                                                </td>
                                                                <td><div className='product-img'><img src={`http://localhost:3001/uploads/${data.image}`}
                                                                    alt={data.name}
                                                                    style={{
                                                                        width: '60px',
                                                                        height: 'auto',
                                                                        borderRadius: '8px',
                                                                        marginLeft: '20px',
                                                                    }} /></div></td>
                                                                <td><div className='product-name'><p>{data.name}</p></div></td>
                                                                <td>{data.price}</td>
                                                                <td>
                                                                    <div className="prdct-qty-container">
                                                                        <button className='prdct-qty-btn' type='button'
                                                                            onClick={Number(data.qnty) <= 1 ? () => handleDecrement(data) : () => handleSingleDecrement(data)}
                                                                        >
                                                                            <i className='fa fa-minus'></i>
                                                                        </button>
                                                                        <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                                                        <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                                                            <i className='fa fa-plus'></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className='text-right'>₹ {Number(data.qnty) * data.price}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={2}>&nbsp;</th>
                                                <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalquantity}</span></th>
                                                <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {totalprice}</span></th>
                                                <th className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddToCart;

