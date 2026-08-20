import React from 'react';
import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState("");
 const navigate = useNavigate();

 

 const handleSubmit = async (event) => {
   event.preventDefault();

   try {
     const userCredential = await createUserWithEmailAndPassword(
       auth,
       email,
       password,
     );

     console.log(userCredential.user);

     navigate("/profile");
   } catch (error) {
     console.error("Firebase error:", error);

  if (error.code === "auth/email-already-in-use") {
    setMessage("An account with this email already exists.");
  } else if (error.code === "auth/invalid-email") {
    setMessage("Please enter a valid email address.");
  } else if (error.code === "auth/weak-password") {
    setMessage("Password should be at least 6 characters.");
  } else {
    setMessage("Something went wrong. Please try again.");
  }
   }
 };

    return (
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
          {message && <p className="auth-message">{message}</p>}

          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    );
}   