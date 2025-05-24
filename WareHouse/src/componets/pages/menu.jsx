import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="bg-white shadow-sm border-gray">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-6 py-4 text-sm text-gray-800 relative">

          {/* Hoverable Category */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="cursor-pointer hover:text-green-600 font-medium">
              Shop By Category ▾
            </span>

            {/* Mega Menu Grid */}
            {isOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 grid grid-cols-4 gap-10 bg-gray-50 w-[80vw] max-w-6xl shadow-lg z-50 py-6 px-10 rounded">
                
                {/* BEDS */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-black">BEDS</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Single Beds</Link></li>
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Double Beds</Link></li>
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Metal Beds</Link></li>
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Hydraulic Beds</Link></li>
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Poster Beds</Link></li>
                    <li><Link to="Catgory/Beds" className="hover:text-green-600">Trundle Beds</Link></li>
                  </ul>
                </div>

                {/* CHAIRS */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-black">CHAIRS</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><Link to="Catgory/Cairs" className="hover:text-green-600">Folding Chairs</Link></li>
                    <li><Link to="Catgory/Cchairs" className="hover:text-green-600">Arm Chairs</Link></li>
                    <li><Link to="Catgory/Chairs" className="hover:text-green-600">Iconic Chairs</Link></li>
                    <li><Link to="Catgory/Chairs" className="hover:text-green-600">Rocking Chairs</Link></li>
                    <li><Link to="Catgory/Chairs" className="hover:text-green-600">Cafe Chairs</Link></li>
                  </ul>
                </div>

                {/* DINING */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-black">DINING</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><Link to="Catgory/Dining" className="hover:text-green-600">Extendable Dining Table</Link></li>
                    <li><Link to="Catgory/Dining" className="hover:text-green-600">6 Seater Dining</Link></li>
                    <li><Link to="Catgory/Dining" className="hover:text-green-600">4 Seater Dining</Link></li>
                    <li><Link to="Catgory/Dining" className="hover:text-green-600">2 Seater Dining</Link></li>
                  </ul>
                </div>

                {/* LAMP */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-black">LAMP</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><Link to="Catgory/Lamp" className="hover:text-green-600">Tripod Lamps</Link></li>
                    <li><Link to="Catgory/Lamp" className="hover:text-green-600">Floor Lamps</Link></li>
                    <li><Link to="Catgory/Lamp" className="hover:text-green-600">Study Lamps</Link></li>
                    <li><Link to="Catgory/Lamp" className="hover:text-green-600">Table Lamps</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* Other Nav Items */}
          <Link to="/newarrivels" className="hover:text-green-600 font-medium">New Arrivals</Link>
          <Link to="/trendingweek" className="hover:text-green-600 font-medium">Trending This Week</Link>
          <Link to="/aboutUs" className="hover:text-green-600 font-medium">About Us</Link>
          <Link to="/contactUs" className="hover:text-green-600 font-medium">Contact Us</Link>
          <Link to="/blog" className="hover:text-green-600 font-medium">Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
