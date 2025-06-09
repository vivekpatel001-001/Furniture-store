import { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  // Fetch all products
  const fetchProducts = () => {
    fetch("https://furniture-store-backend-29c0.onrender.com/product/get")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open edit modal
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated product
  const handleUpdateSubmit = () => {
    fetch(`https://furniture-store-backend-29c0.onrender.com/product/update/${editingProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // formData ko backend ke pass bhej rahe ho
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response Data: ", data);
        if (data.message === "Product updated successfully") {
          alert("Product updated successfully!");
          setEditingProduct(null);
          fetchProducts(); // Product list ko refresh karo
        } else {
          alert("Failed to update product. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to update product");
      });
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🛒 All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-green-600 font-bold text-lg mt-2">
              ₹{product.price}
            </p>
            <p className="text-gray-500">{product.description}</p>

            <button
              onClick={() => handleEditClick(product)}
              className="mt-3 bg-yellow-500 text-white px-5 py-1  rounded hover:bg-teal-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* 🔧 Modal for Edit */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition duration-300">
          <div className="bg-white border-2 border-orange-500 p-8 rounded-2xl w-[90%] max-w-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-600">
              ✏️ Edit Product Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Title"
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Price"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Category"
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Image URL"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-4 p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Description"
              rows="4"
            ></textarea>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
