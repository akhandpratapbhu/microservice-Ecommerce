import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context-provider/CartContext';
import { useTheme } from '../context-provider/themecontext'; //  Import theme context

const Headers = () => {
    const { cart } = useCart();
    const { darkMode, toggleDarkMode } = useTheme(); // Get dark mode values

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
                        Ecommerce
                    </NavLink>
                </div>

                <div className="d-flex align-items-center gap-4">
                    <NavLink
                        to="/create-products"
                        className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/create-category"
                        className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/AddToCart"
                        className={`text-decoration-none position-relative ${darkMode ? 'text-light' : 'text-dark'}`}
                    >
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        {cart.length > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: '0.6rem' }}
                            >
                                {cart.length}
                            </span>
                        )}
                    </NavLink>

                    {/* Theme toggle button */}
                    <button
                        onClick={toggleDarkMode}
                        className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
                    >
                        <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} me-2`}></i>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Headers;
