import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // Input field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Input validation
  const validateForm = () => {
    const { title, description, price, category, imageUrl } = formData;
    if (!title || !description || !price || !category || !imageUrl) {
      toast.warning("Please fill out all fields.");
      return false;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.warning("Price must be a valid positive number.");
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please login again.");
        return;
      }
      const { data } = await axios.post(
        "https://furniture-store-backend-29c0.onrender.com/product/add",
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price).toFixed(2),
          category: formData.category,
          imageUrl: formData.imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("🎉 Product added successfully!");
        setFormData(initialState);
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong!";
      toast.error(`❌ ${message}`);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🎁 Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Product Title"
          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          onChange={handleChange}
          required
        />
          <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image URL (required)"
          className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          onChange={handleChange}
          required
        />

      
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price (₹)"
          className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          onChange={handleChange}
          required
        >
          <option value="">🛍️ Select Category</option>
          {[
            "Chairs", "home-decor", "Beds", "Tv-units", "Shoe-racks", "Dining",
            "Lamp", "Sofa-set", "Bookshelves", "Wardrobes", "Study-tables", "Recliners"
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={formData.description}
          placeholder="Product Description"
          rows={4}
          className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
          onChange={handleChange}
          required
        />
      
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-yellow-500 transition duration-300 shadow-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLoading ? "Adding..." : "➕ Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
