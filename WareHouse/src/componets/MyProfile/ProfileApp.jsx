// ProfileApp.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile';
import Orders from './Pages/Order';
import Addresses from './Pages/Addresses';
import Wishlist from './Pages/Wishlist';
import AccountLayout from './Pages/AccountLayout';

function App() {
  return (
    <Routes>
      <Route path="/myprofile" element={<AccountLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
}

export default App;
