import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <AiOutlineHome size={22} /> },
    { path: '/cart', label: 'Cart', icon: <FiShoppingCart size={22} /> },
    { path: '/newarrivels', label: 'Shop', icon: <AiOutlineShop size={22} /> },
    { path: '/myprofile/profile', label: 'Profile', icon: <CgProfile size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-inner lg:hidden">
      <div className="flex justify-between px-6 py-2 text-sm text-gray-700">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`flex flex-col items-center justify-center gap-1 ${
              location.pathname === item.path ? 'text-green-600 font-semibold' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
