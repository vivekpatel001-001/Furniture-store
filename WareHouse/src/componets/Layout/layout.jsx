import React from 'react'
import Navbaar from "../navbaar/Navbaar";
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div>
      <div>
            <Navbaar />
      </div>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
