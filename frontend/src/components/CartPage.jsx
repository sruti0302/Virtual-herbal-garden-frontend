import React from "react";

function CartPage({ cartItems, setCartItems }) {
  const handleAdd = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, count: item.count + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems
      .map((item, i) =>
        i === index ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);
    setCartItems(updatedCart);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-emerald-700 mb-10 text-center">
        Your Cart 🛒
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-100 rounded-xl shadow-inner">
          <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-3xl p-10">
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-6"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl border border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500 italic">{item.type}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRemove(index)}
                      className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-medium text-gray-800">
                      {item.count}
                    </span>
                    <button
                      onClick={() => handleAdd(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xl font-bold text-emerald-700">
                    ${(item.count * 10).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Total: $
              {cartItems
                .reduce((total, item) => total + item.count * 10, 0)
                .toFixed(2)}
            </h2>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
