import React from 'react';
import  Menu from "../pages/menu";
import Slider from "../pages/slider";
import FurnitureCategories from '../Catgory/catgory';
import Trading from "../sliders/Trading";
import Poster from "../pages/poster";
import BestSeller from "../pages/BestSeller";
import Background from "../pages/Background";
import Newarrivel from '../pages/Newarrivel';
import Banner from "../baner/Banner"
import VisitStoreSection from '../pages/Visitstoragesection';
import Blogenext from '../NavPages/Blog/Blogenext'
function Home() {
  return (
    <>
    <Menu/>
    <Slider/>
    <FurnitureCategories/>
    <Trading/>
    <Poster/>
    <BestSeller/>
    <Background/>
    <Newarrivel/>
    <VisitStoreSection/>
    <Banner/>
    <Blogenext/>
    </>
  )
}

export default Home