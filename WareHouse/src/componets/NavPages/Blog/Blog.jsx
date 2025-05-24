// components/BlogSection.jsx
import React from 'react';
import Blogenext from '../Blog/Blogenext'
const BlogSection = () => {
  const blogs = [
    {
      image: "https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/640049fb2f1334918e54c398/blog1-640x640.jpg",
      date: "5 Jan 2023",
      author: "Daniel Stark",
      title: "A CONVERSATION WITH EXPERTS",
      description:
        "1500s, when an unknown printer took a galley of type and scrambled it to make a type spe...",
    },
    {
      image: "https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64004a182f1334918e54c3ee/blog2-640x640.jpg",
      date: "8 Mar 2016",
      author: "Scarlet",
      title: "ON THE FUTURE OF WORK",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a pa...",
    },
    {
      image: "https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64004a372f1334918e54c477/blog3-640x640.jpg",
      date: "8 Mar 2016",
      author: "Scarlet",
      title: "ON THE FUTURE OF WORK",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a pa...",
    },
  ];

  const categories = [
    "All",
    "Testing",
    "Baby Body And Bath",
    "Baby Wear"
  ];

  return (
    <>
 <div className="max-w-7xl mx-auto px-4 py-12">
      <div className='mb-8'>
        <h2 className="text-4xl font-semibold  text-center text-teal-500 uppercase">Our Blogs</h2>
        <div className="w-28 h-1 bg-orange-500 mx-auto  rounded-full"></div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Cards */}
        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="space-y-4">
              <img src={blog.image} alt={blog.title} className="rounded-md shadow" />
              <p className="text-sm text-gray-500">{blog.date} | <span className="italic">{blog.author}</span></p>
              <h3 className="text-lg font-semibold text-orange-600">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
              <a href="#" className="text-blue-600 underline hover:text-blue-800">Read More</a>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search....."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              🔍
            </button>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase mb-2">Link Lists</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {categories.map((cat, index) => (
                <li key={index} className={index === 0 ? "text-green-600 font-semibold" : ""}>
                  {cat}
                </li>
              ))}
            </ul>
            <hr className="mt-4" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Blogenext/>
    </div>
    </>
   
  );
};

export default BlogSection;
