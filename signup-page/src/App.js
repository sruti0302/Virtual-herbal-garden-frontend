// src/App.js
import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";  // Correct import path

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User info:", result.user);
        setUser(result.user);  // Set the user after successful sign-in
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);  // Set role after user selection
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {!user ? (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      ) : !role ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <p>Select your role:</p>
          <button onClick={() => selectRole("User")}>User</button>
          <button onClick={() => selectRole("Herbalist")}>Herbalist</button>
        </div>
      ) : (
        <h3>You signed in as {user.displayName} ({role})</h3>
      )}
    </div>
  );
}

export default App;
