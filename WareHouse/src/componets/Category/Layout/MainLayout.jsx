import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Satgori</Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-amber-500">Home</Link>
            <Link to="/chairs" className="hover:text-amber-500">Chairs</Link>
            <Link to="/dining" className="hover:text-amber-500">Dining</Link>
            <Link to="/home-decor" className="hover:text-amber-500">Home Decor</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© 2025 Satgori. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;