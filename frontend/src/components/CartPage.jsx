import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Increase item quantity
  const handleAdd = (index) => {
    setCartItems(
      cartItems.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Decrease item quantity or remove if zero
  const handleRemove = (index) => {
    setCartItems(
      cartItems
        .map((item, i) =>
          i === index ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Remove item from cart
  const handleDelete = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // Clear all items from cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.count * (typeof item.price === "number" ? item.price : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-2">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-8 text-center tracking-tight">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg
              className="w-20 h-20 text-gray-200 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h13"
              />
            </svg>
            <p className="text-gray-400 text-lg mb-6">Your cart is empty.</p>
            <button
              onClick={() => navigate("/marketplace")}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition text-lg shadow"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items List */}
            <div className="flex-1">
              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-col sm:flex-row items-center justify-between py-6 gap-6"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 text-lg">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400">{item.type}</div>
                        <div className="text-green-700 font-bold mt-1 text-base">
                          $
                          {typeof item.price === "number"
                            ? item.price.toFixed(2)
                            : "0.00"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleRemove(index)}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition text-lg"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-gray-700 font-medium text-lg">
                        {item.count}
                      </span>
                      <button
                        onClick={() => handleAdd(index)}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition text-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="ml-4 px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition text-sm"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleClearCart}
                className="mt-8 w-full py-3 rounded-xl bg-gray-50 text-gray-500 font-semibold hover:bg-gray-100 transition"
              >
                Clear Cart
              </button>
            </div>
            {/* Cart Summary */}
            <div className="w-full lg:w-80 bg-green-50 rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-800 mb-6">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Items</span>
                  <span className="text-gray-800 font-semibold">
                    {cartItems.length}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-semibold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <span className="text-lg font-bold text-gray-700">Total</span>
                  <span className="text-lg font-bold text-green-700">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/orders")}
                className="mt-8 w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition text-lg shadow"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
