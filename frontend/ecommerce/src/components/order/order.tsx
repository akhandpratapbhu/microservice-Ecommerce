import { useEffect } from 'react';
import { type Product } from '../../context-provider/CartContext';
import { useTheme } from '../../context-provider/themecontext';

const Order = () => {
    const { darkMode } = useTheme()
    const cartData = localStorage.getItem("cart");
    const cart: Product[] = cartData ? JSON.parse(cartData) : [];

    console.log("cart", cart);

    useEffect(() => {
        const body = {
            products: cart
        }
        const headers = {
            "Content-Type": "application/json"
        }
        console.log("body", body);

        const orderResponse = fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        console.log("orderResponse", orderResponse);

    }
    )

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

                        </div>

                        {/* Card Body */}
                        <div
                            className={`card-body p-0 ${darkMode ? 'text-white' : 'text-dark'}`}
                            style={{
                                backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                            }}
                        >
                            {cart.length === 0 ? (
                                <table className="table cart-table mb-0">
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="cart-empty text-center py-4">
                                                    <i className="fa fa-shopping-cart fa-2x mb-2"></i>
                                                    <p>Your Order Is Empty,Order now...</p>
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
                                        {cart.map((data) => (
                                            <tr key={data._id}>
                                                <td>
                                                    <button className="prdct-delete" >
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
                                        {/* <tr>
                                            <th>&nbsp;</th>
                                            <th colSpan={2}>&nbsp;</th>
                                            <th>
                                                Items In Cart <span className="text-danger">{totalquantity}</span>
                                            </th>
                                            <th className="text-right">
                                                Total Price <span className="text-danger">₹ {totalprice}</span>
                                            </th>
                                            <th className="text-right">
                                                <button className="btn btn-success" onClick={makePayment}>
                                                    Checkout
                                                </button>
                                            </th>
                                        </tr> */}
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
export default Order;

