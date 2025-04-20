import React, { useState } from 'react';
import bgImage from '../assets/Images/login-bg.png'; // Adjust path relative to the current file location

 main
function Login() {
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-400 drop-shadow mb-8">Login Page</h1>

      <div className="bg-sky-100 bg-opacity-90 p-8 rounded-lg shadow-md w-96">

export default function Login() {
  const [userType, setUserType] = useState('normal');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-xl ">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          Virtual Herbal Garden
        </h1>
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Login Page
        </h2>

 main
        <form className="space-y-6">
          <div>
            <label className="block text-green-700 font-semibold text-lg mb-3">Select User Type</label>
            <div className="flex items-center space-x-10">
              <label className="inline-flex items-center text-lg">
                <input
                  type="radio"
                  value="normal"
                  checked={userType === 'normal'}
                  onChange={handleUserTypeChange}
                  className="form-radio text-green-600 w-5 h-5"
                />
                <span className="ml-3 text-green-700">Normal User</span>
              </label>
              <label className="inline-flex items-center text-lg">
                <input
                  type="radio"
                  value="herbalist"
                  checked={userType === 'herbalist'}
                  onChange={handleUserTypeChange}
                  className="form-radio text-green-600 w-5 h-5"
                />
                <span className="ml-3 text-green-700">Herbalist</span>
              </label>
            </div>
          </div>

 main
          {userType === "herbalist" && (
            <div className="mt-4">
              <label htmlFor="identityProof" className="block text-lg font-semibold">Upload Identity Proof (DOCX)</label>

          {userType === 'herbalist' && (
            <div className="transition-all duration-300 ease-in-out">
              <label className="block text-green-700 font-semibold text-lg mb-3">
                Upload Identity Proof (DOCX)
              </label>
 main
              <input
                type="file"
                accept=".docx"
                className="w-full border border-green-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

 main
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 px-6 rounded-xl shadow-lg transition duration-500"
          >
            Submit
          </button>
 main
        </form>
      </div>
    </div>
  );
}
