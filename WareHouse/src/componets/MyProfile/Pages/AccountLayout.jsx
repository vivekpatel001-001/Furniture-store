// Pages/AccountLayout.jsx
import Sidebar from '../Sidebaar/Profilesidebaar';
import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8   ">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
