import React from "react";
import TradingSlider from "../Trending weeks/TreadingSlider";
import Shopbyrooms from '../New Arrivals/ShopByrooms'
import Cratecustmize from "../../pages/Cratecustmize";
import { Link } from "react-router-dom";
const HeroVideoSection = () => {

  const policies = [
    { title: "3.2mn", subtitle: "3.2 Million Happy Customers" },
    { title: "🎓", subtitle: "4 Decades Experience" },
    { title: "🛡️", subtitle: "Unmatched 5 Years Warranty" },
    { title: "📍", subtitle: "Pan India Presence" },
    { title: "🛠️", subtitle: "Free Installation" },
    { title: "0%", subtitle: "EMIs On Furniture" },
  ];


  const categories = [
    {
      name: "Leather Sofas",
      img: "https://images.durian.in/assets/images/popular_category/Leather-Sofa_hUZsS2Z00H.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Sofa-set",
    },
    {
      name: "Leatherette Sofas",
      img: "https://images.durian.in/assets/images/popular_category/Leatherette-Sofas_e5h2zx2Ae.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Chairs",

    },
    {
      name: "Fabric Sofas",
      img: "https://images.durian.in/assets/images/popular_category/Fabric-Sofas_009FuYA2Jj.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Sofa-set",

    },
    {
      name: "Reclining Sofas",
      img: "https://images.durian.in/assets/images/popular_category/Recliners_KPHN_e3oE.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Sofa-set",

    },
    {
      name: "Dining Sets",
      img: "https://images.durian.in/assets/images/popular_category/Dining-Sets_5F7y2wsZC.jpg?updatedAt=1728370652085tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Dining",

    },
    {
      name: "Beds",
      img: "https://images.durian.in/assets/images/popular_category/Beds_DdoHY5P_QL.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Beds",

    },
    {
      name: "Office Chair",
      img: "https://images.durian.in/assets/images/popular_category/Office-Seating_XHMr1pvmd.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Chairs",

    },
    {
      name: "Coffee & Center Tables",
      img: "https://images.durian.in/assets/images/popular_category/Coffee-&-Center-Tables_x5fVqouyi.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Bookshelves",

    },
    {
      name: "Living Chairs",
      img: "https://images.durian.in/assets/images/popular_category/Living-Chairs_zG0HSd4C0Z.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Chairs",

    },
    {
      name: "Dining Chairs",
      img: "https://images.durian.in/assets/images/popular_category/Dining-Chairs_U_Un96XTU.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Chairs",

    },
    {
      name: "Sofa Cum Beds",
      img: "https://images.durian.in/assets/images/popular_category/Sofa-Cum-Beds_N4w3wLtDy.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Beds",

    },
    {
      name: "Bed Side Tables",
      img: "https://images.durian.in/assets/images/popular_category/Desk_1U3d0iSbox.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Sofa-set",

    },
    {
      name: "Desks",
      img: "https://images.durian.in/assets/images/popular_category/Desk_1U3d0iSbox.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Wardrobes",

    },
    {
      name: "Side & End Tables",
      img: "https://images.durian.in/assets/images/popular_category/Side-&-End-Tables_Av0uLqKRE.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/home-decor",

    },
    {
      name: "TV Units & Media Units",
      img: "https://images.durian.in/assets/images/popular_category/TV&-Media-Units_LG24D0JMUT.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Tv-units",

    },
    {
      name: "Shoe Racks",
      img: "https://images.durian.in/assets/images/popular_category/Shoe-Racks_bWEyWUT-I.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Shoe-racks",

    },
    {
      name: "Study Table",
      img: "https://images.durian.in/assets/images/popular_category/Study-table_AZ43ss6noT.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Study-tables",

    },
    {
      name: "Dining Storage",
      img: "https://images.durian.in/assets/images/popular_category/Dining-Storage_B_NpnwyfYT.jpg?tr=w-396,h-300,pr-true,f-auto",
      link: "/Catgory/Dining",

    },

  ];



  return (
    <>
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.durian.in/assets/images/thumbnail_home.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        >
          <source
            src="https://durianassetsv2.s3.ap-south-1.amazonaws.com/Durian/durian/CategoryBanner/video/category_video_20250502051556.mp4?tr=q-50"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Top Yellow Strip */}
        <div className="absolute top-0 left-0 w-full bg-[#FFF5D7] z-10 border-b border-black py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-black">
            <div>
              <h3 className="font-bold text-lg">Enjoy Upto 50% Off</h3>
              <p className="text-sm">Shop Summer Savings →</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Create Your Dream Sofa</h3>
              <p className="text-sm">45+ Custom Colours →</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">55+ Stores Across India</h3>
              <p className="text-sm">Find Your Nearest Store →</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 px-4 max-w-7xl mx-auto">
        {/* Top Notch Policies */}
        <div className="mb-8">

          <h2 className="text-3xl font-semibold text-center ">
            Top Notch Policies
          </h2>
          <div className="w-28 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></div>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {policies.map((item, index) => (
              <div key={index} className="text-center w-40">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>
          </div>
        </div>



        {/* Full-width Popular Categories */}

        <div className="w-full bg-white  px-4">

          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-center">
              Popular Categories
            </h2>
            <div className="w-28 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></div>

          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 px-4 sm:px-10">
            {categories.map((cat, idx) => (
              <div key={idx} className="text-center cursor-pointer">
                <Link to={cat.link}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="rounded-md w-full object-cover mb-2 h-44 sm:h-48 transition-transform duration-300 hover:scale-105"
                  />
                  <p className="text-sm font-medium mt-1">{cat.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-center">
              Spotlight On
            </h2>
            <div className="w-28 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></div>

          </div>
          <TradingSlider />
        </div>

        <div className="mt-10">
          <Cratecustmize />
        </div>
        <div>
          <Shopbyrooms />
        </div>

      </>

      );

};

      export default HeroVideoSection;
