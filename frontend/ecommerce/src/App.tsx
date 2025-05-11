// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupCustomer from './customers/SignupCustomer';
import CategoryAndProductScreen from './products/CategoryAndProductScreen';
import CreateCategory from './products/CreateCategory';
import CreateProduct from './products/CreateProduct';

const App = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        {/* Optional Navigation Links */}
        <nav>
          <Link to="/create-products" style={{ marginRight: '20px' }}>Create Product</Link>
          <Link to="/create-category">Create Category</Link>
          <Link to="/products" style={{ marginLeft: '20px' }}>Products</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SignupCustomer />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/create-products" element={<CreateProduct />} />

          <Route path="/products" element={<CategoryAndProductScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
