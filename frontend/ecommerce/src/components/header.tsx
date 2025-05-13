import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCart } from '../shopping/CartContext';

const Headers = () => {
    const { cart } = useCart();

    return (
        <Navbar style={{ height: "60px", background: "black", color: "white" }}>
            <Container className="d-flex justify-content-between align-items-center">
                <div className=" align-items-center gap-4">
                    <NavLink to="/" className="text-decoration-none text-light">
                        Ecommerce
                    </NavLink>

                </div>
                <div className="d-flex align-items-center gap-4">
                    <NavLink to="/create-products" className="text-decoration-none text-light">
                        Create Product
                    </NavLink>
                    <NavLink to="/create-category" className="text-decoration-none text-light">
                        Create Category
                    </NavLink>
                    <NavLink to="/products" className="text-decoration-none text-light">
                        Products
                    </NavLink>
                    <NavLink to="/AddToCart" className="text-decoration-none text-light position-relative">
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        {cart.length > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: "0.6rem" }}
                            >
                                {cart.length}
                            </span>
                        )}
                    </NavLink>
                </div>
            </Container>
        </Navbar>
    );
};

export default Headers;
