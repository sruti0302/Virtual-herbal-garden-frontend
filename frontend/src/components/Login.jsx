import React, { useState } from 'react';

function Login() {
  const [userType, setUserType] = useState("");  // Track the selected user type

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);  // Update the user type based on selection
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">Login Page</h1>

      {/* Form for selecting user type */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="userType" className="text-lg font-semibold">Select User Type</label>
            <div className="flex flex-col space-y-4 mt-2">
              <div>
                <input
                  type="radio"
                  id="normalUser"
                  name="userType"
                  value="normal"
                  checked={userType === "normal"}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                <label htmlFor="normalUser" className="text-lg">Normal User</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="herbalist"
                  name="userType"
                  value="herbalist"
                  checked={userType === "herbalist"}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                <label htmlFor="herbalist" className="text-lg">Herbalist</label>
              </div>
            </div>
          </div>

          {/* File Upload Input for Herbalist */}
          {userType === "herbalist" && (
            <div className="mt-4">
              <label htmlFor="identityProof" className="block text-lg font-semibold">Upload Identity Proof (DOCX)</label>
              <input
                type="file"
                id="identityProof"
                name="identityProof"
                accept=".docx"
                className="mt-2 w-full border p-2 rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
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
