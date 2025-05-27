
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from './context-provider/contextProvider';
import CategorywiseProduct from './products/categoryWiseProductList';
import LanguageSwitcher from './components/languageSwitcher';
import OrderTracking from './components/order/orderTracking';
import Order from './components/order/order';
const App = () => {

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'ltr' : 'ltr';
  }, [i18n.language]);
  return (
    <ContextProvider>
      <>

        <Router>
          <Headers />
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<SignupCustomer />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-products" element={<CreateProduct />} />

            <Route path="/products" element={<CategoryAndProductScreen />} />
            <Route path="/category-products" element={<CategorywiseProduct />} />
            <Route path="/AddToCart" element={<AddToCart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderTracking" element={<OrderTracking />} />
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
