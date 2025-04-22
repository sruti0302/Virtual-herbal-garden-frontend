// ===== Login.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImage from '../assets/Images/login-bg.png';

function Login() {
  const [userType, setUserType] = useState('normal');
  const [identityUrl, setIdentityUrl] = useState('');
  const [tempToken, setTempToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("tempToken");
    if (!tokenFromUrl) {
      alert("Error: tempToken missing from URL. Please login again.");
      navigate("/");
    } else {
      setTempToken(tokenFromUrl);
    }
  }, [location, navigate]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = userType === 'herbalist' ? 'HERBALIST' : 'USER';
    const payload =
      role === 'HERBALIST' ? { document: identityUrl } : { document: '' };

    try {
      const response = await fetch(
        `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/auth/complete-signup?token=${tempToken}&role=${role}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const finalToken = data.token; // Assuming your backend returns a token now
      
        if (finalToken) {
          localStorage.setItem("token", finalToken);
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          alert("Signup completed, but login token not received. Please login again.");
          navigate("/");
        }
      } else {
        console.error("Signup error:", await response.text());
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.2)), url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          FloraMed
        </h1>
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Complete Signup
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                Upload Identity Proof (URL)
              </label>
              <input
                type="url"
                value={identityUrl}
                onChange={(e) => setIdentityUrl(e.target.value)}
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
