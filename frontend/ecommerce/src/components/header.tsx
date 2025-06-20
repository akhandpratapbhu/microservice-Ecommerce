import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context-provider/CartContext';
import { useTheme } from '../context-provider/themecontext';
import { useTranslation } from 'react-i18next'; // Import translation hook
import { useEffect, useState } from 'react';

const Headers = () => {
    const { cart } = useCart();
    const { darkMode, toggleDarkMode } = useTheme();
    const { t } = useTranslation('navbar');
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const FetchCart = async () => {
            let customerId = 1
            try {
                const response = await fetch(`http://localhost:4242/api/fetchInCart/${customerId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();
                console.log("Cart saved:", result.existingCart.products);
                setProducts((result.existingCart.products));

            } catch (err) {
                console.error("Error saving to cart:", err);
            }
        }


        FetchCart(); // Call the async function
    }, [cart]);

    return (
        <Navbar
            style={{
                height: '60px',
                background: darkMode ? 'black' : '#f8f9fa',
                color: darkMode ? 'white' : 'black'
            }}
        >
            <Container className="d-flex justify-content-between align-items-center">
                <div className="align-items-center gap-4">
                    <NavLink
                        to="/"
                        className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
                    >
                        {t('ecommerce')}
                    </NavLink>
                </div>

                <div className="d-flex align-items-center gap-4">
                    <NavLink to="/create-products" className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                        {t('createProduct')}
                    </NavLink>
                    <NavLink to="/create-category" className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                        {t('createCategory')}
                    </NavLink>
                    <NavLink to="/products" className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                        {t('products')}
                    </NavLink>
                    <NavLink to="/AddToCart" className={`text-decoration-none position-relative ${darkMode ? 'text-light' : 'text-dark'}`}>
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        {products.length > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: '0.6rem' }}
                            >
                                {products.length}
                            </span>
                        )}
                    </NavLink>

                    <button
                        onClick={toggleDarkMode}
                        className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
                    >
                        <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} me-2`}></i>
                        {darkMode ? t('lightMode') : t('darkMode')}
                    </button>

                </div>
            </Container>
        </Navbar>
    );
};

export default Headers;
