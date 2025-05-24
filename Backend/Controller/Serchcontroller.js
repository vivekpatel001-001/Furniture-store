import Product from "../Model/ProductModel.js";

export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    const query = keyword
      ? {
          title: { $regex: keyword, $options: "i" } // case-insensitive match in title
        }
      : {};

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
