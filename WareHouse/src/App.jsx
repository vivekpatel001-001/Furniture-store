import React ,{useEffect,useState} from 'react';
import {  Routes, Route } from 'react-router-dom';
import Layout from './componets/Layout/layout';
import Home from './componets/home/Home';
import SignupForm from './componets/authentication/signup';
import LoginPage from './componets/authentication/login';
import ForgetPassword from './componets/authentication/ForgetPassword/ForgetPasswoed';
import AdminePanel from './componets/admine/admin';
// import AdmineRoute from './componets/Security/AdmineRoutes';
// import ProductManagement from "./componets/admine/pages/ProductManagement"
import Maincategory from './componets/Category/MainCategory';
import AllProduct from './componets/ProductList/ProductList';
import ProductListing from './componets/Category/Pages/ProductListing';
import "./App.css";
import ProductInfo from './componets/Productinfopage/Productinfo';
// nav menu section 
import Newarrivels from "./componets/NavPages/New Arrivals/Newarrivels";
import Trendingweek from './componets/NavPages/Trending weeks/Trendingweek';
import ContactUs from './componets/NavPages/Contact Us/Contact Us';
import Blog from './componets/NavPages/Blog/Blog';
import AboutUs from './componets/NavPages/About Us/About Us';
import CartPage from './componets/Cart/Cartpage';
// nav menu section 
import { CartProvider } from './componets/Cart/Cartcontext'; // ✅ Ensure correct filename
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Wishlist 
import Wishlist from './componets/Watchlist/WatchlistPage';
import { WishlistProvider } from './componets/Watchlist/Watchlistcontact';
import PrivacyPolicy from './componets/Topbaar/PrivetPolicey'
// profile dashbord 
import Myprofile from './componets/MyProfile/Pages/AccountLayout'
import Profile from './componets/MyProfile/Pages/Profile';
import Orders from './componets/MyProfile/Pages/Order';
import Addresses from './componets/MyProfile/Pages/Addresses';
import ProfileWishlist from './componets/MyProfile/Pages/Wishlist';
//  payment 
import Checkout from './componets/payment/Cheakout';
import Userorder from './componets/order/Userorder';
//  pop up
import DiscountPopup from './componets/Popup/Popup'; // Importing popup
// serch 
import SearchResults from './componets/serchbaar/serchResult';


function App() {
  const [showPopup, setShowPopup] = useState(false);
 useEffect(() => {
  const hasShownPopup = localStorage.getItem('popupShown');

  if (!hasShownPopup) {
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem('popupShown', 'true'); // Mark as shown
    }, 3000);

    return () => clearTimeout(timer);
  }
}, []);

  return (
    <>
      <CartProvider>
        <WishlistProvider>
            <ToastContainer position="top-right" autoClose={2000} />
                      {showPopup && <DiscountPopup onClose={() => setShowPopup(false)} />}

            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<SignupForm />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="login/forgetpassword" element={<ForgetPassword />} />
                <Route path="/admin-panel/*" element={<AdminePanel />} />
                <Route path="/category/*" element={<Maincategory />}>
                  <Route path=":category" element={<ProductListing />} />
                </Route>
                <Route path="product" element={<AllProduct />} />
                {/* admine -dashbord vRoutes   */}
                {/* cart routes */}
                <Route path="cart" element={<CartPage />} />
                {/* product info page */}
                <Route path="/product/:id" element={<ProductInfo />} />
                {/* nav menu section  */}
                <Route path="newarrivels" element={<Newarrivels />} />
                <Route path="trendingweek" element={<Trendingweek />} />
                <Route path="contactUs" element={<ContactUs />} />
                <Route path="blog" element={<Blog />} />
                <Route path="aboutUs" element={<AboutUs />} />
                {/* nav menu section  */}
                {/* Watchlist  routes */}
                <Route path="/wishlist" element={<Wishlist />} />
                {/* Myprofile  */}
                <Route path="/myprofile/*" element={<Myprofile />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="wishlist" element={<ProfileWishlist />} />
                </Route>
                {/*  payment roures  */}

                <Route path="/check-out" element={<Checkout />} />
                <Route path='/userorder' element={<Userorder />} />
                <Route path="/search" element={<SearchResults />} />


              </Route>

              {/* Top baar */}
              <Route path="privacy-policy" element={<PrivacyPolicy />} />

            </Routes>
        </WishlistProvider>

      </CartProvider>


    </>




  );
}

export default App;
