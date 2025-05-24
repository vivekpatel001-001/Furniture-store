import React from "react";

const blogData = [
  {
    title: "Curves in Trend: The Rising popularity of organic modern furniture",
    excerpt:
      "The world of interior design is experiencing a refreshing evolution—one where the soft embrace of or...",
    image:
      "https://ik.imagekit.io/durian1985/wp-content/uploads/2025/03/Banner-Image-1.jpg?tr=w-390,ar-1-1,pr-true,f-auto", // replace with actual image or host yourself
  },
  {
    title:
      "The Future of Home Aesthetics: A Deep Dive into 2025 Decor Trends",
    excerpt:
      "As we step into 2025, the world of home décor is evolving with a fresh perspective that blends luxur...",
    image:
      "https://ik.imagekit.io/durian1985/wp-content/uploads/2025/04/Banner-Image.jpg?tr=w-390,ar-1-1,pr-true,f-auto", // example
  },
  {
    title:
      "Bespoke Boucle: Exploring Customisation Options for a Truly Personal Touch",
    excerpt:
      "In today’s fast-paced world, where mass-produced furniture often dominates the market, luxury is fou...",
    image:
      "https://ik.imagekit.io/durian1985/wp-content/uploads/2025/02/Banner-Image-3.jpg?tr=w-390,ar-1-1,pr-true,f-auto", // example
  },
  {
    title: "All You Wanted To Know About The Single Bed",
    excerpt:
      "A single bed is an essential piece of furniture, offering both comfort and practicality for a variet...",
    image:
      "https://ik.imagekit.io/durian1985/wp-content/uploads/2025/02/Vienta-scaled.jpg?tr=w-390,ar-1-1,pr-true,f-auto", // example
  },
];

const BlogSection = () => {
  return (
    <section className="bg-[#ffffff]  md:px-10">
      <div className=" mx-auto">
        <h2 className="text-2xl md:text-3xl    font-semibold text-center mb-10  mt-2 relative inline-block after:content-[''] after:block after:w-24 after:h-0.5 after:bg-yellow-500 after:mx-auto after:mt-2">
          The Latest From Our Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogData.map((blog, index) => (
            <div key={index} className="bg-[#f5f0ec] shadow rounded-md overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-110 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-500 mb-2 uppercase">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
