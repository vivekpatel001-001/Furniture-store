import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../componets/Cart/Cartcontext';
import { WishlistContext } from '../Watchlist/Watchlistcontact';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, wishlistItems } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://furniture-store-backend-29c0.onrender.com/product/${id}`);
        const data = await res.json();
        setProduct(data);

        const catRes = await fetch(`https://furniture-store-backend-29c0.onrender.com/product/category/${data.category}`);
        const categoryData = await catRes.json();
        setRelatedProducts(categoryData.filter(p => p._id !== data._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleAdd = () => {
    const token = localStorage.getItem('token');
    if (!token) return toast.warning('Please login to add items to cart'), navigate('/login');

    addToCart({
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: product.price,
    });
    toast.success('Product added to cart successfully!');
  };

  const handleWishlist = () => {
    const token = localStorage.getItem('token');
    if (!token) return toast.warning('Please login to use wishlist'), navigate('/login');

    toggleWishlist(product._id);
  };

  if (!product) return <div>Product not found</div>;

  const accordionData = [
    {
      title: 'Specifications',
      content: product.specifications
        ? `Dimensions: ${product.specifications.dimensions}
Weight: ${product.specifications.weight}
Material: ${product.specifications.material}
Warranty: ${product.specifications.warranty}`
        : 'No specifications available.',
    },
    { title: 'Care Instructions', content: product.care || 'No care instructions provided.' },
    { title: 'Shipping & Delivery', content: product.shipping || 'Shipping info not available.' },
    { title: 'Return & Replacement Policy', content: product.returnPolicy || 'Return policy not specified.' },
    {
      title: 'FAQs',
      content: product.faqs?.length
        ? product.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')
        : 'No FAQs available.',
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg mt-10 mx-auto max-w-4xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4 relative">
          <img src={product.imageUrl} alt={product.title} className="w-102 h-102 object-cover rounded-lg" />
          <button onClick={handleWishlist} className='absolute text-2xl top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-red-100'>
            {wishlistItems.some(item => item._id === product._id) ? <FaHeart className="text-red-500" /> : <FiHeart />}
          </button>
        </div>

        <div className="md:w-1/2 p-6 text-center flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
          <span className="text-green-600 text-2xl font-bold mb-3">₹{product.price}</span>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} className={`h-5 w-5 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.044 3.21a1 1 0 00.95.69h3.377c.969 0 1.371 1.24.588 1.81l-2.735 1.986a1 1 0 00-.364 1.118l1.044 3.21c.3.921-.755 1.688-1.538 1.118L10 13.347l-2.735 1.985c-.783.57-1.838-.197-1.538-1.118l1.044-3.21a1 1 0 00-.364-1.118L3.672 8.637c-.783-.57-.38-1.81.588-1.81h3.377a1 1 0 00.95-.69l1.044-3.21z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-500 text-sm">({product.rating || 0}/5)</span>
          </div>

          <button className="mt-2 bg-amber-500 hover:bg-lime-300 text-white font-semibold py-2 px-6 rounded-lg" onClick={handleAdd}>
            Add to Cart
          </button>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded">← Back</button>
        </div>
      </div>

      {/* Services Icons */}
      <div className='container mx-auto mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4'>
        {[
          ['https://...icon-returns...', '7 days Replacement'],
          ['https://...trust_icon_free_shipping...', 'Secure transaction'],
          ['https://...81_Amazon_protect...', '1 Year Warranty'],
          ['https://...icon-cod...', 'Top Brand'],
          ['https://...icon-top-brand...', 'Free Delivery'],
          ['https://...icon-amazon-delivered...', 'Pay on Delivery'],
          ['https://...Secure-payment...', 'Amazon Delivered'],
        ].map(([src, text], i) => (
          <div key={i} className='text-center'>
            <img src={src} alt="" className="px-5" />
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* Accordion */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">Product Details</h3>
        {accordionData.map((item, index) => (
          <div key={index} className="border-b">
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between py-4 font-medium">
              <span>{item.title}</span><span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <div className="pb-4 text-sm text-gray-600 whitespace-pre-line">{item.content}</div>}
          </div>
        ))}
      </div>

      {/* Related Products */}
      <div className="container mx-auto mt-10">
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(p => (
            <div key={p._id} className="border p-4 rounded-lg shadow hover:shadow-xl transition">
              <img src={p.imageUrl} alt={p.title} className="w-full h-76 object-cover rounded-md mb-4" />
              <h4 className="text-lg font-medium mb-2">{p.title}</h4>
              <p className="text-xl font-semibold text-gray-800 mb-4">₹{p.price}</p>
              <button onClick={() => navigate(`/product/${p._id}`)} className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
