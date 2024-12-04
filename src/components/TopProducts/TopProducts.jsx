import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../../assets/hero/jeans.jpg";
import image from "../../assets/hero/shirt.jpg";
import { useNavigate } from "react-router-dom"; // Import navigation hook

export default function TopProducts({ handleOrderPopup }) {
  const [subcategory, setsubCategory] = useState([]);
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetching subcategory data
  async function getsubCategory() {
    try {
      let result = await axios.get("https://actl.co.in/pritam/subcategoryget");
      let final = result.data.filter(
        (data) => data.subcategoryName === "regular"
      );
      setsubCategory(final);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  useEffect(() => {
    getsubCategory();
  }, []);

  return (
    <div className="h-fit">
  <div className="container mx-auto h-fit flex flex-col justify-start items-center pt-5">
    {/* Header section */}
    <div className="text-center mb-8 flex flex-col justify-center items-center">
      <p data-aos="fade-up" className="text-sm text-gray-700">
        ELEVATE YOUR STYLE WITH OUR VERSATILE COLLECTION
      </p>
      <h1 data-aos="fade-up" className="text-3xl font-bold text-gray-900">
        Shop via Category
      </h1>
    </div>

    {/* Body section with grid layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {subcategory.map((data) => (
       <div
       className="relative w-full sm:w-[700px] h-[500px] overflow-hidden group cursor-pointer mx-auto"  // Negative margin to shift image left
       key={data.id}
       onClick={() => navigate(`/view/${data.categoryName}`)} // Navigate to View Product page
     >
       {/* Image Section */}
       <img
         src={`https://actl.co.in/pritam_uploads/${data.subcategoryImage}`}
         alt={data.categoryName}
         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
       />
       {/* Category Name */}
       <h1 className="absolute text-black text-lg sm:text-2xl md:text-3xl font-semibold top-0 left-0 p-4">
         {data.categoryName}
       </h1>
     
       {/* Overlay */}
       <div className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
     </div>
     
      ))}
    </div>
  </div>
<div>

<div className="flex justify-center items-center gap-6 p-6 bg-black">
  {/* Oversized T-Shirt */}
  <div className="relative group w-1/2 h-[400px] lg:h-[500px]"> {/* Adjusted to take half width */}
    <img
      src={img} // Use the imported variable
      alt="Oversized T-shirt"
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 rounded-lg"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white font-bold text-2xl">Oversized T-shirt</span>
    </div>
  </div>

  {/* Cargo Jeans */}
  <div className="relative group w-1/2 h-[400px] lg:h-[500px]"> {/* Adjusted to take half width */}
    <img
      src={image} // Use the imported variable
      alt="Cargo Jeans"
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 rounded-lg"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white font-bold text-2xl">Cargo Jeans</span>
    </div>
  </div>
</div>




















































</div>




</div>

  );
}
