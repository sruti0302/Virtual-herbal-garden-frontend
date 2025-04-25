import React, { useState } from 'react';

const Orders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const createOrder = async () => {
    const response = await fetch("https://changing-edeline-koyebdeployacc1-dbef7306.koyeb.app/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    return await response.json();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const order = await createOrder();

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Your Business Name",
        description: "Test Order",
        order_id: order.razorpayOrderId,
        handler: function (response) {
          // ✅ This is the right place to handle post-payment success
          fetch("https://your-backend.com/paymentCallback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          }).then(() => {
            // ✅ Now you can redirect the user yourself
            window.location.href = "http://localhost:5173/payment-success";
          });
        },
        prefill: {
          name: order.name,
          email: order.email
        },
        theme: { color: "#339900" }
      };

    const rzp = new window.Razorpay(options);
    rzp.open();

    
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Proceed to Payment</h2>
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Orders;
