import React, { useState } from 'react';
import bgImage from '../assets/Images/login-bg.png'; // Adjust path relative to the current file location

function Login() {
  const [userType, setUserType] = useState('normal');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-400 drop-shadow mb-8">
        Login Page
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          Virtual Herbal Garden
        </h1>
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Login Page
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-green-700 font-semibold text-lg mb-3">
              Select User Type
            </label>
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

          {userType === 'herbalist' && (
            <div className="transition-all duration-300 ease-in-out">
              <label className="block text-green-700 font-semibold text-lg mb-3">
                Upload Identity Proof (DOCX)
              </label>
              <input
                type="file"
                accept=".docx"
                className="w-full border border-green-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 px-6 rounded-xl shadow-lg transition duration-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
