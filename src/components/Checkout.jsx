import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Checkout() {
    let { auth } = useContext(UserContext);
    const [cartData, setCartData] = useState([]);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [totalprice, setTotalPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Select Payment Mode');
    const [isFormValid, setIsFormValid] = useState(false);

    let email = auth.username.email;
    let navigate = useNavigate();

    // Load cart data from localStorage
    useEffect(() => {
        const storedCartData = JSON.parse(localStorage.getItem('cartData'));
        if (storedCartData) {
            setCartData(storedCartData);
        }
    }, []);

    useEffect(() => {
        // Form validation logic
        setIsFormValid(
            address.trim() !== '' &&
            phone.trim() !== '' &&
            paymentMethod !== 'Select Payment Mode'
        );
    }, [address, phone, paymentMethod]);

    const handleSubmit = async () => {
        const orderData = {
            items: cartData,
            customerDetails: {
                address,
                phone,
                email,
                paymentMethod,
            },
            totalPrice: totalprice,
        };

        try {
            let tname = auth.username.email.split('@')[0] + '_pritam_cart';
            const response = await axios.post(`https://actl.co.in/pritam/createOrder/${tname}`, orderData);
            console.log('Order created:', response.data);

            localStorage.removeItem('cartData');
            navigate('/order-success');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const getFinalPrice = () => {
        let price = cartData.reduce((total, item) => total + item.totalPrice, 0);
        setTotalPrice(price > 500 ? price : price);
    };

    useEffect(() => {
        getFinalPrice();
    }, [cartData]);

    const handlePayment = async (event) => {
        if (paymentMethod === 'Online Payment') {
            const amount = totalprice;
            const currency = 'INR';
            const receiptId = '1234567890';

            const response = await fetch('https://actl.co.in/pritam/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    receipt: receiptId,
                }),
            });

            const order = await response.json();
            console.log('order', order);

            var option = {
                amount,
                currency,
                order_id: order.id,
                handler: async function (response) {
                    const body = { ...response };

                    const validateResponse = await fetch('https://actl.co.in/pritam/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    const jsonResponse = await validateResponse.json();

                    if (jsonResponse === true) {
                        await handleSubmit();
                        navigate('/payment_success');
                    } else {
                        alert('Payment Rejected');
                    }
                },
                prefill: {
                    name: auth.username.name,
                    email: email,
                    contact: phone,
                },
                notes: {
                    address: address,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            var rzp1 = new Razorpay(option);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.description);
            });

            rzp1.open();
            event.preventDefault();
        } else {
            await handleSubmit();
            navigate('/payment_success');
        }
    };

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-2xl text-center font-bold mb-6">Checkout</h2>
            <div className="flex w-full justify-center gap-6 flex-col px-5">
                <div className="w-full p-5 border-gray-200 rounded-xl border-2">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Shipping Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={auth.username.email}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Payment Method</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option>Select Payment Mode</option>
                                <option>Online Payment</option>
                                <option>Cash on Delivery</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div className="w-full p-5 border-gray-200 rounded-xl border-2">
                    <h3 className="text-xl font-bold mt-8">Order Summary</h3>
                    <ul className="divide-y divide-gray-300">
                        {cartData.map((item) => (
                            <li key={item.productId} className="py-4 flex justify-between">
                                <span>
                                    <img className="h-20 w-20" src={`${item.productImages}`} alt="product" />
                                </span>
                                <span>
                                    {item.productTitle} x {item.quantity}
                                </span>
                                <span>₹{item.totalPrice}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="text-2xl font-bold mt-4">Total: ₹{totalprice}</div>
                    <button
                        onClick={handlePayment}
                        className={`block mt-6 w-full py-2 rounded-md shadow-md ${
                            isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 cursor-not-allowed text-gray-700'
                        }`}
                        disabled={!isFormValid}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
