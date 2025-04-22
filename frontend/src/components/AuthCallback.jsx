import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const tempToken = params.get("tempToken");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // redirect to your actual dashboard page
    } else if (tempToken) {
      localStorage.setItem("tempToken", tempToken);
      navigate("/login"); // redirect to signup completion
    } else {
      alert("Login failed. Please try again.");
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      Logging you in...
    </div>
  );
}

export default AuthCallback;