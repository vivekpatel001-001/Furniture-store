import { FaCartShopping } from "react-icons/fa6";

const ProductCard = ({ product, handleAdd }) => {
  const { image, name, originalPrice, discountedPrice, discountPercentage } = product;

  return (
    <div className="bg-teal-50
rounded-lg shadow-lg  overflow-hidden group relative">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => handleAdd(product)}
        >
          <FaCartShopping className="inline mr-2" />
          Add to Cart
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <div className="mt-2">
          <span className="text-gray-600 line-through mr-2">₹{originalPrice}</span>
          <span className="text-amber-500 font-bold">₹{discountedPrice}</span>
        </div>
        <div className="mt-1 text-sm text-green-600">{discountPercentage}% off</div>
      </div>
    </div>
  );
};

export default ProductCard;
