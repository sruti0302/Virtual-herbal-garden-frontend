import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in", error);
      });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    // You can now save role to database or redirect user to dashboard
    console.log("Role selected:", selectedRole);
  };

  return (
    <div style={styles.container}>
      {!user ? (
        <button onClick={handleSignIn} style={styles.button}>
          Sign in with Google
        </button>
      ) : !role ? (
        <div style={styles.roleContainer}>
          <h2>Welcome, {user.displayName}!</h2>
          <p>Select your role:</p>
          <button onClick={() => handleRoleSelect("user")} style={styles.button}>
            User
          </button>
          <button onClick={() => handleRoleSelect("herbalist")} style={styles.button}>
            Herbalist
          </button>
        </div>
      ) : (
        <h2>Signed in as {user.displayName} ({role}) ✅</h2>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "100px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  roleContainer: {
    marginTop: "20px",
  },
};

export default SignIn;
