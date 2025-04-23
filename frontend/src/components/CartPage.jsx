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
      .filter((item) => item.count > 0); // Remove items with count 0
    setCartItems(updatedCart);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
        Your Cart 🛒
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shadow"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gray-800">
                      {item.count}
                    </span>
                    <button
                      onClick={() => handleAdd(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-green-700">
                    $10.00
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: $
              {cartItems
                .reduce((total, item) => total + item.count * 10, 0)
                .toFixed(2)}
            </h2>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
