import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send to API)
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#f6f8ed]">
      <Navbar />
      <div className="mt-[12vh] min-h-screen flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-[#e2dbc7]"
        >
          <h2 className="text-xl font-bold mb-4 text-[#3b5d3b]">Contact Us</h2>
          <div className="mb-4">
            <label className="block text-[#6b705c] mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-[#d2e3c8] rounded focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-[#d2e3c8] rounded focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#6b705c] mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-[#d2e3c8] rounded focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] resize-none"
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#b7d7b0] hover:bg-[#a3cfa0] text-[#3b5d3b] font-semibold py-2 rounded transition"
          >
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
