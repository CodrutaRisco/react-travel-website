import React from 'react';
import "./SignUp.css";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function SignUp() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState("");

 const handleSubmit = async (event) => {
   event.preventDefault();

   try {
     const userCredential = await createUserWithEmailAndPassword(
       auth,
       email,
       password,
     );

     console.log(userCredential.user);

     setMessage("Account created successfully!");
     setEmail("");
     setPassword("");
   } catch (error) {
     console.error("Firebase error code:", error.code);
     console.error("Firebase error message:", error.message);

     setMessage(`${error.code}: ${error.message}`);
     //  console.error(error);
     //  setMessage(error.message);
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
          {message && <p>{message}</p>}

          <p>
            Already have an account? <span>Sign In</span>
          </p>
        </form>
      </div>
    );
}   