import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../componets/Cart/Cartcontext';
import { WishlistContext } from '../Watchlist/Watchlistcontact';
import { FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductInfo = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/product/${id}`);
        const data = await res.json();
        setProduct(data);

        const categoryRes = await fetch(`http://localhost:4000/product/category/${data.category}`);
        const categoryData = await categoryRes.json();

        const filtered = categoryData.filter(p => p._id !== data._id);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

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
    {
      title: 'Care Instructions',
      content: product.care || 'No care instructions provided.',
    },
    {
      title: 'Shipping & Delivery',
      content: product.shipping || 'Shipping info not available.',
    },
    {
      title: 'Return & Replacement Policy',
      content: product.returnPolicy || 'Return policy not specified.',
    },
    {
      title: 'FAQs',
      content: product.faqs && product.faqs.length > 0
        ? product.faqs.map((faq, i) => `Q: ${faq.q}\nA: ${faq.a}`).join('\n\n')
        : 'No FAQs available.',
    },
  ];

  const handleAdd = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const formattedProduct = {
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: product.price,
    };

    addToCart(formattedProduct);
    toast.success('Product added to cart successfully!');
  };

  const handleAddToWishlist = () => {
    const formattedProduct = {
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: product.price,
      description: product.description,
    };

    addToWishlist(formattedProduct);
    toast.success('Wishlist added successfully!');
  };

  return (
    <>
      <div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-10 mx-auto max-w-4xl flex flex-col md:flex-row items-center">
          {/* Left - Product Image */}
          <div className="md:w-1/2 p-4 flex justify-center relative">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-102 h-102 object-cover rounded-lg"
            />
            <div className='absolute text-2xl top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-red-100 transition cursor-pointer'>
              <button onClick={handleAddToWishlist}>
                <FiHeart />
              </button>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="md:w-1/2 p-6 text-center flex flex-col justify-between h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
            <div className="flex justify-center items-center gap-3 mt-2 mb-3">
              <span className="text-green-600 text-2xl font-bold">₹{product.price}</span>
            </div>
            <p className="text-gray-600 text-lg mb-6 px-4">
              {product.description}
            </p>
            <div className="mt-auto mb-4">
              <div className="flex justify-center items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${index < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.044 3.21a1 1 0 00.95.69h3.377c.969 0 1.371 1.24.588 1.81l-2.735 1.986a1 1 0 00-.364 1.118l1.044 3.21c.3.921-.755 1.688-1.538 1.118L10 13.347l-2.735 1.985c-.783.57-1.838-.197-1.538-1.118l1.044-3.21a1 1 0 00-.364-1.118L3.672 8.637c-.783-.57-.38-1.81.588-1.81h3.377a1 1 0 00.95-.69l1.044-3.21z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-500 text-sm">({product.rating || 0} / 5)</span>
              </div>
            </div>
            <button
              className="mt-4 bg-amber-500 hover:bg-lime-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              onClick={handleAdd}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
      {/* icon  */}
      <div className=' container mx-auto mt-10 p-2 '>
        <div className='flex justify-center gap-x-10 px-5 '>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png' alt='' className='px-5' />
            <p> 7 days Service Centre Replacement  </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png' alt='' className='px-5' />
            <p>  Secure transaction   </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/81_81_Amazon_protect._CB562550732_.png' alt='' className='px-5' />
            <p>  1 Year Warranty  </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png' alt='' className='px-5' />
            <p>  Top Brand   </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB562506657_.png' alt='' className='px-5' />
            <p>  Free Delivery   </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png' alt='' className='px-5' />
            <p>  Pay on Delivery  </p>

          </div>
          <div>
            <img src='https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png' alt='' className='px-5' />
            <p>  Amazon Delivered  </p>

          </div>

        </div>
      </div>
      {/* icon  */}


      {/* Accordion Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">Product Details</h3>
        {accordionData.map((item, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800 hover:text-black"
            >
              <span>{item.title}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="pb-4 text-sm text-gray-600 whitespace-pre-line transition-all duration-300">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Products Section */}
      <div className='container mx-auto mt-10'>
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow-xl">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img
                src={relatedProduct.imageUrl}
                alt={relatedProduct.title}
                className="w-full h-76 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-medium mb-2">{relatedProduct.title}</h4>
              <p className="text-xl font-semibold text-gray-800 mb-4">₹{relatedProduct.price}</p>
              <button
                onClick={() => navigate(`/product/${relatedProduct._id}`)}
                className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
