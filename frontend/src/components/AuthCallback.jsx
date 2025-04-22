// pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token'); // ⬅️ this is how you capture it!

    if (token) {
      localStorage.setItem('accessToken', token);
      console.log('✅ Token captured:', token);
      navigate('/dashboard'); // redirect somewhere after login
    } else {
      console.error('❌ No token found in URL');
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default AuthCallback;
