// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupCustomer from './customers/SignupCustomer';
import CategoryAndProductScreen from './products/CategoryAndProductScreen';
import CreateCategory from './products/CreateCategory';
import CreateProduct from './products/CreateProduct';
import { CartProvider } from './shopping/CartContext';
import AddToCart from './shopping/AddToCart';
import Sucess from './shopping/Sucess';
import Cancel from './shopping/Cancel';
const App = () => {
  return (
    <CartProvider>
    <Router>
      <div style={{ padding: '20px' }}>
        {/* Optional Navigation Links */}
        <nav>
          <Link to="/create-products" style={{ marginRight: '20px' }}>Create Product</Link>
          <Link to="/create-category">Create Category</Link>
          <Link to="/products" style={{ marginLeft: '20px' }}>Products</Link>
          <Link to="/AddToCart" style={{ marginLeft: '20px' }}>Carts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SignupCustomer />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/create-products" element={<CreateProduct />} />

          <Route path="/products" element={<CategoryAndProductScreen />} />
          <Route path="/AddToCart" element={<AddToCart />} />
          <Route path="/success" element={<Sucess />} />
            <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;
