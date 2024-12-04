import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../src/assets/hero/img.jpg";
import image from "../../src/assets/hero/imag.jpg";
import images from "../../src/assets/hero/image.jpg";
import categories from "../../src/assets/hero/ima.jpg";

function Influencer() {
  const [subcategory, setsubCategory] = useState([]);

  // Fetching subcategory data
  async function getsubCategory() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/subcategoryget');
      let final = result.data.filter((data) => data.subcategoryName === "influencer");
      setsubCategory(final);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  }

  useEffect(() => {
    getsubCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mb-[150px]">
      {/* Header section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">→ GET THE LOOK</h1>
        <p className="text-gray-500 mt-1">
          Find your style in our lookbook and tag @brohh with #brohhlife!
        </p>
      </div>

      {/* Explore Your Style Section */}
      <div className="py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Your Style</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Image Cards */}
          {[{ src: img, title: "STREETWEAR" }, 
            { src: image, title: "CASUAL" }, 
            { src: images, title: "TRENDY" }, 
            { src: categories, title: "BASIC" }].map((item, index) => (
            <div key={index} className="relative group">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-[400px] object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Title Always Visible */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-bold">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Scrollable Section */}
      <div className="overflow-x-auto mt-16">
        <div className="flex space-x-6">
          {/* Loop through the subcategory data */}
          {subcategory.map((data, index) => (
            <div key={index} className="relative w-[400px] flex-shrink-0">
              <Link to={`/view/${data.categoryName}`}>
                <img
                  src={`https://actl.co.in/pritam_uploads/${data.subcategoryImage}`}
                  alt="product"
                  className="w-full h-[500px] object-cover transition-transform transform hover:scale-105 duration-300 rounded-md"
                />
              </Link>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-medium">
                {data.categoryName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Influencer;
