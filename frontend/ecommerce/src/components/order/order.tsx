import { useEffect, useState } from 'react';
import { type Product } from '../../context-provider/CartContext';
import { useTheme } from '../../context-provider/themecontext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type OrderItem = {
    product_id: number;
    quantity: number;
    price: number;
};

type Order = {
    order_id: number;
    customer_id: number;
    total_amount: number;
    total_quantity: number;
    shipping_address: string;
    billing_address: string;
    created_at: string;
    items: OrderItem[];
};
const Order = () => {
    const navigate = useNavigate();
    const { darkMode } = useTheme()
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'status' | 'tracking'>('status');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [status, setStatus] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);

    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
console.log("order",orders,orders.length,typeof(orders));

    useEffect(() => {
        GetAllOrder();
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
                const fetchedProducts = result.existingCart.products || [];
                console.log("fetch cart:", fetchedProducts);

                setProducts(fetchedProducts);

                if (fetchedProducts.length > 0) {
                    saveOrder(fetchedProducts);
                }

            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        FetchCart();
    }, []);
    const saveOrder = async (productsToSave: any[]) => {
        const items = productsToSave.map((product) => ({
            product_id: parseInt(product._id), // or keep as string if your DB allows
            quantity: product.qnty || 1,
            price: product.price
        }));

        const body = {
            customer_id: 1, // ✅ Replace with actual logged-in customer ID
            shipping_address: "123 Example Street",
            billing_address: "123 Example Street",
            items: items
        };

        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            console.log("Order saved successfully:", result);
            GetAllOrder();
            deleteCart(body.customer_id)
        } catch (err) {
            console.error("Error saving order:", err);
        }
    };

    const deleteCart = async (customerId: number) => {
        try {
            const response = await fetch(`http://localhost:4242/api/deleteCart/${customerId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Cart deleted successfully!');
                // Optionally update UI state
            } else {
                toast.error('Failed to delete cart: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };
    const GetAllOrder = () => {
        axios.get('http://localhost:3000/api/orders') // update URL if needed
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
                setLoading(false);
            });
    };
    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    console.log("orders", orders);
    const handleOrderClick = (order: Order) => {
        if (activeTab === 'status') {
            setSelectedOrder(order);
            setPopupVisible(true);
        } else if (activeTab === 'tracking') {
            navigate('/orderTracking', { state: { order: order } });
        }
    };

    const handleUpdateStatus = async () => {
        if (!status || !selectedOrder) return;
        try {
            await axios.put(`http://localhost:3000/api/orders/${selectedOrder.order_id}/status`, {
                status,
                //updated_at: currentDate
            });
            alert('Status updated successfully');
            setPopupVisible(false);
        } catch (err) {
            alert('Error updating status');
        }
    };

    return (

        <>

            <div
                className={` fluied-container row justify-content-center m-0  min-vh-100 ${darkMode ? 'text-white' : 'text-dark'}`}
                style={{
                    backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                }}
            >
                <div className="col-md-8 mt-5 mb-5 cardsdetails">
                    <h2>All Orders</h2>
                    {/* Right Column - Tabs */}
                    <div style={{ width: '300px', marginLeft: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={() => setActiveTab('status')} style={{ flex: 1, background: activeTab === 'status' ? 'green' : 'grey' }}>
                                Updated Status
                            </button>
                            <button onClick={() => setActiveTab('tracking')} style={{ flex: 1, background: activeTab === 'tracking' ? 'green' : 'grey' }}>
                                Tracking Order
                            </button>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            {activeTab === 'status' && <p>Select an order to update status.</p>}
                            {activeTab === 'tracking' && <p>Tracking info (please click on any order to check order tracking).</p>}
                        </div>
                    </div>
                    <div className={`card ${darkMode ? 'text-white' : 'text-dark'}`}
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
                        <div>

                            {orders.map(order => (
                                <div key={order.order_id} onClick={() => handleOrderClick(order)} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                    <p><strong>Order ID:</strong> {order.order_id}</p>
                                    <p><strong>Customer ID:</strong> {order.customer_id}</p>
                                    <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                                    <p><strong>Billing Address:</strong> {order.billing_address}</p>
                                    <p><strong>Items:</strong></p>

                                    <div
                                        className={`card-body p-0 ${darkMode ? 'text-white' : 'text-dark'}`}
                                        style={{
                                            backgroundColor: darkMode ? '#121212' : '#f0f0f0',
                                        }}
                                    >
                                        {orders.length === 0 ? (
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
                                                        <th>ProductId</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        {/* <th className="text-right">Total Amount</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items.map((data, id) => (
                                                        <tr key={id}>


                                                            <td>{data.product_id}</td>
                                                            <td>₹ {data.price}</td>

                                                            <td className="text-right">{Number(data.quantity)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>

                                                        <th>
                                                            Items In Cart <span className="text-danger">{order.total_quantity}</span>
                                                        </th>
                                                        <th className="text-right">
                                                            Total Price <span className="text-danger">₹ {order.total_amount}</span>
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {popupVisible && selectedOrder && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%',
                    height: '100%', background: 'rgba(0,0,0,0.3)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
                        <h3>Update Status for Order #{selectedOrder.order_id}</h3>
                        <div>
                            <label>Status:</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                                <option value="">Select status</option>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                        <div>
                            <label>Date:</label>
                            <input type="text" readOnly value={currentDate} style={{ width: '100%', padding: '8px', marginTop: '10px' }} />
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => setPopupVisible(false)} style={{ marginRight: '10px' }}>Cancel</button>
                            <button onClick={handleUpdateStatus}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Order;


