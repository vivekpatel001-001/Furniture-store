import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/admineLayout"; // layout jisme sidebar + outlet hai
import ProductManagement from "./pages/ProductManagement";
import OrderManagment from "./pages/Oredrer";
import Userinfo from "./pages/profile"
import UserMangment from "./pages/Usermangment"
import Allproducts from './pages/AllProduct'
const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Userinfo />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagment />} />
        <Route path="profile" element={<Userinfo />} />
        <Route path="user" element={<UserMangment />} />
        <Route path="allproducts" element={<Allproducts/>} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
