import React from "react";
import bannerImage from "../../assets/hero/newbanner.jpg.webp"; // Replace with the actual banner image path

export default function Bannerhead() {
  return (
    <div className="py-12">
      {/* Heading Section */}
      <div className="text-center mb-8 flex flex-col justify-center items-center">
        <p data-aos="fade-up" className="text-lg text-black">
          ELEVATE YOUR STYLE WITH OUR VERSATILE COLLECTION
        </p>
        <h1 data-aos="fade-up" className="text-5xl font-bold">
          Daily deals - Brohh buzz
        </h1>
      </div>

      {/* Banner Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
        {/* Background Image */}
        <img
          src={bannerImage} // Replace with your banner image
          alt="Banner"
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Overlay with Text */}
        {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Unmissable Offers
          </h2>
          <p className="text-white text-lg sm:text-xl mb-6">
            Shop Now and Save Big on Your Favorite Styles
          </p>
          <button className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
            Explore Now
          </button>
        </div> */}
      </div>
    </div>
  );
}
