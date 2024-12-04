import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import UserContext from "../../context/UserContext";



export default function Productbannerlinkpage() {
  const [data, setData] = useState([]);
  let { auth } = useContext(UserContext);
  let navigation = useNavigate();

  async function getProfile() {
    try {
      let result = await axios.get('https://actl.co.in/pritam/getProduct');
      if (result) {
        const final = result.data.map(item => {
          if (typeof item.productImages === 'string' && typeof item.productSize === 'string') {
            return { ...item, productImages: JSON.parse(item.productImages), productSize: JSON.parse(item.productSize) };
          }
          return item;
        });
        setData(final);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function addCart(product) {
    if (auth.username) {
      let cartData = { ...product, productImages: `https://actl.co.in/pritam_uploads/${product.productImages[0]}` };
      let user = auth.username.email.split('@')[0] + '_pritam_cart';
      await axios.post(`https://actl.co.in/pritam/cartSave/${user}`, cartData);
      navigation('/cart');
    } else {
      navigation('/signinsignup');
    }
  }

  async function addWish(product) {
    if (auth.username) {
      let wishData = { ...product, productImages: `https://actl.co.in/pritam_uploads/${product.productImages[0]}` };
      let user = auth.username.email.split('@')[0] + '_pritam_wish';
      await axios.post(`https://actl.co.in/pritam/wishSave/${user}`, wishData);
      navigation('/wishlist');
    } else {
      navigation('/signinsignup');
    }
  }

  return (
    <div className="relative bottom-56 mt-60">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-black">
            Our Popular Products
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Adorn Yourself with Our Exclusive Range Of Handmade Jewelry
          </p>
        </div>

        {/* Horizontal Product Slider Section */}
        <div className="overflow-x-auto">
          <div className="flex gap-10 w-max">
            {data && data.map((product, index) => (
              <div key={index} className="border w-72 p-4 rounded-lg">
                <Link to={`/productpage/${product.productCode}`}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    loop={true}
                  >
                    <style>
                      {`
                        .swiper-button-next, .swiper-button-prev {
                          color: gray;
                        }
                        .swiper-button-next::after, .swiper-button-prev::after {
                          font-size: 20px;
                        }
                      `}
                    </style>
                    {product.productImages.map((slide, slideIndex) => (
                      <SwiperSlide key={slideIndex}>
                        <img
                          src={`https://actl.co.in/pritam_uploads/${slide}`}
                          alt={`Slide ${slideIndex}`}
                          className="w-full h-72 object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <h2 className="text-lg font-semibold mt-2">{product.productTitle}</h2>
                  <p className="text-red-500">{Math.ceil(product.productPrice - ((product.productPrice * product.productDiscount) / 100))} Rs.</p>
                  <p className="line-through text-gray-400">{product.productPrice} Rs.</p>
                </Link>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button onClick={() => addCart(product)} className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-2 text-sm rounded-lg w-full sm:w-auto">
                    Add to Cart
                  </button>
                  <button onClick={() => addWish(product)} className="bg-red-900 hover:bg-red-700 text-white py-1 px-2 text-sm rounded-lg w-full sm:w-auto">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
