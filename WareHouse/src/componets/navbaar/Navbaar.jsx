import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FiHeart } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import SearchBar from '../serchbaar/SerchbaarNew';
import { CartContext } from '../Cart/Cartcontext';
import { WishlistContext } from '../Watchlist/Watchlistcontact';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error('Invalid token');
    }
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const { cart } = useContext(CartContext);
  // ▶️ यहाँ सही context से वैल्यू लें:
  const { wishlistItems } = useContext(WishlistContext);

  const totalQuantity = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="w-full border-b border-gray-300 text-sm text-gray-600 bg-white">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2 md:mb-0">
            <a href="/privacy-policy" className="hover:text-green-600">Privacy Policy</a>
            <a href="#" className="hover:text-green-600">Return Policy</a>
            <a href="#" className="hover:text-green-600">FAQ's</a>
          </div>
          <div className="flex gap-4">
            <select className="bg-transparent border-none focus:outline-none">
              <option>English</option>
            </select>
            <select className="bg-transparent border-none focus:outline-none">
              <option>INR</option>
            </select>
            <img src="img/flag.svg" alt="flag" className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="mb-3 lg:mb-0">
            <img
              src="https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/originals/6412c70e48b00c1ba5eba0ae/logo.svg"
              alt="Logo"
              className="w-[150px] h-[70px]"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="w-full lg:w-1/3 mb-3 lg:mb-0">
          <SearchBar />
        </div>

        {/* Profile and Icons */}
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Wishlist Icon with badge */}
              <div className="relative group">
                <Link to="/wishlist" className="relative text-2xl hover:text-red-500">
                  <FiHeart />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Wishlist
                </span>
              </div>

              {/* Cart Icon with badge */}
              <div className="relative group">
                <Link to="/cart" className="relative">
                  <ShoppingCart size={28} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-md w-5 h-5 flex items-center justify-center rounded-full">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
                <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Cart
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <Link to={user?.role === 'admin' ? "/admin-panel" : "/myprofile/profile"}>
                    <CgProfile className="text-3xl cursor-pointer" />
                  </Link>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    Profile
                  </span>
                </div>

                <span className="font-bold">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="font-bold bg-black p-3 rounded-xl text-white hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CgProfile className="text-3xl" />
              <Link to="/login" className="font-bold hover:underline">Login</Link>
              <span className="font-bold">||</span>
              <Link to="/register" className="font-bold hover:underline">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
