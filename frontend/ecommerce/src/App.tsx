
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignupCustomer from './customers/SignupCustomer';
import CategoryAndProductScreen from './products/CategoryAndProductScreen';
import CreateCategory from './products/CreateCategory';
import CreateProduct from './products/CreateProduct';
import { CartProvider } from './shopping/CartContext';
import AddToCart from './shopping/AddToCart';
import Success from './shopping/Success';
import Cancel from './shopping/Cancel';
import Headers from './components/header'
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <CartProvider>
      <>
   
        <Router>
               <Headers />
          <Routes>
            <Route path="/" element={<SignupCustomer />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-products" element={<CreateProduct />} />

            <Route path="/products" element={<CategoryAndProductScreen />} />
            <Route path="/AddToCart" element={<AddToCart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
            <Toaster />
        </Router>

      </>
    </CartProvider>
  );
};

export default App;
