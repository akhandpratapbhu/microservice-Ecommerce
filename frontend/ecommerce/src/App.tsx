
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignupCustomer from './customers/SignupCustomer';
import CategoryAndProductScreen from './products/CategoryList';
import CreateCategory from './products/CreateCategory';
import CreateProduct from './products/CreateProduct';
import AddToCart from './shopping/AddToCart';
import Success from './shopping/Success';
import Cancel from './shopping/Cancel';
import Headers from './components/header'
import toast, { Toaster } from 'react-hot-toast';
import { ContextProvider } from './context-provider/contextProvider';
import CategorywiseProduct from './products/categoryWiseProductList';
const App = () => {
  return (
 <ContextProvider>
      <>
   
        <Router>
               <Headers />
          <Routes>
            <Route path="/" element={<SignupCustomer />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-products" element={<CreateProduct />} />

            <Route path="/products" element={<CategoryAndProductScreen />} />
            <Route path="/category-products" element={<CategorywiseProduct />} />
            <Route path="/AddToCart" element={<AddToCart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
            <Toaster />
        </Router>

      </>
    </ ContextProvider>
  );
};

export default App;
