import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Marketplace({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/marketplace/products/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    const existing = cartItems.find((item) => item.id === product.productId);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.productId
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.productId,
          title: product.name,
          price: product.price,
          image: product.imageUrls?.[0],
          count: 1,
        },
      ]);
    }
  };

  const handleRemove = (product) => {
    const existing = cartItems.find((item) => item.id === product.productId);
    if (existing?.count > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.productId
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item.id !== product.productId));
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Herbal Marketplace
      </h1>

      <input
        type="text"
        placeholder="Search product..."
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 border rounded shadow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          // TEMPORARILY OVERRIDE IMAGE URLS FOR VISUAL TESTING
          product.imageUrls = [
            "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
            "https://images.pexels.com/photos/10974482/pexels-photo-10974482.jpeg",
          ];

          return (
            <div
              key={product.productId}
              className="border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
              onClick={() => openModal(product)}
            >
              <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                showIndicators={false} // Hides dots
                autoPlay={false} // Stops sliding
                infiniteLoop={false} // Prevents looping
                className="mb-3 pointer-events-none"
              >
                {product.imageUrls.map((url, idx) => (
                  <div key={idx}>
                    <img
                      src={url}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                ))}
              </Carousel>

              <h2 className="text-xl font-semibold text-green-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-bold text-green-600">
                ₹{product.price}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(product);
                  }}
                  className="flex-1 border border-green-600 text-green-600 py-1 rounded hover:bg-green-50"
                >
                  Add to Cart
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(product);
                  }}
                  className="flex-1 border border-blue-600 text-blue-600 py-1 rounded hover:bg-blue-50"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        className="bg-white p-6 max-w-3xl w-full mx-auto rounded-xl shadow-lg"
        overlayClassName="fixed inset-0 bg-black/80 flex justify-center items-center"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-700">
              {selectedProduct.name}
            </h2>

            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop
              autoPlay
              interval={3000}
              className="rounded"
            >
              {selectedProduct.imageUrls.map((url, idx) => (
                <div key={idx}>
                  <img
                    src={url}
                    alt={`${selectedProduct.name} ${idx + 1}`}
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
              ))}
            </Carousel>

            <p className="text-gray-700">{selectedProduct.description}</p>
            <p className="text-sm text-gray-500">
              Category: {selectedProduct.category}
            </p>
            <p className="text-sm text-gray-500">
              Seller: {selectedProduct.sellerName}
            </p>
            <p className="text-xl font-bold text-green-600">
              ₹{selectedProduct.price}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  handleAdd(selectedProduct);
                  navigate("/cart");
                }}
                className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50"
              >
                Buy Now
              </button>
              <button
                onClick={() => handleAdd(selectedProduct)}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
              >
                <BsCart2 className="inline mr-1 mb-1" />
                Add to Cart
              </button>
              <button
                onClick={() => handleRemove(selectedProduct)}
                className="flex-1 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
              >
                Remove
              </button>
            </div>
            <button
              onClick={closeModal}
              className="w-full mt-4 border border-gray-400 text-gray-600 py-2 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
       {cartItems.length > 0 && (
          <div
            className="fixed bottom-8 left-8 bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <BsCart2 size={24} />
            <span className="ml-2 text-lg font-bold">
              {cartItems.reduce((total, item) => total + item.count, 0)}
            </span>
          </div>
        )}

    </div>
  );
}

export default Marketplace;
