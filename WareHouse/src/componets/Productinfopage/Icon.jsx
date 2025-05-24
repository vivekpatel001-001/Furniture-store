import React from "react";
import FeatureCard from "./FeatureCard";
import { FaExchangeAlt, FaShippingFast, FaShieldAlt, FaMoneyBillWave, FaTrophy, FaTruck } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    { icon: <FaExchangeAlt className="text-orange-400" />, title: "7 days Service Centre Replacement" },
    { icon: <FaShippingFast className="text-orange-400" />, title: "Free Delivery" },
    { icon: <FaShieldAlt className="text-orange-400" />, title: "1 Year Warranty Care" },
    { icon: <FaMoneyBillWave className="text-orange-400" />, title: "Pay on Delivery" },
    { icon: <FaTrophy className="text-orange-400" />, title: "Top Brand" },
    { icon: <FaTruck className="text-orange-400" />, title: "Amazon Delivered" },
  ];

  return (
    <div className="flex justify-center gap-6 py-6 bg-white shadow-sm rounded">
      {features.map((feature, index) => (
        <FeatureCard key={index} icon={feature.icon} title={feature.title} />
      ))}
    </div>
  );
};

export default FeaturesSection;
