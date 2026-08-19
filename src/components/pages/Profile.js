import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Profile.css";

export default function Profile() {
   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/sign-in");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

    if (loading) {
      return <p>Loading...</p>;
    }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>My Profile</h1>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
}